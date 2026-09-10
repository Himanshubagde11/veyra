import { notFound } from "next/navigation";
import Link from "next/link";

const STATIC_PAGES: Record<string, { title: string; content: React.ReactNode }> = {
  about: {
    title: "About VEYRA",
    content: (
      <div className="space-y-6 text-veyra-aubergine/80">
        <p className="text-body-lg">
          VEYRA was born from a desire to blend architectural form with everyday function. 
          We believe that the objects surrounding us should not merely serve a purpose, 
          but elevate our daily rituals through intentional design.
        </p>
        <p>
          Founded in 2024, our studio curates and creates pieces that transcend seasonal 
          trends. We work with artisans and designers globally to bring you a collection 
          that is both brutalist and warm, experimental yet deeply rooted in classic craftsmanship.
        </p>
      </div>
    )
  },
  story: {
    title: "Our Story",
    content: (
      <div className="space-y-6 text-veyra-aubergine/80">
        <p>
          Our journey began in a small studio where we experimented with raw materials—concrete, 
          unpolished metal, and raw silk. We realized there was a gap in the market for products 
          that embraced their natural textures while maintaining a high-end luxury feel.
        </p>
        <p>
          Today, VEYRA is a destination for those who appreciate the avant-garde. Every piece 
          in our collection has a story, a maker, and a distinct perspective.
        </p>
      </div>
    )
  },
  sustainability: {
    title: "Sustainability",
    content: (
      <div className="space-y-6 text-veyra-aubergine/80">
        <p>
          Luxury should not come at the expense of our planet. We are committed to ethical 
          sourcing, zero-waste packaging, and carbon-neutral shipping.
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>100% recyclable or compostable packaging</li>
          <li>Artisans paid above fair-trade wages</li>
          <li>Carbon offsetting for all international shipments</li>
        </ul>
      </div>
    )
  },
  careers: {
    title: "Careers",
    content: (
      <div className="space-y-6 text-veyra-aubergine/80">
        <p>
          We are always looking for visionary designers, meticulous engineers, and creative 
          minds to join our growing team.
        </p>
        <p>
          Currently, there are no open positions, but we are always open to hearing from you. 
          Send your portfolio to <a href="mailto:careers@veyra.com" className="text-veyra-coral underline">careers@veyra.com</a>.
        </p>
      </div>
    )
  },
  press: {
    title: "Press",
    content: (
      <div className="space-y-6 text-veyra-aubergine/80">
        <p>For all press inquiries, high-resolution images, and sample requests, please contact our PR team.</p>
        <p><a href="mailto:press@veyra.com" className="text-veyra-coral underline">press@veyra.com</a></p>
      </div>
    )
  },
  help: {
    title: "Help Center",
    content: (
      <div className="space-y-6 text-veyra-aubergine/80">
        <p>Need assistance with an order, product information, or just want to say hello?</p>
        <p>Our concierge team is available Monday through Friday, 9am - 6pm EST.</p>
        <p>Email: <a href="mailto:concierge@veyra.com" className="text-veyra-coral underline">concierge@veyra.com</a></p>
      </div>
    )
  },
  shipping: {
    title: "Shipping & Returns",
    content: (
      <div className="space-y-6 text-veyra-aubergine/80">
        <h3 className="text-lg font-serif text-veyra-aubergine">Shipping</h3>
        <p>We offer complimentary standard shipping on all orders over ₹10,000. Express shipping is available at checkout for an additional fee.</p>
        <h3 className="text-lg font-serif text-veyra-aubergine mt-8">Returns</h3>
        <p>If you are not completely satisfied with your purchase, you may return it within 14 days of receipt for a full refund, provided the item is in its original condition.</p>
      </div>
    )
  },
  "track-order": {
    title: "Track Order",
    content: (
      <div className="space-y-6 text-veyra-aubergine/80">
        <p>To track your order, please log into your account and navigate to your order history. Alternatively, refer to the tracking link provided in your shipping confirmation email.</p>
        <Link href="/account/orders" className="inline-block mt-4 px-6 py-3 bg-veyra-aubergine text-white rounded-sm hover:bg-veyra-obsidian transition-colors">
          View My Orders
        </Link>
      </div>
    )
  },
  contact: {
    title: "Contact Us",
    content: (
      <div className="space-y-6 text-veyra-aubergine/80">
        <p>We would love to hear from you.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div className="p-6 bg-veyra-porcelain-warm rounded-lg border border-veyra-champagne">
            <h3 className="text-lg font-serif text-veyra-aubergine mb-2">Customer Care</h3>
            <p className="mb-4">For questions regarding orders and products.</p>
            <p><a href="mailto:care@veyra.com" className="text-veyra-coral">care@veyra.com</a></p>
          </div>
          <div className="p-6 bg-veyra-porcelain-warm rounded-lg border border-veyra-champagne">
            <h3 className="text-lg font-serif text-veyra-aubergine mb-2">Wholesale</h3>
            <p className="mb-4">For retail partnerships and wholesale inquiries.</p>
            <p><a href="mailto:wholesale@veyra.com" className="text-veyra-coral">wholesale@veyra.com</a></p>
          </div>
        </div>
      </div>
    )
  },
  faq: {
    title: "Frequently Asked Questions",
    content: (
      <div className="space-y-8 text-veyra-aubergine/80">
        <div>
          <h3 className="text-lg font-serif text-veyra-aubergine mb-2">Do you ship internationally?</h3>
          <p>Yes, we ship to over 50 countries worldwide. International shipping rates are calculated at checkout.</p>
        </div>
        <div>
          <h3 className="text-lg font-serif text-veyra-aubergine mb-2">Are your products made ethically?</h3>
          <p>Absolutely. We trace every material back to its source and ensure all our partners adhere to strict ethical and environmental standards.</p>
        </div>
        <div>
          <h3 className="text-lg font-serif text-veyra-aubergine mb-2">How do I care for my VEYRA pieces?</h3>
          <p>Care instructions vary by product. Detailed care guides are included with your purchase and available on the specific product pages.</p>
        </div>
      </div>
    )
  },
  privacy: {
    title: "Privacy Policy",
    content: (
      <div className="space-y-6 text-veyra-aubergine/80">
        <p>Your privacy is paramount. We only collect the information necessary to process your orders and enhance your shopping experience.</p>
        <p>We will never sell or distribute your personal data to third parties without your explicit consent.</p>
        <p className="text-sm opacity-60 mt-8">Last updated: {new Date().toLocaleDateString()}</p>
      </div>
    )
  },
  terms: {
    title: "Terms of Service",
    content: (
      <div className="space-y-6 text-veyra-aubergine/80">
        <p>By using the VEYRA website, you agree to these terms of service.</p>
        <p>All content on this site, including images, text, and design, is the property of VEYRA and is protected by international copyright laws.</p>
        <p>Prices and availability are subject to change without notice.</p>
      </div>
    )
  },
  cookies: {
    title: "Cookie Policy",
    content: (
      <div className="space-y-6 text-veyra-aubergine/80">
        <p>We use cookies to improve your browsing experience, analyze site traffic, and personalize content.</p>
        <p>By continuing to use our site, you consent to our use of cookies in accordance with our Privacy Policy.</p>
      </div>
    )
  },
  "refund-policy": {
    title: "Refund Policy",
    content: (
      <div className="space-y-6 text-veyra-aubergine/80">
        <p>Refunds are processed within 5-7 business days of receiving your returned item.</p>
        <p>The original payment method will be credited. Please note that original shipping costs are non-refundable.</p>
      </div>
    )
  }
};

export default async function StaticPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = STATIC_PAGES[slug];

  if (!page) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-veyra-porcelain pt-32 pb-24">
      <div className="veyra-container max-w-3xl">
        <h1 className="text-display-md font-serif text-veyra-aubergine mb-12">
          {page.title}
        </h1>
        <div className="prose prose-lg prose-p:leading-relaxed prose-a:text-veyra-coral hover:prose-a:text-veyra-aubergine transition-colors">
          {page.content}
        </div>
      </div>
    </div>
  );
}
