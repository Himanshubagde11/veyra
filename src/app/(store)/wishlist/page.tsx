"use client";

import Link from "next/link";
import { Heart, ArrowRight, Trash2 } from "lucide-react";
import Button from "@/components/ui/Button";
import { useWishlistStore } from "@/lib/store/wishlistStore";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function WishlistPage() {
  const [mounted, setMounted] = useState(false);
  const items = useWishlistStore((state) => state.items);
  const removeItem = useWishlistStore((state) => state.removeItem);
  const clearWishlist = useWishlistStore((state) => state.clearWishlist);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="veyra-container veyra-section min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-veyra-coral border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-veyra-porcelain min-h-screen">
      <div className="bg-veyra-champagne border-b border-veyra-champagne-deep">
        <div className="veyra-container py-12 md:py-20 text-center">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
            <Heart className="w-7 h-7 text-veyra-coral fill-veyra-coral" />
          </div>
          <h1 className="font-serif text-display text-veyra-obsidian mb-3">
            Your Wishlist
          </h1>
          <p className="text-body-lg text-veyra-aubergine/60 max-w-xl mx-auto">
            {items.length === 0 
              ? "You haven't saved any items yet." 
              : `You have ${items.length} ${items.length === 1 ? 'item' : 'items'} saved.`}
          </p>
        </div>
      </div>

      <div className="veyra-container py-12">
        {items.length === 0 ? (
          <div className="max-w-2xl mx-auto text-center py-12">
            <Link href="/shop">
              <Button variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
                Browse Products
              </Button>
            </Link>
          </div>
        ) : (
          <div>
            <div className="flex justify-end mb-8">
              <button 
                onClick={clearWishlist}
                className="text-sm font-medium text-veyra-aubergine/60 hover:text-veyra-coral transition-colors flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Clear Wishlist
              </button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              <AnimatePresence>
                {items.map((item) => {
                  const priceFormatted = new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                    maximumFractionDigits: 0,
                  }).format(item.price / 100);

                  return (
                    <motion.div 
                      key={item.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                      className="group block relative"
                    >
                      <Link href={`/products/${item.slug}`} className="block">
                        <div className="relative aspect-[3/4] bg-veyra-porcelain-warm overflow-hidden rounded-2xl mb-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-in-out group-hover:scale-105"
                            loading="lazy"
                          />
                        </div>
                      </Link>
                      
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          removeItem(item.id);
                        }}
                        className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur shadow-sm hover:bg-white transition-colors z-10"
                        aria-label="Remove from wishlist"
                      >
                        <Heart className="w-5 h-5 fill-veyra-coral text-veyra-coral" />
                      </button>

                      <div className="flex flex-col px-0.5">
                        <Link href={`/products/${item.slug}`} className="group-hover:text-veyra-coral transition-colors">
                          <h3 className="text-body-sm font-serif text-veyra-aubergine line-clamp-1">{item.name}</h3>
                        </Link>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm font-medium text-veyra-aubergine">{priceFormatted}</span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
