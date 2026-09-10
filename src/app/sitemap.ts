import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://veyra.com";

  // Static pages
  const staticPages = [
    "",
    "/shop",
    "/discover",
    "/search",
    "/category/fashion",
    "/category/accessories",
    "/category/home",
    "/category/technology",
    "/category/beauty",
    "/category/lifestyle",
    "/category/stationery",
    "/category/everyday-essentials",
    "/category/new-arrivals",
    "/category/trending",
  ];

  const routes: MetadataRoute.Sitemap = staticPages.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1 : 0.8,
  }));

  // Dynamic product pages will be added in Phase 4 from the database

  return routes;
}
