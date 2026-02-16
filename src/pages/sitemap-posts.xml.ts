import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const baseUrl = 'https://meilleur-choix.com';

  const blogPosts = await getCollection('blog');
  const blogEnPosts = await getCollection('blog-en');

  const frUrls = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}/`,
    lastmod: (post.data.updatedDate || post.data.date).toISOString().split('T')[0],
  }));

  const enUrls = blogEnPosts.map((post) => ({
    url: `${baseUrl}/en/blog/${post.slug}/`,
    lastmod: (post.data.updatedDate || post.data.date).toISOString().split('T')[0],
  }));

  const allUrls = [...frUrls, ...enUrls];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (entry) => `  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  });
};
