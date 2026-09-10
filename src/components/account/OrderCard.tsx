import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils/format";
import { Package, Truck, CheckCircle, Clock, XCircle } from "lucide-react";

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: any }> = {
  PENDING_PAYMENT: { label: "Pending Payment", color: "bg-yellow-100 text-yellow-800", icon: Clock },
  CONFIRMED: { label: "Confirmed", color: "bg-blue-100 text-blue-800", icon: CheckCircle },
  PROCESSING: { label: "Processing", color: "bg-indigo-100 text-indigo-800", icon: Package },
  PACKED: { label: "Packed", color: "bg-purple-100 text-purple-800", icon: Package },
  SHIPPED: { label: "Shipped", color: "bg-sky-100 text-sky-800", icon: Truck },
  OUT_FOR_DELIVERY: { label: "Out for Delivery", color: "bg-teal-100 text-teal-800", icon: Truck },
  DELIVERED: { label: "Delivered", color: "bg-green-100 text-green-800", icon: CheckCircle },
  CANCELLED: { label: "Cancelled", color: "bg-red-100 text-red-800", icon: XCircle },
  RETURNED: { label: "Returned", color: "bg-gray-100 text-gray-800", icon: XCircle },
};

interface OrderCardProps {
  order: any;
}

export function OrderCard({ order }: OrderCardProps) {
  const date = new Date(order.createdAt).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const statusInfo = STATUS_CONFIG[order.status] || {
    label: order.status,
    color: "bg-gray-100 text-gray-800",
    icon: Package,
  };
  const StatusIcon = statusInfo.icon;

  return (
    <div className="bg-white rounded-2xl border border-veyra-champagne shadow-sm overflow-hidden mb-6 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="bg-veyra-porcelain-warm px-6 py-4 border-b border-veyra-champagne flex flex-col md:flex-row md:justify-between md:items-center gap-3">
        <div>
          <p className="text-xs text-veyra-aubergine/50 uppercase tracking-wider mb-0.5">Order Placed</p>
          <p className="font-medium text-sm text-veyra-aubergine">{date}</p>
        </div>
        <div>
          <p className="text-xs text-veyra-aubergine/50 uppercase tracking-wider mb-0.5">Total</p>
          <p className="font-medium text-sm text-veyra-aubergine">{formatCurrency(order.totalAmount)}</p>
        </div>
        <div>
          <p className="text-xs text-veyra-aubergine/50 uppercase tracking-wider mb-0.5">Order #</p>
          <p className="font-mono font-medium text-sm text-veyra-aubergine">{order.orderNumber || order.id.slice(0, 8).toUpperCase()}</p>
        </div>
        <div>
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
            <StatusIcon className="w-3.5 h-3.5" />
            {statusInfo.label}
          </span>
        </div>
      </div>

      {/* Items */}
      <div className="p-6">
        <div className="space-y-4">
          {order.items?.map((item: any) => (
            <div key={item.id} className="flex gap-4">
              <div className="w-20 h-20 bg-veyra-porcelain-warm rounded-lg overflow-hidden relative flex-shrink-0">
                {item.product?.images?.[0] ? (
                  <Image
                    src={item.product.images[0].url}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-veyra-champagne flex items-center justify-center text-xs text-veyra-aubergine/40">
                    No image
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <Link
                  href={`/products/${item.product?.slug || "#"}`}
                  className="font-serif text-heading-sm text-veyra-aubergine hover:text-veyra-coral transition-colors line-clamp-1"
                >
                  {item.product?.name || "Product"}
                </Link>
                <div className="text-sm text-veyra-aubergine/70 mt-1">
                  Qty: {item.quantity} &bull; {formatCurrency(item.priceSnapshot)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
