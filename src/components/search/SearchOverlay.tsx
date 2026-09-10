"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onClose();
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-veyra-porcelain/95 backdrop-blur-md flex flex-col transition-all">
      <div className="veyra-container py-6 flex justify-end">
        <button 
          onClick={onClose}
          className="p-2 text-veyra-aubergine hover:text-veyra-coral transition-colors rounded-full hover:bg-veyra-champagne"
        >
          <X className="w-8 h-8" />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-8 md:px-12">
        <div className="w-full max-w-4xl">
          <form onSubmit={handleSubmit} className="flex items-center border-b-[3px] border-veyra-aubergine/20 focus-within:border-veyra-coral transition-colors pb-6 md:pb-8">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search VEYRA..."
              className="flex-1 bg-transparent text-display-md lg:text-display-lg font-serif text-veyra-aubergine outline-none ring-0 focus:outline-none focus:ring-0 placeholder:text-veyra-aubergine/20"
            />
            <button 
              type="submit"
              className="text-veyra-aubergine/50 hover:text-veyra-coral transition-colors ml-6"
            >
              <Search className="w-10 h-10 md:w-12 md:h-12" />
            </button>
          </form>
          <div className="mt-12 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 text-sm text-veyra-aubergine/60">
            <span className="font-medium text-veyra-aubergine uppercase tracking-[0.15em] text-xs">Popular searches</span>
            <div className="flex flex-wrap gap-3">
              {[
                { label: "Ceramics", query: "ceramics" },
                { label: "Lighting", query: "lighting" },
                { label: "Furniture", query: "furniture" },
                { label: "Apparel", query: "apparel" },
              ].map((item) => (
                <button 
                  key={item.query}
                  onClick={() => { setQuery(item.query); inputRef.current?.focus(); }} 
                  className="px-5 py-2.5 rounded-full border border-veyra-aubergine/10 hover:border-veyra-coral hover:text-veyra-coral hover:bg-veyra-coral/5 transition-all bg-white/50 backdrop-blur-sm shadow-sm font-medium tracking-wide"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
