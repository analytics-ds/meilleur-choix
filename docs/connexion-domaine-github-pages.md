# Connecter un domaine GoDaddy a GitHub Pages

## 1. Cote GitHub

1. Aller sur **Settings > Pages** du repo
2. Dans **Custom domain**, entrer le domaine (ex: `meilleur-classement.com`)
3. Cliquer **Save**
4. Cocher **Enforce HTTPS** (disponible apres propagation DNS)

## 2. Cote GoDaddy — Configuration DNS

Aller dans **My Products > DNS** du domaine.

### Enregistrements A (domaine racine)

Ajouter 4 enregistrements A pointant vers les IP de GitHub Pages :

| Type | Nom | Valeur            | TTL |
|------|------|--------------------|-----|
| A    | @    | 185.199.108.153    | 600 |
| A    | @    | 185.199.109.153    | 600 |
| A    | @    | 185.199.110.153    | 600 |
| A    | @    | 185.199.111.153    | 600 |

### Enregistrement CNAME (www)

| Type  | Nom | Valeur                         | TTL |
|-------|------|--------------------------------|-----|
| CNAME | www  | `<org-ou-user>.github.io`      | 600 |

> Remplacer `<org-ou-user>` par le nom de l'organisation ou du compte GitHub (ex: `analytics-ds.github.io`).

### Nettoyage

- **Supprimer** tout enregistrement A existant qui pointe ailleurs (ex: WebsiteBuilder, Parked, etc.)
- **Modifier** le CNAME `www` existant plutot que d'en creer un nouveau (sinon conflit)
- **Ne pas toucher** aux NS, SOA et `_domainconnect`

## 3. Cote code — Adapter le projet Astro

### Fichiers a modifier

| Fichier | Modification |
|---------|-------------|
| `astro.config.mjs` | `site: 'https://mondomaine.com'` et `base: '/'` |
| `public/CNAME` | Creer le fichier avec une seule ligne : `mondomaine.com` |
| `public/robots.txt` | Mettre a jour l'URL du sitemap |
| `src/config/site.ts` | Mettre a jour le champ `domain` |
| `src/pages/sitemap*.xml.ts` | Mettre a jour `baseUrl` |

### Le fichier CNAME est obligatoire

Sans le fichier `public/CNAME`, GitHub Pages supprime le custom domain a chaque deploiement. Ce fichier est copie a la racine du build et dit a GitHub quel domaine utiliser.

## 4. Verification

### Propagation DNS (10 min a 48h)

```bash
# Verifier les enregistrements A
dig mondomaine.com +short
# Doit afficher les 4 IP GitHub

# Verifier le CNAME www
dig www.mondomaine.com +short
# Doit afficher <org>.github.io
```

### Checklist

- [ ] Les 4 enregistrements A sont en place
- [ ] Le CNAME www pointe vers `<org>.github.io`
- [ ] Les anciens enregistrements (WebsiteBuilder, etc.) sont supprimes
- [ ] Le fichier `public/CNAME` existe dans le repo
- [ ] Le `base` path dans Astro est `/` (et non `/nom-du-repo`)
- [ ] GitHub Pages affiche "DNS check successful" dans Settings > Pages
- [ ] HTTPS est active

## Erreurs courantes

| Probleme | Cause | Solution |
|----------|-------|----------|
| CSS/JS ne charge pas | `base: '/nom-du-repo'` encore present | Mettre `base: '/'` |
| Conflit CNAME chez GoDaddy | Un CNAME `www` existe deja | Modifier l'existant au lieu d'en creer un nouveau |
| NotServedByPagesError | DNS pas encore propage | Attendre et cliquer "Check again" |
| Custom domain se reinitialise | Pas de fichier CNAME dans le repo | Ajouter `public/CNAME` |
