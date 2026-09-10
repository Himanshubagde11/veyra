import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import { AddToCartForm } from "@/components/product/AddToCartForm";
import { ProductReviews } from "@/components/product/ProductReviews";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      images: {
        orderBy: { order: "asc" },
      },
      categories: {
        include: {
          category: true,
        },
      },
      inventory: true,
      reviews: {
        where: { isApproved: true },
        orderBy: { createdAt: "desc" },
        include: {
          user: {
            select: { name: true }
          }
        }
      }
    },
  });

  if (!product || !product.isPublished || product.isArchived) {
    notFound();
  }

  const priceFormatted = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(product.price / 100);

  const comparePriceFormatted = product.comparePrice
    ? new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }).format(product.comparePrice / 100)
    : null;

  const primaryCategory = product.categories[0]?.category?.name || "Uncategorized";
  const inStock = product.inventory ? product.inventory.stock > 0 : false;

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb / Back Navigation */}
      <div className="border-b border-veyra-champagne bg-white sticky top-0 z-40">
        <div className="veyra-container py-4 flex items-center justify-between">
          <Link href="/products" className="inline-flex items-center text-sm font-medium text-veyra-aubergine/60 hover:text-veyra-aubergine transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Collection
          </Link>
          <div className="text-xs uppercase tracking-widest text-veyra-aubergine/40 font-medium">
            {primaryCategory}
          </div>
        </div>
      </div>

      <div className="veyra-container py-16 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
          
          {/* Left Column: Image Gallery */}
          <div className="flex flex-col gap-6 lg:sticky lg:top-32 lg:h-[calc(100vh-10rem)]">
            {product.images.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:flex lg:flex-col lg:overflow-y-auto no-scrollbar lg:pr-6">
                {product.images.map((img, idx) => (
                  <div key={img.id} className="relative aspect-[4/5] bg-veyra-porcelain-warm rounded-2xl overflow-hidden">
                    <Image
                      src={img.url}
                      alt={img.alt || product.name}
                      fill
                      priority={idx === 0}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="relative aspect-[4/5] bg-veyra-porcelain-warm rounded-2xl flex items-center justify-center">
                <span className="text-veyra-aubergine/40 font-serif">No images available</span>
              </div>
            )}
          </div>

          {/* Right Column: Product Details */}
          <div className="flex flex-col">
            <h1 className="text-display-sm md:text-display-md font-serif text-veyra-aubergine mb-6">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-6 mb-12">
              <span className="text-2xl font-medium text-veyra-aubergine">{priceFormatted}</span>
              {comparePriceFormatted && (
                <span className="text-xl text-veyra-aubergine/40 line-through">{comparePriceFormatted}</span>
              )}
            </div>

            <div className="prose prose-veyra max-w-none mb-12 text-veyra-aubergine/80">
              <p className="whitespace-pre-wrap leading-relaxed">{product.description}</p>
            </div>

            {/* Inventory Status */}
            <div className="mb-10 flex items-center">
              {inStock ? (
                <div className="inline-flex items-center text-sm font-medium text-green-700 bg-green-50 px-3 py-1.5 rounded-full">
                  <Check className="w-4 h-4 mr-1.5" />
                  In Stock ({product.inventory?.stock} available)
                </div>
              ) : (
                <div className="inline-flex items-center text-sm font-medium text-veyra-coral bg-veyra-coral/10 px-3 py-1.5 rounded-full">
                  Out of Stock
                </div>
              )}
            </div>

            {/* Actions */}
            <AddToCartForm 
              product={{
                id: product.id,
                name: product.name,
                slug: product.slug,
                price: product.price,
                image: product.images[0]?.url || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=800&fit=crop",
              }}
              inStock={inStock}
            />

            {/* Additional Info Accordions (Static for now) */}
            <div className="mt-16 border-t border-veyra-champagne">
              <div className="py-6 border-b border-veyra-champagne">
                <h3 className="text-body font-serif text-veyra-aubergine mb-2">Details & Dimensions</h3>
                <p className="text-sm text-veyra-aubergine/70">
                  Carefully crafted with premium materials. Detailed specifications will be available soon.
                </p>
              </div>
              <div className="py-6 border-b border-veyra-champagne">
                <h3 className="text-body font-serif text-veyra-aubergine mb-2">Shipping & Returns</h3>
                <p className="text-sm text-veyra-aubergine/70">
                  We offer standard and expedited shipping. Returns are accepted within 30 days of delivery.
                </p>
              </div>
            </div>

            {/* Reviews Section */}
            <ProductReviews productId={product.id} reviews={product.reviews} />

          </div>
        </div>
      </div>
    </div>
  );
}
