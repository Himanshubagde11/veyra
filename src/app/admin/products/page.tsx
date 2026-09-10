import { getAdminProducts } from "@/app/actions/adminActions";
import { formatCurrency } from "@/lib/utils/format";
import { Plus, MoreHorizontal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function AdminProductsPage() {
  const products = await getAdminProducts();

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-heading-md font-serif text-veyra-aubergine">Products</h1>
          <p className="text-body text-veyra-aubergine/60 mt-1">
            Manage your store's inventory and products.
          </p>
        </div>
        <Link href="/admin/products/new" className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-full text-white bg-veyra-aubergine hover:bg-veyra-obsidian transition-colors">
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-veyra-champagne shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-veyra-champagne bg-veyra-porcelain-warm text-xs uppercase tracking-wider text-veyra-aubergine/50">
                <th className="p-4 font-medium w-16">Image</th>
                <th className="p-4 font-medium">Product</th>
                <th className="p-4 font-medium">Category</th>
                <th className="p-4 font-medium text-right">Price</th>
                <th className="p-4 font-medium text-center">Stock</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium w-16"></th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((product) => (
                  <tr key={product.id} className="border-b border-veyra-champagne last:border-0 hover:bg-veyra-porcelain-warm/50 transition-colors group">
                    <td className="p-4">
                      <div className="w-10 h-10 rounded overflow-hidden bg-veyra-porcelain-warm relative">
                        {product.images[0]?.url && (
                          <img 
                            src={product.images[0].url} 
                            alt={product.name} 
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="font-medium text-veyra-aubergine">{product.name}</div>
                      <div className="text-xs text-veyra-aubergine/50 font-mono mt-0.5">{product.sku}</div>
                    </td>
                    <td className="p-4 text-sm text-veyra-aubergine">
                      {product.categories.map(c => c.category.name).join(", ") || "Uncategorized"}
                    </td>
                    <td className="p-4 text-sm font-medium text-veyra-aubergine text-right">
                      {formatCurrency(product.price)}
                    </td>
                    <td className="p-4 text-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        !product.inventory || product.inventory.stock === 0 
                          ? 'bg-red-100 text-red-800' 
                          : product.inventory.stock < 10 
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'
                      }`}>
                        {product.inventory?.stock || 0}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        product.isArchived 
                          ? 'bg-gray-100 text-gray-800' 
                          : product.isPublished
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {product.isArchived ? "Archived" : product.isPublished ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <Link href={`/admin/products/${product.id}`} className="text-veyra-aubergine/40 hover:text-veyra-coral transition-colors p-1 inline-block">
                        <MoreHorizontal className="w-5 h-5" />
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-veyra-aubergine/50 text-sm">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
