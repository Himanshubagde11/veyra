import { prisma } from "@/lib/prisma";
import { createCategory, deleteCategory } from "./actions";
import { Trash2 } from "lucide-react";

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif text-veyra-aubergine">Categories</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-xl border border-veyra-champagne shadow-sm">
            <h2 className="text-lg font-bold text-veyra-aubergine mb-4">Add Category</h2>
            <form action={async (formData) => {
              "use server";
              await createCategory(formData);
            }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-veyra-aubergine/80 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full px-4 py-2 border border-veyra-champagne rounded-lg focus:ring-1 focus:ring-veyra-coral focus:border-veyra-coral outline-none transition-all text-sm"
                  placeholder="e.g. Living Room"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-veyra-aubergine/80 mb-1">
                  Slug
                </label>
                <input
                  type="text"
                  name="slug"
                  required
                  className="w-full px-4 py-2 border border-veyra-champagne rounded-lg focus:ring-1 focus:ring-veyra-coral focus:border-veyra-coral outline-none transition-all text-sm"
                  placeholder="e.g. living-room"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-veyra-aubergine/80 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  rows={3}
                  className="w-full px-4 py-2 border border-veyra-champagne rounded-lg focus:ring-1 focus:ring-veyra-coral focus:border-veyra-coral outline-none transition-all text-sm resize-none"
                  placeholder="Optional description"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-veyra-aubergine text-white py-2.5 rounded-lg text-sm font-medium hover:bg-veyra-coral transition-colors"
              >
                Add Category
              </button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-veyra-champagne shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-veyra-porcelain-warm border-b border-veyra-champagne">
                  <th className="px-6 py-4 text-xs font-bold text-veyra-aubergine/60 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-4 text-xs font-bold text-veyra-aubergine/60 uppercase tracking-wider">Slug</th>
                  <th className="px-6 py-4 text-xs font-bold text-veyra-aubergine/60 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-veyra-champagne">
                {categories.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-6 py-8 text-center text-veyra-aubergine/50">
                      No categories found. Create one to get started.
                    </td>
                  </tr>
                ) : (
                  categories.map((category) => (
                    <tr key={category.id} className="hover:bg-veyra-porcelain-warm/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium text-veyra-aubergine">{category.name}</div>
                        {category.description && (
                          <div className="text-xs text-veyra-aubergine/60 mt-1 line-clamp-1">{category.description}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-veyra-aubergine/80">{category.slug}</td>
                      <td className="px-6 py-4 text-right">
                        <form action={async () => {
                          "use server";
                          await deleteCategory(category.id);
                        }}>
                          <button type="submit" className="text-red-500 hover:text-red-700 transition-colors p-2 rounded-md hover:bg-red-50">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </form>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
