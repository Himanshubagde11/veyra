"use client";

import { useState } from "react";
import { ShoppingBag, Check, Loader2 } from "lucide-react";

export function AddToCartButton({ productId, disabled }: { productId: string; disabled?: boolean }) {
  const [state, setState] = useState<"idle" | "loading" | "added">("idle");

  const handleClick = async () => {
    setState("loading");
    // Simulate add to cart — will integrate with real cart logic
    await new Promise((r) => setTimeout(r, 800));
    setState("added");
    setTimeout(() => setState("idle"), 2000);
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled || state === "loading"}
      className={`flex-1 flex items-center justify-center gap-2 py-4 px-8 rounded-full font-medium text-body transition-all duration-300 ${
        state === "added"
          ? "bg-green-600 text-white"
          : disabled
          ? "bg-veyra-champagne text-veyra-aubergine/30 cursor-not-allowed"
          : "bg-veyra-aubergine text-white hover:bg-veyra-obsidian active:scale-[0.98]"
      }`}
    >
      {state === "loading" ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          Adding...
        </>
      ) : state === "added" ? (
        <>
          <Check className="w-5 h-5" />
          Added to Cart
        </>
      ) : (
        <>
          <ShoppingBag className="w-5 h-5" />
          {disabled ? "Out of Stock" : "Add to Cart"}
        </>
      )}
    </button>
  );
}
