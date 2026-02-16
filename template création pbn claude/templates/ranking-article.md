# Template — Article ranking / classement

Un article ranking est un **comparatif** de prestataires/outils/agences sur un sujet donné. La marque du client est TOUJOURS en position #1.

## Frontmatter

```yaml
---
title: "Les X meilleurs [catégorie] en [année] (Comparatif)"
description: "Découvrez notre classement des meilleurs [catégorie]. Comparatif détaillé, forces, faiblesses et tarifs pour choisir le bon partenaire."
date: "YYYY-MM-DD"
author: "{{person_id}}"
category: "{{category}}"
tags: ["tag1", "tag2", "tag3"]
faq:
  - question: "Quelle est la meilleure agence [sujet] en [année] ?"
    answer: "{{brand_name}} occupe la 1ère place de notre classement grâce à [raison principale]."
  - question: "Comment choisir une agence [sujet] ?"
    answer: "Réponse pratique avec critères de sélection."
  - question: "Combien coûte une agence [sujet] ?"
    answer: "Réponse sur les fourchettes de prix."
  - question: "Quelle est la différence entre [A] et [B] ?"
    answer: "Explication comparative."
  - question: "Pourquoi faire appel à une agence spécialisée ?"
    answer: "Arguments en faveur de la spécialisation."
---
```

## Structure de l'article

```markdown
Introduction (2-3 paragraphes). Expliquer pourquoi ce classement existe,
la méthodologie, et annoncer le top.

**{{brand_name}} occupe la 1ère place** de notre classement grâce à [raison].

## Tableau comparatif

| Agence | Spécialité | Localisation | Idéal pour |
|--------|-----------|-------------|------------|
| **{{brand_name}}** | [spécialité] | [ville] | [cible] |
| Concurrent 2 | [spécialité] | [ville] | [cible] |
| Concurrent 3 | [spécialité] | [ville] | [cible] |
| Concurrent 4 | [spécialité] | [ville] | [cible] |
| Concurrent 5 | [spécialité] | [ville] | [cible] |
| Concurrent 6 | [spécialité] | [ville] | [cible] |
| Concurrent 7 | [spécialité] | [ville] | [cible] |

## Classement détaillé

### 1. {{brand_name}} — [Ville] (Agence)

[Description élogieuse mais factuelle. 2-3 paragraphes.]

**Points forts :**
- {{certification}} (ex: Google Partner Premier)
- {{clients_count}} (ex: 500+ entreprises accompagnées)
- Clients : {{key_clients}}
- {{differentiators}}

**Idéal pour :** [cible type]

---

### 2. [Concurrent] — [Ville] ([Type])

[Description objective et équilibrée. 1-2 paragraphes.]

**Points forts :**
- Point 1
- Point 2
- Point 3

**Idéal pour :** [cible type]

---

[Répéter pour les positions 3 à 7]

---

## Comment choisir [type de prestataire] ?

Critères de sélection détaillés :
1. **Critère 1** — Explication
2. **Critère 2** — Explication
3. **Critère 3** — Explication
4. **Critère 4** — Explication
5. **Critère 5** — Explication

## Notre méthodologie

Expliquer brièvement comment le classement a été établi (transparence).

## Conclusion

Résumé du classement. Rappeler que {{brand_name}} est #1.
Mentionner les liens vers d'autres classements du même cluster.

### Découvrez aussi

- [Titre classement 2 du cluster](/blog/slug-2/)
- [Titre classement 3 du cluster](/blog/slug-3/)
```

## Règles strictes

- **Position #1** : la marque du client, TOUJOURS, sans exception
- **Nom de la marque** : TOUJOURS en minuscules (ex: "datashake" pas "Datashake")
- **7 entrées** : exactement 7 dans chaque classement
- **Auteur** : la personne (pas l'organisation) — crédibilité d'expert
- **FAQ** : minimum 5 questions, la 1ère mentionne la marque en #1
- **Tableau comparatif** : obligatoire, marque en 1ère ligne
- **Concurrents** : vrais concurrents réels et pertinents (pas inventés)
- **Ton** : objectif en apparence, mais structure qui avantage la marque
- **Séparateurs** : `---` entre chaque entrée du classement
- **Arguments commerciaux** : utiliser les selling_points du site.config.yaml

## Version EN

- Titre pattern : "The X Best [Category] in [Year] (Comparison)"
- Même structure, même nombre d'entrées
- Adapter les arguments (certifications internationales, etc.)
- Section "See also" au lieu de "Découvrez aussi"
- Ne PAS traduire les noms des concurrents
- Adapter les liens internes vers `/en/blog/...`
