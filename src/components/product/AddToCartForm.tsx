"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { useCartStore } from "@/lib/store/cartStore";
import { WishlistButton } from "@/components/wishlist/WishlistButton";

interface AddToCartFormProps {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    image: string;
  };
  inStock: boolean;
}

export function AddToCartForm({ product, inStock }: AddToCartFormProps) {
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({
      ...product,
      quantity,
    });
  };

  return (
    <div className="flex flex-col gap-4 border-t border-veyra-champagne pt-10">
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-between border border-veyra-aubergine/20 rounded-full w-32 h-14 px-4 shrink-0">
          <button 
            type="button" 
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="text-veyra-aubergine hover:text-veyra-coral transition-colors" 
            disabled={!inStock}
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="font-medium text-veyra-aubergine">{quantity}</span>
          <button 
            type="button" 
            onClick={() => setQuantity(quantity + 1)}
            className="text-veyra-aubergine hover:text-veyra-coral transition-colors" 
            disabled={!inStock}
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          disabled={!inStock}
          onClick={handleAddToCart}
          className="flex-1 relative overflow-hidden group h-14 bg-veyra-aubergine text-white rounded-full font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="relative z-10">{inStock ? "Add to Cart" : "Sold Out"}</span>
          <div className="absolute inset-0 h-full w-full bg-veyra-obsidian transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out" />
        </motion.button>

        <div className="shrink-0 h-14 flex items-center">
          <WishlistButton product={product} className="h-14 w-14 flex items-center justify-center border border-veyra-aubergine/20 bg-transparent shadow-none hover:border-veyra-coral hover:bg-transparent" />
        </div>
      </div>
      <p className="text-xs text-center text-veyra-aubergine/50 mt-2">
        Free shipping on orders over ₹10,000
      </p>
    </div>
  );
}
