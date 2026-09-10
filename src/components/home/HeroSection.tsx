"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

export function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  // Parallax effect for the background image
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <section ref={ref} className="relative flex items-center justify-center overflow-hidden h-[85vh] min-h-[400px] md:min-h-[600px]">
      {/* Hero Background Image with Parallax */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y: backgroundY }}
      >
        <Image 
          src="/_assets/hero_banner.jpg" 
          alt="VEYRA Luxury Technology" 
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
      </motion.div>

      <motion.div 
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="relative z-10 veyra-container text-center flex flex-col items-center pt-20 md:pt-32"
      >
        <motion.span 
          variants={fadeUp} custom={0}
          className="inline-block py-2 px-6 rounded-full bg-white/10 backdrop-blur-md text-white text-[10px] md:text-xs uppercase tracking-[0.2em] font-medium mb-6 md:mb-8 border border-white/20"
        >
          Curated For The Extraordinary
        </motion.span>
        
        <motion.h1 
          variants={fadeUp} custom={1}
          className="text-display-lg md:text-display-xl font-serif text-white max-w-5xl mx-auto drop-shadow-lg leading-[1.1]"
        >
          Discover Beyond <br className="md:hidden" /><span className="italic font-light text-veyra-champagne">Ordinary.</span>
        </motion.h1>
        
        <motion.p 
          variants={fadeUp} custom={2}
          className="mt-6 md:mt-10 text-sm md:text-lg text-white/90 max-w-2xl mx-auto drop-shadow-md px-4"
        >
          VEYRA is a modern curated marketplace focused on discovering interesting, useful, stylish and distinctive objects designed to stand apart.
        </motion.p>
        
        <motion.div 
          variants={fadeUp} custom={3}
          className="mt-10 md:mt-16 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center w-full sm:w-auto px-4"
        >
          <Link 
            href="/shop" 
            className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 sm:px-12 sm:py-5 min-h-[56px] sm:min-h-[64px] text-sm sm:text-base font-medium rounded-full text-veyra-aubergine bg-white hover:bg-veyra-champagne transition-all duration-300 shadow-lg"
          >
            Shop Collection
          </Link>
          <Link 
            href="#new-arrivals" 
            className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 sm:px-12 sm:py-5 min-h-[56px] sm:min-h-[64px] text-sm sm:text-base font-medium rounded-full text-white bg-transparent border border-white/30 hover:border-white hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
          >
            New Arrivals <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
