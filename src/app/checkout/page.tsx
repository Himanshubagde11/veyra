"use client";

import { useCartStore } from "@/lib/store/cartStore";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Loader2, Tag, X } from "lucide-react";
import { createOrder } from "@/app/actions/orderActions";
import { validateCoupon } from "@/app/actions/couponActions";
import { useRouter } from "next/navigation";
import Script from "next/script";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CheckoutPage() {
  const { items, getTotals, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [couponCode, setCouponCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  
  const [paymentMethod, setPaymentMethod] = useState<"razorpay" | "cod">("razorpay");

  const router = useRouter();

  // Basic Form State
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const { subtotal } = getTotals();
  const shippingCost = subtotal > 1000000 ? 0 : 5000; // Free over 10,000 INR
  const tax = Math.round((subtotal - discountAmount) * 0.18);
  const total = subtotal - discountAmount + shippingCost + tax;

  const formatPrice = (amount: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount / 100);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    setCouponLoading(true);
    setCouponError(null);
    const result = await validateCoupon(couponCode, subtotal);
    if (result.success && result.discountAmount !== undefined && result.couponCode) {
      setDiscountAmount(result.discountAmount);
      setAppliedCoupon(result.couponCode);
      setCouponCode("");
    } else {
      setCouponError(result.error || "Invalid coupon.");
      setDiscountAmount(0);
      setAppliedCoupon(null);
    }
    setCouponLoading(false);
  };

  const handleRemoveCoupon = () => {
    setDiscountAmount(0);
    setAppliedCoupon(null);
    setCouponError(null);
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const cartItems = items.map((item) => ({
      id: item.id,
      quantity: item.quantity,
    }));

    // Call server action to securely create order
    const result = await createOrder(cartItems, formData.email, appliedCoupon || undefined, paymentMethod);

    if (result.success && result.orderNumber) {
      const rzpKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_dummy";
      
      // If COD, just redirect
      if (paymentMethod === "cod") {
        clearCart();
        router.push(`/orders/${result.orderNumber}`);
        return;
      }

      // If we are using the dummy placeholder key, bypass the Razorpay JS UI
      if (rzpKey.includes("xxxxxxxxxxxxx") || rzpKey === "rzp_test_dummy") {
        clearCart();
        router.push(`/orders/${result.orderNumber}`);
        return;
      }

      const options = {
        key: rzpKey,
        amount: result.totalAmount,
        currency: "INR",
        name: "NOVAÉ",
        description: "Test Transaction",
        order_id: result.razorpayOrderId,
        handler: function (response: any) {
          // In a real app, Razorpay webhook handles fulfillment.
          // We just redirect the user to success page.
          clearCart();
          router.push(`/orders/${result.orderNumber}`);
        },
        prefill: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
        },
        theme: {
          color: "#241326",
        },
      };

      const rzp = new window.Razorpay(options);
      
      rzp.on("payment.failed", function (response: any) {
        setError("Payment failed. Please try again.");
        setLoading(false);
      });

      rzp.open();
    } else {
      setError(result.error || "Something went wrong.");
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-veyra-porcelain flex flex-col items-center justify-center p-6">
        <h1 className="text-heading font-serif text-veyra-aubergine mb-4">Your cart is empty</h1>
        <Link href="/products" className="text-body text-veyra-coral hover:underline">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <div className="min-h-screen bg-veyra-porcelain py-12">
        <div className="veyra-container max-w-6xl">
        <div className="mb-8">
          <Link href="/cart" className="inline-flex items-center text-sm font-medium text-veyra-aubergine/60 hover:text-veyra-aubergine transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Cart
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Checkout Form */}
          <div className="lg:col-span-7">
            <h1 className="text-display-sm font-serif text-veyra-aubergine mb-8">Checkout</h1>

            {error && (
              <div className="mb-6 p-4 bg-veyra-coral/10 text-veyra-coral rounded-lg border border-veyra-coral/20">
                {error}
              </div>
            )}

            <form onSubmit={handleCheckout} className="space-y-8">
              {/* Contact Info */}
              <section className="bg-white p-6 rounded-2xl border border-veyra-champagne">
                <h2 className="text-lg font-serif text-veyra-aubergine mb-4">Contact Information</h2>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-veyra-aubergine/70 mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-veyra-porcelain border border-veyra-champagne rounded-lg focus:outline-none focus:ring-2 focus:ring-veyra-coral focus:border-transparent transition-all"
                  />
                </div>
              </section>

              {/* Shipping Address */}
              <section className="bg-white p-6 rounded-2xl border border-veyra-champagne">
                <h2 className="text-lg font-serif text-veyra-aubergine mb-4">Shipping Address</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-veyra-aubergine/70 mb-1">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-veyra-porcelain border border-veyra-champagne rounded-lg focus:outline-none focus:ring-2 focus:ring-veyra-coral focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-veyra-aubergine/70 mb-1">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-veyra-porcelain border border-veyra-champagne rounded-lg focus:outline-none focus:ring-2 focus:ring-veyra-coral focus:border-transparent transition-all"
                    />
                  </div>
                  <div className="col-span-2">
                    <label htmlFor="address" className="block text-sm font-medium text-veyra-aubergine/70 mb-1">Address</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-veyra-porcelain border border-veyra-champagne rounded-lg focus:outline-none focus:ring-2 focus:ring-veyra-coral focus:border-transparent transition-all"
                    />
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <label htmlFor="city" className="block text-sm font-medium text-veyra-aubergine/70 mb-1">City</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-veyra-porcelain border border-veyra-champagne rounded-lg focus:outline-none focus:ring-2 focus:ring-veyra-coral focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-veyra-aubergine/70 mb-1">State</label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      required
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-veyra-porcelain border border-veyra-champagne rounded-lg focus:outline-none focus:ring-2 focus:ring-veyra-coral focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="postalCode" className="block text-sm font-medium text-veyra-aubergine/70 mb-1">Postal Code</label>
                    <input
                      type="text"
                      id="postalCode"
                      name="postalCode"
                      required
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-veyra-porcelain border border-veyra-champagne rounded-lg focus:outline-none focus:ring-2 focus:ring-veyra-coral focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              </section>

              {/* Payment Section */}
              <section className="bg-white p-6 rounded-2xl border border-veyra-champagne">
                <h2 className="text-lg font-serif text-veyra-aubergine mb-4">Payment Method</h2>
                <div className="space-y-3">
                  <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-colors ${paymentMethod === "razorpay" ? "border-veyra-coral bg-veyra-coral/5" : "border-veyra-champagne hover:border-veyra-aubergine/30"}`}>
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      value="razorpay" 
                      checked={paymentMethod === "razorpay"} 
                      onChange={() => setPaymentMethod("razorpay")} 
                      className="text-veyra-coral focus:ring-veyra-coral accent-veyra-coral" 
                    />
                    <div className="ml-3">
                      <span className="block font-medium text-veyra-aubergine">Online Payment</span>
                      <span className="block text-xs text-veyra-aubergine/60 mt-0.5">Securely processed by Razorpay</span>
                    </div>
                  </label>
                  <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-colors ${paymentMethod === "cod" ? "border-veyra-coral bg-veyra-coral/5" : "border-veyra-champagne hover:border-veyra-aubergine/30"}`}>
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      value="cod" 
                      checked={paymentMethod === "cod"} 
                      onChange={() => setPaymentMethod("cod")} 
                      className="text-veyra-coral focus:ring-veyra-coral accent-veyra-coral" 
                    />
                    <div className="ml-3">
                      <span className="block font-medium text-veyra-aubergine">Cash on Delivery</span>
                      <span className="block text-xs text-veyra-aubergine/60 mt-0.5">Pay in cash or UPI when your order arrives</span>
                    </div>
                  </label>
                </div>
              </section>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-14 bg-veyra-aubergine text-white rounded-full font-medium hover:bg-veyra-obsidian transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  `Pay ${formatPrice(total)}`
                )}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-5">
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-veyra-champagne lg:sticky lg:top-32">
              <h2 className="text-lg font-serif text-veyra-aubergine mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-20 bg-veyra-porcelain-warm rounded-lg relative overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="absolute inset-0 w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-veyra-aubergine line-clamp-1">{item.name}</h3>
                      <p className="text-xs text-veyra-aubergine/60 mt-1">Qty: {item.quantity}</p>
                      <p className="text-sm font-medium text-veyra-aubergine mt-2">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-veyra-champagne pt-6 mb-6">
                <h3 className="text-sm font-medium text-veyra-aubergine mb-3 flex items-center">
                  <Tag className="w-4 h-4 mr-2" />
                  Promo Code
                </h3>
                {appliedCoupon ? (
                  <div className="flex justify-between items-center p-3 bg-veyra-porcelain-warm border border-veyra-champagne rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-veyra-coral">{appliedCoupon}</p>
                      <p className="text-xs text-veyra-aubergine/60">Discount applied</p>
                    </div>
                    <button 
                      onClick={handleRemoveCoupon}
                      className="text-veyra-aubergine/50 hover:text-veyra-coral p-1 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                        placeholder="Enter code"
                        className="flex-1 px-4 py-2 bg-veyra-porcelain border border-veyra-champagne rounded-lg focus:outline-none focus:ring-2 focus:ring-veyra-coral text-sm"
                      />
                      <button
                        type="button"
                        onClick={handleApplyCoupon}
                        disabled={couponLoading || !couponCode.trim()}
                        className="px-4 py-2 bg-veyra-aubergine text-white rounded-lg text-sm font-medium hover:bg-veyra-obsidian disabled:opacity-50 transition-colors"
                      >
                        {couponLoading ? "Applying..." : "Apply"}
                      </button>
                    </div>
                    {couponError && <p className="text-xs text-veyra-coral mt-2">{couponError}</p>}
                  </div>
                )}
              </div>

              <div className="border-t border-veyra-champagne pt-6 space-y-4">
                <div className="flex justify-between text-sm text-veyra-aubergine/80">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-sm text-veyra-coral font-medium">
                    <span>Discount ({appliedCoupon})</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm text-veyra-aubergine/80">
                  <span>Shipping</span>
                  <span>{shippingCost === 0 ? "Free" : formatPrice(shippingCost)}</span>
                </div>
                <div className="flex justify-between text-sm text-veyra-aubergine/80">
                  <span>Estimated Tax</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                <div className="border-t border-veyra-champagne pt-4 flex justify-between items-center">
                  <span className="text-base font-medium text-veyra-aubergine">Total</span>
                  <span className="text-xl font-medium text-veyra-aubergine">{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
