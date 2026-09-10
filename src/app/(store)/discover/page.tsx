"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, Zap, Heart, ShoppingBag, SkipForward } from "lucide-react";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

export default function DiscoverPage() {
  return (
    <div className="veyra-section">
      <div className="veyra-container">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-veyra-chartreuse" />
              <p className="text-overline text-veyra-coral">Signature Experience</p>
            </div>

            <h1 className="font-serif text-display-lg text-veyra-obsidian mb-4">
              VEYRA Discover
            </h1>

            <p className="text-body-lg text-veyra-aubergine/50 mb-10 max-w-lg mx-auto">
              A personalized way to find products you never knew you needed.
              Full experience coming in Phase 9.
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/">
                <Button variant="primary" size="lg" iconRight={<ArrowRight className="w-4 h-4" />}>
                  Back to Home
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
