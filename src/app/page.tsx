import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/product/ProductCard";
import { HeroSection } from "@/components/home/HeroSection";
import { Marquee } from "@/components/ui/Marquee";

export default async function Home() {
  const newArrivals = await prisma.product.findMany({
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
    take: 4,
  });

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <HeroSection />
      <Marquee />
      <section id="new-arrivals" className="py-32 bg-white border-t border-veyra-champagne">
        <div className="veyra-container">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-heading-lg font-serif text-veyra-aubergine">New Arrivals</h2>
              <p className="mt-4 text-body text-veyra-aubergine/60 max-w-xl">The latest additions to our curated collection.</p>
            </div>
            <Link href="/shop" className="text-body-sm font-medium text-veyra-coral hover:text-veyra-coral-dark flex items-center transition-colors">
              View all <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 gap-y-16">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-32 bg-veyra-porcelain-warm border-t border-veyra-champagne">
        <div className="veyra-container">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-heading-lg font-serif text-veyra-aubergine">Featured Collections</h2>
              <p className="mt-4 text-body text-veyra-aubergine/60 max-w-xl">Explore our curated categories</p>
            </div>
            <Link href="/shop" className="text-body-sm font-medium text-veyra-coral hover:text-veyra-coral-dark flex items-center transition-colors">
              View all <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: "Living", subtitle: "Elevate your space", image: "/_assets/category_living.jpg", link: "/shop?category=living" },
              { title: "Objects", subtitle: "Form meets function", image: "/_assets/category_objects.jpg", link: "/shop?category=objects" },
              { title: "Apparel", subtitle: "Effortless style", image: "/_assets/category_apparel.jpg", link: "/shop?category=apparel" },
            ].map((cat, i) => (
              <Link key={cat.title} href={cat.link} className="group block">
                <div className={`aspect-[4/5] bg-veyra-champagne rounded-2xl overflow-hidden relative transition-transform duration-500 group-hover:-translate-y-2 shadow-sm group-hover:shadow-xl`}>
                  <Image 
                    src={cat.image} 
                    alt={cat.title} 
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-10 flex flex-col justify-end h-1/2 z-20">
                    <h3 className="text-heading font-serif text-white">{cat.title}</h3>
                    <p className="text-white/90 mt-3 font-medium tracking-wide">{cat.subtitle}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
