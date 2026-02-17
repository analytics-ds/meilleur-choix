import type { Lang } from '@/config/site';

// Base path from Astro config (e.g. '/meilleur-choix' or '')
const base = (import.meta.env.BASE_URL ?? '/').replace(/\/$/, '');

export function withBase(path: string): string {
  if (!base || path.startsWith(base + '/') || path === base) return path;
  return `${base}${path}`;
}

function stripBase(path: string): string {
  if (base && path.startsWith(base)) {
    return path.slice(base.length) || '/';
  }
  return path;
}

// Mapping des slugs FR → EN
const slugMap: Record<string, string> = {
  // Ajouter les mappings ici au fur et à mesure
  // 'slug-francais': 'english-slug',
};

// Mapping inversé EN → FR
const slugMapReverse: Record<string, string> = Object.fromEntries(
  Object.entries(slugMap).map(([fr, en]) => [en, fr])
);

// Traductions de l'interface
const translations: Record<string, Record<Lang, string>> = {
  'site.title': { fr: 'Meilleur Classement', en: 'Meilleur Classement' },
  'site.tagline': { fr: 'Comparez, choisissez, avancez', en: 'Compare, choose, move forward' },
  'nav.home': { fr: 'Accueil', en: 'Home' },
  'nav.blog': { fr: 'Articles', en: 'Articles' },
  'nav.categories': { fr: 'Catégories', en: 'Categories' },
  'blog.title': { fr: 'Tous les articles', en: 'All articles' },
  'blog.description': { fr: 'Découvrez nos comparatifs et guides pour faire les meilleurs choix tech.', en: 'Discover our comparisons and guides to make the best tech choices.' },
  'article.publishedOn': { fr: 'Publié le', en: 'Published on' },
  'article.by': { fr: 'par', en: 'by' },
  'article.readMore': { fr: 'Lire la suite', en: 'Read more' },
  'article.faq': { fr: 'Questions fréquentes', en: 'Frequently asked questions' },
  'article.furtherReading': { fr: 'Pour aller plus loin', en: 'Further reading' },
  'article.backToBlog': { fr: '← Retour aux articles', en: '← Back to articles' },
  'category.title': { fr: 'Catégorie', en: 'Category' },
  'footer.rights': { fr: 'Tous droits réservés.', en: 'All rights reserved.' },
  'home.hero.title': { fr: 'Les meilleurs choix tech, testés et comparés', en: 'The best tech choices, tested and compared' },
  'home.hero.subtitle': { fr: 'Comparatifs indépendants de logiciels, hébergeurs et solutions de sécurité pour vous aider à décider.', en: 'Independent comparisons of software, hosting, and security solutions to help you decide.' },
  'home.latest': { fr: 'Derniers articles', en: 'Latest articles' },
  'home.viewAll': { fr: 'Voir tous les articles', en: 'View all articles' },
  'breadcrumb.home': { fr: 'Accueil', en: 'Home' },
  'breadcrumb.blog': { fr: 'Articles', en: 'Articles' },
  'lang.switch': { fr: 'EN', en: 'FR' },
  'lang.switchLabel': { fr: 'Switch to English', en: 'Passer en français' },
};

// Mapping catégories FR → EN
const categoryMap: Record<string, string> = {
  'saas-logiciels': 'saas-software',
  'hebergement-cloud': 'hosting-cloud',
  'vpn-securite': 'vpn-security',
};

const categoryMapReverse: Record<string, string> = Object.fromEntries(
  Object.entries(categoryMap).map(([fr, en]) => [en, fr])
);

const categoryNames: Record<string, Record<Lang, string>> = {
  'saas-logiciels': { fr: 'SaaS & Logiciels', en: 'SaaS & Software' },
  'hebergement-cloud': { fr: 'Hébergement & Cloud', en: 'Hosting & Cloud' },
  'vpn-securite': { fr: 'VPN & Sécurité', en: 'VPN & Security' },
};

export function getLang(url: URL | string): Lang {
  const pathname = typeof url === 'string' ? url : url.pathname;
  const clean = stripBase(pathname);
  return clean.startsWith('/en/') || clean === '/en' ? 'en' : 'fr';
}

export function t(lang: Lang, key: string): string {
  return translations[key]?.[lang] ?? key;
}

export function getAlternatePath(path: string): string {
  const clean = stripBase(path);

  if (clean.startsWith('/en/')) {
    // EN → FR
    const frPath = clean.replace('/en/', '/');
    const match = frPath.match(/^\/blog\/(.+?)\/$/);
    if (match && slugMapReverse[match[1]]) {
      return withBase(`/blog/${slugMapReverse[match[1]]}/`);
    }
    const catMatch = frPath.match(/^\/category\/(.+?)\/$/);
    if (catMatch && categoryMapReverse[catMatch[1]]) {
      return withBase(`/categorie/${categoryMapReverse[catMatch[1]]}/`);
    }
    return withBase(frPath.replace('/category/', '/categorie/'));
  } else {
    // FR → EN
    const enPath = '/en' + clean;
    const match = clean.match(/^\/blog\/(.+?)\/$/);
    if (match && slugMap[match[1]]) {
      return withBase(`/en/blog/${slugMap[match[1]]}/`);
    }
    const catMatch = clean.match(/^\/categorie\/(.+?)\/$/);
    if (catMatch && categoryMap[catMatch[1]]) {
      return withBase(`/en/category/${categoryMap[catMatch[1]]}/`);
    }
    return withBase(enPath.replace('/categorie/', '/category/'));
  }
}

export function getCollectionName(lang: Lang): 'blog' | 'blog-en' {
  return lang === 'fr' ? 'blog' : 'blog-en';
}

export function getDateLocale(lang: Lang): string {
  return lang === 'fr' ? 'fr-FR' : 'en-US';
}

export function formatDate(date: Date, lang: Lang): string {
  return date.toLocaleDateString(getDateLocale(lang), {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function getCategorySlug(categoryName: string): string {
  return categoryName
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/&/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export function getCategoryName(slug: string, lang: Lang): string {
  return categoryNames[slug]?.[lang] ?? slug;
}

export function getCategoryPath(slug: string, lang: Lang): string {
  if (lang === 'en') {
    const enSlug = categoryMap[slug] ?? slug;
    return withBase(`/en/category/${enSlug}/`);
  }
  return withBase(`/categorie/${slug}/`);
}

export function getBlogPath(lang: Lang): string {
  return withBase(lang === 'en' ? '/en/blog/' : '/blog/');
}

export function getArticlePath(slug: string, lang: Lang): string {
  return withBase(lang === 'en' ? `/en/blog/${slug}/` : `/blog/${slug}/`);
}

export function getHomePath(lang: Lang): string {
  return withBase(lang === 'en' ? '/en/' : '/');
}
