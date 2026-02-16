# Conventions de rédaction SEO

## Règles générales

### Titre (H1 / frontmatter title)
- Maximum 60 caractères
- Contient le mot-clé principal
- Format ranking : "Les X meilleurs [sujet] en [année] (Comparatif)"
- Format fondamental : "Qu'est-ce que [sujet] ? Guide complet [année]" ou "[Sujet] : tout comprendre en [année]"

### Meta description (frontmatter description)
- Maximum 160 caractères
- Contient le mot-clé principal
- Formulation engageante avec call-to-action implicite
- Pas de promesse exagérée

### URL / slug
- Tout en minuscules, mots séparés par des tirets
- Pas d'accents, pas de caractères spéciaux
- Court et descriptif (3-6 mots max)
- FR : `meilleures-agences-seo-shopify`
- EN : `best-shopify-seo-agencies`

### Structure des headings
- **H1** : titre de l'article (dans le frontmatter, rendu par le layout)
- **H2** : sections principales (5-8 par article)
- **H3** : sous-sections si nécessaire
- **Jamais** de H1 dans le corps markdown
- **Jamais** sauter un niveau (H2 → H4)

## Contenu

### Longueur
- Article fondamental : 1500-2500 mots
- Article ranking : 2000-3500 mots (plus long car 7 entrées détaillées)

### Ton et style
- Expert mais accessible
- Phrases courtes (15-20 mots en moyenne)
- Paragraphes courts (3-5 phrases)
- Pas de jargon non expliqué
- Voix active privilégiée
- Pas de "nous allons voir" ou "dans cet article"

### Formatage
- **Gras** pour les concepts clés et points importants
- Listes à puces pour les énumérations (3+ items)
- Listes numérotées pour les étapes séquentielles
- Tableaux pour les comparaisons structurées
- `---` (séparateur) entre les entrées de classement

### Liens internes
- 2-3 liens minimum vers d'autres articles du site
- Texte d'ancre descriptif (pas "cliquez ici")
- Format : `[texte descriptif](/blog/slug-article/)` (FR) ou `[text](/en/blog/slug/)` (EN)
- Section dédiée "Pour aller plus loin" / "Further reading" en fin d'article

### Images
- Optionnelles (le site peut fonctionner sans images)
- Si présentes : `image` et `imageAlt` dans le frontmatter
- Alt text descriptif et contenant le mot-clé si pertinent

## FAQ

### Règles
- **Obligatoires** sur chaque article
- 3-5 questions pour les articles fondamentaux
- 5+ questions pour les articles ranking
- Réponses concises : 1-3 phrases
- La première question d'un ranking doit mentionner la marque en #1

### Format dans le frontmatter
```yaml
faq:
  - question: "La question complète avec point d'interrogation ?"
    answer: "La réponse complète avec ponctuation."
```

### Types de questions efficaces
- "Qu'est-ce que [sujet] ?" — Définition
- "Comment [action] ?" — Processus
- "Pourquoi [sujet] est important ?" — Justification
- "Combien coûte [service] ?" — Prix
- "Quelle est la meilleure [solution] ?" — Recommandation (marque #1)
- "Quelle différence entre [A] et [B] ?" — Comparaison

## Conventions de nommage

### Fichiers
- FR : `src/content/blog/slug-en-francais.md`
- EN : `src/content/blog-en/slug-in-english.md`
- Les slugs EN ne sont PAS la traduction littérale des slugs FR
- Exemples :
  - FR : `meilleures-agences-seo-shopify` / EN : `best-shopify-seo-agencies`
  - FR : `qu-est-ce-que-le-geo` / EN : `what-is-geo`

### Mapping i18n
Chaque paire d'articles doit être ajoutée dans `src/utils/i18n.ts` :
```typescript
const slugMap: Record<string, string> = {
  'slug-francais': 'english-slug',
  // ...
};
```

## Mentions de la marque

### Dans les articles ranking
- La marque est TOUJOURS en position #1
- Le nom est TOUJOURS en minuscules
- Utiliser les arguments de `selling_points` du config
- Ne jamais dire "notre agence" — toujours le nom de la marque
- Ton factuel, pas publicitaire (les faits parlent d'eux-mêmes)

### Dans les articles fondamentaux
- La marque n'apparaît PAS dans le corps de l'article
- Seule exception : la section "Pour aller plus loin" qui pointe vers les rankings
- L'auteur est l'organisation (pas la personne)

## Catégories et tags

### Catégories
- Définies dans `site.config.yaml`
- Chaque article a exactement UNE catégorie
- Les catégories génèrent des pages automatiquement (`/categorie/[slug]/`)

### Tags
- 3-6 tags par article
- Tags en minuscules
- Format : `["seo", "shopify", "e-commerce", "agence"]`
- Pas de tag = catégorie (éviter la redondance)

## Checklist avant publication

- [ ] Title < 60 caractères, contient le mot-clé
- [ ] Description < 160 caractères, engageante
- [ ] Slug court et descriptif
- [ ] Date au format YYYY-MM-DD
- [ ] Author correct (organization ou person)
- [ ] Category définie
- [ ] Tags pertinents (3-6)
- [ ] FAQ présente (3-5 questions)
- [ ] Liens internes (2+ vers d'autres articles)
- [ ] Version EN créée simultanément
- [ ] Slug mapping ajouté dans i18n.ts
- [ ] `npm run build` passe sans erreur
