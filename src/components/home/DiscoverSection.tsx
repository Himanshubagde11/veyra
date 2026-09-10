"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles, Zap, Heart, ShoppingBag } from "lucide-react";
import Button from "@/components/ui/Button";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

export function DiscoverSection() {
  return (
    <section className="py-16 md:py-24 bg-veyra-aubergine text-white overflow-hidden">
      <div className="veyra-container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          {/* Left: Content */}
          <div>
            <motion.div variants={fadeUp} className="flex items-center gap-2 mb-6">
              <Sparkles className="w-4 h-4 text-veyra-chartreuse" />
              <p className="text-overline text-veyra-chartreuse">
                Signature Experience
              </p>
            </motion.div>

            <motion.h2 variants={fadeUp} className="font-serif text-display-lg text-white mb-6">
              VEYRA<br />Discover
            </motion.h2>

            <motion.p variants={fadeUp} className="text-body-lg text-white/50 mb-8 max-w-md">
              A new way to find products you never knew you needed.
              Like, save, skip — we learn what you love and show you more of it.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
              <Link href="/discover">
                <Button variant="chartreuse" size="lg" icon={<Sparkles className="w-4 h-4" />}>
                  Start Discovering
                </Button>
              </Link>
              <Link href="/discover">
                <Button variant="ghost" size="lg" className="text-white/70 hover:text-white hover:bg-white/10">
                  <Zap className="w-4 h-4" />
                  Surprise Me
                </Button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div variants={fadeUp} className="flex gap-10 mt-12 pt-8 border-t border-white/10">
              {[
                { value: "50K+", label: "Products Discovered" },
                { value: "12K+", label: "Active Users" },
                { value: "4.9", label: "Avg. Rating" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-serif text-heading-lg text-veyra-chartreuse">{stat.value}</p>
                  <p className="text-caption text-white/40 mt-1">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Preview cards stack */}
          <motion.div
            variants={fadeUp}
            className="relative hidden lg:flex items-center justify-center"
          >
            <div className="relative w-72 h-96">
              {[2, 1, 0].map((offset) => (
                <div
                  key={offset}
                  className="absolute inset-0 bg-white/10 rounded-2xl border border-white/10 backdrop-blur-sm"
                  style={{
                    transform: `translateX(${offset * 16}px) translateY(${offset * -12}px) rotate(${offset * -3}deg)`,
                    zIndex: 3 - offset,
                    opacity: 1 - offset * 0.2,
                  }}
                >
                  {offset === 0 && (
                    <div className="p-4 h-full flex flex-col">
                      <div className="flex-1 rounded-xl overflow-hidden mb-3">
                        <img
                          src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=500&fit=crop"
                          alt="Product preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-body-sm font-medium text-white">Solis Minimal Watch</p>
                        <p className="text-caption text-white/50">₹7,990</p>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <button className="flex-1 py-2 bg-veyra-coral rounded-lg text-caption font-medium text-white flex items-center justify-center gap-1">
                          <Heart className="w-3.5 h-3.5" /> Like
                        </button>
                        <button className="flex-1 py-2 bg-white/10 rounded-lg text-caption font-medium text-white flex items-center justify-center gap-1">
                          <ShoppingBag className="w-3.5 h-3.5" /> Add
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
