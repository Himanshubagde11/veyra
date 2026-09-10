import { getAdminOrders } from "@/app/actions/adminActions";
import { formatCurrency } from "@/lib/utils/format";
import { OrderStatusDropdown } from "@/components/admin/OrderStatusDropdown";
import { Eye } from "lucide-react";

export default async function AdminOrdersPage() {
  const orders = await getAdminOrders();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-heading-md font-serif text-veyra-aubergine">Orders</h1>
        <p className="text-body text-veyra-aubergine/60 mt-1">
          Manage customer orders and fulfillment.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-veyra-champagne shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-veyra-champagne bg-veyra-porcelain-warm text-xs uppercase tracking-wider text-veyra-aubergine/50">
                <th className="p-4 font-medium">Order</th>
                <th className="p-4 font-medium">Date</th>
                <th className="p-4 font-medium">Customer</th>
                <th className="p-4 font-medium">Items</th>
                <th className="p-4 font-medium text-right">Total</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium w-16"></th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order.id} className="border-b border-veyra-champagne last:border-0 hover:bg-veyra-porcelain-warm/50 transition-colors group">
                    <td className="p-4">
                      <div className="font-mono text-sm text-veyra-aubergine">
                        #{order.id.slice(-8).toUpperCase()}
                      </div>
                    </td>
                    <td className="p-4 text-sm text-veyra-aubergine/70">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <div className="text-sm font-medium text-veyra-aubergine">{order.user?.name || "Guest"}</div>
                      <div className="text-xs text-veyra-aubergine/50">{order.user?.email || "No email"}</div>
                    </td>
                    <td className="p-4 text-sm text-veyra-aubergine/70">
                      {order.items.reduce((acc, item) => acc + item.quantity, 0)} items
                    </td>
                    <td className="p-4 text-sm font-medium text-veyra-aubergine text-right">
                      {formatCurrency(order.totalAmount)}
                    </td>
                    <td className="p-4">
                      <OrderStatusDropdown orderId={order.id} currentStatus={order.status} />
                    </td>
                    <td className="p-4 text-right">
                      <button className="text-veyra-aubergine/40 hover:text-veyra-coral transition-colors p-1" title="View details (Coming Soon)">
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-veyra-aubergine/50 text-sm">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
