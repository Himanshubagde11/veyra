"use server";
import { prisma } from "@/lib/prisma";

export async function validateCoupon(code: string, cartTotal: number) {
  try {
    const coupon = await prisma.coupon.findUnique({
      where: { code: code.toUpperCase() }
    });

    if (!coupon || !coupon.isActive) {
      return { success: false, error: "Invalid or inactive coupon." };
    }

    const now = new Date();
    if (now < coupon.startDate || (coupon.endDate && now > coupon.endDate)) {
      return { success: false, error: "Coupon is expired or not yet active." };
    }

    if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
      return { success: false, error: "Coupon usage limit reached." };
    }

    if (coupon.minOrderValue && cartTotal < coupon.minOrderValue) {
      return { success: false, error: `Minimum order value of ₹${coupon.minOrderValue / 100} required.` };
    }

    let discountAmount = 0;
    if (coupon.discountType === "FIXED") {
      discountAmount = coupon.discountValue;
    } else if (coupon.discountType === "PERCENTAGE") {
      discountAmount = Math.floor((cartTotal * coupon.discountValue) / 100);
      if (coupon.maxDiscount && discountAmount > coupon.maxDiscount) {
        discountAmount = coupon.maxDiscount;
      }
    }

    // Don't discount more than the cart total
    if (discountAmount > cartTotal) {
      discountAmount = cartTotal;
    }

    return {
      success: true,
      discountAmount,
      couponCode: coupon.code,
    };
  } catch (error) {
    console.error("Coupon validation error:", error);
    return { success: false, error: "Failed to validate coupon." };
  }
}
