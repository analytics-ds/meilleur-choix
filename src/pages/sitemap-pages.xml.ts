import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { siteConfig } from '@/config/site';
import { getCategorySlug, toEnCategorySlug } from '@/utils/i18n';

export const GET: APIRoute = async () => {
  const baseUrl = `https://${siteConfig.brand.domain}`;

  const pages: Array<{ url: string; priority: string; changefreq: string }> = [
    { url: '/', priority: '1.0', changefreq: 'daily' },
    { url: '/blog/', priority: '0.8', changefreq: 'weekly' },
    { url: '/plan-du-site/', priority: '0.6', changefreq: 'weekly' },
    { url: '/en/', priority: '0.9', changefreq: 'daily' },
    { url: '/en/blog/', priority: '0.8', changefreq: 'weekly' },
    { url: '/en/sitemap/', priority: '0.6', changefreq: 'weekly' },
  ];

  const frPosts = await getCollection('blog');
  const enPosts = await getCollection('blog-en');

  // FR category pages = config categories + categories used by FR articles
  // (mirrors getStaticPaths in src/pages/categorie/[categorie].astro)
  const frSlugs = new Set<string>();
  siteConfig.categories.forEach((cat) => frSlugs.add(getCategorySlug(cat)));
  frPosts.forEach((post) => frSlugs.add(getCategorySlug(post.data.category)));

  // EN category pages = config categories (mapped) + categories used by EN articles
  // (mirrors getStaticPaths in src/pages/en/category/[category].astro)
  const enSlugs = new Set<string>();
  siteConfig.categories.forEach((cat) => enSlugs.add(toEnCategorySlug(getCategorySlug(cat))));
  enPosts.forEach((post) => enSlugs.add(toEnCategorySlug(getCategorySlug(post.data.category))));

  for (const frSlug of frSlugs) {
    pages.push({ url: `/categorie/${frSlug}/`, priority: '0.7', changefreq: 'monthly' });
  }
  for (const enSlug of enSlugs) {
    pages.push({ url: `/en/category/${enSlug}/`, priority: '0.7', changefreq: 'monthly' });
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  });
};
