import type { Lang } from '@/config/site';

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
  'site.title': { fr: 'Meilleur Choix', en: 'Meilleur Choix' },
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
  return pathname.startsWith('/en/') || pathname === '/en' ? 'en' : 'fr';
}

export function t(lang: Lang, key: string): string {
  return translations[key]?.[lang] ?? key;
}

export function getAlternatePath(path: string): string {
  if (path.startsWith('/en/')) {
    // EN → FR
    const frPath = path.replace('/en/', '/');
    // Check blog slug mapping
    const match = frPath.match(/^\/blog\/(.+?)\/$/);
    if (match && slugMapReverse[match[1]]) {
      return `/blog/${slugMapReverse[match[1]]}/`;
    }
    // Check category mapping
    const catMatch = frPath.match(/^\/category\/(.+?)\/$/);
    if (catMatch && categoryMapReverse[catMatch[1]]) {
      return `/categorie/${categoryMapReverse[catMatch[1]]}/`;
    }
    return frPath.replace('/category/', '/categorie/');
  } else {
    // FR → EN
    const enPath = '/en' + path;
    // Check blog slug mapping
    const match = path.match(/^\/blog\/(.+?)\/$/);
    if (match && slugMap[match[1]]) {
      return `/en/blog/${slugMap[match[1]]}/`;
    }
    // Check category mapping
    const catMatch = path.match(/^\/categorie\/(.+?)\/$/);
    if (catMatch && categoryMap[catMatch[1]]) {
      return `/en/category/${categoryMap[catMatch[1]]}/`;
    }
    return enPath.replace('/categorie/', '/category/');
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
    return `/en/category/${enSlug}/`;
  }
  return `/categorie/${slug}/`;
}

export function getBlogPath(lang: Lang): string {
  return lang === 'en' ? '/en/blog/' : '/blog/';
}

export function getArticlePath(slug: string, lang: Lang): string {
  return lang === 'en' ? `/en/blog/${slug}/` : `/blog/${slug}/`;
}
