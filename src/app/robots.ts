import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://herbhosman.com/sitemap.xml",
    host: "https://herbhosman.com",
  };
}
