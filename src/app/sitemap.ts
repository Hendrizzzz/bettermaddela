import type { MetadataRoute } from "next";
import { getRecord } from "@/data/civic";
import { serviceCategories } from "@/lib/service-categories";
import { slugify } from "@/lib/slugify";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

interface BarangayDataset {
  barangayCount: number;
  barangays: { name: string; psgcCode: string; population: number }[];
}

const barangays = getRecord<BarangayDataset>("barangay-dataset-2026q2");

const staticRoutes = [
  "/",
  "/accessibility",
  "/barangays",
  "/budget",
  "/contact",
  "/faq",
  "/government",
  "/government/officials",
  "/legal-history",
  "/legislative",
  "/legislative/ordinance-framework",
  "/legislative/resolution-framework",
  "/news",
  "/population",
  "/privacy",
  "/security",
  "/services",
  "/sitemap",
  "/sources",
  "/statistics",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    ...staticRoutes,
    ...Object.keys(serviceCategories).map((category) => `/services/${category}`),
    ...barangays.data.barangays.map((barangay) => `/government/barangays/${slugify(barangay.name)}`),
  ];

  return paths.map((path) => ({
    url: `${SITE_URL}${path === "/" ? "/" : `${path}/`}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
