"use server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function addReview(productId: string, rating: number, title: string, comment: string) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    if (!userId) {
      return { success: false, error: "You must be logged in to leave a review." };
    }

    if (rating < 1 || rating > 5) {
      return { success: false, error: "Rating must be between 1 and 5." };
    }

    // Check if user has purchased the item for verified status
    const purchaseExists = await prisma.orderItem.findFirst({
      where: {
        productId,
        order: {
          userId,
          status: { notIn: ["PENDING_PAYMENT", "CANCELLED"] }
        }
      }
    });

    const isVerified = !!purchaseExists;

    await prisma.review.create({
      data: {
        productId,
        userId,
        rating,
        title,
        comment,
        isVerified,
        isApproved: true, // Auto-approve for demo
      }
    });

    revalidatePath("/products/[slug]", "page");
    
    return { success: true };
  } catch (error) {
    console.error("Failed to add review:", error);
    return { success: false, error: "Failed to submit review." };
  }
}
