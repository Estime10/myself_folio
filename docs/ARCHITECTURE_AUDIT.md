# Audit architecture — DRY, SOLID, Server Components / SSR

## 1. DRY (Don't Repeat Yourself)

### Corrigé
- **Nom du site** : "Estime Vangu" était dupliqué dans `NavigationDesktop` et `NavigationMobile`. Source unique : `lib/config/site.ts` → `SITE_NAME`.
- **Ordre de la nav** : `navigationItems` avait About avant Projects ; ordre unifié : Home → Projects → About → Contact.

### Déjà OK
- Liens de navigation : une seule source `navigationItems`.
- Contenu hero : une seule source `features/hero_section` (clés i18n + `ctaHref`).
- Container : un seul composant réutilisable.

---

## 2. SOLID

| Principe | Statut |
|----------|--------|
| **S**RP | Chaque module a une responsabilité claire (Header = composition, Hero = affichage hero, features = données). |
| **O**CP | Extensible sans modifier l’existant (nouveaux items dans `navigationItems`, nouveau contenu dans `heroContent`). |
| **L**SP | N/A (peu d’héritage). |
| **I**SP | Props limitées (ex. `LanguageToggle` reçoit `currentLocale` uniquement). |
| **D**IP | Les composants dépendent de la feature / config (hero_section, site), pas l’inverse. |

---

## 3. Server Components vs Client

### Server Components (SSR, pas de JS envoyé pour le rendu)
- `app/layout.tsx` — async, `getMessages()`.
- `app/page.tsx` — composition pure.
- `Header` — composition.
- `NavigationDesktop` — async, `getTranslations()`, `getLocale()`.
- `NavigationMobile` — wrapper sans state ; enfants = client.
- `Hero` — rendu statique (image + overlay) ; peut devenir async pour titre/bio/CTA avec `getTranslations()`.
- `Container` — présentiel.

### Client Components (obligatoire pour interactivité)
- `NavigationProvider` — state (menu ouvert/fermé).
- `MobileMenuButton` — GSAP + `onClick`.
- `MobileMenuWrapper` — GSAP, refs, `onClick` overlay.
- `LanguageToggle` — `useTransition`, `onClick`, `changeLanguage` (reload).

### Bilan
- Tout ce qui peut être Server l’est.
- Client limité au state et aux interactions (menu mobile, langue). Pas de surcharge inutile.

---

## 4. SSR / Performance

- Layout : messages chargés côté serveur (`getMessages()`).
- Traductions : `getTranslations()` / `getLocale()` côté serveur dans les Server Components.
- Pas de fetch dans les composants UI ; les données viennent des features ou de la config.
- Hero : pas de données client ; image en CSS `background-image` (pas de composant Image pour le fond), bon pour le LCP.

---

## 5. Prochaines étapes (titre, bio, CTA hero)

- **Source de vérité** : `features/hero_section` (type `HeroContent` + `heroContent`).
- **Hero** : composant async qui appelle `getTranslations()` et consomme `heroContent` ; rendu titre, bio, CTAs optionnels en Server Component.
- **i18n** : clés `hero.titleLine1`, `hero.titleLine2`, `hero.titleLine3`, `hero.bio`, `hero.cta`.
