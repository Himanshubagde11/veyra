"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

/**
 * Validates that the current user is an admin.
 * Throws an error if not authorized.
 */
async function requireAdmin() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    throw new Error("Unauthorized: Please log in.");
  }
  
  const user = await prisma.user.findUnique({
    where: { email: session.user.email as string },
    select: { role: true }
  });
  
  if (user?.role !== "ADMIN") {
    throw new Error("Forbidden: Admin access required.");
  }
  
  return session.user;
}

export async function getDashboardStats() {
  await requireAdmin();
  
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  sevenDaysAgo.setHours(0, 0, 0, 0);

  const [totalOrders, totalRevenue, totalProducts, recentOrders, last7DaysOrders] = await Promise.all([
    prisma.order.count(),
    prisma.order.aggregate({
      _sum: {
        totalAmount: true
      }
    }),
    prisma.product.count({
      where: { isArchived: false }
    }),
    prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: { name: true, email: true }
        }
      }
    }),
    prisma.order.findMany({
      where: {
        createdAt: {
          gte: sevenDaysAgo
        }
      },
      select: {
        createdAt: true,
        totalAmount: true
      }
    })
  ]);
  
  // Process daily stats
  const dailyStats = new Map();
  
  // Initialize last 7 days with 0
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    dailyStats.set(dateStr, { name: dateStr, revenue: 0, orders: 0 });
  }

  // Aggregate orders
  last7DaysOrders.forEach(order => {
    const dateStr = new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    if (dailyStats.has(dateStr)) {
      const current = dailyStats.get(dateStr);
      current.revenue += order.totalAmount;
      current.orders += 1;
    }
  });

  const chartData = Array.from(dailyStats.values());
  
  return {
    totalOrders,
    totalRevenue: totalRevenue._sum.totalAmount || 0,
    totalProducts,
    recentOrders,
    chartData
  };
}

export async function getAdminProducts() {
  await requireAdmin();
  
  return prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      categories: {
        include: {
          category: true
        }
      },
      inventory: true,
      images: {
        take: 1,
        orderBy: { order: 'asc' }
      }
    }
  });
}

export async function getAdminOrders() {
  await requireAdmin();
  
  return prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      user: {
        select: { name: true, email: true }
      },
      items: {
        include: {
          product: {
            select: { name: true }
          }
        }
      }
    }
  });
}

export async function updateOrderStatus(orderId: string, status: string) {
  await requireAdmin();
  
  await prisma.order.update({
    where: { id: orderId },
    data: { status: status as any }
  });
  
  revalidatePath('/admin/orders');
  revalidatePath('/admin');
}
