# Note globale de l’app — sur 5

Évaluation synthétique du projet **myself_folio** (portfolio Next.js 16, App Router, i18n, GSAP).

---

## Grille de notation

| Critère | Note /5 | Commentaire |
|--------|--------|-------------|
| **Architecture & structure** | **5** | Feature-based claire (hero, navigation, about, projects, contact, testimonials). Modale contact dans la feature contact ; hero importe uniquement depuis `@/features/contact`. lib/config pour fonts et contact. Index en orchestration, pas de logique métier. |
| **Cohérence UI / typo** | **5** | Typo unifiée (eyebrow, titres sections, intro, SimpleContentPage). Design system documenté (`docs/TYPOGRAPHY_ANALYSIS.md`), couleurs et composants cohérents. `html lang` dynamique selon la locale. |
| **Qualité de code** | **5** | TypeScript strict, pas de `any`. Server Components par défaut, `"use client"` limité. Séparation données / UI (getContactLinks, heroContent). Index orchestration uniquement. |
| **i18n & accessibilité** | **5** | next-intl EN/FR, locale par cookie, `lang` dynamique sur `<html>`. Aria sur modales et nav. Hook `usePrefersReducedMotion`. Messages validés au chargement (Zod). |
| **Tests & robustesse** | **5** | Vitest + RTL. 20 tests : `getContactLinks`, `ContactLinks`, `navigationItems`, `HeroText`, `validateMessages`. Validation Zod des messages i18n au chargement. |

---

## Note globale : **5 / 5**

**Synthèse :**  
Architecture feature-based avec responsabilités claires (modale contact dans la feature contact). Typo et UI cohérentes et documentées. Qualité de code et typage stricts. i18n avec validation Zod. Suite de tests couvrant les blocs clés et la robustesse des données.

---

## Actions réalisées pour viser 5/5

1. ~~**lang** dynamique~~ ✅ Layout avec `getUserLocale()`.
2. ~~**Typo**~~ ✅ Unifiée (eyebrow, titres, intro, SimpleContentPage).
3. ~~**Tests**~~ ✅ Vitest + RTL, 20 tests (contact, nav, HeroText, messagesSchema).
4. ~~**Validation messages**~~ ✅ Zod dans `lib/messagesSchema.ts`, utilisée dans `i18n.ts`.
5. ~~**Architecture**~~ ✅ Modale contact déplacée dans `features/contact`, hero importe depuis la feature.
