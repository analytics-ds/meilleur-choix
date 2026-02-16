# Checklist SEO / GEO technique

## 1. Données structurées (Schema.org JSON-LD)

### Organization
- [ ] `@type`: "Organization"
- [ ] `name` : nom de la marque
- [ ] `url` : URL du site
- [ ] `logo` : URL absolue du logo
- [ ] `foundingDate` : année de fondation
- [ ] `address` : PostalAddress complète
- [ ] `numberOfEmployees` : fourchette
- [ ] `sameAs` : tableau avec LinkedIn, réseaux sociaux
- [ ] `knowsAbout` : domaines d'expertise

### Person (auteur)
- [ ] `@type`: "Person"
- [ ] `name` : nom complet
- [ ] `jobTitle` : titre professionnel
- [ ] `worksFor` : référence à l'Organization
- [ ] `url` : URL profil (LinkedIn)
- [ ] `sameAs` : réseaux sociaux
- [ ] `knowsAbout` : domaines d'expertise

### Article
- [ ] `@type`: "Article"
- [ ] `headline` : titre de l'article
- [ ] `description` : meta description
- [ ] `datePublished` : ISO 8601
- [ ] `dateModified` : ISO 8601 (si mis à jour)
- [ ] `author` : référence Person ou Organization
- [ ] `publisher` : référence Organization avec logo
- [ ] `mainEntityOfPage` : URL canonique
- [ ] `image` : image de l'article (si disponible)

### BreadcrumbList
- [ ] `@type`: "BreadcrumbList"
- [ ] `itemListElement` : tableau de ListItem
- [ ] Chaque item : position, name, item (URL)
- [ ] Commence par "Accueil" / "Home"
- [ ] Chemin complet : Accueil > Blog > Article

### FAQPage
- [ ] `@type`: "FAQPage"
- [ ] `mainEntity` : tableau de Question
- [ ] Chaque Question : `name` (question) + `acceptedAnswer.text` (réponse)
- [ ] Présent uniquement si l'article a des FAQ
- [ ] Contenu identique entre JSON-LD et accordéon visible

### WebSite
- [ ] `@type`: "WebSite"
- [ ] `name` : nom du site
- [ ] `url` : URL du site
- [ ] `publisher` : référence Organization
- [ ] `inLanguage` : langue de la page

## 2. Balises meta

### Chaque page
- [ ] `<title>` unique (< 60 caractères)
- [ ] `<meta name="description">` unique (< 160 caractères)
- [ ] `<meta name="viewport" content="width=device-width, initial-scale=1">`
- [ ] `<meta charset="utf-8">`
- [ ] `<link rel="canonical" href="...">`

### Open Graph
- [ ] `og:type` : "website" ou "article"
- [ ] `og:url` : URL canonique
- [ ] `og:title` : titre
- [ ] `og:description` : description
- [ ] `og:image` : URL absolue de l'image
- [ ] `og:site_name` : nom du site
- [ ] `og:locale` : "fr_FR" ou "en_US"
- [ ] `og:locale:alternate` : la locale alternative

### Articles uniquement
- [ ] `article:published_time` : ISO 8601
- [ ] `article:modified_time` : ISO 8601 (si modifié)
- [ ] `<meta name="author">` : nom de l'auteur

### Hreflang (si multilingue)
- [ ] `<link rel="alternate" hreflang="fr" href="...">`
- [ ] `<link rel="alternate" hreflang="en" href="...">`
- [ ] `<link rel="alternate" hreflang="x-default" href="...">` (pointe vers la langue principale)

## 3. Fichiers techniques

### robots.txt
```
User-agent: *
Allow: /

Sitemap: https://{{domain}}/sitemap.xml
```

### sitemap.xml
- [ ] Sitemap index pointant vers les sous-sitemaps
- [ ] `sitemap-posts.xml` : tous les articles (FR + EN)
- [ ] `sitemap-pages.xml` : pages statiques + catégories
- [ ] Chaque URL a `<lastmod>` avec date ISO
- [ ] URLs absolues avec protocole HTTPS
- [ ] XSL stylesheet pour rendu visuel (optionnel mais recommandé)

### llms.txt
Fichier à la racine pour informer les IA crawlers :
```
# {{site_name}}

> {{tagline}}

## Auteurs
- {{author_name}} : {{author_role}}

## Catégories
- {{category_1}}
- {{category_2}}

## Articles
- [Titre](https://{{domain}}/blog/slug/) : Description courte
```

### CNAME
Fichier contenant uniquement le domaine custom :
```
{{domain}}
```

### Favicons
- [ ] `favicon.ico` (multi-résolution)
- [ ] `favicon.svg` (vectoriel)
- [ ] `favicon.png` (48x48)
- [ ] `favicon-16x16.png`
- [ ] `favicon-32x32.png`
- [ ] `favicon-192x192.png` (Android)
- [ ] `apple-touch-icon.png` (180x180, iOS)

## 4. Performance

### Critères
- [ ] 0 JavaScript côté client (sauf menu mobile)
- [ ] CSS inline dans les composants Astro (scoped)
- [ ] CSS global minimal (design system)
- [ ] Google Fonts avec `preconnect`
- [ ] `display=swap` sur les fonts
- [ ] Pas d'images lourdes (ou lazy-load si images)
- [ ] HTML sémantique (`<header>`, `<main>`, `<footer>`, `<article>`, `<nav>`)

### Build
- [ ] `npm run build` sans erreur
- [ ] Vérifier le nombre de pages générées
- [ ] Output = fichiers statiques HTML/CSS uniquement

## 5. Accessibilité

- [ ] Structure de headings logique (H1 > H2 > H3)
- [ ] `aria-label` sur les éléments interactifs
- [ ] `aria-expanded` sur le menu mobile
- [ ] `.sr-only` pour textes accessibles cachés visuellement
- [ ] `alt` sur toutes les images
- [ ] Contraste suffisant des couleurs
- [ ] Navigation au clavier fonctionnelle

## 6. Internationalisation

- [ ] Langue déclarée `<html lang="fr">` ou `<html lang="en">`
- [ ] Hreflang bidirectionnel (FR pointe vers EN et inversement)
- [ ] x-default pointe vers la langue principale
- [ ] Dates formatées selon la locale (`fr-FR` / `en-US`)
- [ ] Slugs adaptés par langue (pas de traduction littérale)
- [ ] Mapping complet dans `i18n.ts`
- [ ] Traductions UI complètes (header, footer, boutons, labels)
- [ ] Catégories localisées ("categorie" FR / "category" EN)

## 7. Vérifications post-déploiement

### Outils
- [ ] [Google Search Console](https://search.google.com/search-console) : soumettre le sitemap
- [ ] [Schema.org Validator](https://validator.schema.org/) : valider le JSON-LD
- [ ] [Rich Results Test](https://search.google.com/test/rich-results) : tester les rich snippets
- [ ] [OpenGraph Debugger](https://www.opengraph.xyz/) : vérifier les meta OG
- [ ] [PageSpeed Insights](https://pagespeed.web.dev/) : performance
- [ ] [Bing Webmaster Tools](https://www.bing.com/webmasters) : soumettre le sitemap

### Tests manuels
- [ ] Naviguer sur toutes les pages (FR + EN)
- [ ] Vérifier le switch de langue
- [ ] Tester le menu mobile
- [ ] Vérifier les liens internes (pas de 404)
- [ ] Ouvrir le sitemap.xml dans le navigateur
- [ ] Vérifier les FAQ accordéon (ouvrir/fermer)
- [ ] Tester les breadcrumbs
