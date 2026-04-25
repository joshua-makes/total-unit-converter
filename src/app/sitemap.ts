import type { MetadataRoute } from 'next';
import { CATEGORIES, type Category } from '@/lib/units';

const SITE_URL = 'https://www.quickunitswap.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const categoryRoutes = (Object.keys(CATEGORIES) as Category[]).map((cat) => ({
    url: `${SITE_URL}/?c=${cat}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...categoryRoutes,
  ];
}
