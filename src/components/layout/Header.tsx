"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { ShoppingCart, Search, User, LogOut, Heart, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useCartStore } from "@/lib/store/cartStore";
import { useWishlistStore } from "@/lib/store/wishlistStore";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { SearchOverlay } from "@/components/search/SearchOverlay";

export function Header() {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { getTotals, toggleCart } = useCartStore();
  const wishlistItems = useWishlistStore((state) => state.items);
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const cartCount = mounted ? getTotals().count : 0;
  const wishlistCount = mounted ? wishlistItems.length : 0;

  return (
    <>
      <header 
        className={`sticky top-0 z-50 w-full transition-all duration-500 ease-in-out border-b
          ${isScrolled 
            ? "bg-veyra-porcelain/90 backdrop-blur-md border-veyra-champagne shadow-sm" 
            : "bg-veyra-porcelain/60 backdrop-blur-sm border-transparent"
          }`}
      >
      <div className="veyra-container">
        <div className={`flex justify-between items-center transition-all duration-500 ease-in-out ${isScrolled ? "h-20" : "h-28"}`}>
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="font-serif text-heading-lg tracking-tight text-veyra-aubergine">
              VEYRA
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-10">
            <Link href="/shop" className="text-body-sm font-medium text-veyra-aubergine hover:text-veyra-coral transition-colors">
              Shop All
            </Link>
            <Link href="/shop?category=objects" className="text-body-sm font-medium text-veyra-aubergine hover:text-veyra-coral transition-colors">
              Objects
            </Link>
            <Link href="/shop?category=living" className="text-body-sm font-medium text-veyra-aubergine hover:text-veyra-coral transition-colors">
              Living
            </Link>
            <Link href="/shop?category=apparel" className="text-body-sm font-medium text-veyra-aubergine hover:text-veyra-coral transition-colors">
              Apparel
            </Link>
          </nav>

          {/* Icons / Actions */}
          <div className="flex items-center gap-4 md:gap-6">
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="text-veyra-aubergine hover:text-veyra-coral transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
            
            <Link href="/wishlist" className="text-veyra-aubergine hover:text-veyra-coral transition-colors relative">
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-veyra-coral text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <button onClick={toggleCart} className="text-veyra-aubergine hover:text-veyra-coral transition-colors relative">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-veyra-coral text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <div className="relative">
              {status === "loading" ? (
                <div className="w-5 h-5 rounded-full bg-veyra-champagne animate-pulse" />
              ) : session ? (
                <div className="flex items-center space-x-4">
                  <div className="relative group">
                    <button 
                      onClick={() => setIsMenuOpen(!isMenuOpen)}
                      className="flex items-center space-x-2 text-veyra-aubergine hover:text-veyra-coral transition-colors"
                    >
                      <User className="w-5 h-5" />
                    </button>
                    
                    {/* Dropdown Menu */}
                    {isMenuOpen && (
                      <div className="absolute right-0 mt-4 w-64 bg-white rounded-xl shadow-veyra-lg py-3 border border-veyra-champagne overflow-hidden">
                        <div className="px-5 py-3 border-b border-veyra-champagne/50 bg-veyra-porcelain/30 mb-2">
                          <p className="text-body-sm font-medium text-veyra-aubergine truncate">{session.user?.name}</p>
                          <p className="text-xs text-veyra-aubergine/60 truncate mt-1">{session.user?.email}</p>
                        </div>
                        <Link href="/account" className="block px-5 py-3 text-sm font-medium text-veyra-aubergine hover:bg-veyra-champagne/30 transition-colors">
                          My Account
                        </Link>
                        <Link href="/account/orders" className="block px-5 py-3 text-sm font-medium text-veyra-aubergine hover:bg-veyra-champagne/30 transition-colors">
                          Orders
                        </Link>
                        {session.user?.role === "ADMIN" && (
                          <Link href="/admin" className="block px-5 py-3 text-sm font-medium text-veyra-coral hover:bg-veyra-coral/5 transition-colors">
                            Admin Dashboard
                          </Link>
                        )}
                        <div className="h-px bg-veyra-champagne/50 my-2" />
                        <button 
                          onClick={() => signOut({ callbackUrl: '/' })}
                          className="w-full text-left px-5 py-3 text-sm font-medium text-veyra-aubergine/70 hover:text-veyra-aubergine hover:bg-veyra-champagne/30 flex items-center gap-3 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign out</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <Link 
                  href="/login" 
                  className="hidden md:inline-flex items-center justify-center px-5 py-2 border border-transparent text-body-sm font-medium rounded-full text-white bg-veyra-aubergine hover:bg-veyra-obsidian transition-colors"
                >
                  Sign In
                </Link>
              )}
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden text-veyra-aubergine hover:text-veyra-coral transition-colors ml-1"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>

        </div>
      </div>
      
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-veyra-porcelain flex flex-col md:hidden">
          <div className="flex justify-between items-center h-20 px-6 sm:px-12">
            <Link href="/" className="font-serif text-heading-lg tracking-tight text-veyra-aubergine" onClick={() => setIsMobileMenuOpen(false)}>
              VEYRA
            </Link>
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-veyra-aubergine hover:text-veyra-coral transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="flex flex-col px-6 sm:px-12 pt-8 gap-8 flex-grow">
            <nav className="flex flex-col gap-6 text-display font-serif text-veyra-aubergine">
              <Link href="/shop" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-veyra-coral transition-colors">
                Shop All
              </Link>
              <Link href="/shop?category=objects" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-veyra-coral transition-colors">
                Objects
              </Link>
              <Link href="/shop?category=living" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-veyra-coral transition-colors">
                Living
              </Link>
              <Link href="/shop?category=apparel" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-veyra-coral transition-colors">
                Apparel
              </Link>
            </nav>
            
            <div className="mt-auto pb-12 flex flex-col gap-4">
              {!session && (
                <Link 
                  href="/login" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full py-4 border border-veyra-aubergine text-center font-medium rounded-full text-veyra-aubergine hover:bg-veyra-aubergine hover:text-white transition-colors"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
    <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    <CartDrawer />
    </>
  );
}
