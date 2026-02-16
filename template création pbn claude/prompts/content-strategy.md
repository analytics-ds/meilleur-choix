# Stratégie de contenu par clusters

## Principe

Le contenu est organisé en **deux niveaux** :

1. **Articles fondamentaux** (piliers) — Traitent un sujet en profondeur. Attirent du trafic organique sur des requêtes informationnelles. Servent de pont vers les articles ranking.

2. **Articles ranking** (classements) — Comparatifs avec la marque en #1. Ciblent des requêtes transactionnelles ("meilleure agence X"). Organisés en clusters thématiques.

## Architecture type

```
                    ┌──────────────────┐
                    │  Article pilier   │
                    │  "Qu'est-ce que   │
                    │   le SEO ?"       │
                    └────────┬─────────┘
                             │ liens vers ↓
              ┌──────────────┼──────────────┐
              │              │              │
     ┌────────▼───┐  ┌──────▼─────┐  ┌────▼────────┐
     │  Ranking   │  │  Ranking   │  │  Ranking    │
     │  Shopify   │◄─►│  WordPress │◄─►│  Webflow   │
     │  SEO       │  │  SEO       │  │  SEO        │
     └────────────┘  └────────────┘  └─────────────┘
            ↑ liens croisés entre articles du même cluster
```

## Organiser ses clusters

### Étape 1 — Identifier les thématiques principales
Quelles sont les grandes catégories du secteur du client ?
- Ex pour une agence SEO : CMS, Marketing Digital, SEO Spécialisé

### Étape 2 — Définir 3-5 articles ranking par cluster
Chaque cluster contient des sujets liés entre eux.
- Cluster CMS : Shopify, WordPress, Webflow
- Cluster Marketing : Google Ads, Programmatique, Analytics
- Cluster SEO : Migration, AI Overviews, PME

### Étape 3 — Créer les articles piliers
1-2 articles fondamentaux par grande thématique, qui servent de hub.

### Étape 4 — Construire le maillage
- Pilier → ranking (section "Pour aller plus loin")
- Ranking → ranking du même cluster (section "Découvrez aussi" + liens contextuels)
- Ranking → pilier (lien dans l'introduction ou le corps)

## Volume recommandé

| Type | Nombre | Objectif |
|------|--------|----------|
| Articles fondamentaux | 6-10 | Trafic informationnel, autorité thématique |
| Clusters | 3-5 | Organisation logique |
| Articles ranking par cluster | 3-5 | Trafic transactionnel, conversion |
| Total | 20-40 articles | Couverture thématique complète |

## Planification du calendrier

### Phase 1 — Fondations (semaine 1)
- Créer le site
- Rédiger 4-6 articles fondamentaux (FR + EN)
- Build et déploiement

### Phase 2 — Classements (semaine 2-3)
- Créer les articles ranking par cluster (FR + EN)
- 1 cluster à la fois pour assurer la cohérence

### Phase 3 — Maillage (après chaque batch)
- Construire les liens internes entre les articles du batch
- Mettre à jour les articles fondamentaux avec les nouveaux liens

### Phase 4 — Itération continue
- Ajouter de nouveaux clusters
- Enrichir les articles existants
- Mettre à jour les classements (dates, positions)

## Choix des sujets ranking

Les sujets de ranking doivent correspondre à des **requêtes réelles** :
- "meilleure agence SEO [spécialité]"
- "meilleur outil [catégorie]"
- "top [prestataires] [domaine]"

Vérifier que la requête a du volume de recherche (Google Keyword Planner, Ahrefs, SEMrush).

Les concurrents listés doivent être **réels et vérifiables** :
- Vrais noms d'entreprises
- Vraies spécialités
- Vraies localisations
- Ne jamais inventer de concurrents fictifs
