import Link from "next/link";
import { ShoppingBag, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";

export const metadata = {
  title: "Your Cart",
  description: "View items in your shopping cart at VEYRA.",
};

export default function CartPage() {
  return (
    <div className="veyra-container veyra-section">
      <div className="max-w-2xl mx-auto text-center">
        <div className="w-16 h-16 bg-veyra-champagne rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingBag className="w-7 h-7 text-veyra-aubergine/40" />
        </div>
        <h1 className="font-serif text-display text-veyra-obsidian mb-3">
          Your Cart
        </h1>
        <p className="text-body-lg text-veyra-aubergine/40 mb-8">
          Your next find is waiting.
        </p>
        <Link href="/shop">
          <Button variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
            Start Discovering
          </Button>
        </Link>
      </div>
    </div>
  );
}
