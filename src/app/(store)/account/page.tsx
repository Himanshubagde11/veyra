import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { User, Package, Settings, LogOut } from "lucide-react";

export const metadata = {
  title: "Account | VEYRA",
  description: "Manage your VEYRA account.",
};

export default async function AccountPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="veyra-container py-12 md:py-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-display-sm font-serif text-veyra-aubergine mb-8">
          Welcome back, {session.user.name?.split(" ")[0] || "User"}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="bg-white p-8 rounded-2xl border border-veyra-champagne shadow-sm flex flex-col justify-between">
            <div className="flex items-center gap-5 mb-8">
              <div className="w-20 h-20 bg-veyra-champagne rounded-full flex items-center justify-center shrink-0">
                <User className="w-10 h-10 text-veyra-aubergine/40" />
              </div>
              <div>
                <h2 className="text-heading-sm font-serif text-veyra-aubergine mb-1">{session.user.name}</h2>
                <p className="text-body-sm text-veyra-aubergine/60">{session.user.email}</p>
              </div>
            </div>
            <Link 
              href="/account/settings" 
              className="flex items-center justify-between p-4 rounded-xl bg-veyra-champagne/20 hover:bg-veyra-champagne/50 text-veyra-aubergine transition-colors border border-transparent hover:border-veyra-champagne-deep"
            >
              <div className="flex items-center gap-4">
                <Settings className="w-5 h-5 text-veyra-aubergine/60" />
                <span className="font-medium">Account Settings</span>
              </div>
            </Link>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <Link 
              href="/account/orders"
              className="bg-white p-8 rounded-2xl border border-veyra-champagne shadow-sm hover:border-veyra-coral hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div className="mb-8">
                <div className="w-14 h-14 bg-veyra-champagne/50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-veyra-champagne transition-colors">
                  <Package className="w-7 h-7 text-veyra-aubergine" />
                </div>
                <h3 className="text-heading-sm font-serif text-veyra-aubergine mb-3">My Orders</h3>
                <p className="text-body-sm text-veyra-aubergine/70">View and track your recent orders.</p>
              </div>
              <div className="text-veyra-coral font-medium text-sm group-hover:underline flex items-center">View History <span className="ml-2 group-hover:translate-x-1 transition-transform">&rarr;</span></div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
