import { MetadataRoute } from 'next';

/**
 * robots.txt
 *
 * AI crawlers are allowed explicitly rather than relying on the `*` wildcard.
 * A named group states intent unambiguously — several of these agents are
 * blocked by default on many sites, and naming them makes the permission
 * auditable.
 *
 * Two distinct jobs, often confused:
 *   - GPTBot / ClaudeBot / Google-Extended control TRAINING data collection.
 *   - OAI-SearchBot / PerplexityBot / ChatGPT-User fetch pages to CITE in live
 *     answers. These are the ones that matter for AI search visibility.
 *
 * Admin surfaces are disallowed for every agent. They already sit behind auth,
 * so this only stops well-behaved crawlers wasting requests on a 307.
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://scalingnext.in';

  const disallow = ['/admin', '/admin/', '/admin-agent', '/api/'];

  const aiAgents = [
    // Answer engines — these drive AI citations
    'OAI-SearchBot',
    'ChatGPT-User',
    'PerplexityBot',
    'Perplexity-User',
    'ClaudeBot',
    'Claude-User',
    'Claude-SearchBot',
    // Training / indexing crawlers
    'GPTBot',
    'Google-Extended',
    'Applebot-Extended',
    'anthropic-ai',
    'cohere-ai',
    'Meta-ExternalAgent',
    'Bytespider',
    // Research crawler behind many AI datasets
    'CCBot',
  ];

  return {
    rules: [
      { userAgent: '*', allow: '/', disallow },
      ...aiAgents.map((userAgent) => ({ userAgent, allow: '/', disallow })),
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
