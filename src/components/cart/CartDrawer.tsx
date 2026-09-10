"use client";

import { useEffect, useState } from "react";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/lib/store/cartStore";

export function CartDrawer() {
  const { items, isOpen, setIsOpen, updateQuantity, removeItem, getTotals } = useCartStore();
  const [mounted, setMounted] = useState(false);
  
  const { subtotal } = getTotals();

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const priceFormatted = (price: number) => 
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price / 100);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-veyra-obsidian/40 z-50 transition-opacity backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <div 
        className={`fixed inset-y-0 right-0 w-full max-w-md bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-veyra-champagne">
          <h2 className="text-display-sm font-serif text-veyra-aubergine flex items-center">
            Your Cart <span className="ml-2 text-body-sm text-veyra-aubergine/50 bg-veyra-champagne px-2 py-1 rounded-full font-sans">{items.length}</span>
          </h2>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 text-veyra-aubergine/60 hover:text-veyra-aubergine transition-colors rounded-full hover:bg-veyra-porcelain-warm"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 bg-veyra-porcelain-warm rounded-full flex items-center justify-center text-veyra-aubergine/30 mb-4">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <p className="text-body-lg text-veyra-aubergine/60 font-serif">Your cart is empty</p>
              <button 
                onClick={() => setIsOpen(false)}
                className="mt-6 text-veyra-coral hover:text-veyra-coral-dark font-medium underline underline-offset-4"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-24 h-32 flex-shrink-0 bg-veyra-porcelain-warm rounded-lg overflow-hidden relative">
                    <img src={item.image} alt={item.name} className="absolute inset-0 w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <Link 
                          href={`/products/${item.slug}`} 
                          onClick={() => setIsOpen(false)}
                          className="font-serif text-body text-veyra-aubergine hover:text-veyra-coral transition-colors line-clamp-2"
                        >
                          {item.name}
                        </Link>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-veyra-aubergine/40 hover:text-veyra-coral p-1"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-body-sm font-medium text-veyra-aubergine mt-1">{priceFormatted(item.price)}</p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-veyra-aubergine/20 rounded-full h-9 px-3">
                        <button 
                          onClick={() => {
                            if (item.quantity > 1) {
                              updateQuantity(item.id, item.quantity - 1);
                            } else {
                              removeItem(item.id);
                            }
                          }}
                          className="text-veyra-aubergine/60 hover:text-veyra-coral"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium text-veyra-aubergine">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="text-veyra-aubergine/60 hover:text-veyra-coral"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-veyra-champagne bg-veyra-porcelain-warm/50">
            <div className="flex justify-between items-center mb-4">
              <span className="text-body text-veyra-aubergine/70">Subtotal</span>
              <span className="text-heading font-serif text-veyra-aubergine">{priceFormatted(subtotal)}</span>
            </div>
            <p className="text-xs text-veyra-aubergine/50 mb-6">
              Shipping and taxes calculated at checkout.
            </p>
            <Link 
              href="/checkout"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center justify-center px-8 py-4 text-body font-medium rounded-sm text-white bg-veyra-aubergine hover:bg-veyra-obsidian transition-colors"
            >
              Checkout
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
