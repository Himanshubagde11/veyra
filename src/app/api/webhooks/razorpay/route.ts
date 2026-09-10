import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const bodyText = await req.text();
    const signature = req.headers.get("x-razorpay-signature");

    if (!signature) {
      return NextResponse.json({ error: "Missing signature" }, { status: 400 });
    }

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET || "")
      .update(bodyText)
      .digest("hex");

    if (expectedSignature !== signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const event = JSON.parse(bodyText);

    if (event.event === "payment.captured") {
      const paymentData = event.payload.payment.entity;
      const razorpayOrderId = paymentData.order_id;
      const razorpayPaymentId = paymentData.id;

      // Find the payment and associated order
      const payment = await prisma.payment.findUnique({
        where: { razorpayOrderId },
        include: { order: { include: { items: true } } }
      });

      if (!payment) {
        return NextResponse.json({ error: "Payment record not found" }, { status: 404 });
      }

      // Update in a transaction
      await prisma.$transaction(async (tx) => {
        // Update payment status
        await tx.payment.update({
          where: { id: payment.id },
          data: {
            status: "CAPTURED",
            razorpayPaymentId,
            razorpaySignature: signature,
          },
        });

        // Update order status
        await tx.order.update({
          where: { id: payment.orderId },
          data: { status: "CONFIRMED" },
        });

        // Decrement inventory for all items in the order
        for (const item of payment.order.items) {
          await tx.inventory.update({
            where: { productId: item.productId },
            data: { stock: { decrement: item.quantity } },
          });
        }
      });
      
      return NextResponse.json({ status: "ok" });
    }

    if (event.event === "payment.failed") {
      const paymentData = event.payload.payment.entity;
      const razorpayOrderId = paymentData.order_id;

      await prisma.payment.updateMany({
        where: { razorpayOrderId },
        data: { status: "FAILED" },
      });

      return NextResponse.json({ status: "ok" });
    }

    return NextResponse.json({ status: "ignored" });
  } catch (error: any) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
