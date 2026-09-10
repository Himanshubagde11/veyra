"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";

const FOOTER_LINKS = {
  Shop: [
    { href: "/shop", label: "All Products" },
    { href: "/category/new-arrivals", label: "New Arrivals" },
    { href: "/category/trending", label: "Trending" },
    { href: "/category/fashion", label: "Fashion" },
    { href: "/category/home", label: "Home" },
    { href: "/category/technology", label: "Technology" },
  ],
  Company: [
    { href: "/about", label: "About VEYRA" },
    { href: "/story", label: "Our Story" },
    { href: "/sustainability", label: "Sustainability" },
    { href: "/careers", label: "Careers" },
    { href: "/press", label: "Press" },
  ],
  Support: [
    { href: "/help", label: "Help Center" },
    { href: "/shipping", label: "Shipping & Returns" },
    { href: "/track-order", label: "Track Order" },
    { href: "/contact", label: "Contact Us" },
    { href: "/faq", label: "FAQ" },
  ],
  Legal: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/cookies", label: "Cookie Policy" },
    { href: "/refund-policy", label: "Refund Policy" },
  ],
};

export default function Footer() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail("");
      }, 3000);
    }
  };
  return (
    <footer className="bg-veyra-aubergine text-white mt-32 md:mt-40" role="contentinfo">
      {/* Newsletter section */}
      <div className="border-b border-white/8">
        <div className="veyra-container py-20 md:py-32">
          <div className="max-w-2xl">
            <p className="text-overline text-veyra-chartreuse mb-6">Stay in the loop</p>
            <h2 className="font-serif text-display-lg text-white mb-6">
              Discover first.
            </h2>
            <p className="text-body text-white/50 mb-10 max-w-md">
              New arrivals, curated collections, and exclusive offers — delivered to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-lg" onSubmit={handleSubscribe}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 px-6 py-4 bg-white/8 border border-white/10 rounded-sm text-body text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors"
                aria-label="Email for newsletter"
                required
              />
              <button
                type="submit"
                className={`px-8 py-4 font-medium text-body-sm rounded-sm transition-all duration-300 whitespace-nowrap min-w-[140px] flex items-center justify-center ${
                  isSubscribed 
                    ? "bg-veyra-coral text-white" 
                    : "bg-veyra-chartreuse text-veyra-obsidian hover:bg-veyra-chartreuse-light"
                }`}
                disabled={isSubscribed}
              >
                {isSubscribed ? "Subscribed! ✓" : "Subscribe"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Links grid */}
      <div className="veyra-container py-16 md:py-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-16">
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-overline text-white/40 mb-6">{title}</h3>
              <ul className="flex flex-col gap-4">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-body-sm text-white/60 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8">
        <div className="veyra-container py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <Link href="/" className="font-serif text-lg tracking-[0.15em] text-white/80 hover:text-white transition-colors">
                VEYRA
              </Link>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                <span className="text-caption text-white/30">
                  © {new Date().getFullYear()} VEYRA. All rights reserved.
                </span>
                <span className="text-caption text-white/50 font-medium">
                  Created by Himanshu Bagde
                </span>
              </div>
            </div>

            <div className="flex items-center gap-6">
              {["Instagram", "Twitter", "Pinterest"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-caption text-white/40 hover:text-white transition-colors inline-flex items-center gap-1"
                  aria-label={`VEYRA on ${social}`}
                >
                  {social}
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
