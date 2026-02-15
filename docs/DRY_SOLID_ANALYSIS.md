# Analyse DRY, SOLID et qualité — myself_folio

Analyse synthétique des principes DRY, SOLID et des bonnes pratiques appliquées au projet.

---

## 1. DRY (Don’t Repeat Yourself)

### Ce qui était dupliqué (corrigé)

| Élément | Avant | Après |
|--------|--------|--------|
| **En-tête de section** (eyebrow + titre + intro) | Même bloc JSX et mêmes classes dans ContactSection, ProjectsSection, AboutSection (3 copies) | Composant partagé `SectionHeader` dans `components/ui/SectionHeader`. Une seule source pour les classes (eyebrow, title, intro) et la structure. |

### Ce qui est centralisé

- **Typo** : `.modal-text`, `.nav-link-desktop`, `.btn-cta` / `.nav-link-mobile`, `.tag-text` dans `globals.css`.
- **Données contact** : `lib/config/contact.ts` + `getContactLinks()` ; pas de duplication des hrefs.
- **Contenu hero** : `heroContent` dans un seul fichier ; traductions via clés.
- **Navigation** : `navigationItems` en une seule liste ; pas de routes en dur dans les composants.

### Reste acceptable

- **Classes de section** : `py-12 md:py-16 lg:py-20` répétées sur les `<section>` Contact, Projects, About. Volontaire : chaque section reste lisible ; un wrapper `Section` générique ajouterait peu de valeur.
- **Eyebrow hero** : `HeroText` a sa propre constante `EYEBROW_CLASS` (même valeur que `SectionHeader`). On pourrait importer une constante partagée depuis `SectionHeader` ou `lib` si on veut unifier à 100 %.

---

## 2. SOLID

### S — Single Responsibility

- **Sections** : ContactSection (contact + liens), ProjectsSection (liste projets), AboutSection (about + overlay) : une responsabilité par section.
- **Composants UI** : Container, SectionHeader, ContactLinks, ProjectCard : un rôle visuel/structurel chacun.
- **Fichiers de config** : `heroContent`, `projectsConfig`, `aboutConfig`, `contactLinks` : données seules, pas de logique métier.
- **Index** : Export uniquement (navigation, contact, etc.), pas de logique.

### O — Open/Closed

- **SectionHeader** : Ouvert à la variation via props (eyebrow, title, intro, headerClassName) ; fermé à la modification (comportement fixe).
- **ContactLinks** : Liste fournie en props ; `onLinkClick` optionnel pour étendre le comportement sans changer le composant.
- **Features** : Ajout d’une nouvelle section = nouveau dossier + composition dans une page, sans modifier les sections existantes.

### L — Liskov Substitution

- Pas d’héritage de composants ; composition uniquement. Pas de risque de substitution incorrecte.

### I — Interface Segregation

- Props des composants limitées à ce qui est utile (ex. `SectionHeader` : 4 props ; `ContactLinks` : links + optionnel onLinkClick).
- Pas d’objets “god” passés partout.

### D — Dependency Inversion

- Les sections dépendent d’abstractions (getTranslations, configs) et non d’implémentations concrètes.
- Hero dépend de `@/features/contact` (export public), pas du détail d’implémentation de la modale.

---

## 3. Autres bonnes pratiques

- **Séparation données / UI** : getContactLinks, heroContent, projects : données et traduction à part ; composants ne font que du rendu + composition.
- **Typage** : TypeScript strict, pas de `any` ; types exportés (ContactLinkItem, HeroContent, etc.).
- **Validation des entrées** : Messages i18n validés avec Zod au chargement.
- **Tests** : Logique métier et composants clés couverts (getContactLinks, ContactLinks, HeroText, navigationItems, messagesSchema).

---

## 4. Synthèse

| Principe | Statut | Commentaire |
|----------|--------|-------------|
| **DRY** | ✅ | SectionHeader extrait ; configs et typo centralisés. |
| **S** | ✅ | Une responsabilité par composant / section / config. |
| **O** | ✅ | Extension par props et composition, pas par modification. |
| **L** | ✅ | N/A (composition, pas d’héritage). |
| **I** | ✅ | Interfaces de props ciblées. |
| **D** | ✅ | Dépendances vers features et lib, pas vers le détail d’implémentation. |

Le projet est aligné avec DRY et SOLID pour un portfolio de cette taille ; la seule duplication restante (classes de section, éventuellement constante eyebrow) est mineure et assumée.
