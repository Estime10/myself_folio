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

### 2.1 Styles inline (règle « zéro style inline »)

Aujourd’hui plusieurs composants utilisent `style={{ }}` alors que les valeurs correspondent à des variables CSS déjà définies. À remplacer par des classes pour rester cohérent avec le design system et faciliter la maintenance.

| Fichier | Ligne | Actuel | Action recommandée |
|--------|-------|--------|--------------------|
| `features/about/ui/AboutMobile/AboutCardsGrid/AboutCardsGrid.tsx` | 37 | `style={{ color: "var(--accent-primary)" }}` | Classe utilitaire dans `globals.css` (ex. `.text-accent-primary`) ou Tailwind `text-[var(--accent-primary)]` / usage de `--color-accent-primary` si disponible. |
| `features/about/ui/AboutDesktop/AboutImageCard/AboutImageCard.tsx` | 31 | `style={{ color: "var(--accent-primary)" }}` | Idem. |
| `features/about/ui/AboutDesktop/AboutOverlay/AboutOverlay.tsx` | 78, 84, 90 | `style={{ height: BAR_HEIGHT }}` | Conserver le style inline si `BAR_HEIGHT` est une constante JS utilisée par GSAP ; sinon déplacer en variable CSS ou classe. |
| `components/page-transition/PageTransition/SliceOverlay.tsx` | 73 | `style={{ background: "var(--bg-primary)" }}` | Ajouter dans `globals.css` : `.page-slice-strip { background: var(--bg-primary); }` et retirer le `style`. |
| `features/hero/ui/hero-background/HeroBackground.tsx` | 8 | `style={{ backgroundImage: \`url('${HERO_IMAGE_PATH}')\` }}` | Exception acceptable (image dynamique) ; possible d’utiliser une variable CSS `--hero-image` définie côté layout/server si on veut tout centraliser. |

**Priorité** : moyenne (cohérence et maintenabilité).

---

### 2.2 Accessibilité — `prefers-reduced-motion`

Les règles senior imposent le respect de `prefers-reduced-motion`. Aujourd’hui :

- **Déjà respecté** : `PageTransition` / `SliceOverlay`, `useMobileMenuAnimation` (via `usePrefersReducedMotion`).
- **Non branché** :
  - **About** : `useAboutOverlayRevealAnimation` et animations de l’overlay mobile ne tiennent pas compte de `reducedMotion`.
  - **Contact** : `ContactModal` (GSAP) utilise des durées fixes sans raccourcissement ni désactivation.

**Recommandation** :

1. Dans **About** : passer un flag `reducedMotion` (depuis un hook `usePrefersReducedMotion` au niveau parent) à `useAboutOverlayRevealAnimation` et aux composants d’overlay mobile ; si `reducedMotion`, mettre durées/stagger à 0 ou très court (comme pour `SliceOverlay` / `useMobileMenuAnimation`).
2. Dans **Contact** : utiliser `usePrefersReducedMotion` dans `ContactModal` et, si `reducedMotion`, appliquer des durées 0 ou quasi-instantanées pour l’ouverture/fermeture.

**Priorité** : haute (accessibilité).

---

### 2.3 Gestion d’erreurs et robustesse

- **Pas de `error.tsx`** : aucune boundary d’erreur au niveau route. En cas d’erreur dans un Server Component ou lors du chargement des messages, l’utilisateur voit l’UI d’erreur par défaut de Next.js.
- **Pas de `loading.tsx`** : pas d’état de chargement dédié par segment (acceptable si les pages sont très rapides ; à envisager si des données ou i18n ralentissent).

**Recommandation** :

- Ajouter au moins `app/error.tsx` (Client Component) pour une erreur générique plus maîtrisée et un message utilisateur clair.
- Optionnel : `app/loading.tsx` et/ou `loading.tsx` par section si besoin UX (skeleton, spinner).

**Priorité** : moyenne.

---

### 2.4 Layout Next.js et typage des props

- **Root layout** : `RootLayout({ children }: Props)` ne déclare pas les types officiels Next.js pour le layout (ex. `params`, `searchParams` si un jour utilisés). Pour un layout racine sans segment dynamique, c’est acceptable.
- Si vous ajoutez plus tard un segment `[locale]` ou des params, typer explicitement avec les types fournis par Next.js pour éviter tout flou.

**Priorité** : basse tant que le layout reste simple.

---

### 2.5 Performance — code splitting

- Aucun usage de `next/dynamic` ou `React.lazy` repéré. Les sections lourdes (Testimonials carousel, Contact modal, About overlay) sont chargées dans le bundle initial.

**Recommandation** (optionnelle, à mesurer) :

- Utiliser `next/dynamic` avec `ssr: false` pour des blocs purement interactifs (ex. carousel Testimonials, modale Contact) si l’analyse de bundle montre un impact significatif sur le First Load.

**Priorité** : basse à moyenne (après mesure).

---

### 2.6 Types partagés — dossier `/types`

- Aucun dossier racine `/types` : les types sont définis dans les features ou dans `lib/messagesSchema.ts`. C’est cohérent avec une approche « types au plus près ».

**Recommandation** : garder l’approche actuelle ; n’introduire un `/types` que si vous avez beaucoup de types partagés entre plusieurs features (éviter la duplication et les imports circulaires).

**Priorité** : basse.

---

### 2.7 Export du Header (navigation)

- `features/navigation/index.ts` n’exporte que `navigationItems` et `NavigationItem`. Le `Header` est importé directement depuis `@/features/navigation/Header` dans le layout.

**Recommandation** : soit exporter aussi `Header` depuis `features/navigation/index.ts` pour un point d’entrée unique (`@/features/navigation`), soit documenter clairement que l’entrée publique de la feature est les items + types et que le layout compose avec `Header` volontairement en import direct. Les deux sont valides ; l’important est la cohérence.

**Priorité** : basse.

---

### 2.8 Animations — Framer Motion vs GSAP

- Les règles métier mentionnent « Framer Motion en priorité ». Le projet utilise uniquement **GSAP** (pas de Framer Motion dans les deps). Les animations sont déjà isolées (hooks, composants dédiés) et partiellement accessibles (reduced-motion sur nav et page transition).

**Recommandation** : soit aligner les règles avec le choix actuel (GSAP), soit planifier une migration vers Framer Motion pour les nouveaux écrans tout en gardant GSAP pour les timelines complexes existantes si besoin. Pas de changement obligatoire côté code tant que la stack est cohérente et documentée.

**Priorité** : basse (décision produit/équipe).

---

## 3. Synthèse des priorités

| Priorité | Sujet | Action |
|----------|--------|--------|
| Haute | Accessibilité reduced-motion | Brancher `usePrefersReducedMotion` dans About overlay et Contact modal. |
| Moyenne | Styles inline | Remplacer par classes (accent, SliceOverlay) ; garder height/backgroundImage si justifié. |
| Moyenne | Erreurs | Ajouter `app/error.tsx` ; optionnel `loading.tsx`. |
| Basse | Code splitting | Envisager `next/dynamic` pour blocs lourds après mesure. |
| Basse | Index navigation / types / Framer Motion | Aligner exports ou docs ; garder ou introduire `/types` si partage ; clarifier stack d’animation. |

---

## 4. Checklist rapide (bonnes pratiques)

- [x] App Router, pages en Server Components par défaut  
- [x] `"use client"` limité et justifié  
- [x] Pas de logique dans les index  
- [x] Pas de fetch dans les composants UI  
- [x] TypeScript strict, pas de `any`  
- [x] Validation Zod des données externes (i18n)  
- [ ] Zéro style inline (quelques écarts restants)  
- [ ] `prefers-reduced-motion` sur toutes les animations (About, Contact à brancher)  
- [ ] Gestion d’erreur explicite (error boundary)  
- [x] Design system centralisé (globals.css, variables, Tailwind)  

En appliquant les points « haute » et « moyenne », la codebase sera alignée à un niveau senior sur l’essentiel (architecture, typage, accessibilité, maintenabilité).
