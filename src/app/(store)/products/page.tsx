import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/product/ProductCard";

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    where: {
      isPublished: true,
      isArchived: false,
    },
    include: {
      images: {
        orderBy: { order: "asc" },
      },
      categories: {
        include: {
          category: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="pt-24 pb-32">
      <div className="veyra-container">
        <div className="mb-12">
          <h1 className="text-display-md font-serif text-veyra-aubergine mb-4">
            The Collection
          </h1>
          <p className="text-body-lg text-veyra-aubergine/70 max-w-2xl">
            A curated selection of extraordinary objects designed to elevate your everyday.
          </p>
        </div>

        {products.length === 0 ? (
          <div className="py-24 text-center">
            <h2 className="text-xl font-serif text-veyra-aubergine mb-2">No products found</h2>
            <p className="text-veyra-aubergine/60">We are currently updating our catalog. Please check back later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 gap-y-12">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
