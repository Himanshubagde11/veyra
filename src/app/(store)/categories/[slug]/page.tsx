import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/product/ProductCard";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  if (slug === "new-arrivals") {
    return { title: "New Arrivals | VEYRA", description: "The latest additions to our curated collection." };
  }

  const category = await prisma.category.findUnique({ where: { slug } });
  if (!category) return { title: "Category | VEYRA" };

  return {
    title: `${category.name} | VEYRA`,
    description: category.description || `Shop ${category.name} at VEYRA.`,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let products: any[] = [];
  let categoryName = "";
  let categoryDescription = "";

  if (slug === "new-arrivals") {
    categoryName = "New Arrivals";
    categoryDescription = "The latest additions to our curated collection.";
    products = await prisma.product.findMany({
      where: { isPublished: true, isArchived: false },
      include: {
        images: { orderBy: { order: "asc" }, take: 2 },
        categories: { include: { category: true } },
      },
      orderBy: { createdAt: "desc" },
      take: 24,
    });
  } else {
    const category = await prisma.category.findUnique({ where: { slug } });
    if (!category) notFound();

    categoryName = category.name;
    categoryDescription = category.description || `Browse our ${category.name} collection.`;

    products = await prisma.product.findMany({
      where: {
        categories: { some: { categoryId: category.id } },
        isPublished: true,
        isArchived: false,
      },
      include: {
        images: { orderBy: { order: "asc" }, take: 2 },
        categories: { include: { category: true } },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  return (
    <div className="bg-veyra-porcelain min-h-screen">
      {/* Header */}
      <div className="bg-veyra-champagne border-b border-veyra-champagne-deep">
        <div className="veyra-container py-12 md:py-20">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-veyra-aubergine/50 hover:text-veyra-coral transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Home
          </Link>
          <h1 className="text-display font-serif text-veyra-aubergine mb-3">
            {categoryName}
          </h1>
          <p className="text-body-lg text-veyra-aubergine/60 max-w-xl">
            {categoryDescription}
          </p>
          <p className="text-sm text-veyra-aubergine/40 mt-4">
            {products.length} {products.length === 1 ? "product" : "products"}
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="veyra-container py-10 md:py-16">
        {products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center bg-white rounded-2xl border border-veyra-champagne">
            <p className="text-body-lg text-veyra-aubergine/60 mb-4">
              No products found in this category yet.
            </p>
            <Link
              href="/"
              className="text-veyra-coral hover:underline font-medium"
            >
              Browse all products →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
