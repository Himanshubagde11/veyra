"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createCategory(formData: FormData) {
  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;
  const description = formData.get("description") as string;

  if (!name || !slug) {
    return { error: "Name and slug are required" };
  }

  try {
    await prisma.category.create({
      data: {
        name,
        slug,
        description,
      },
    });

    revalidatePath("/admin/categories");
    return { success: true };
  } catch (error) {
    return { error: "Failed to create category. Slug might already exist." };
  }
}

export async function deleteCategory(id: string) {
  try {
    await prisma.category.delete({
      where: { id },
    });
    revalidatePath("/admin/categories");
    return { success: true };
  } catch (error) {
    return { error: "Failed to delete category." };
  }
}
