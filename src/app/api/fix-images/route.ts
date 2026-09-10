import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  if (searchParams.get("secret") !== "fixneonnow") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const before = await prisma.category.findMany();

    const updates = [
      { slug: "apparel", image: "/_assets/category_apparel.jpg" },
      { slug: "living", image: "/_assets/category_living.jpg" },
      { slug: "objects", image: "/_assets/category_objects.jpg" },
      { slug: "accessories", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=700&fit=crop" }
    ];

    for (const update of updates) {
      await prisma.category.updateMany({
        where: { slug: update.slug },
        data: { image: update.image }
      });
    }

    const after = await prisma.category.findMany();

    return NextResponse.json({ success: true, before, after });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
