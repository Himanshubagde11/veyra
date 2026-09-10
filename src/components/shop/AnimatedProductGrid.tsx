"use client";

import { motion, Variants } from "framer-motion";
import { ProductCard } from "@/components/product/ProductCard";

interface ProductType {
  id: string;
  name: string;
  slug: string;
  price: number;
  comparePrice: number | null;
  images: { url: string; alt: string | null }[];
  categories?: { category: { name: string } }[];
}

interface AnimatedProductGridProps {
  products: ProductType[];
}

export function AnimatedProductGrid({ products }: AnimatedProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-body-lg text-veyra-aubergine mb-2">No products found</p>
        <p className="text-sm text-veyra-aubergine/60 max-w-md">
          We couldn't find anything matching your current filters. Try adjusting them or clearing some selections.
        </p>
      </div>
    );
  }

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    },
  };

  return (
    <motion.div 
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-10"
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
    >
      {products.map((product) => (
        <motion.div key={product.id} variants={itemVariants}>
          <ProductCard product={product as any} />
        </motion.div>
      ))}
    </motion.div>
  );
}
