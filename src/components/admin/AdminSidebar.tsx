"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Package, 
  Tags, 
  ShoppingCart, 
  Users,
  Settings,
  ChevronLeft
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Products", href: "/admin/products", icon: Package },
  { name: "Categories", href: "/admin/categories", icon: Tags },
  { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { name: "Customers", href: "/admin/customers", icon: Users },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-white border-r border-veyra-champagne flex flex-col">
      <div className="h-20 flex items-center px-6 border-b border-veyra-champagne">
        <Link href="/" className="flex items-center text-veyra-aubergine hover:text-veyra-coral transition-colors group">
          <ChevronLeft className="w-4 h-4 mr-1 transition-transform group-hover:-translate-x-1" />
          <span className="text-sm font-medium">Back to Store</span>
        </Link>
      </div>
      
      <div className="px-6 py-6">
        <h2 className="text-xs font-bold text-veyra-aubergine/50 uppercase tracking-widest mb-4">
          Administration
        </h2>
        <nav className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href || (pathname.startsWith(`${item.href}/`) && item.href !== "/admin");
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive 
                    ? "bg-veyra-porcelain text-veyra-coral" 
                    : "text-veyra-aubergine hover:bg-veyra-porcelain-warm hover:text-veyra-coral"
                }`}
              >
                <item.icon className={`w-5 h-5 mr-3 ${isActive ? "text-veyra-coral" : "text-veyra-aubergine/50"}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      
      <div className="mt-auto p-6 border-t border-veyra-champagne flex flex-col gap-2">
        <Link
          href="/admin/settings"
          className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            pathname === "/admin/settings"
              ? "bg-veyra-porcelain text-veyra-coral" 
              : "text-veyra-aubergine hover:bg-veyra-porcelain-warm hover:text-veyra-coral"
          }`}
        >
          <Settings className="w-5 h-5 mr-3 text-veyra-aubergine/50" />
          Settings
        </Link>
      </div>
    </div>
  );
}
