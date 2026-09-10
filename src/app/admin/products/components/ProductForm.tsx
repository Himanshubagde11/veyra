"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProduct, updateProduct, uploadImage } from "../actions";

export function ProductForm({ 
  product = null, 
  categories 
}: { 
  product?: any, 
  categories: any[] 
}) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [imageUrl, setImageUrl] = useState(product?.images?.[0]?.url || "");
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    formData.set("imageUrl", imageUrl); // Append image URL from state
    
    // Price from form is in float (e.g. 199.99). We need to convert it to cents.
    const priceFloat = parseFloat(formData.get("price") as string);
    formData.set("price", Math.round(priceFloat * 100).toString());
    
    const comparePriceStr = formData.get("comparePrice") as string;
    if (comparePriceStr) {
      const comparePriceFloat = parseFloat(comparePriceStr);
      formData.set("comparePrice", Math.round(comparePriceFloat * 100).toString());
    }

    const stockStr = formData.get("stock") as string;
    if (stockStr) {
      formData.set("stock", parseInt(stockStr, 10).toString());
    }

    // Pass checkbox state
    formData.set("isPublished", formData.get("isPublished") === "on" ? "true" : "false");

    const result = product 
      ? await updateProduct(product.id, formData)
      : await createProduct(formData);

    if (result.error) {
      setError(result.error);
      setIsSubmitting(false);
    } else {
      router.push("/admin/products");
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    const result = await uploadImage(formData);
    if (result.url) {
      setImageUrl(result.url);
    } else {
      alert("Failed to upload image");
    }
    setUploading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <div className="bg-white p-6 rounded-xl border border-veyra-champagne shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-veyra-aubergine">Basic Information</h2>
            
            <div>
              <label className="block text-sm font-medium text-veyra-aubergine/80 mb-1">Product Name</label>
              <input
                type="text"
                name="name"
                defaultValue={product?.name}
                required
                className="w-full px-4 py-2 border border-veyra-champagne rounded-lg focus:ring-1 focus:ring-veyra-coral focus:border-veyra-coral outline-none text-sm"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-veyra-aubergine/80 mb-1">Slug</label>
                <input
                  type="text"
                  name="slug"
                  defaultValue={product?.slug}
                  required
                  className="w-full px-4 py-2 border border-veyra-champagne rounded-lg focus:ring-1 focus:ring-veyra-coral focus:border-veyra-coral outline-none text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-veyra-aubergine/80 mb-1">SKU</label>
                <input
                  type="text"
                  name="sku"
                  defaultValue={product?.sku}
                  required
                  className="w-full px-4 py-2 border border-veyra-champagne rounded-lg focus:ring-1 focus:ring-veyra-coral focus:border-veyra-coral outline-none text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-veyra-aubergine/80 mb-1">Description</label>
              <textarea
                name="description"
                rows={6}
                defaultValue={product?.description}
                className="w-full px-4 py-2 border border-veyra-champagne rounded-lg focus:ring-1 focus:ring-veyra-coral focus:border-veyra-coral outline-none text-sm resize-none"
              />
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-white p-6 rounded-xl border border-veyra-champagne shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-veyra-aubergine">Pricing</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-veyra-aubergine/80 mb-1">Price (₹)</label>
                <input
                  type="number"
                  step="0.01"
                  name="price"
                  defaultValue={product ? (product.price / 100).toFixed(2) : ""}
                  required
                  className="w-full px-4 py-2 border border-veyra-champagne rounded-lg focus:ring-1 focus:ring-veyra-coral focus:border-veyra-coral outline-none text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-veyra-aubergine/80 mb-1">Compare at Price (₹)</label>
                <input
                  type="number"
                  step="0.01"
                  name="comparePrice"
                  defaultValue={product?.comparePrice ? (product.comparePrice / 100).toFixed(2) : ""}
                  className="w-full px-4 py-2 border border-veyra-champagne rounded-lg focus:ring-1 focus:ring-veyra-coral focus:border-veyra-coral outline-none text-sm"
                />
              </div>
            </div>
            
            <div className="pt-4 border-t border-veyra-champagne mt-4">
              <label className="block text-sm font-medium text-veyra-aubergine/80 mb-1">Stock Quantity</label>
              <input
                type="number"
                name="stock"
                defaultValue={product?.inventory?.stock || 0}
                required
                min="0"
                className="w-full px-4 py-2 border border-veyra-champagne rounded-lg focus:ring-1 focus:ring-veyra-coral focus:border-veyra-coral outline-none text-sm"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Organization */}
          <div className="bg-white p-6 rounded-xl border border-veyra-champagne shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-veyra-aubergine">Organization</h2>
            
            <div>
              <label className="block text-sm font-medium text-veyra-aubergine/80 mb-1">Categories</label>
              <select
                name="categories"
                multiple
                defaultValue={product?.categories?.map((c: any) => c.categoryId) || []}
                className="w-full px-4 py-2 border border-veyra-champagne rounded-lg focus:ring-1 focus:ring-veyra-coral focus:border-veyra-coral outline-none text-sm min-h-[120px]"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
              <p className="text-xs text-veyra-aubergine/50 mt-1">Hold Ctrl/Cmd to select multiple</p>
            </div>
          </div>

          {/* Image */}
          <div className="bg-white p-6 rounded-xl border border-veyra-champagne shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-veyra-aubergine">Product Image</h2>
            
            {imageUrl ? (
              <div className="relative rounded-lg overflow-hidden border border-veyra-champagne">
                <img src={imageUrl} alt="Product" className="w-full h-48 object-cover" />
                <button
                  type="button"
                  onClick={() => setImageUrl("")}
                  className="absolute top-2 right-2 bg-white text-red-500 p-1.5 rounded-full shadow-sm hover:bg-red-50"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                </button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-veyra-champagne rounded-lg p-6 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer text-sm font-medium text-veyra-coral hover:text-veyra-aubergine transition-colors flex flex-col items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-2 text-veyra-aubergine/40"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
                  {uploading ? "Uploading..." : "Click to upload image"}
                </label>
              </div>
            )}
          </div>

          {/* Visibility */}
          <div className="bg-white p-6 rounded-xl border border-veyra-champagne shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-veyra-aubergine">Visibility</h2>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                name="isPublished"
                defaultChecked={product ? product.isPublished : true}
                className="w-5 h-5 rounded border-veyra-champagne text-veyra-coral focus:ring-veyra-coral"
              />
              <span className="text-sm font-medium text-veyra-aubergine">Published</span>
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4 border-t border-veyra-champagne pt-6">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2.5 border border-veyra-champagne text-veyra-aubergine rounded-lg text-sm font-medium hover:bg-veyra-porcelain transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting || uploading}
          className="px-6 py-2.5 bg-veyra-aubergine text-white rounded-lg text-sm font-medium hover:bg-veyra-coral transition-colors disabled:opacity-50"
        >
          {isSubmitting ? "Saving..." : "Save Product"}
        </button>
      </div>
    </form>
  );
}
