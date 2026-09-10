"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import Razorpay from "razorpay";
import { validateCoupon } from "./couponActions";

export async function createOrder(
  cartItems: { id: string; quantity: number }[], 
  guestEmail?: string, 
  couponCode?: string, 
  paymentMethod: "razorpay" | "cod" = "razorpay"
) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    if (!userId && !guestEmail) {
      return { success: false, error: "Must be logged in or provide guest email." };
    }

    // 1. Fetch fresh products from DB to ensure prices are accurate (Server-Side Validation)
    const productIds = cartItems.map((item) => item.id);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
      include: { inventory: true },
    });

    if (products.length !== productIds.length) {
      return { success: false, error: "One or more products could not be found." };
    }

    // 2. Validate inventory and calculate totals
    let subtotal = 0;
    const orderItemsData: { productId: string; quantity: number; priceSnapshot: number }[] = [];

    for (const item of cartItems) {
      const product = products.find((p) => p.id === item.id);
      if (!product) continue;

      if (!product.inventory || product.inventory.stock < item.quantity) {
        return { success: false, error: `Insufficient stock for ${product.name}.` };
      }

      subtotal += product.price * item.quantity;
      
      orderItemsData.push({
        productId: product.id,
        quantity: item.quantity,
        priceSnapshot: product.price, // Store price at time of purchase
      });
    }

    // Apply coupon if provided
    let discountAmount = 0;
    let appliedCouponCode = null;

    if (couponCode) {
      const couponResult = await validateCoupon(couponCode, subtotal);
      if (couponResult.success && couponResult.discountAmount !== undefined) {
        discountAmount = couponResult.discountAmount;
        appliedCouponCode = couponCode;
      }
    }

    const shippingCost = subtotal > 1000000 ? 0 : 5000; // Free shipping over 10,000 INR (1000000 paise)
    const tax = Math.round((subtotal - discountAmount) * 0.18); // 18% GST mock
    const totalAmount = subtotal - discountAmount + shippingCost + tax;

    let rzpOrderId = `mock_order_${Date.now()}`;
    let isMockMode = true;

    // Only call Razorpay if online payment and keys are configured
    if (
      paymentMethod === "razorpay" &&
      process.env.RAZORPAY_KEY_ID && 
      process.env.RAZORPAY_KEY_SECRET &&
      !process.env.RAZORPAY_KEY_ID.includes("xxxxxxxxxxxxx") &&
      process.env.RAZORPAY_KEY_ID !== "rzp_test_dummy"
    ) {
      isMockMode = false;
      const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
      });

      const rzpOrder = await razorpay.orders.create({
        amount: totalAmount,
        currency: "INR",
        receipt: `RCP-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      });

      if (!rzpOrder || !rzpOrder.id) {
        return { success: false, error: "Failed to initialize payment gateway." };
      }
      rzpOrderId = rzpOrder.id;
    }

    // Determine final status
    const isCod = paymentMethod === "cod";
    const initialOrderStatus = (isMockMode || isCod) ? "CONFIRMED" : "PENDING_PAYMENT";
    const initialPaymentStatus = (isMockMode && !isCod) ? "CAPTURED" : "PENDING";

    // 3. Create the Order and Decrement Inventory within a Transaction
    const order = await prisma.$transaction(async (tx) => {
      // Generate Order Number
      const orderNumber = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

      // Create Order
      const newOrder = await tx.order.create({
        data: {
          orderNumber,
          userId: userId || null,
          guestEmail: guestEmail || null,
          status: initialOrderStatus,
          totalAmount,
          subtotal,
          tax,
          shippingCost,
          discountAmount,
          couponCode: appliedCouponCode,
          items: {
            create: orderItemsData,
          },
          payment: {
            create: {
              amount: totalAmount,
              status: initialPaymentStatus,
              razorpayOrderId: isCod ? `cod_${Date.now()}` : rzpOrderId,
              method: isCod ? "COD" : "RAZORPAY",
            },
          }
        },
      });

      // If mock mode or COD, decrement inventory immediately
      if (isMockMode || isCod) {
        for (const item of orderItemsData) {
          const product = products.find((p) => p.id === item.productId);
          if (product && product.inventory) {
            await tx.inventoryTransaction.create({
              data: {
                inventoryId: product.inventory.id,
                reason: "ORDER",
                quantity: -item.quantity,
                orderId: newOrder.id,
              },
            });

            await tx.inventory.update({
              where: { id: product.inventory.id },
              data: { stock: { decrement: item.quantity } },
            });
          }
        }
      }

      return newOrder;
    });

    revalidatePath("/products");
    return { 
      success: true, 
      orderId: order.id, 
      orderNumber: order.orderNumber, 
      totalAmount: order.totalAmount,
      razorpayOrderId: rzpOrderId
    };
  } catch (error: any) {
    console.error("Order creation failed:", error);
    return { success: false, error: error.message || "Failed to create order." };
  }
}
