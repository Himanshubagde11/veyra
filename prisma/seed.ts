import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Create Categories
  const categoriesData = [
    { name: "Apparel", slug: "apparel", description: "Thoughtfully designed clothing for every season.", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=500&h=700&fit=crop" },
    { name: "Living", slug: "living", description: "Furniture, lighting and décor for intentional spaces.", image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=500&h=700&fit=crop" },
    { name: "Objects", slug: "objects", description: "Everyday tools, stationery and sculptural pieces.", image: "https://images.unsplash.com/photo-1491933382434-500287f9b54b?w=500&h=700&fit=crop" },
    { name: "Accessories", slug: "accessories", description: "Bags, watches, jewellery and small leather goods.", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=700&fit=crop" },
  ];

  const categories: Record<string, any> = {};
  for (const c of categoriesData) {
    const category = await prisma.category.upsert({
      where: { slug: c.slug },
      update: { description: c.description, image: c.image },
      create: c,
    });
    categories[c.slug] = category;
  }

  // ─── Products ───
  const productsData = [
    // ═══════════════ LIVING (8 products) ═══════════════
    {
      slug: "koen-ceramic-pour-over-set",
      name: "Kōen Ceramic Pour-Over Set",
      description: "A beautifully crafted ceramic pour-over coffee set for the perfect morning ritual. Includes dripper, server and two cups in matte off-white glaze.",
      price: 349000,
      comparePrice: 429000,
      sku: "LIV-KOEN-001",
      categorySlug: "living",
      image1: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=800&fit=crop",
      image2: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&h=800&fit=crop",
    },
    {
      slug: "lumi-table-lamp",
      name: "Lumi Table Lamp",
      description: "Soft ambient lighting with a smooth, pebble-like glass shade. Brass base with dimmable LED.",
      price: 859000,
      sku: "LIV-LUM-005",
      categorySlug: "living",
      image1: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&h=800&fit=crop",
      image2: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=600&h=800&fit=crop",
    },
    {
      slug: "eos-lounge-chair",
      name: "Eos Lounge Chair",
      description: "Ergonomically designed for supreme comfort with bouclé upholstery and solid oak frame.",
      price: 3499000,
      sku: "LIV-EOS-009",
      categorySlug: "living",
      image1: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&h=800&fit=crop",
      image2: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=800&fit=crop",
    },
    {
      slug: "vela-pendant-light",
      name: "Vela Pendant Light",
      description: "A minimalist brass pendant light that casts a warm, directed glow over any dining table.",
      price: 1299000,
      sku: "LIV-VEL-010",
      categorySlug: "living",
      image1: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=600&h=800&fit=crop",
      image2: null,
    },
    {
      slug: "nara-floor-mirror",
      name: "Nara Floor Mirror",
      description: "Full-length arched mirror with a slim walnut frame. Leans against any wall for an effortless look.",
      price: 1899000,
      sku: "LIV-NAR-013",
      categorySlug: "living",
      image1: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=600&h=800&fit=crop",
      image2: null,
    },
    {
      slug: "muji-linen-cushion-set",
      name: "Muji Linen Cushion Set",
      description: "Set of three stonewashed linen cushion covers in earthy neutrals. Inserts included.",
      price: 289000,
      comparePrice: 389000,
      sku: "LIV-MUJ-014",
      categorySlug: "living",
      image1: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=800&fit=crop",
      image2: null,
    },
    {
      slug: "terra-side-table",
      name: "Terra Side Table",
      description: "Solid ash side table with rounded edges and a warm honey finish. 45cm height, 40cm diameter.",
      price: 1149000,
      sku: "LIV-TER-015",
      categorySlug: "living",
      image1: "https://images.unsplash.com/photo-1532372576444-dda954194ad0?w=600&h=800&fit=crop",
      image2: null,
    },
    {
      slug: "haku-ceramic-planter",
      name: "Haku Ceramic Planter",
      description: "Hand-thrown speckled stoneware planter with drainage hole. Perfect for medium indoor plants.",
      price: 179000,
      sku: "LIV-HAK-016",
      categorySlug: "living",
      image1: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&h=800&fit=crop",
      image2: null,
    },

    // ═══════════════ APPAREL (8 products) ═══════════════
    {
      slug: "onda-linen-blend-overshirt",
      name: "Onda Linen Blend Overshirt",
      description: "A comfortable, breathable overshirt perfect for layering. Relaxed fit in washed sage.",
      price: 459000,
      comparePrice: 599000,
      sku: "APP-OND-003",
      categorySlug: "apparel",
      image1: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=800&fit=crop",
      image2: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=800&fit=crop",
    },
    {
      slug: "cora-knit-sweater",
      name: "Cora Knit Sweater",
      description: "Chunky and incredibly soft wool-blend sweater in undyed cream. Unisex, oversized fit.",
      price: 529000,
      sku: "APP-COR-006",
      categorySlug: "apparel",
      image1: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&h=800&fit=crop",
      image2: null,
    },
    {
      slug: "luna-silk-scarf",
      name: "Luna Silk Scarf",
      description: "A delicate, hand-rolled silk scarf featuring abstract, celestial motifs. 90×90 cm.",
      price: 329000,
      sku: "APP-LUN-012",
      categorySlug: "apparel",
      image1: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=600&h=800&fit=crop",
      image2: null,
    },
    {
      slug: "nori-relaxed-tee",
      name: "Nori Relaxed Tee — Ivory",
      description: "Essential heavyweight cotton tee with a boxy cut. Pre-shrunk, garment-dyed for that lived-in feel.",
      price: 189000,
      sku: "APP-NOR-017",
      categorySlug: "apparel",
      image1: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop",
      image2: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&h=800&fit=crop",
    },
    {
      slug: "mura-wide-leg-trousers",
      name: "Mura Wide-Leg Trousers",
      description: "Pleated wide-leg trousers in matte twill. Elasticated back waist for easy comfort.",
      price: 379000,
      sku: "APP-MUR-018",
      categorySlug: "apparel",
      image1: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&h=800&fit=crop",
      image2: null,
    },
    {
      slug: "kaze-bomber-jacket",
      name: "Kaze Bomber Jacket",
      description: "Lightweight nylon bomber with ribbed cuffs and a satin lining. Minimal branding.",
      price: 699000,
      comparePrice: 849000,
      sku: "APP-KAZ-019",
      categorySlug: "apparel",
      image1: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=800&fit=crop",
      image2: null,
    },
    {
      slug: "hana-cotton-dress",
      name: "Hana Cotton Wrap Dress",
      description: "Effortless midi wrap dress in organic cotton voile. Flattering silhouette, side-tie closure.",
      price: 449000,
      sku: "APP-HAN-020",
      categorySlug: "apparel",
      image1: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=800&fit=crop",
      image2: null,
    },
    {
      slug: "sora-cashmere-beanie",
      name: "Sora Cashmere Beanie",
      description: "Pure cashmere ribbed beanie in charcoal. Lightweight warmth for transitional weather.",
      price: 249000,
      sku: "APP-SOR-021",
      categorySlug: "apparel",
      image1: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=600&h=800&fit=crop",
      image2: null,
    },

    // ═══════════════ OBJECTS (8 products) ═══════════════
    {
      slug: "aura-wireless-speaker-stone",
      name: "Aura Wireless Speaker — Stone",
      description: "High-fidelity audio in a beautiful, sculptural design. 360° sound, 12-hour battery.",
      price: 649000,
      sku: "OBJ-AUR-004",
      categorySlug: "objects",
      image1: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&h=800&fit=crop",
      image2: null,
    },
    {
      slug: "nix-sculptural-vase",
      name: "Nix Sculptural Vase",
      description: "A striking centerpiece even without flowers, crafted from matte stoneware. 30cm tall.",
      price: 249000,
      sku: "OBJ-NIX-007",
      categorySlug: "objects",
      image1: "https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?w=600&h=800&fit=crop",
      image2: null,
    },
    {
      slug: "strata-desk-organizer",
      name: "Strata Desk Organizer",
      description: "A modular, concrete desk organizer for keeping your workspace tidy. Three compartments.",
      price: 189000,
      sku: "OBJ-STR-011",
      categorySlug: "objects",
      image1: "https://images.unsplash.com/photo-1544457070-4cd773b4d71e?w=600&h=800&fit=crop",
      image2: null,
    },
    {
      slug: "zen-garden-diffuser",
      name: "Zen Garden Diffuser",
      description: "Ultrasonic aroma diffuser with warm ambient light. Covers up to 30sqm, whisper-quiet motor.",
      price: 329000,
      comparePrice: 419000,
      sku: "OBJ-ZEN-022",
      categorySlug: "objects",
      image1: "https://images.unsplash.com/photo-1602928321679-560bb453f190?w=600&h=800&fit=crop",
      image2: null,
    },
    {
      slug: "ishi-incense-holder",
      name: "Ishi Incense Holder",
      description: "River-stone inspired ceramic incense holder. Fits standard sticks and cones. Ash-catching groove.",
      price: 99000,
      sku: "OBJ-ISH-023",
      categorySlug: "objects",
      image1: "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=600&h=800&fit=crop",
      image2: null,
    },
    {
      slug: "furo-brass-tray",
      name: "Furo Brass Tray",
      description: "Solid brass catchall tray with brushed finish. 20×15cm — perfect for keys, coins and small items.",
      price: 219000,
      sku: "OBJ-FUR-024",
      categorySlug: "objects",
      image1: "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=600&h=800&fit=crop",
      image2: null,
    },
    {
      slug: "kawa-ceramic-mug-set",
      name: "Kawa Ceramic Mug Set",
      description: "Set of four handmade mugs in reactive glaze. Each piece is unique. 300ml capacity.",
      price: 259000,
      sku: "OBJ-KAW-025",
      categorySlug: "objects",
      image1: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600&h=800&fit=crop",
      image2: null,
    },
    {
      slug: "mono-notebook-a5",
      name: "Mono Notebook — A5",
      description: "Thread-bound A5 notebook with 192 pages of premium 100gsm paper. Dot grid. Lay-flat binding.",
      price: 89000,
      sku: "OBJ-MON-026",
      categorySlug: "objects",
      image1: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=600&h=800&fit=crop",
      image2: null,
    },

    // ═══════════════ ACCESSORIES (8 products) ═══════════════
    {
      slug: "solis-minimal-watch-matte-black",
      name: "Solis Minimal Watch — Matte Black",
      description: "A sleek, minimal timepiece designed for everyday elegance. Japanese quartz movement, sapphire crystal.",
      price: 799000,
      sku: "ACC-SOL-002",
      categorySlug: "accessories",
      image1: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=800&fit=crop",
      image2: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&h=800&fit=crop",
    },
    {
      slug: "terra-leather-tote",
      name: "Terra Leather Tote",
      description: "A spacious everyday carry crafted from full-grain vegetable-tanned leather. Ages beautifully.",
      price: 1199000,
      sku: "ACC-TER-008",
      categorySlug: "accessories",
      image1: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&h=800&fit=crop",
      image2: null,
    },
    {
      slug: "hira-leather-weekender",
      name: "Hira Leather Weekender",
      description: "Spacious weekend duffle in premium pebbled leather. Detachable shoulder strap, cotton-lined interior.",
      price: 1299000,
      sku: "ACC-HIR-027",
      categorySlug: "accessories",
      image1: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=800&fit=crop",
      image2: null,
    },
    {
      slug: "ruka-card-holder",
      name: "Ruka Card Holder",
      description: "Slim card holder in burnished Italian leather. Four card slots and a center note compartment.",
      price: 179000,
      sku: "ACC-RUK-028",
      categorySlug: "accessories",
      image1: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&h=800&fit=crop",
      image2: null,
    },
    {
      slug: "yuki-titanium-sunglasses",
      name: "Yuki Titanium Sunglasses",
      description: "Ultra-lightweight titanium frame with polarized CR-39 lenses. UV400 protection.",
      price: 899000,
      comparePrice: 1099000,
      sku: "ACC-YUK-029",
      categorySlug: "accessories",
      image1: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=800&fit=crop",
      image2: null,
    },
    {
      slug: "tsuki-pearl-earrings",
      name: "Tsuki Pearl Earrings",
      description: "Freshwater baroque pearl drop earrings on 18k gold vermeil hooks. Hypoallergenic.",
      price: 349000,
      sku: "ACC-TSU-030",
      categorySlug: "accessories",
      image1: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=800&fit=crop",
      image2: null,
    },
    {
      slug: "mori-canvas-backpack",
      name: "Mori Canvas Backpack",
      description: "Waxed canvas and leather trim daypack. Padded 15\" laptop sleeve, front magnetic pocket.",
      price: 599000,
      sku: "ACC-MOR-031",
      categorySlug: "accessories",
      image1: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=800&fit=crop",
      image2: null,
    },
    {
      slug: "kiri-leather-belt",
      name: "Kiri Leather Belt",
      description: "Full-grain leather belt with solid brass buckle. 3.5cm width — works with jeans and trousers.",
      price: 249000,
      sku: "ACC-KIR-032",
      categorySlug: "accessories",
      image1: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=600&h=800&fit=crop",
      image2: null,
    },
    // ═══════════════ NEW LIVING (3 products) ═══════════════
    {
      slug: "kintsugi-matcha-bowl",
      name: "Kintsugi Matcha Bowl",
      description: "Handcrafted ceramic chawan with traditional gold kintsugi joinery. Each bowl tells a unique story.",
      price: 529000,
      sku: "LIV-KIN-033",
      categorySlug: "living",
      image1: "/products/matcha_bowl.jpg",
      image2: null,
    },
    {
      slug: "akari-paper-lantern",
      name: "Akari Paper Lantern",
      description: "Washi paper and bamboo ribbed floor lamp that emits a soft, diffused, and warm ambient light.",
      price: 890000,
      sku: "LIV-AKA-034",
      categorySlug: "living",
      image1: "/products/paper_lantern.jpg",
      image2: null,
    },
    {
      slug: "slatted-wood-bench",
      name: "Slatted Walnut Bench",
      description: "Minimalist solid walnut bench perfect for entryways or as a low console table. Precision joinery.",
      price: 2400000,
      comparePrice: 2800000,
      sku: "LIV-SLA-035",
      categorySlug: "living",
      image1: "/products/walnut_bench.jpg",
      image2: null,
    },
    // ═══════════════ NEW APPAREL (3 products) ═══════════════
    {
      slug: "merino-turtleneck",
      name: "Merino Ribbed Turtleneck",
      description: "Extra-fine merino wool turtleneck. Form-fitting, highly breathable, and impeccably soft.",
      price: 489000,
      sku: "APP-MER-036",
      categorySlug: "apparel",
      image1: "/products/merino_turtleneck.jpg",
      image2: null,
    },
    {
      slug: "kuro-denim-jacket",
      name: "Kuro Selvedge Jacket",
      description: "14oz Japanese raw selvedge denim jacket in deep indigo. Unwashed and ready to fade with you.",
      price: 1100000,
      sku: "APP-KUR-037",
      categorySlug: "apparel",
      image1: "/products/denim_jacket.jpg",
      image2: null,
    },
    {
      slug: "linen-lounge-pants",
      name: "Linen Lounge Pants",
      description: "Breathable European flax linen with a relaxed drape and drawstring waist. The ultimate off-duty essential.",
      price: 359000,
      sku: "APP-LIN-038",
      categorySlug: "apparel",
      image1: "/products/linen_pants.jpg",
      image2: null,
    },
    // ═══════════════ NEW OBJECTS (3 products) ═══════════════
    {
      slug: "brass-pen",
      name: "Machined Brass Pen",
      description: "Heavyweight solid brass rollerball pen that develops a beautiful patina over time. German ink cartridge.",
      price: 129000,
      sku: "OBJ-BRA-039",
      categorySlug: "objects",
      image1: "/products/brass_pen.jpg",
      image2: null,
    },
    {
      slug: "stone-bookends",
      name: "Travertine Bookends",
      description: "A pair of solid, unpolished travertine bookends carved into geometric arches.",
      price: 349000,
      sku: "OBJ-TRA-040",
      categorySlug: "objects",
      image1: "https://images.unsplash.com/photo-1544457070-4cd773b4d71e?w=600&h=800&fit=crop",
      image2: null,
    },
    {
      slug: "glass-carafe-set",
      name: "Fluted Carafe Set",
      description: "Mouth-blown fluted glass carafe with a matching tumbler that acts as a lid. Perfect for bedside water.",
      price: 219000,
      sku: "OBJ-GLA-041",
      categorySlug: "objects",
      image1: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600&h=800&fit=crop",
      image2: null,
    },
    // ═══════════════ NEW ACCESSORIES (3 products) ═══════════════
    {
      slug: "canvas-tote",
      name: "Heavy Canvas Utility Tote",
      description: "20oz cotton canvas with reinforced stitching and multiple interior pockets. Built for heavy daily use.",
      price: 499000,
      sku: "ACC-CAN-042",
      categorySlug: "accessories",
      image1: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&h=800&fit=crop",
      image2: null,
    },
    {
      slug: "silk-sleep-mask",
      name: "Mulberry Silk Sleep Mask",
      description: "100% pure mulberry silk mask. Blocks out light while being gentle on the skin and hair.",
      price: 119000,
      sku: "ACC-SIL-043",
      categorySlug: "accessories",
      image1: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=600&h=800&fit=crop",
      image2: null,
    },
    {
      slug: "silver-cuff",
      name: "Minimalist Silver Cuff",
      description: "Hand-forged 925 sterling silver cuff bracelet with a brushed matte finish. Adjustable fit.",
      price: 389000,
      sku: "ACC-SIL-044",
      categorySlug: "accessories",
      image1: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=800&fit=crop",
      image2: null,
    },
  ];

  for (const p of productsData) {
    const product = await prisma.product.upsert({
      where: { slug: p.slug },
      update: {
        name: p.name,
        description: p.description,
        price: p.price,
        comparePrice: p.comparePrice || null,
        sku: p.sku,
        images: {
          deleteMany: {},
          create: [
            { url: p.image1, order: 0 },
            ...(p.image2 ? [{ url: p.image2, order: 1 }] : []),
          ],
        },
      },
      create: {
        slug: p.slug,
        name: p.name,
        description: p.description,
        price: p.price,
        comparePrice: p.comparePrice || null,
        sku: p.sku,
        images: {
          create: [
            { url: p.image1, order: 0 },
            ...(p.image2 ? [{ url: p.image2, order: 1 }] : []),
          ],
        },
      },
    });

    const categoryId = categories[p.categorySlug]?.id;
    if (categoryId) {
      await prisma.productCategory.upsert({
        where: {
          productId_categoryId: {
            productId: product.id,
            categoryId: categoryId,
          },
        },
        update: {},
        create: {
          productId: product.id,
          categoryId: categoryId,
        },
      });
    }

    // Set Inventory
    await prisma.inventory.upsert({
      where: { productId: product.id },
      update: {},
      create: {
        productId: product.id,
        stock: Math.floor(Math.random() * 80) + 20,
      },
    });
  }

  // Create an Admin User
  const bcrypt = require("bcryptjs");
  const hashedPassword = await bcrypt.hash("password123", 12);
  
  await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL || "admin@veyra.com" },
    update: {
      password: hashedPassword,
    },
    create: {
      email: process.env.ADMIN_EMAIL || "admin@veyra.com",
      name: "Veyra Admin",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log(`Seeded ${productsData.length} products across ${Object.keys(categories).length} categories.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
