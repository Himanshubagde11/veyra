import { getUserOrders } from "@/app/actions/userActions";
import { OrderCard } from "@/components/account/OrderCard";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "My Orders | VEYRA",
  description: "View your order history.",
};

export const dynamic = "force-dynamic";

export default async function OrdersPage() {
  const result = await getUserOrders();

  if (!result.success) {
    return (
      <div className="veyra-container py-24 text-center">
        <p className="text-body-lg text-veyra-coral mb-4">Please log in to view your orders.</p>
        <Link href="/login" className="text-veyra-aubergine hover:underline">
          Go to Login
        </Link>
      </div>
    );
  }

  const orders = result.orders || [];

  return (
    <div className="veyra-container py-12 md:py-24">
      <div className="max-w-4xl mx-auto">
        <Link 
          href="/account" 
          className="inline-flex items-center space-x-2 text-veyra-aubergine/60 hover:text-veyra-coral mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Account</span>
        </Link>
        
        <h1 className="text-display-sm font-serif text-veyra-aubergine mb-8">My Orders</h1>

        {orders.length === 0 ? (
          <div className="bg-veyra-champagne/30 rounded-2xl p-12 text-center border border-veyra-champagne">
            <p className="text-body-lg text-veyra-aubergine/70 mb-6">You haven't placed any orders yet.</p>
            <Link 
              href="/objects"
              className="inline-flex items-center justify-center px-6 py-3 bg-veyra-aubergine text-white rounded-full hover:bg-veyra-obsidian transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div>
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
