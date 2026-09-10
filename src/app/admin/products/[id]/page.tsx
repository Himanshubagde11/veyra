import { prisma } from "@/lib/prisma";
import { ProductForm } from "../components/ProductForm";
import { notFound } from "next/navigation";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const [product, categories] = await Promise.all([
    prisma.product.findUnique({
      where: { id: resolvedParams.id },
      include: {
        categories: true,
        images: {
          orderBy: { order: "asc" },
        },
      },
    }),
    prisma.category.findMany({
      orderBy: { name: "asc" },
    }),
  ]);

  if (!product) {
    notFound();
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-serif text-veyra-aubergine">Edit Product</h1>
        <p className="text-veyra-aubergine/60 mt-2 text-sm">Update the details of this product.</p>
      </div>

      <ProductForm product={product} categories={categories} />
    </div>
  );
}
