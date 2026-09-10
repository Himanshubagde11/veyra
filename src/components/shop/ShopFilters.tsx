"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { Check, ChevronDown } from "lucide-react";

export function ShopFilters({ categories }: { categories: any[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get("category");
  const currentPrice = searchParams.get("price");
  const currentSort = searchParams.get("sort") || "newest";

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      return params.toString();
    },
    [searchParams]
  );

  return (
    <div className="space-y-8">
      {/* Category Filter */}
      <div>
        <h3 className="text-sm font-medium text-veyra-aubergine uppercase tracking-wider mb-4">Category</h3>
        <div className="space-y-2">
          <button
            onClick={() => router.push(`/shop?${createQueryString("category", "")}`)}
            className={`block text-sm transition-colors ${!currentCategory ? "text-veyra-coral font-medium" : "text-veyra-aubergine/60 hover:text-veyra-aubergine"}`}
          >
            All Products
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => router.push(`/shop?${createQueryString("category", cat.slug)}`)}
              className={`block text-sm transition-colors ${currentCategory === cat.slug ? "text-veyra-coral font-medium" : "text-veyra-aubergine/60 hover:text-veyra-aubergine"}`}
            >
              {cat.name} ({cat._count.products})
            </button>
          ))}
        </div>
      </div>

      {/* Price Filter */}
      <div>
        <h3 className="text-sm font-medium text-veyra-aubergine uppercase tracking-wider mb-4">Price</h3>
        <div className="space-y-2">
          <button
            onClick={() => router.push(`/shop?${createQueryString("price", "")}`)}
            className={`block text-sm transition-colors ${!currentPrice ? "text-veyra-coral font-medium" : "text-veyra-aubergine/60 hover:text-veyra-aubergine"}`}
          >
            All Prices
          </button>
          <button
            onClick={() => router.push(`/shop?${createQueryString("price", "under-5000")}`)}
            className={`block text-sm transition-colors ${currentPrice === "under-5000" ? "text-veyra-coral font-medium" : "text-veyra-aubergine/60 hover:text-veyra-aubergine"}`}
          >
            Under ₹5,000
          </button>
          <button
            onClick={() => router.push(`/shop?${createQueryString("price", "5000-10000")}`)}
            className={`block text-sm transition-colors ${currentPrice === "5000-10000" ? "text-veyra-coral font-medium" : "text-veyra-aubergine/60 hover:text-veyra-aubergine"}`}
          >
            ₹5,000 - ₹10,000
          </button>
          <button
            onClick={() => router.push(`/shop?${createQueryString("price", "over-10000")}`)}
            className={`block text-sm transition-colors ${currentPrice === "over-10000" ? "text-veyra-coral font-medium" : "text-veyra-aubergine/60 hover:text-veyra-aubergine"}`}
          >
            Over ₹10,000
          </button>
        </div>
      </div>

      {/* Sort By */}
      <div>
        <h3 className="text-sm font-medium text-veyra-aubergine uppercase tracking-wider mb-4">Sort By</h3>
        <div className="relative">
          <select
            value={currentSort}
            onChange={(e) => router.push(`/shop?${createQueryString("sort", e.target.value)}`)}
            className="w-full appearance-none bg-veyra-porcelain-warm border border-veyra-champagne text-veyra-aubergine text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-veyra-coral focus:border-veyra-coral cursor-pointer"
          >
            <option value="newest">Newest Arrivals</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-veyra-aubergine/50 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
