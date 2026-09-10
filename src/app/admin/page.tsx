import { getDashboardStats } from "@/app/actions/adminActions";
import { Package, ShoppingCart, IndianRupee, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils/format";
import { DashboardCharts } from "@/components/admin/DashboardCharts";

export default async function AdminDashboard() {
  const stats = await getDashboardStats();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-heading-md font-serif text-veyra-aubergine">Dashboard</h1>
        <p className="text-body text-veyra-aubergine/60 mt-1">
          Welcome to the VEYRA administration panel.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-2xl border border-veyra-champagne shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-veyra-aubergine/70 uppercase tracking-wider">Total Revenue</h3>
            <div className="p-2 bg-veyra-champagne/30 rounded-lg text-veyra-aubergine">
              <IndianRupee className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-serif text-veyra-aubergine">
            {formatCurrency(stats.totalRevenue)}
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-veyra-champagne shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-veyra-aubergine/70 uppercase tracking-wider">Total Orders</h3>
            <div className="p-2 bg-veyra-champagne/30 rounded-lg text-veyra-aubergine">
              <ShoppingCart className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-serif text-veyra-aubergine">
            {stats.totalOrders}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-veyra-champagne shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-veyra-aubergine/70 uppercase tracking-wider">Active Products</h3>
            <div className="p-2 bg-veyra-champagne/30 rounded-lg text-veyra-aubergine">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-serif text-veyra-aubergine">
            {stats.totalProducts}
          </div>
        </div>
      </div>

      <DashboardCharts data={stats.chartData} />

      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-heading-sm font-serif text-veyra-aubergine">Recent Orders</h2>
          <Link href="/admin/orders" className="text-sm font-medium text-veyra-coral hover:text-veyra-coral-dark flex items-center transition-colors">
            View all <ArrowUpRight className="ml-1 w-4 h-4" />
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-veyra-champagne shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="border-b border-veyra-champagne bg-veyra-porcelain-warm text-xs uppercase tracking-wider text-veyra-aubergine/50">
                  <th className="px-6 py-4 font-medium w-1/5">Order ID</th>
                  <th className="px-6 py-4 font-medium w-1/5">Date</th>
                  <th className="px-6 py-4 font-medium w-1/5">Customer</th>
                  <th className="px-6 py-4 font-medium text-right w-1/5">Total</th>
                  <th className="px-6 py-4 font-medium w-1/5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-veyra-champagne">
                {stats.recentOrders.length > 0 ? (
                  stats.recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-veyra-porcelain-warm/50 transition-colors">
                      <td className="px-6 py-5 text-sm font-mono text-veyra-aubergine">
                        {order.id.slice(-8).toUpperCase()}
                      </td>
                      <td className="px-6 py-5 text-sm text-veyra-aubergine">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-5 text-sm text-veyra-aubergine">
                        {order.user?.name || order.user?.email || "Guest"}
                      </td>
                      <td className="px-6 py-5 text-sm font-medium text-veyra-aubergine text-right">
                        {formatCurrency(order.totalAmount)}
                      </td>
                      <td className="px-6 py-5">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase ${
                          order.status === 'PENDING_PAYMENT' ? 'bg-yellow-100 text-yellow-800' :
                          order.status === 'CONFIRMED' || order.status === 'PROCESSING' ? 'bg-blue-100 text-blue-800' :
                          order.status === 'SHIPPED' || order.status === 'OUT_FOR_DELIVERY' ? 'bg-sky-100 text-sky-800' :
                          order.status === 'DELIVERED' ? 'bg-green-100 text-green-800' :
                          order.status === 'CANCELLED' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {order.status.replace(/_/g, ' ')}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-veyra-aubergine/50 text-sm">
                      No recent orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
