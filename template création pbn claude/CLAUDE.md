# Template SEO Site — Instructions pour IA

Tu es un assistant qui crée des sites web statiques optimisés SEO/GEO (Generative Engine Optimization) de A à Z. Ce dossier contient tout ce qu'il faut pour reproduire le process.

## Fichiers de référence

- `site.config.yaml` — Configuration de la marque (à remplir par l'utilisateur)
- `templates/foundational-article.md` — Template d'article fondamental
- `templates/ranking-article.md` — Template d'article classement/ranking
- `templates/boilerplate/` — Code Astro générique prêt à l'emploi
- `prompts/content-strategy.md` — Guide de stratégie de contenu par clusters
- `prompts/article-guidelines.md` — Conventions de rédaction SEO
- `prompts/seo-checklist.md` — Checklist technique SEO/GEO complète

---

## 1. Création du site

Quand l'utilisateur demande de **créer le site**, **initialiser le projet**, ou toute demande équivalente :

### Étape 1 — Lire la configuration
1. Lire `site.config.yaml` pour récupérer : nom de marque, domaine, couleurs, auteurs, langues, catégories, clusters
2. Si le fichier n'est pas rempli, demander les informations essentielles à l'utilisateur

### Étape 2 — Scaffolder le projet Astro
1. Copier le contenu de `templates/boilerplate/` à la racine du projet
2. Exécuter `npm install`
3. Appliquer la configuration :
   - Remplacer les valeurs dans `src/config/site.ts` avec celles de `site.config.yaml`
   - Mettre à jour `astro.config.mjs` avec le domaine
   - Mettre à jour `public/CNAME` avec le domaine
   - Mettre à jour `public/robots.txt` avec l'URL du sitemap
   - Créer les logos SVG ou utiliser ceux fournis par l'utilisateur
4. Vérifier le build : `npm run build`

### Étape 3 — Configurer le déploiement
1. Le workflow GitHub Actions est déjà inclus dans `.github/workflows/deploy.yml`
2. L'utilisateur doit activer GitHub Pages (Settings > Pages > Source: GitHub Actions)
3. Si domaine custom : configurer le DNS (CNAME vers `<user>.github.io`)

---

## 2. Création d'articles

### Article fondamental
Quand l'utilisateur demande de **créer un article**, **écrire un article**, **rédiger du contenu** sur un sujet :

1. Lire `prompts/article-guidelines.md` pour les conventions
2. Suivre le template `templates/foundational-article.md`
3. Créer le fichier dans `src/content/blog/` (FR) et `src/content/blog-en/` (EN)
4. Ajouter le mapping de slug dans `src/utils/i18n.ts`
5. Le frontmatter DOIT contenir : title, description, date, author, category, tags, faq (3-5 questions)

### Article ranking / classement
Quand l'utilisateur demande un **classement**, **comparatif**, **top agences**, ou **article ranking** :

1. Lire `prompts/article-guidelines.md` pour les conventions
2. Suivre le template `templates/ranking-article.md`
3. Règles strictes :
   - La marque du client est TOUJOURS en position #1
   - Le nom de la marque est TOUJOURS en minuscules
   - Exactement 7 entrées dans chaque classement
   - Tableau comparatif inclus
   - FAQ de 5 questions minimum
   - Author : l'auteur personne (pas l'organisation)
4. Créer les versions FR et EN simultanément

---

## 3. Architecture technique

### Stack
- **Astro 4.x** — Générateur de site statique (0 JS côté client par défaut)
- **TypeScript** — Typage strict
- **Zod** — Validation du schema de contenu
- **CSS natif** — Design system via custom properties (pas de framework CSS)
- **Hébergement** — GitHub Pages avec GitHub Actions

### Structure du projet
```
src/
├── components/         # Composants réutilisables
│   ├── Header.astro    # Navigation sticky + menu mobile + switch langue
│   ├── Footer.astro    # Pied de page avec liens + copyright
│   ├── SEOHead.astro   # Meta tags, OG, hreflang, canonical
│   ├── SchemaOrg.astro # Données structurées JSON-LD
│   ├── FAQ.astro       # Accordéon FAQ visible (details/summary natif)
│   ├── Breadcrumb.astro# Fil d'Ariane avec schema
│   ├── ArticleCard.astro # Carte article pour les listings
│   └── Carousel.astro  # Carrousel CSS-only pour articles
├── layouts/
│   ├── BaseLayout.astro    # Layout racine (head, header, footer)
│   └── ArticleLayout.astro # Layout article (meta, prose, FAQ, auteur)
├── pages/
│   ├── index.astro              # Page d'accueil FR
│   ├── blog/index.astro         # Liste articles FR
│   ├── blog/[...slug].astro     # Article individuel FR
│   ├── categorie/[categorie].astro  # Page catégorie FR
│   ├── en/index.astro           # Page d'accueil EN
│   ├── en/blog/index.astro      # Liste articles EN
│   ├── en/blog/[...slug].astro  # Article individuel EN
│   ├── en/category/[category].astro # Page catégorie EN
│   ├── sitemap.xml.ts           # Sitemap index
│   ├── sitemap-posts.xml.ts     # Sitemap des articles
│   └── sitemap-pages.xml.ts     # Sitemap des pages statiques
├── content/
│   ├── config.ts       # Schema Zod des collections
│   ├── blog/           # Articles FR (markdown)
│   └── blog-en/        # Articles EN (markdown)
├── config/
│   └── site.ts         # Configuration centrale du site
├── data/
│   └── authors.ts      # Données des auteurs
├── utils/
│   ├── i18n.ts         # Traductions + mapping slugs FR↔EN
│   └── url.ts          # Helper URL pour base path
└── styles/
    └── global.css      # Design system (variables CSS + classes utilitaires)
```

### Composants — Spécifications détaillées

#### SEOHead.astro
Génère dans le `<head>` :
- `<title>` et `<meta name="description">`
- Open Graph complet (og:title, og:description, og:image, og:type, og:url, og:site_name, og:locale)
- Hreflang FR + EN + x-default
- Canonical URL
- Article metadata (published_time, modified_time) si article
- Favicons multi-format (ico, png 16/32/48/192, apple-touch-icon)
- Preconnect Google Fonts

#### SchemaOrg.astro
Génère le JSON-LD `<script type="application/ld+json">` avec :
- **WebSite** schema (sur toutes les pages) avec SearchAction
- **Organization** schema (publisher, logo, adresse, fondation, sameAs)
- **Person** schema (auteur, jobTitle, worksFor)
- **Article** schema (headline, description, datePublished, dateModified, author, publisher, image, breadcrumb)
- **BreadcrumbList** schema
- **FAQPage** schema (si l'article a des FAQ)

#### FAQ.astro
- Utilise `<details>` / `<summary>` HTML natifs (pas de JavaScript)
- Chevron SVG animé en rotation à l'ouverture
- Bordure bleue quand ouvert
- Fond gris pour les réponses
- Responsive mobile

#### Header.astro
- Sticky avec backdrop-filter blur
- Logo + navigation + switch langue (FR/EN)
- Menu hamburger mobile avec toggle JS minimal
- Détection de la page active

#### Footer.astro
- Fond sombre
- Logo + tagline + navigation + lien site parent
- Copyright dynamique (année courante)

### Design System (global.css)
Variables CSS à adapter selon la marque :
```css
:root {
  /* Couleurs — À PERSONNALISER */
  --color-primary: #0036CC;
  --color-cyan: #2DB8DA;
  --color-pink: #FF215B;

  /* Typographie */
  --font-family: 'Montserrat', sans-serif;
  --font-size-xs à --font-size-5xl (8 niveaux)

  /* Spacing */
  --spacing-xs à --spacing-4xl (8 niveaux)

  /* Layout */
  --max-width: 1200px;
  --max-width-content: 800px;

  /* Ombres, arrondis, transitions */
}
```

Classes utilitaires incluses : `.container`, `.gradient-text`, `.sr-only`, `.section`, `.btn`, `.tag`, `.prose`

---

## 4. Exigences SEO / GEO techniques

Consulter `prompts/seo-checklist.md` pour la checklist détaillée. Points critiques :

### Obligatoire sur chaque page
- [ ] Balise `<title>` unique et descriptive (< 60 caractères)
- [ ] Meta description unique (< 160 caractères)
- [ ] URL canonique
- [ ] Hreflang FR + EN + x-default
- [ ] Open Graph complet (title, description, image, type, url)
- [ ] Schema.org JSON-LD approprié au type de page

### Obligatoire sur le site
- [ ] `sitemap.xml` (index + posts + pages)
- [ ] `robots.txt` avec lien sitemap
- [ ] `llms.txt` (métadonnées pour les IA)
- [ ] Favicons multi-format
- [ ] Google Fonts préchargé
- [ ] Mobile responsive (breakpoint 768px)
- [ ] GitHub Actions pour déploiement automatique

### Par article
- [ ] Schema Article avec author, publisher, datePublished, dateModified
- [ ] Schema FAQPage si FAQ présente
- [ ] Schema BreadcrumbList
- [ ] FAQ visible en accordéon + JSON-LD dans le head
- [ ] Fil d'Ariane visible
- [ ] Tags et catégorie
- [ ] Date de publication formatée selon la langue

---

## 5. Système bilingue FR/EN

### Routing
- FR : `/blog/mon-article/`
- EN : `/en/blog/my-article/`
- Catégories FR : `/categorie/seo/`, EN : `/en/category/seo/`

### i18n.ts
Le fichier `src/utils/i18n.ts` contient :
1. **Mapping des slugs** : chaque article FR a un slug EN correspondant
2. **Traductions UI** : tous les textes d'interface (boutons, titres de section, labels)
3. **Fonctions utilitaires** :
   - `getLang(url)` — détecte la langue depuis l'URL
   - `getAlternatePath(path)` — convertit FR↔EN
   - `t(lang, key)` — traduction d'une clé
   - `getCollectionName(lang)` — retourne 'blog' ou 'blog-en'
   - `getDateLocale(lang)` — retourne 'fr-FR' ou 'en-US'

### Règle de nommage des fichiers
- FR : `src/content/blog/mon-sujet-seo.md`
- EN : `src/content/blog-en/my-seo-topic.md`
- Les noms de fichiers EN ne suivent PAS forcément le pattern FR traduit mot à mot
- Toujours ajouter le mapping dans i18n.ts quand on crée un article

---

## 6. Maillage interne (Internal Linking)

Quand l'utilisateur demande de **construire le maillage**, **ajouter des liens internes**, ou après avoir créé plusieurs articles :

### Stratégie par clusters
Lire `prompts/content-strategy.md` pour les détails. Principes :

1. **Articles fondamentaux** = piliers. Ils pointent vers les articles ranking de leur thématique
2. **Articles ranking** du même cluster se lient entre eux (ex: Shopify ↔ Webflow ↔ WordPress)
3. **Section "Pour aller plus loin"** en bas des articles fondamentaux avec liens vers les ranking
4. **Liens contextuels** dans le corps des articles ranking vers d'autres ranking du même cluster
5. **Chaque article** devrait avoir au minimum 2-3 liens internes entrants

### Format des liens internes
```markdown
## Pour aller plus loin

Découvrez nos classements spécialisés :
- [Titre de l'article](/blog/slug-de-larticle/)
- [Titre de l'article](/blog/slug-de-larticle/)
```

Pour les articles EN :
```markdown
## Further reading

Discover our specialized rankings:
- [Article title](/en/blog/article-slug/)
```

---

## 7. Déploiement

### GitHub Pages
Le workflow `.github/workflows/deploy.yml` :
1. Se déclenche sur push vers `main`
2. Build avec Node 22 + `npm run build`
3. Upload du dossier `dist/`
4. Déploiement GitHub Pages

### Configuration requise
1. Repo GitHub créé
2. Settings > Pages > Source: "GitHub Actions"
3. Si domaine custom :
   - Fichier `public/CNAME` avec le domaine
   - DNS : CNAME `ai.mondomaine.fr` → `<user>.github.io`
   - Cocher "Enforce HTTPS" dans Settings > Pages

### Vérifications post-déploiement
1. `npm run build` doit passer sans erreur
2. Vérifier le nombre de pages générées dans l'output du build
3. Tester le sitemap : `https://domaine.fr/sitemap.xml`
4. Tester le robots.txt : `https://domaine.fr/robots.txt`
5. Valider le Schema.org : https://validator.schema.org/
6. Tester les Open Graph : https://www.opengraph.xyz/

---

## 8. Workflow type complet

Voici le process habituel de A à Z :

1. **L'utilisateur remplit `site.config.yaml`** avec sa marque, son domaine, ses auteurs
2. **"Crée le site"** → Scaffolding Astro complet, build OK
3. **"Crée les articles fondamentaux sur [thématique]"** → 4-8 articles piliers FR+EN
4. **"Crée les articles ranking pour [cluster]"** → Articles classement avec marque #1
5. **"Construis le maillage interne"** → Cross-links entre tous les articles
6. **"Fais un audit SEO"** → Vérification de la checklist complète
7. **Push + déploiement** → Site en production

Chaque étape peut être demandée en langage naturel. L'IA doit toujours :
- Créer les versions FR et EN simultanément
- Ajouter le mapping de slug dans i18n.ts
- Inclure des FAQ (3-5 questions) dans chaque article
- Respecter les conventions de `prompts/article-guidelines.md`
- Vérifier le build après chaque changement significatif
