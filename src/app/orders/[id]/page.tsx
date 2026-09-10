import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, ChevronRight, Package, Truck, Home } from "lucide-react";

const ORDER_STAGES = [
  { id: "CONFIRMED", label: "Confirmed", icon: CheckCircle2 },
  { id: "PROCESSING", label: "Processing", icon: Package },
  { id: "SHIPPED", label: "Shipped", icon: Truck },
  { id: "DELIVERED", label: "Delivered", icon: Home },
];

function getStageIndex(status: string) {
  if (status === "PENDING_PAYMENT") return -1;
  if (status === "CANCELLED" || status === "RETURNED") return -1;
  const index = ORDER_STAGES.findIndex(stage => status === stage.id || 
    (stage.id === "PROCESSING" && status === "PACKED") ||
    (stage.id === "SHIPPED" && status === "OUT_FOR_DELIVERY")
  );
  if (index !== -1) return index;
  // If status is OUT_FOR_DELIVERY, it maps to SHIPPED index roughly, but let's be explicit
  if (status === "OUT_FOR_DELIVERY") return 2;
  if (status === "PACKED") return 1;
  return -1;
}

export default async function OrderSuccessPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: orderNumber } = await params;

  const order = await prisma.order.findUnique({
    where: { orderNumber },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!order) {
    notFound();
  }

  const formatPrice = (amount: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount / 100);

  return (
    <div className="min-h-screen bg-veyra-porcelain py-12 md:py-24">
      <div className="veyra-container max-w-3xl">
        <div className="bg-white p-8 md:p-12 rounded-2xl border border-veyra-champagne text-center mb-8">
          <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h1 className="text-display-sm font-serif text-veyra-aubergine mb-4">Order Received</h1>
          <p className="text-body text-veyra-aubergine/70 mb-2">
            Thank you for your purchase! Your order number is <span className="font-medium text-veyra-aubergine">{order.orderNumber}</span>.
          </p>
          <p className="text-sm text-veyra-aubergine/60">
            We've sent a confirmation email to {order.guestEmail || "your registered email"}.
          </p>
        </div>

        {/* Tracking Timeline */}
        {order.status !== "PENDING_PAYMENT" && order.status !== "CANCELLED" && order.status !== "RETURNED" && (
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-veyra-champagne mb-8">
            <h2 className="text-lg font-serif text-veyra-aubergine mb-8">Tracking Details</h2>
            <div className="relative">
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-veyra-champagne -translate-y-1/2 hidden md:block"></div>
              <div className="flex flex-col md:flex-row justify-between relative z-10 gap-8 md:gap-0">
                {ORDER_STAGES.map((stage, idx) => {
                  const currentIndex = getStageIndex(order.status);
                  const isCompleted = idx <= currentIndex;
                  const isCurrent = idx === currentIndex;
                  const Icon = stage.icon;

                  return (
                    <div key={stage.id} className="flex md:flex-col items-center gap-4 md:gap-3 text-center">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 border-2 transition-colors duration-500 ${
                        isCompleted 
                          ? "bg-veyra-aubergine border-veyra-aubergine text-white" 
                          : "bg-veyra-porcelain-warm border-veyra-champagne text-veyra-aubergine/40"
                      } ${isCurrent ? "ring-4 ring-veyra-coral/20" : ""}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="text-left md:text-center">
                        <p className={`text-sm font-medium ${isCompleted ? "text-veyra-aubergine" : "text-veyra-aubergine/50"}`}>
                          {stage.label}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        <div className="bg-white p-6 md:p-8 rounded-2xl border border-veyra-champagne">
          <h2 className="text-lg font-serif text-veyra-aubergine mb-6">Order Details</h2>
          
          <div className="space-y-4 mb-8">
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between items-center py-4 border-b border-veyra-champagne last:border-0 last:pb-0">
                <div className="flex gap-4 items-center">
                  <div>
                    <h3 className="text-sm font-medium text-veyra-aubergine">{item.product.name}</h3>
                    <p className="text-xs text-veyra-aubergine/60 mt-1">Qty: {item.quantity}</p>
                  </div>
                </div>
                <div className="text-sm font-medium text-veyra-aubergine">
                  {formatPrice(item.priceSnapshot * item.quantity)}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-veyra-champagne pt-6 space-y-4">
            <div className="flex justify-between text-sm text-veyra-aubergine/80">
              <span>Subtotal</span>
              <span>{formatPrice(order.subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm text-veyra-aubergine/80">
              <span>Shipping</span>
              <span>{order.shippingCost === 0 ? "Free" : formatPrice(order.shippingCost)}</span>
            </div>
            <div className="flex justify-between text-sm text-veyra-aubergine/80">
              <span>Estimated Tax</span>
              <span>{formatPrice(order.tax)}</span>
            </div>
            <div className="border-t border-veyra-champagne pt-4 flex justify-between items-center">
              <span className="text-base font-medium text-veyra-aubergine">Total</span>
              <span className="text-xl font-medium text-veyra-aubergine">{formatPrice(order.totalAmount)}</span>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <Link href="/products" className="inline-flex items-center text-sm font-medium text-veyra-aubergine hover:text-veyra-coral transition-colors">
            Continue Shopping
            <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
