# PRD - Product Requirements Document
## AI Fusion Partner Indonesia

**Version** : 1.0
**Date** : 8 fevrier 2026
**Auteur** : Sami Ouaguenouni
**Statut** : Draft

---

## 1. Vue d'ensemble produit

### 1.1 Description
AI Fusion Partner Indonesia est un service d'agents IA specialises pour les entreprises indonesiennes. Le produit se decline actuellement en un site vitrine statique (HTML/CSS) deploye sur Cloudflare Pages, avec migration prevue vers la plateforme SaaS AI Fusion.

### 1.2 Etat actuel

| Composant | Statut | Technologie |
|-----------|--------|-------------|
| Site vitrine | En ligne | HTML/CSS statique, Cloudflare Pages |
| Domaine | Actif | id.aifusionpartner.com |
| Pages agents (8) | En ligne | amanda.html, rafi.html, sari.html, kevin.html, dina.html, arif.html, nabila.html, sami.html |
| Pages legales | En ligne | privacy.html, terms.html |
| SEO technique | Configure | Sitemap, robots.txt, structured data (JSON-LD), Open Graph |
| QRIS paiement | Logo present | Integration prevue |
| WhatsApp CTA | Actif | +62 859-5986-6099 |
| Plateforme SaaS | En developpement | Next.js, Supabase, Stripe |

### 1.3 Architecture technique actuelle

```
sites/AFP_Indonesia/
  index.html              -- Page d'accueil (85KB, complete)
  amanda.html             -- Agent Customer Service
  rafi.html               -- Agent Marketing
  sari.html               -- Agent SEO
  kevin.html              -- Agent Sales
  dina.html               -- Agent Finance (coming soon)
  arif.html               -- Agent Legal (coming soon)
  nabila.html             -- Agent HR (coming soon)
  sami.html               -- Agent Operations (coming soon)
  privacy.html            -- Politique de confidentialite
  terms.html              -- Conditions d'utilisation
  sitemap.xml             -- Plan du site SEO
  robots.txt              -- Directives moteurs de recherche
  wrangler.toml           -- Config Cloudflare Pages
  assets/
    css/main.css          -- Feuille de style principale (60KB)
    css/modern-style.css  -- Styles modernes
    css/...               -- Autres CSS (aura, fixes, etc.)
    js/animations.js      -- Animations scroll
    js/cookie-consent.js  -- Consentement cookies
    images/               -- Avatars agents, logos integrations, OG images
    images/logos/          -- Logos partenaires et integrations (QRIS, WhatsApp, Shopee, etc.)
```

---

## 2. Features actuelles du site vitrine

### 2.1 Page d'accueil (index.html)

| Section | Description | Statut |
|---------|-------------|--------|
| Promo banner | Bandeau promotionnel fixe (Fevrier 2026) | Actif |
| Hero section | Titre, sous-titre, CTA WhatsApp, trust badges | Actif |
| Cara Kerja | 3 etapes (Booking -> Setup -> AI 24/7) | Actif |
| Trust signals | Statistiques (70% hemat, 24/7, 5x produktif, 3-5 hari) | Actif |
| Tim Agen AI | 8 onglets avec details de chaque agent | Actif |
| ROI Calculator | Calculateur interactif d'heures economisees | Actif |
| Integrations | Marquee logos (WhatsApp, IG, TikTok, Shopee, Tokopedia, etc.) | Actif |
| Industri | 8 secteurs cibles (e-commerce, F&B, klinik, agensi, etc.) | Actif |
| Pricing | Solution custom, a partir de Rp 2.000.000/mois | Actif |
| FAQ | 6+ questions/reponses (objections prix, tech, confiance) | Actif |
| Sticky CTA WhatsApp | Bouton flottant WhatsApp permanent | Actif |
| Exit intent popup | Pop-up offre speciale a la sortie | Actif |

### 2.2 Pages agents individuelles
Chaque agent dispose d'une page dediee avec : presentation detaillee, cas d'usage, fonctionnalites, CTA WhatsApp personnalise.

### 2.3 SEO et performance
- Structured data JSON-LD (Organization + FAQPage)
- Open Graph et Twitter Cards configures
- Meta descriptions en Bahasa Indonesia
- Canonical URL configuree
- Images optimisees (WebP)

---

## 3. Features specifiques Indonesie

### 3.1 Localisation complete

| Element | Implementation |
|---------|---------------|
| Langue | 100% Bahasa Indonesia (html lang="id") |
| Noms agents | Prenoms indonesiens (Amanda, Rafi, Sari, Kevin, Dina, Arif, Nabila) |
| Devise | Rupiah (Rp) avec separateurs indonesiens |
| Numero telephone | Format +62 (Indonesie) |
| Fuseaux horaires | Support WIB/WITA/WIT |
| Locale Open Graph | id_ID |

### 3.2 Integrations locales (actuelles et prevues)

| Integration | Statut | Priorite |
|-------------|--------|----------|
| WhatsApp Business API | Actif (CTA) | P0 - Critique |
| Instagram | Actif (marketing) | P0 |
| TikTok / TikTok Shop | Actif (marketing) | P1 |
| Shopee | Prevu | P1 - Haute |
| Tokopedia | Prevu | P1 - Haute |
| QRIS (paiement QR national) | Logo present, a integrer | P1 |
| GoPay / OVO / Dana | Prevu | P2 |
| Bank transfer (BCA, Mandiri, BNI, BRI) | Prevu | P1 |
| Google Sheets | Actif dans SaaS | P1 |
| Google Calendar | Actif dans SaaS | P2 |
| Telegram | Actif dans SaaS | P2 |

### 3.3 Paiements locaux

Le systeme de paiement doit supporter les methodes dominantes en Indonesie :

1. **QRIS** (QR Code Indonesian Standard) : standard national de paiement QR, interoperable avec toutes les banques et e-wallets
2. **Bank Transfer** : virements bancaires via BCA, Mandiri, BNI, BRI (methode la plus utilisee pour B2B)
3. **E-wallets** : GoPay (via Gojek), OVO, Dana, LinkAja
4. **Carte bancaire** : Visa/Mastercard (secondaire, faible adoption locale)

---

## 4. Roadmap produit

### Phase 1 : Site vitrine (actuel - Q1 2026)

| Feature | Statut | Details |
|---------|--------|---------|
| Site statique complet | Fait | 8 pages agents + accueil + legales |
| SEO technique | Fait | Sitemap, structured data, meta tags |
| WhatsApp CTA | Fait | Numero dedie, messages pre-remplis |
| ROI Calculator | Fait | Calculateur interactif |
| Cookie consent RGPD/UU PDP | Fait | Conformite reglementaire |
| Correction email contact | A faire | Bug identifie a corriger |
| A/B testing landing page | A faire | Optimisation taux de conversion |

### Phase 2 : SaaS localise (Q2-Q3 2026)

| Feature | Priorite | Details |
|---------|----------|---------|
| Migration vers plateforme SaaS AI Fusion | P0 | Next.js + Supabase + auth |
| Dashboard client en Bahasa Indonesia | P0 | Interface complete localisee |
| Onboarding automatise | P0 | Parcours guide post-inscription |
| Integration paiements QRIS + bank transfer | P0 | Via Midtrans ou Xendit (payment gateway indonesien) |
| Plans tarifaires en IDR | P0 | Free / Pro (Rp 299.000) / Business (Rp 799.000) |
| Agents actifs : Amanda, Rafi, Sari, Kevin | P0 | 4 agents fonctionnels |
| Knowledge base par client | P1 | Upload docs, FAQ custom |
| Analytics dashboard | P1 | Metriques agents, conversations, satisfaction |

### Phase 3 : Agents complets et integrations (Q3-Q4 2026)

| Feature | Priorite | Details |
|---------|----------|---------|
| Agents Dina, Arif, Nabila, Sami | P0 | Activation des 4 agents restants |
| Integration Shopee API | P1 | Sync commandes, chat Shopee |
| Integration Tokopedia API | P1 | Sync produits, commandes |
| WhatsApp Business Cloud API | P0 | Envoi/reception messages automatique |
| Integration e-wallets (GoPay, OVO) | P2 | Paiements in-app |
| Reporting avance | P1 | Export PDF, rapports mensuels auto |
| Multi-tenant (agence) | P2 | Gestion multi-clients pour agences |

### Phase 4 : App mobile et expansion (2027)

| Feature | Priorite | Details |
|---------|----------|---------|
| App mobile (React Native ou PWA) | P1 | Acces dashboard mobile |
| Notifications push | P1 | Alertes agents, leads, urgences |
| Mode offline (PWA) | P2 | Consultation rapports hors connexion |
| API publique | P2 | Integration systemes clients existants |
| Marketplace de templates agents | P3 | Templates par industrie |
| Expansion ASEAN (Malaisie, Thailande) | P1 | Replication du modele |

---

## 5. Exigences techniques

### 5.1 Performance
- **Temps de chargement** : < 3 secondes sur mobile 4G (cible indonesienne)
- **Score Lighthouse** : > 90 (Performance, Accessibility, SEO)
- **Uptime SaaS** : 99.5% minimum
- **Latence API agents** : < 5 secondes pour la premiere reponse

### 5.2 Securite et conformite
- **UU PDP** (Undang-Undang Pelindungan Data Pribadi) : loi indonesienne de protection des donnees, conformite obligatoire
- **Chiffrement** : TLS 1.3, donnees au repos chiffrees
- **Authentification** : OAuth 2.0, 2FA optionnel
- **Stockage donnees** : conformite localisation donnees si requis par regulateur

### 5.3 Infrastructure
- **Hebergement site statique** : Cloudflare Pages (edge network, CDN global)
- **Hebergement SaaS** : Vercel (Next.js) + Supabase (PostgreSQL, auth, storage)
- **Region serveur** : Singapore (ap-southeast-1) pour latence optimale Indonesie
- **CDN** : Cloudflare (deja en place)
- **Monitoring** : uptimerobot ou similaire

---

## 6. Metriques produit

### 6.1 Metriques site vitrine

| Metrique | Cible | Outil |
|---------|-------|-------|
| Visiteurs uniques mensuels | 5 000+ | Google Analytics |
| Taux de rebond | < 50% | Google Analytics |
| Clics WhatsApp CTA | 200+/mois | GA Events |
| Temps moyen sur page | > 2 minutes | Google Analytics |
| Score SEO Lighthouse | > 90 | Lighthouse |
| Position Google "agen AI Indonesia" | Top 10 | Google Search Console |

### 6.2 Metriques SaaS (post-migration)

| Metrique | Cible | Frequence |
|---------|-------|-----------|
| Inscriptions mensuelles | 100+ | Mensuel |
| Taux conversion free -> paid | > 5% | Mensuel |
| DAU/MAU ratio | > 30% | Hebdomadaire |
| Messages traites par agent/mois | Tracking | Mensuel |
| Taux satisfaction agent (thumbs up) | > 85% | Continu |
| Temps moyen premiere reponse agent | < 5 secondes | Continu |
| Churn rate mensuel | < 5% | Mensuel |

### 6.3 Metriques business

| Metrique | Cible Y1 | Frequence |
|---------|----------|-----------|
| MRR | 150M IDR | Mensuel |
| Nombre clients payants | 50 | Mensuel |
| ARPU (revenu moyen par client) | Rp 3.000.000 | Trimestriel |
| CAC (cout acquisition client) | < Rp 2.000.000 | Trimestriel |
| LTV | > Rp 30.000.000 | Trimestriel |

---

## 7. Dependances et contraintes

| Dependance | Description | Impact |
|-----------|-------------|--------|
| Plateforme SaaS AI Fusion | La migration depend de la maturite du SaaS principal | Bloquant pour Phase 2 |
| WhatsApp Business API | Approbation Meta pour le numero business | Bloquant pour agent Amanda |
| Payment gateway (Midtrans/Xendit) | Integration paiements locaux | Bloquant pour monetisation SaaS |
| Shopee/Tokopedia API | Acces partenaire developeur | Necessaire Phase 3 |
| Equipe locale | Recrutement support Bahasa Indonesia | Important pour scaling |

---

## 8. Definition du succes (Definition of Done)

### Phase 1 - Site vitrine : ATTEINT
- [x] Site en ligne sur id.aifusionpartner.com
- [x] 8 pages agents + accueil + legales
- [x] SEO technique configure
- [x] WhatsApp CTA operationnel
- [ ] Email contact fonctionnel (bug a corriger)

### Phase 2 - SaaS localise : EN COURS
- [ ] Dashboard fonctionnel en Bahasa Indonesia
- [ ] 4 agents actifs (Amanda, Rafi, Sari, Kevin)
- [ ] Paiements QRIS/bank transfer operationnels
- [ ] 10 clients payants actifs
- [ ] Onboarding < 5 jours

### Phase 3 - Produit complet
- [ ] 8 agents actifs
- [ ] Integrations Shopee + Tokopedia
- [ ] 50 clients payants actifs
- [ ] NPS > 40

---

*Document de reference produit pour AFP Indonesia. A mettre a jour a chaque release majeure.*
