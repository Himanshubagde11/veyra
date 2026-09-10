import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/product/ProductCard";
import Link from "next/link";
import { Prisma } from "@prisma/client";

export const metadata = {
  title: "Search Results | VEYRA",
  description: "Search results for VEYRA products.",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  const query = typeof resolvedSearchParams.q === "string" ? resolvedSearchParams.q : "";

  // Perform search
  const products = await prisma.product.findMany({
    where: {
      isPublished: true,
      isArchived: false,
      OR: query
        ? [
            { name: { contains: query, mode: "insensitive" } },
            { description: { contains: query, mode: "insensitive" } },
          ]
        : undefined,
    },
    include: {
      images: { orderBy: { order: "asc" }, take: 2 },
      categories: { include: { category: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="bg-veyra-porcelain min-h-screen">
      {/* Header */}
      <div className="bg-veyra-champagne border-b border-veyra-champagne-deep">
        <div className="veyra-container py-12 md:py-20 text-center">
          <p className="text-overline text-veyra-coral mb-3">Search</p>
          <h1 className="text-display font-serif text-veyra-aubergine mb-3">
            {query ? `Results for "${query}"` : "Search"}
          </h1>
          <p className="text-body-lg text-veyra-aubergine/60 max-w-xl mx-auto">
            {query
              ? `We found ${products.length} ${products.length === 1 ? "piece" : "pieces"} matching your search.`
              : "Enter a search term to find products."}
          </p>
        </div>
      </div>

      <div className="veyra-container py-10 md:py-16">
        {products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <h2 className="text-display-sm font-serif text-veyra-aubergine mb-4">Nothing Found</h2>
            <p className="text-body-lg text-veyra-aubergine/60 max-w-md mb-8">
              We couldn't find any pieces matching "{query}". Try checking for spelling errors or searching for a different term.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/shop"
                className="px-8 py-3 rounded-full bg-veyra-aubergine text-white text-sm font-medium hover:bg-veyra-coral transition-colors"
              >
                Explore All Products
              </Link>
            </div>
            
            {/* Suggestions */}
            <div className="mt-12 pt-12 border-t border-veyra-aubergine/10 w-full max-w-2xl">
              <p className="text-sm font-medium text-veyra-aubergine uppercase tracking-wider mb-6">
                Popular Categories
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  href="/shop?category=ceramics"
                  className="px-6 py-2 rounded-full border border-veyra-champagne-deep text-veyra-aubergine hover:border-veyra-coral hover:text-veyra-coral transition-colors"
                >
                  Ceramics
                </Link>
                <Link
                  href="/shop?category=lighting"
                  className="px-6 py-2 rounded-full border border-veyra-champagne-deep text-veyra-aubergine hover:border-veyra-coral hover:text-veyra-coral transition-colors"
                >
                  Lighting
                </Link>
                <Link
                  href="/shop?category=furniture"
                  className="px-6 py-2 rounded-full border border-veyra-champagne-deep text-veyra-aubergine hover:border-veyra-coral hover:text-veyra-coral transition-colors"
                >
                  Furniture
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
