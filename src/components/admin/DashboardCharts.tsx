"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { formatCurrency } from "@/lib/utils/format";

interface ChartData {
  name: string;
  revenue: number;
  orders: number;
}

export function DashboardCharts({ data }: { data: ChartData[] }) {
  if (!data || data.length === 0) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
      {/* Revenue Chart */}
      <div className="bg-white p-6 rounded-2xl border border-veyra-champagne shadow-sm">
        <div className="mb-6">
          <h3 className="text-heading-sm font-serif text-veyra-aubergine">Revenue Over Time</h3>
          <p className="text-sm text-veyra-aubergine/60">Last 7 days</p>
        </div>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#DFB2A9" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#DFB2A9" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EBE4DB" />
              <XAxis 
                dataKey="name" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#3E2A35', fontSize: 12, opacity: 0.6 }}
                dy={10}
              />
              <YAxis 
                tickFormatter={(val) => `₹${val}`} 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#3E2A35', fontSize: 12, opacity: 0.6 }}
                dx={-10}
              />
              <Tooltip 
                formatter={(value: any) => [formatCurrency(Number(value) || 0), "Revenue"]}
                contentStyle={{ 
                  backgroundColor: '#ffffff', 
                  borderRadius: '12px',
                  border: '1px solid #EBE4DB',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                }}
                itemStyle={{ color: '#3E2A35', fontWeight: 500 }}
              />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stroke="#DFB2A9" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorRevenue)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Orders Chart */}
      <div className="bg-white p-6 rounded-2xl border border-veyra-champagne shadow-sm">
        <div className="mb-6">
          <h3 className="text-heading-sm font-serif text-veyra-aubergine">Orders Over Time</h3>
          <p className="text-sm text-veyra-aubergine/60">Last 7 days</p>
        </div>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EBE4DB" />
              <XAxis 
                dataKey="name" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#3E2A35', fontSize: 12, opacity: 0.6 }}
                dy={10}
              />
              <YAxis 
                allowDecimals={false}
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#3E2A35', fontSize: 12, opacity: 0.6 }}
                dx={-10}
              />
              <Tooltip 
                cursor={{ fill: '#EBE4DB', opacity: 0.4 }}
                contentStyle={{ 
                  backgroundColor: '#ffffff', 
                  borderRadius: '12px',
                  border: '1px solid #EBE4DB',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                }}
                itemStyle={{ color: '#3E2A35', fontWeight: 500 }}
              />
              <Bar 
                dataKey="orders" 
                fill="#3E2A35" 
                radius={[4, 4, 0, 0]} 
                barSize={40}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
