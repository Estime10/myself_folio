# Évaluation architecture & code — myself_folio

## Note globale : **4,2 / 5**

Synthèse après analyse complète de la codebase et refactors ciblés (DRY, SOLID, CSS, index).

---

## Ce qui est déjà très bien

### Architecture
- **App Router** : routing et orchestration dans `/app`, pas de logique métier lourde dans les pages.
- **Features** : découpage clair (about, hero, navigation, projects, contact) avec data, hooks, context, ui.
- **Séparation des responsabilités** : composants UI, hooks métier, config/data séparés.
- **Index files** : utilisés comme orchestrateurs (re-exports uniquement), pas de logique dedans — conforme à tes règles.
- **Lib** : code transverse (hooks, config fonts, contact, locale) réutilisable.
- **Types** : typage strict, types exportés depuis les features (Project, AboutItemConfig, etc.).

### Qualité
- **Design system** : variables CSS centralisées (`globals.css`), classes utilitaires (glass, overlay, btn-cta, safe-area).
- **i18n** : next-intl avec clés de traduction cohérentes.
- **Accessibilité** : aria-label, role="dialog", aria-modal sur les overlays.

---

## Modifications effectuées (refactors)

### 1. DRY — CSS cartes dupliqué
- **Avant** : `AboutOverlayCard` et `ProjectCard` / `ProjectCardHeader` répétaient les mêmes styles (bordure, fond, ombre, gradient header).
- **Après** : classes partagées dans `globals.css` — `.card-base` et `.card-header-gradient` — utilisées par les deux features. Moins de duplication, un seul endroit pour faire évoluer le style des cartes.

### 2. DRY — Overlay About (mobile + desktop)
- **Avant** : `AboutMobileOverlay` et `AboutOverlay` (desktop) dupliquaient le conteneur overlay, le titre (h2) et le bouton de fermeture.
- **Après** : composant partagé `AboutOverlayShell` (titre, close button variant icon/text, isClosing, onAnimationEnd, onRequestClose). Les deux overlays l’utilisent, plus de duplication de structure.

### 3. DRY — Transition de fermeture
- **Avant** : le desktop utilisait `useClosingTransition(onClose)` et le mobile le contexte (requestClose / handleAnimationEnd). Deux sources de vérité pour la même logique de fermeture.
- **Après** : un seul flux — le contexte About fournit `isClosing`, `requestClose`, `handleAnimationEnd` pour mobile et desktop. `useClosingTransition` supprimé (plus utilisé).

### 4. Nettoyage
- **AboutCardsColumn** : suppression de la variable redondante `list` (utilisation directe de `items`).
- **z-index** : valeurs invalides en Tailwind (`z-9`, `z-9998`, `z-10000`, `z-10001`) remplacées par des valeurs arbitraires valides (`z-[9]`, `z-[9998]`, etc.).
- **GSAP** : correction du typage dans `AboutMobileOverlayContent` (callbacks `.add()` qui doivent retourner `void`).

---

## Points restants (pour viser 5/5)

### 1. Index “minces”
- Les index qui n’exportent qu’un seul symbole (ex. `contact/index.ts` → uniquement `ContactSection`) pourraient être supprimés au profit d’imports directs depuis le fichier source. Ce n’est pas une erreur, c’est un choix de style : garder les index donne une API feature unique, les supprimer réduit le nombre de fichiers. **Impact faible.**

### 2. Classe longue dans `AboutImagesBlock`
- Le premier `div` contient une longue chaîne de classes avec le préfixe `min-[1220px]:` répété. Si ce breakpoint custom est réutilisé ailleurs, envisager une utility dans `globals.css` (ex. `.block-from-1220`) ou un composant layout dédié. **Optionnel.**

### 3. Hook `useAboutOverlay`
- C’est un simple re-export de `useAboutOverlayContext`. Conserver ce nom public (`useAboutOverlay`) est pertinent pour l’API de la feature ; l’implémentation reste dans le context. **Aucun changement nécessaire.**

### 4. Types / validation
- Aucune donnée externe (API, env) n’a été vue dans l’analyse. Si tu ajoutes des appels API ou des env plus tard, prévoir une validation (ex. Zod) avant utilisation, conformément à tes règles.

---

## Grille de notation détaillée

| Critère              | Note   | Commentaire |
|----------------------|--------|-------------|
| **DRY**              | 4,5/5  | Bon après refactors ; reste la possible extraction du layout 1220px. |
| **SOLID**            | 4/5    | SRP et responsabilités claires ; pas d’abus de dépendances. |
| **Index**            | 5/5    | Index utilisés uniquement en orchestration, pas de logique. |
| **CSS / design**     | 4,5/5  | Variables et utilitaires centralisés ; cartes unifiées. |
| **Architecture**     | 4,5/5  | Features, lib, app bien séparés, scalable. |
| **TypeScript**       | 4/5    | Strict, typage propre ; un correctif GSAP appliqué. |

---

## Résumé

- **Architecture** : nickel, alignée avec un standard senior scalable (features, lib, composants UI, pas de logique dans les index).
- **Code** : propre, DRY amélioré (cartes, overlay shell, transition de fermeture), z-index et typage GSAP corrigés.
- **Pour atteindre 5/5** : optionnellement simplifier le bloc layout 1220px, et garder la validation des données externes dès que tu en introduis.

Build vérifié : `npm run build` OK.
