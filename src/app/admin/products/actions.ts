"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

export async function uploadImage(formData: FormData) {
  const file = formData.get("file") as File;
  
  if (!file) {
    return { error: "No file uploaded" };
  }
  
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  
  // Make sure public/uploads exists
  const uploadsDir = join(process.cwd(), "public", "uploads");
  if (!existsSync(uploadsDir)) {
    await mkdir(uploadsDir, { recursive: true });
  }

  // Create a unique filename
  const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
  const filepath = join(uploadsDir, filename);

  try {
    await writeFile(filepath, buffer);
    return { url: `/uploads/${filename}` };
  } catch (error) {
    console.error("Error uploading image:", error);
    return { error: "Failed to upload image" };
  }
}

export async function createProduct(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const slug = formData.get("slug") as string;
    const sku = formData.get("sku") as string;
    const description = formData.get("description") as string;
    const priceStr = formData.get("price") as string;
    const comparePriceStr = formData.get("comparePrice") as string;
    const isPublished = formData.get("isPublished") === "true";
    const categoryIds = formData.getAll("categories") as string[];
    const imageUrl = formData.get("imageUrl") as string;
    const stockStr = formData.get("stock") as string;

    const price = parseInt(priceStr, 10);
    const comparePrice = comparePriceStr ? parseInt(comparePriceStr, 10) : null;
    const stock = stockStr ? parseInt(stockStr, 10) : 0;

    if (!name || !slug || !sku || isNaN(price)) {
      return { error: "Missing required fields" };
    }

    const product = await prisma.product.create({
      data: {
        name,
        slug,
        sku,
        description,
        price,
        comparePrice,
        isPublished,
        categories: {
          create: categoryIds.map((id) => ({
            category: { connect: { id } },
          })),
        },
        images: imageUrl ? {
          create: [{ url: imageUrl, order: 0 }]
        } : undefined,
        inventory: {
          create: {
            stock: stock,
          }
        }
      },
    });

    revalidatePath("/admin/products");
    return { success: true, productId: product.id };
  } catch (error: any) {
    console.error("Failed to create product:", error);
    return { error: error.message || "Failed to create product" };
  }
}

export async function updateProduct(id: string, formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const slug = formData.get("slug") as string;
    const sku = formData.get("sku") as string;
    const description = formData.get("description") as string;
    const priceStr = formData.get("price") as string;
    const comparePriceStr = formData.get("comparePrice") as string;
    const isPublished = formData.get("isPublished") === "true";
    const categoryIds = formData.getAll("categories") as string[];
    const imageUrl = formData.get("imageUrl") as string;
    const stockStr = formData.get("stock") as string;

    const price = parseInt(priceStr, 10);
    const comparePrice = comparePriceStr ? parseInt(comparePriceStr, 10) : null;
    const stock = stockStr ? parseInt(stockStr, 10) : 0;

    if (!name || !slug || !sku || isNaN(price)) {
      return { error: "Missing required fields" };
    }

    // First delete existing category links (simple approach)
    await prisma.productCategory.deleteMany({
      where: { productId: id },
    });

    // Update product
    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        slug,
        sku,
        description,
        price,
        comparePrice,
        isPublished,
        categories: {
          create: categoryIds.map((categoryId) => ({
            category: { connect: { id: categoryId } },
          })),
        },
      },
    });

    // Update stock
    await prisma.inventory.upsert({
      where: { productId: id },
      update: { stock },
      create: { productId: id, stock }
    });

    // If a new image URL is provided, we'll just add it as the primary image for now
    // A full implementation would allow managing multiple images
    if (imageUrl) {
      await prisma.productImage.create({
        data: {
          productId: id,
          url: imageUrl,
          order: 0,
        },
      });
    }

    revalidatePath("/admin/products");
    revalidatePath(`/admin/products/${id}`);
    revalidatePath(`/products/${slug}`);
    
    return { success: true };
  } catch (error: any) {
    console.error("Failed to update product:", error);
    return { error: error.message || "Failed to update product" };
  }
}

export async function toggleProductPublish(id: string, isPublished: boolean) {
  try {
    await prisma.product.update({
      where: { id },
      data: { isPublished },
    });
    revalidatePath("/admin/products");
    return { success: true };
  } catch (error) {
    return { error: "Failed to update product status" };
  }
}

export async function deleteProduct(id: string) {
  try {
    await prisma.product.delete({
      where: { id },
    });
    revalidatePath("/admin/products");
    return { success: true };
  } catch (error) {
    return { error: "Failed to delete product" };
  }
}
