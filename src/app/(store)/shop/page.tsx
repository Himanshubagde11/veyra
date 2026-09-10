import { prisma } from "@/lib/prisma";
import { AnimatedProductGrid } from "@/components/shop/AnimatedProductGrid";
import { ShopFilters } from "@/components/shop/ShopFilters";
import { Prisma } from "@prisma/client";
import { Suspense } from "react";

export const metadata = {
  title: "Shop All | VEYRA",
  description: "Browse our complete collection of curated products at VEYRA.",
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // Await search params for Next 15+ 
  const resolvedSearchParams = await searchParams;
  const categoryParam = typeof resolvedSearchParams.category === "string" ? resolvedSearchParams.category : undefined;
  const priceParam = typeof resolvedSearchParams.price === "string" ? resolvedSearchParams.price : undefined;
  const sortParam = typeof resolvedSearchParams.sort === "string" ? resolvedSearchParams.sort : "newest";

  // Build Prisma Where clause
  const whereClause: Prisma.ProductWhereInput = {
    isPublished: true,
    isArchived: false,
  };

  if (categoryParam) {
    whereClause.categories = {
      some: {
        category: {
          slug: categoryParam,
        },
      },
    };
  }

  if (priceParam) {
    if (priceParam === "under-5000") {
      whereClause.price = { lt: 500000 }; // 5000 INR = 500000 paise
    } else if (priceParam === "5000-10000") {
      whereClause.price = { gte: 500000, lte: 1000000 };
    } else if (priceParam === "over-10000") {
      whereClause.price = { gt: 1000000 };
    }
  }

  // Build Prisma OrderBy clause
  let orderByClause: Prisma.ProductOrderByWithRelationInput = { createdAt: "desc" };
  if (sortParam === "price-asc") {
    orderByClause = { price: "asc" };
  } else if (sortParam === "price-desc") {
    orderByClause = { price: "desc" };
  }

  const [products, categories] = await Promise.all([
    prisma.product.findMany({
      where: whereClause,
      include: {
        images: { orderBy: { order: "asc" }, take: 2 },
        categories: { include: { category: true } },
      },
      orderBy: orderByClause,
    }),
    prisma.category.findMany({
      orderBy: { name: "asc" },
      include: {
        _count: { select: { products: true } },
      },
    }),
  ]);

  return (
    <div className="bg-veyra-porcelain min-h-screen">
      {/* Header */}
      <div className="bg-veyra-champagne border-b border-veyra-champagne-deep">
        <div className="veyra-container py-16 md:py-28">
          <p className="text-overline text-veyra-coral mb-4">Collection</p>
          <h1 className="text-display font-serif text-veyra-aubergine mb-4">
            {categoryParam ? categories.find((c) => c.slug === categoryParam)?.name || "All Products" : "All Products"}
          </h1>
          <p className="text-body-lg text-veyra-aubergine/60 max-w-xl">
            Every piece in our curated collection — designed with intention, built to last.
          </p>
        </div>
      </div>

      <div className="veyra-container py-20 md:py-32">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Sidebar */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <Suspense fallback={<div className="h-full w-full animate-pulse bg-veyra-champagne rounded-lg"></div>}>
              <ShopFilters categories={categories} />
            </Suspense>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="mb-8 text-sm text-veyra-aubergine/60 font-medium tracking-wide">
              Showing {products.length} {products.length === 1 ? "result" : "results"}
            </div>
            
            <AnimatedProductGrid products={products} />
          </div>
        </div>
      </div>
    </div>
  );
}
