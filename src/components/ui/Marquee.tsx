"use client";

import { motion } from "framer-motion";

const textList = [
  "FREE WORLDWIDE SHIPPING",
  "CURATED FOR THE EXTRAORDINARY",
  "UNCOMPROMISING QUALITY",
  "EFFORTLESS ELEGANCE",
];

export function Marquee() {
  const repeatedText = Array(4).fill(textList).flat();

  return (
    <div className="w-full overflow-hidden bg-veyra-aubergine text-veyra-chartreuse py-3 flex border-y border-white/10 select-none">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 40,
        }}
      >
        <div className="flex shrink-0">
          {repeatedText.map((text, i) => (
            <div key={i} className="flex items-center">
              <span className="uppercase tracking-[0.2em] text-[11px] md:text-sm font-medium px-4 md:px-8">{text}</span>
              <span className="text-veyra-coral/60 px-4 md:px-8 text-xs md:text-sm">✦</span>
            </div>
          ))}
        </div>
        <div className="flex shrink-0">
          {repeatedText.map((text, i) => (
            <div key={i + repeatedText.length} className="flex items-center">
              <span className="uppercase tracking-[0.2em] text-[11px] md:text-sm font-medium px-4 md:px-8">{text}</span>
              <span className="text-veyra-coral/60 px-4 md:px-8 text-xs md:text-sm">✦</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
