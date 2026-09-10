import { prisma } from "@/lib/prisma";
import { ProductForm } from "../components/ProductForm";

export default async function NewProductPage() {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-serif text-veyra-aubergine">Add New Product</h1>
        <p className="text-veyra-aubergine/60 mt-2 text-sm">Create a new product for your catalog.</p>
      </div>

      <ProductForm categories={categories} />
    </div>
  );
}
