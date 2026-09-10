import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/product/ProductCard";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { HeroSection } from "@/components/home/HeroSection";
import { DiscoverSection } from "@/components/home/DiscoverSection";

export const metadata = {
  title: "VEYRA — Things Worth Finding",
  description: "Curated objects, unexpected essentials and everyday pieces designed to stand apart.",
};

export default async function HomePage() {
  const [newArrivals, categories, trendingProducts] = await Promise.all([
    prisma.product.findMany({
      where: { isPublished: true, isArchived: false },
      include: {
        images: { orderBy: { order: "asc" }, take: 2 },
        categories: { include: { category: true } },
      },
      orderBy: { createdAt: "desc" },
      take: 8,
    }),
    prisma.category.findMany({
      orderBy: { name: "asc" },
      include: {
        _count: { select: { products: true } },
      },
    }),
    // "Trending" = products with a compare price (on sale) or highest priced
    prisma.product.findMany({
      where: { isPublished: true, isArchived: false },
      include: {
        images: { orderBy: { order: "asc" }, take: 1 },
        categories: { include: { category: true } },
      },
      orderBy: { price: "desc" },
      take: 3,
    }),
  ]);

  return (
    <>
      {/* ─── HERO ─── */}
      <HeroSection />

      {/* ─── CATEGORIES ─── */}
      <section className="py-16 md:py-24 bg-veyra-porcelain">
        <div className="veyra-container">
          <div className="flex items-end justify-between mb-10 md:mb-14">
            <div>
              <p className="text-overline text-veyra-coral mb-3">Browse</p>
              <h2 className="font-serif text-display text-veyra-obsidian">
                Explore Categories
              </h2>
            </div>
            <Link
              href="/shop"
              className="hidden md:flex items-center gap-1.5 text-body-sm font-medium text-veyra-aubergine/60 hover:text-veyra-coral transition-colors"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {categories.map((cat, i) => (
              <Link
                key={cat.id}
                href={`/categories/${cat.slug}`}
                className="group block relative overflow-hidden rounded-2xl"
              >
                <div className={`relative ${i === 0 ? "aspect-[3/4]" : "aspect-[3/4]"}`}>
                  <img
                    src={cat.image || "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&h=700&fit=crop"}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-veyra-obsidian/70 via-veyra-obsidian/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                    <h3 className="font-serif text-heading text-white mb-1">
                      {cat.name}
                    </h3>
                    <p className="text-caption text-white/60">
                      {cat._count.products} {cat._count.products === 1 ? "product" : "products"}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── NEW ARRIVALS ─── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="veyra-container">
          <div className="flex items-end justify-between mb-10 md:mb-14">
            <div>
              <p className="text-overline text-veyra-coral mb-3">Just In</p>
              <h2 className="font-serif text-display text-veyra-obsidian">
                New Arrivals
              </h2>
            </div>
            <Link
              href="/categories/new-arrivals"
              className="hidden md:flex items-center gap-1.5 text-body-sm font-medium text-veyra-aubergine/60 hover:text-veyra-coral transition-colors"
            >
              See All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── DISCOVER TEASER ─── */}
      <DiscoverSection />

      {/* ─── TRENDING ─── */}
      <section className="py-16 md:py-24 bg-veyra-porcelain">
        <div className="veyra-container">
          <div className="flex items-end justify-between mb-10 md:mb-14">
            <div>
              <p className="text-overline text-veyra-coral mb-3">Popular Now</p>
              <h2 className="font-serif text-display text-veyra-obsidian">
                Trending This Week
              </h2>
            </div>
            <Link
              href="/shop"
              className="hidden md:flex items-center gap-1.5 text-body-sm font-medium text-veyra-aubergine/60 hover:text-veyra-coral transition-colors"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {trendingProducts.map((product) => {
              const categoryName = product.categories?.[0]?.category?.name || "";
              return (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  className="group block relative overflow-hidden rounded-2xl"
                >
                  <div className="relative aspect-[3/4]">
                    <img
                      src={product.images[0]?.url || ""}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-veyra-obsidian/70 via-transparent to-transparent" />

                    {categoryName && (
                      <div className="absolute top-4 left-4">
                        <span className="inline-flex items-center px-3 py-1 bg-veyra-chartreuse text-veyra-obsidian text-overline font-semibold rounded-full">
                          {categoryName}
                        </span>
                      </div>
                    )}

                    <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                      <h3 className="font-serif text-heading text-white mb-2">
                        {product.name}
                      </h3>
                      <span className="text-price text-white">
                        {new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(product.price / 100)}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── EDITORIAL ─── */}
      <section className="py-16 md:py-24 bg-veyra-champagne overflow-hidden">
        <div className="veyra-container">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-overline text-veyra-coral mb-6">Our Philosophy</p>
            <h2 className="font-serif text-display-lg text-veyra-obsidian mb-8">
              Not everything needs<br />to be for everyone.
            </h2>
            <p className="text-body-lg text-veyra-aubergine/50 mb-10 max-w-2xl mx-auto">
              VEYRA exists for the ones who notice details. We curate products that are
              interesting, useful, and designed with intention — objects that earn their place
              in your daily life.
            </p>
          </div>
        </div>
      </section>

      {/* ─── VALUE PROPS ─── */}
      <section className="py-12 md:py-16 bg-white border-t border-veyra-aubergine/5">
        <div className="veyra-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { icon: "✦", title: "Curated Selection", desc: "Every product is hand-picked for quality and design" },
              { icon: "◇", title: "Free Shipping", desc: "Complimentary delivery on orders above ₹2,999" },
              { icon: "↻", title: "Easy Returns", desc: "30-day hassle-free returns on all products" },
              { icon: "◈", title: "Secure Payments", desc: "100% secure checkout with multiple payment options" },
            ].map((prop) => (
              <div key={prop.title} className="text-center md:text-left">
                <span className="text-2xl mb-3 block">{prop.icon}</span>
                <h3 className="text-heading-sm text-veyra-obsidian mb-1.5">{prop.title}</h3>
                <p className="text-body-sm text-veyra-aubergine/50">{prop.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
