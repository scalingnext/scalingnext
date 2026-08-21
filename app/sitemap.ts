import { MetadataRoute } from 'next';

/**
 * sitemap.xml
 *
 * Only canonical, indexable URLs belong here. /twitter, /insta, and /yt are
 * deliberately excluded: they carry `robots: { index: false }` because all three
 * share the same H1 and body copy, and listing noindex URLs in a sitemap sends
 * Google contradictory signals.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://scalingnext.in';
  const currentDate = new Date();

  return [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];
}
