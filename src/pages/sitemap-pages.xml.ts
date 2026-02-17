import type { APIRoute } from 'astro';

export const GET: APIRoute = () => {
  const baseUrl = 'https://meilleur-classement.com';
  const today = new Date().toISOString().split('T')[0];

  const pages = [
    { url: '/', priority: '1.0' },
    { url: '/blog/', priority: '0.8' },
    { url: '/en/', priority: '0.9' },
    { url: '/en/blog/', priority: '0.8' },
    { url: '/categorie/saas-logiciels/', priority: '0.7' },
    { url: '/categorie/hebergement-cloud/', priority: '0.7' },
    { url: '/categorie/vpn-securite/', priority: '0.7' },
    { url: '/en/category/saas-software/', priority: '0.7' },
    { url: '/en/category/hosting-cloud/', priority: '0.7' },
    { url: '/en/category/vpn-security/', priority: '0.7' },
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  });
};
