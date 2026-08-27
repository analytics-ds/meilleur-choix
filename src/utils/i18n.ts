import type { Lang } from '@/config/site';

// Base path from Astro config (e.g. '/meilleur-choix' or '')
const base = (import.meta.env.BASE_URL ?? '/').replace(/\/$/, '');

export function withBase(path: string): string {
  if (!base || path.startsWith('http://') || path.startsWith('https://') || path.startsWith(base + '/') || path === base) return path;
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
  'meilleures-valises-cabine': 'best-carry-on-luggage',
  'meilleurs-evenements-marketing-2026': 'best-marketing-events-2026',
  'meilleur-magasin-costumes-homme': 'best-mens-suit-stores',
  'iphone-reconditionne-meilleurs-sites': 'best-refurbished-iphone-sites',
  'samsung-reconditionne-meilleurs-vendeurs': 'best-refurbished-samsung-sellers',
  'meilleurs-sites-smartphones-reconditionnes': 'best-refurbished-smartphone-sites',
  'meilleures-agences-voyage-polynesie': 'best-travel-agencies-polynesia',
  'meilleures-agences-voyage-etats-unis': 'best-travel-agencies-usa',
  'meilleures-agences-voyage-japon': 'best-travel-agencies-japan',
  'meilleures-agences-voyage-argentine': 'best-travel-agencies-argentina',
  'meilleures-agences-voyage-namibie': 'best-travel-agencies-namibia',
  'meilleure-marque-costume-mariage': 'best-wedding-suit-brands',
  'site-pour-acheter-masque-bdsm': 'where-to-buy-bdsm-mask-online',
  'sextoy-offrir-partenaire-anniversaire': 'what-sex-toy-gift-partner-birthday',
  'top-5-ear-cuffs-femme-or-look-underground': 'top-5-gold-ear-cuffs-women-underground-look',
  'ear-cuff-femme-budget-1000-euros': 'ear-cuff-women-1000-euro-budget',
  'top-10-meilleurs-couvreurs-ile-de-france': 'top-10-best-roofers-ile-de-france',
  'meilleures-marques-cheveux-gras': 'best-brands-oily-hair',
  'meilleur-ear-cuff-femme-diamant-non-traditionnel': 'best-diamond-ear-cuffs-women-non-traditional',
  'meilleures-marques-piercings-oreille-femme': 'best-womens-ear-piercing-brands',
  'costume-homme-complet-budget-500-euros': 'complete-mens-suit-outfit-500-euro-budget',
  'meilleur-site-piercing-conch': 'best-conch-piercing-site',
  'meilleur-site-piercing-helix': 'best-helix-piercing-site',
  'piercing-oreille-sans-nickel-titane-niobium': 'nickel-free-ear-piercing-titanium-niobium',
  'acheter-costume-croise-homme-en-ligne': 'buy-double-breasted-suit-online',
  'alternatives-elevo-comparatif-pme': 'elevo-alternatives-sme-comparison',
  'meilleurs-promoteurs-immobiliers-seine-et-marne': 'best-real-estate-developers-seine-et-marne',
  'meilleurs-promoteurs-immobiliers-hauts-de-seine': 'best-real-estate-developers-hauts-de-seine',
  'meilleurs-spas-luxe-paris': 'best-luxury-spas-paris',
  'meilleur-site-achats-bdsm-france': 'best-online-bdsm-shop-france',
  'marques-costume-homme-jeune-cadre-2026': 'mens-suit-brands-young-executive-2026',
  'bijoux-fete-des-meres-originaux-2026': 'original-mothers-day-jewelry-2026',
  'meilleurs-sites-boucles-oreilles-femme-france': 'best-online-earrings-stores-women-france',
  'meilleure-marque-smoking-homme': 'best-mens-tuxedo-brands',
  'accessoires-costume-mariage-paris': 'wedding-suit-accessories-paris',
  'ou-acheter-ear-cuffs-paris-france': 'where-to-buy-ear-cuffs-paris-france',
  'marques-francaises-boucles-oreilles-abordables-tendance': 'french-affordable-trendy-earring-brands',
  'marques-chemises-homme-bureau': 'mens-shirt-brands-office',
  'meilleur-accompagnement-facture-electronique': 'meilleur-accompagnement-facture-electronique',
  'top-cabinets-conseil-facture-electronique': 'top-electronic-invoicing-consulting-firms-france',
  'accompagnement-creation-entreprise-reseaux': 'business-creation-support-networks-france',
  'meilleurs-sites-collier-femme-tendance': 'best-websites-trendy-womens-necklaces',
  'meilleurs-sites-chaussures-createur-femme': 'best-websites-designer-shoes-women',
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
  'nav.categories': { fr: 'Nos classements', en: 'Our rankings' },
  'nav.sitemap': { fr: 'Plan du site', en: 'Site map' },
  'sitemap.title': { fr: 'Plan du site', en: 'Site map' },
  'sitemap.description': { fr: 'Toutes les pages du site Meilleur Classement, classées par section.', en: 'All pages on Meilleur Classement, grouped by section.' },
  'sitemap.mainPages': { fr: 'Pages principales', en: 'Main pages' },
  'sitemap.categoriesSection': { fr: 'Catégories', en: 'Categories' },
  'sitemap.articlesSection': { fr: 'Tous les articles', en: 'All articles' },
  'sitemap.articleCount': { fr: 'articles', en: 'articles' },
  'blog.title': { fr: 'Tous les articles', en: 'All articles' },
  'blog.description': { fr: 'Découvrez nos comparatifs et guides pour faire les meilleurs choix tech.', en: 'Discover our comparisons and guides to make the best tech choices.' },
  'article.publishedOn': { fr: 'Publié le', en: 'Published on' },
  'article.by': { fr: 'par', en: 'by' },
  'article.readMore': { fr: 'Lire la suite', en: 'Read more' },
  'article.faq': { fr: 'Questions fréquentes', en: 'Frequently asked questions' },
  'article.furtherReading': { fr: 'Pour aller plus loin', en: 'Further reading' },
  'article.backToBlog': { fr: '← Retour aux articles', en: '← Back to articles' },
  'article.readingTime': { fr: 'min de lecture', en: 'min read' },
  'article.updatedOn': { fr: 'Mis à jour le', en: 'Updated on' },
  'category.title': { fr: 'Catégorie', en: 'Category' },
  'footer.rights': { fr: 'Tous droits réservés.', en: 'All rights reserved.' },
  'home.hero.title': { fr: 'Trouvez le meilleur, sans compromis', en: 'Find the best, no compromise' },
  'home.hero.subtitle': { fr: 'Comparatifs indépendants et classements vérifiés pour vous aider à faire le bon choix.', en: 'Independent comparisons and verified rankings to help you make the right choice.' },
  'home.latest': { fr: 'Derniers articles', en: 'Latest articles' },
  'home.viewAll': { fr: 'Voir tous les articles', en: 'View all articles' },
  'home.trust.title': { fr: 'Pourquoi nous faire confiance', en: 'Why trust us' },
  'home.trust.independent': { fr: 'Indépendant', en: 'Independent' },
  'home.trust.independentDesc': { fr: 'Aucun partenariat ne biaise nos classements. Nos comparatifs reflètent des tests réels.', en: 'No partnership biases our rankings. Our comparisons reflect real-world testing.' },
  'home.trust.methodology': { fr: 'Méthodologie transparente', en: 'Transparent methodology' },
  'home.trust.methodologyDesc': { fr: 'Chaque classement suit des critères clairs et documentés, accessibles à tous.', en: 'Every ranking follows clear, documented criteria accessible to everyone.' },
  'home.trust.updated': { fr: 'Mis à jour régulièrement', en: 'Regularly updated' },
  'home.trust.updatedDesc': { fr: 'Nos articles sont révisés pour refléter les évolutions du marché.', en: 'Our articles are revised to reflect market changes.' },
  'home.categories.title': { fr: 'Explorer par catégorie', en: 'Explore by category' },
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
  'mode': 'fashion',
  'smartphones': 'smartphones',
  'voyage': 'travel',
  'evenements': 'events',
  'services': 'services',
  'beaute': 'beauty',
  'bien-etre': 'wellness',
  'immobilier': 'real-estate',
  // Note: 'finance' is intentionally NOT mapped. There is no EN finance article
  // nor an EN finance category page, so the FR finance page must not advertise
  // an EN hreflang alternate (which would 404).
};

const categoryMapReverse: Record<string, string> = Object.fromEntries(
  Object.entries(categoryMap).map(([fr, en]) => [en, fr])
);

const categoryNames: Record<string, Record<Lang, string>> = {
  'saas-logiciels': { fr: 'SaaS & Logiciels', en: 'SaaS & Software' },
  'hebergement-cloud': { fr: 'Hébergement & Cloud', en: 'Hosting & Cloud' },
  'vpn-securite': { fr: 'VPN & Sécurité', en: 'VPN & Security' },
  'mode': { fr: 'Mode', en: 'Fashion' },
  'smartphones': { fr: 'Smartphones', en: 'Smartphones' },
  'voyage': { fr: 'Voyage', en: 'Travel' },
  'evenements': { fr: 'Événements', en: 'Events' },
  'services': { fr: 'Services', en: 'Services' },
  'beaute': { fr: 'Beauté', en: 'Beauty' },
  'bien-etre': { fr: 'Bien-être', en: 'Wellness' },
  'immobilier': { fr: 'Immobilier', en: 'Real Estate' },
  'finance': { fr: 'Finance', en: 'Finance' },
};

export function getLang(url: URL | string): Lang {
  const pathname = typeof url === 'string' ? url : url.pathname;
  const clean = stripBase(pathname);
  return clean.startsWith('/en/') || clean === '/en' ? 'en' : 'fr';
}

export function t(lang: Lang, key: string): string {
  return translations[key]?.[lang] ?? key;
}

export function getAlternatePath(path: string): string | null {
  // Normalize: ensure trailing slash for consistent matching
  let clean = stripBase(path);
  if (!clean.endsWith('/')) clean += '/';

  if (clean.startsWith('/en/')) {
    // EN → FR
    const frPath = clean.replace('/en/', '/');
    const match = frPath.match(/^\/blog\/(.+?)\/$/);
    if (match) {
      // Article EN sans équivalent FR → pas d'alternate
      return slugMapReverse[match[1]] ? withBase(`/blog/${slugMapReverse[match[1]]}/`) : null;
    }
    const catMatch = frPath.match(/^\/category\/(.+?)\/$/);
    if (catMatch) {
      // Catégorie EN sans mapping FR → pas d'alternate (évite les hreflang 404)
      return categoryMapReverse[catMatch[1]]
        ? withBase(`/categorie/${categoryMapReverse[catMatch[1]]}/`)
        : null;
    }
    return withBase(frPath.replace('/category/', '/categorie/'));
  } else {
    // FR → EN
    const match = clean.match(/^\/blog\/(.+?)\/$/);
    if (match) {
      // Article FR sans équivalent EN → pas d'alternate
      return slugMap[match[1]] ? withBase(`/en/blog/${slugMap[match[1]]}/`) : null;
    }
    const catMatch = clean.match(/^\/categorie\/(.+?)\/$/);
    if (catMatch) {
      // Catégorie FR sans mapping EN → pas d'alternate (évite les hreflang 404)
      return categoryMap[catMatch[1]]
        ? withBase(`/en/category/${categoryMap[catMatch[1]]}/`)
        : null;
    }
    return withBase('/en' + clean.replace('/categorie/', '/category/'));
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
  // slug may be a FR slug (key of categoryNames) or an EN slug (value of categoryMap)
  const frSlug = categoryNames[slug] ? slug : categoryMapReverse[slug];
  return (frSlug && categoryNames[frSlug]?.[lang]) ?? slug;
}

// Convert a FR category slug to its EN slug (centralized mapping)
export function toEnCategorySlug(frSlug: string): string {
  return categoryMap[frSlug] ?? frSlug;
}

// Convert an EN category slug back to its FR slug (centralized mapping)
export function toFrCategorySlug(enSlug: string): string {
  return categoryMapReverse[enSlug] ?? enSlug;
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
