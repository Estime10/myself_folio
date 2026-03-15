# Revue codebase senior — myself_folio

Analyse réalisée en tant que développeur React/Next.js senior, au regard des bonnes pratiques (App Router, TypeScript strict, architecture features/lib, accessibilité, performance).

---

## 1. Points conformes (ce qui va bien)

### 1.1 Architecture

- **App Router** : usage correct, pages en Server Components par défaut, pas de logique métier dans les pages (délégation aux features).
- **Features** : séparation claire (ui/, hooks/, context/, data/), pas de logique dans les index (orchestration uniquement).
- **Lib** : config (fonts, site, contact), hooks transverses, validation i18n — pas de mélange avec le domaine.
- **Composants UI** : `Container`, `SectionHeader` stateless, props typées.

### 1.2 TypeScript

- **Strict** : `strict: true` dans `tsconfig.json`.
- **Pas de `any`** : aucun usage repéré.
- **Types au plus près** : types dans les features ou dans `lib/messagesSchema.ts`, réexport via index.

### 1.3 Données & validation

- **i18n** : messages validés au chargement via `validateMessages(raw)` (Zod) dans `i18n.ts` — donnée externe (JSON) traitée comme non fiable, conforme.
- **Pas de fetch dans les composants** : données statiques / config uniquement.

### 1.4 Client / Server

- **`"use client"`** limité et justifié : contextes, hooks, interactions (nav, modale, carousel, overlays, transitions). Les pages restent Server Components.

### 1.5 Design system

- **globals.css** : variables CSS centralisées (couleurs, fonts, glass, safe-area), `@theme inline` Tailwind cohérent, utilitaires réutilisables (`.glass`, `.btn-cta`, `.nav-link-*`, `.card-base`, etc.).

---

## 2. Améliorations recommandées

### 2.1 Styles inline (règle « zéro style inline ») — fait

- **Fait** : `.text-accent-primary` et `.page-slice-strip` ajoutés dans `globals.css` ; AboutCardsGrid, AboutImageCard et SliceOverlay utilisent ces classes.
- **Conservé volontairement** : `AboutOverlay.tsx` — `style={{ height: BAR_HEIGHT }}` (constante GSAP). `HeroBackground.tsx` — `backgroundImage` dynamique (exception acceptable).

---

### 2.2 Accessibilité — `prefers-reduced-motion` — fait

- **Fait** : `usePrefersReducedMotion` branché dans About (desktop `useAboutOverlayRevealAnimation` + mobile `AboutMobileOverlayContent`) et dans `ContactModal`. Durées à 0 ou quasi-instantanées lorsque l’utilisateur préfère moins de mouvement.

---

### 2.3 Gestion d’erreurs et robustesse — fait

- **Fait** : `app/error.tsx` (Client Component, message + bouton Réessayer). `app/loading.tsx` ajouté (placeholder centré pendant le chargement du segment).
**Priorité** : moyenne.

---

### 2.4 Layout Next.js et typage des props — fait

- **Fait** : type `RootLayoutProps` explicite dans `app/layout.tsx` avec JSDoc indiquant comment ajouter `params` en cas de segment dynamique (ex. `[locale]`).

---

### 2.5 Performance — code splitting — fait

- **Fait** : `next/dynamic` utilisé sur les pages `/testimonials` et `/contact` pour découper les chunks (pas de `ssr: false` car les pages sont des Server Components).
**Priorité** : basse à moyenne (après mesure).

---

### 2.6 Types partagés — dossier `/types`

- Aucun dossier racine `/types` : les types sont définis dans les features ou dans `lib/messagesSchema.ts`. C’est cohérent avec une approche « types au plus près ».

**Recommandation** : garder l’approche actuelle ; n’introduire un `/types` que si vous avez beaucoup de types partagés entre plusieurs features (éviter la duplication et les imports circulaires).

**Priorité** : basse.

---

### 2.7 Export du Header (navigation) — fait

- **Fait** : `Header` et `HeaderScrollEffect` sont exportés depuis `features/navigation/index.ts`. Le layout importe depuis `@/features/navigation` (point d’entrée unique).

**Priorité** : basse.

---

### 2.8 Animations — Framer Motion vs GSAP — documenté

- **Fait** : stack **GSAP** documentée dans `docs/ARCHITECTURE_NOTE.md` (transitions, menu mobile, overlays, modale, carousel). Pas de Framer Motion ; règles produit à aligner sur ce choix si besoin.

---

## 3. Synthèse des priorités

| Priorité | Sujet | Statut |
|----------|--------|--------|
| Haute | Accessibilité reduced-motion | Fait (About + Contact modal). |
| Moyenne | Styles inline | Fait (classes .text-accent-primary, .page-slice-strip). |
| Moyenne | Erreurs | Fait (error.tsx + loading.tsx). |
| Basse | Code splitting | Fait (dynamic sur testimonials + contact). |
| Basse | Export navigation | Fait (Header + HeaderScrollEffect depuis index). |
| Basse | Layout typing | Fait (RootLayoutProps + JSDoc). |
| Basse | Stack animation | Fait (doc dans ARCHITECTURE_NOTE). |
| Basse | Dossier `/types` | Non fait (optionnel, garder types au plus près). |

---

## 4. Checklist rapide (bonnes pratiques)

- [x] App Router, pages en Server Components par défaut  
- [x] `"use client"` limité et justifié  
- [x] Pas de logique dans les index  
- [x] Pas de fetch dans les composants UI  
- [x] TypeScript strict, pas de `any`  
- [x] Validation Zod des données externes (i18n)  
- [x] Zéro style inline (écarts restants volontaires : BAR_HEIGHT, HeroBackground)  
- [x] `prefers-reduced-motion` sur toutes les animations (About, Contact)  
- [x] Gestion d’erreur explicite (error.tsx + loading.tsx)  
- [x] Design system centralisé (globals.css, variables, Tailwind)  
- [x] Point d’entrée navigation (Header exporté depuis index)  
- [x] Code splitting (next/dynamic sur testimonials et contact)  

Refacto senior appliquée ; layout typé et stack GSAP documentée. Optionnel : dossier `/types` si partage de types entre features.
