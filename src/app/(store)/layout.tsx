import { MobileNav } from "@/components/layout";

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="min-h-screen">{children}</main>
      <MobileNav />
      {/* Bottom padding for mobile nav */}
      <div className="h-16 lg:hidden" />
    </>
  );
}
