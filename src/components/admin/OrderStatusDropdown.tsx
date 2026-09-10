"use client";

import { updateOrderStatus } from "@/app/actions/adminActions";
import { useState, useTransition } from "react";
import { ChevronDown, Loader2 } from "lucide-react";

const STATUS_OPTIONS = [
  { value: "PENDING_PAYMENT", label: "Pending Payment", color: "bg-yellow-100 text-yellow-800" },
  { value: "CONFIRMED", label: "Confirmed", color: "bg-blue-100 text-blue-800" },
  { value: "PROCESSING", label: "Processing", color: "bg-indigo-100 text-indigo-800" },
  { value: "PACKED", label: "Packed", color: "bg-purple-100 text-purple-800" },
  { value: "SHIPPED", label: "Shipped", color: "bg-sky-100 text-sky-800" },
  { value: "OUT_FOR_DELIVERY", label: "Out for Delivery", color: "bg-teal-100 text-teal-800" },
  { value: "DELIVERED", label: "Delivered", color: "bg-green-100 text-green-800" },
  { value: "CANCELLED", label: "Cancelled", color: "bg-red-100 text-red-800" },
  { value: "RETURNED", label: "Returned", color: "bg-gray-100 text-gray-800" },
];

export function OrderStatusDropdown({ 
  orderId, 
  currentStatus 
}: { 
  orderId: string, 
  currentStatus: string 
}) {
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  const handleUpdate = (newStatus: string) => {
    setIsOpen(false);
    if (newStatus === currentStatus) return;
    
    startTransition(async () => {
      try {
        await updateOrderStatus(orderId, newStatus);
      } catch (error) {
        console.error("Failed to update order status", error);
        alert("Failed to update order status.");
      }
    });
  };

  const getStatusInfo = (status: string) => {
    return STATUS_OPTIONS.find(s => s.value === status) || { value: status, label: status, color: "bg-gray-100 text-gray-800" };
  };

  const current = getStatusInfo(currentStatus);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium cursor-pointer transition-opacity hover:opacity-80 disabled:opacity-50 ${current.color}`}
      >
        {isPending ? <Loader2 className="w-3 h-3 animate-spin" /> : current.label}
        <ChevronDown className="w-3 h-3" />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg border border-veyra-champagne z-20 py-1 overflow-hidden max-h-64 overflow-y-auto">
            {STATUS_OPTIONS.map(status => (
              <button
                key={status.value}
                onClick={() => handleUpdate(status.value)}
                className={`w-full text-left px-4 py-2 text-xs font-medium transition-colors ${
                  status.value === currentStatus 
                    ? "bg-veyra-porcelain-warm text-veyra-aubergine" 
                    : "text-veyra-aubergine/70 hover:bg-veyra-porcelain hover:text-veyra-coral"
                }`}
              >
                {status.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
