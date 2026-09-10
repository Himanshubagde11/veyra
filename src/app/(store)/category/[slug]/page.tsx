import { redirect } from "next/navigation";

// Redirect old /category/[slug] URLs to /categories/[slug]
export default async function CategoryRedirect({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  redirect(`/categories/${slug}`);
}
