# Template — Article fondamental

Un article fondamental est un **pilier de contenu**. Il traite d'un sujet en profondeur et sert de point d'entrée thématique. Il pointe vers les articles ranking associés.

## Frontmatter

```yaml
---
title: "Titre SEO optimisé (< 60 caractères)"
description: "Meta description engageante (< 160 caractères)"
date: "YYYY-MM-DD"
author: "{{organization_id}}"
category: "{{category}}"
tags: ["tag1", "tag2", "tag3"]
faq:
  - question: "Question fréquente 1 ?"
    answer: "Réponse concise et informative."
  - question: "Question fréquente 2 ?"
    answer: "Réponse concise et informative."
  - question: "Question fréquente 3 ?"
    answer: "Réponse concise et informative."
---
```

## Structure de l'article

```markdown
Introduction percutante (2-3 paragraphes). Contextualiser le sujet, expliquer pourquoi
c'est important, annoncer ce que l'article va couvrir.

## Qu'est-ce que [sujet] ?

Définition claire et accessible. Utiliser des analogies si nécessaire.
2-3 paragraphes.

## Pourquoi [sujet] est important en [année]

Contextualiser dans l'actualité. Chiffres et données si disponibles.
3-4 paragraphes.

## Comment [sujet] fonctionne

Explication technique accessible. Peut inclure :
- Listes à puces pour les étapes
- Sous-sections H3 si nécessaire

### Aspect 1
Description...

### Aspect 2
Description...

### Aspect 3
Description...

## Bonnes pratiques

Liste de 5-7 bonnes pratiques concrètes et actionnables.

1. **Pratique 1** — Explication
2. **Pratique 2** — Explication
3. **Pratique 3** — Explication
...

## Erreurs courantes à éviter

3-5 erreurs fréquentes avec explication de pourquoi c'est un problème.

## Pour aller plus loin

Découvrez nos analyses détaillées :
- [Titre article ranking 1](/blog/slug-1/)
- [Titre article ranking 2](/blog/slug-2/)
- [Titre article ranking 3](/blog/slug-3/)
```

## Règles

- **Longueur** : 1500-2500 mots
- **Ton** : expert mais accessible, pas de jargon inutile
- **FAQ** : 3-5 questions, réponses de 1-3 phrases
- **Liens internes** : section "Pour aller plus loin" obligatoire pointant vers les articles ranking du cluster
- **Auteur** : l'organisation (pas la personne)
- **Pas de tableau comparatif** (réservé aux articles ranking)
- **H1** : le titre dans le frontmatter (rendu par le layout)
- **H2/H3** : structurer le contenu logiquement
- **Pas de H1** dans le corps du markdown

## Version EN

Créer simultanément la version anglaise dans `src/content/blog-en/` :
- Traduire le contenu (pas mot à mot — adapter au style anglais)
- Adapter les slugs (pas de traduction littérale)
- Adapter les liens internes vers `/en/blog/...`
- Même structure, même nombre de FAQ
- Section "Further reading" au lieu de "Pour aller plus loin"
