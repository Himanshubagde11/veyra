"use client";

import { Heart } from "lucide-react";
import { useWishlistStore, WishlistItem } from "@/lib/store/wishlistStore";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface WishlistButtonProps {
  product: WishlistItem;
  className?: string;
}

export function WishlistButton({ product, className = "" }: WishlistButtonProps) {
  // Hydration fix for zustand
  const [mounted, setMounted] = useState(false);
  const toggleItem = useWishlistStore((state) => state.toggleItem);
  const isInWishlist = useWishlistStore((state) => state.isInWishlist(product.id));

  useEffect(() => {
    setMounted(true);
  }, []);

  const defaultClasses = "p-2 rounded-full bg-white/80 backdrop-blur shadow-sm hover:bg-white transition-colors";
  const buttonClasses = className ? `group rounded-full transition-colors ${className}` : `group ${defaultClasses}`;

  if (!mounted) {
    return (
      <button className={buttonClasses}>
        <Heart className="w-5 h-5 text-veyra-aubergine/40" />
      </button>
    );
  }

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent triggering Link clicks if inside a ProductCard
    e.stopPropagation();
    toggleItem(product);
  };

  return (
    <motion.button
      whileTap={{ scale: 0.85 }}
      onClick={handleToggle}
      className={buttonClasses}
      aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
    >
      <motion.div
        animate={isInWishlist ? { scale: [1, 1.2, 1] } : { scale: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <Heart
          className={`w-5 h-5 transition-colors ${
            isInWishlist 
              ? "fill-veyra-coral text-veyra-coral" 
              : "text-veyra-aubergine/40 group-hover:text-veyra-coral"
          }`}
        />
      </motion.div>
    </motion.button>
  );
}
