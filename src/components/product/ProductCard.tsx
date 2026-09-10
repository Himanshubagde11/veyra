import Link from "next/link";
import Image from "next/image";
import { WishlistButton } from "@/components/wishlist/WishlistButton";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    comparePrice: number | null;
    images: { url: string; alt: string | null }[];
    categories?: { category: { name: string } }[];
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const primaryImage = product.images?.[0]?.url || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop";
  const hoverImage = product.images?.[1]?.url || primaryImage;
  const categoryName = product.categories?.[0]?.category?.name || "";

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

  const discount = product.comparePrice
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : null;

  const wishlistItem = {
    id: product.id,
    name: product.name,
    slug: product.slug,
    price: product.price,
    image: primaryImage,
  };

  return (
    <div className="group block">
      <div className="relative">
        <Link href={`/products/${product.slug}`} className="block">
          <div className="relative aspect-[3/4] bg-veyra-porcelain-warm overflow-hidden rounded-2xl mb-3">
            {/* Primary Image */}
            <Image
              src={primaryImage}
              alt={product.images[0]?.alt || product.name}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              className="object-cover transition-all duration-700 ease-in-out group-hover:opacity-0 group-hover:scale-105"
            />
            {/* Hover Image */}
            <Image
              src={hoverImage}
              alt={product.images[1]?.alt || product.name}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              className="object-cover opacity-0 transition-all duration-700 ease-in-out group-hover:opacity-100 group-hover:scale-105"
            />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
              {discount && discount > 0 && (
                <span className="bg-veyra-coral text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
                  -{discount}%
                </span>
              )}
            </div>
          </div>
        </Link>
        
        {/* Wishlist Button */}
        <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <WishlistButton product={wishlistItem} />
        </div>
      </div>

      <div className="flex flex-col px-0.5">
        {categoryName && (
          <div className="text-[11px] font-medium text-veyra-aubergine/40 uppercase tracking-widest mb-1">
            {categoryName}
          </div>
        )}
        <Link href={`/products/${product.slug}`} className="group-hover:text-veyra-coral transition-colors">
          <h3 className="text-body-sm font-serif text-veyra-aubergine line-clamp-1">{product.name}</h3>
        </Link>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-sm font-medium text-veyra-aubergine">{priceFormatted}</span>
          {comparePriceFormatted && (
            <span className="text-sm text-veyra-aubergine/35 line-through">{comparePriceFormatted}</span>
          )}
        </div>
      </div>
    </div>
  );
}
