# Analyse typographique globale — myself_folio

## 1. Ce qui est cohérent

| Élément | Usage | Valeurs |
|--------|--------|--------|
| **Body** | `globals.css` | Inter (theme), couleur `--text-primary` |
| **Bouton CTA / Liens nav mobile** | `.btn-cta`, `.nav-link-mobile` | 1rem → lg: 1.125rem, font-weight 700 |
| **Liens nav desktop** | `.nav-link-desktop` | 1.125rem, font-weight 700 |
| **Modale contact** | `.modal-text` | 1rem → lg: 1.875rem, font-weight 700 |
| **Tags projets** | `.tag-text` | 11px (globals) |
| **Intro de section** (taille) | Contact, Projects, About | `text-sm` → `md:text-[15px]` → `lg:text-[15.5px]` |
| **Couleurs de texte** | Partout | `text-text-primary`, `text-text-secondary`, `text-text-secondary/80` ou `/90` |
| **Hero** | Titre / bio | Titre: 3xl → 6xl responsive, Bio: lg → xl → 3xl (volontairement forte hiérarchie) |
| **Cartes About** (titres) | Grille mobile + desktop | `text-lg font-semibold uppercase tracking-wide` |
| **Logo / nom du site** | Nav | Mobile `text-2xl`, Desktop `text-lg lg:text-xl`, font-bold |

---

## 2. Incohérences relevées

### 2.1 Eyebrow (petit label au-dessus du titre de section)

| Section | Classe actuelle | Problème |
|---------|-----------------|----------|
| Contact, Projects, About | `text-xs font-semibold uppercase tracking-[0.28em]` | Référence |
| **Testimonials** (slide) | `text-sm font-semibold uppercase tracking-[0.28em]` | Plus gros que les autres → **incohérent** |

**Recommandation :** Utiliser `text-xs` partout pour l’eyebrow (y compris Testimonials).

---

### 2.2 Titre de section (H1)

| Section | Classe actuelle | Problème |
|---------|-----------------|----------|
| **Contact** | `text-2xl md:text-3xl` | Seul à passer à 3xl en md |
| **Projects** | `text-2xl` | Reste 2xl partout |
| **About** | `text-2xl` | Reste 2xl partout |

**Recommandation :** Unifier : soit tous en `text-2xl md:text-3xl`, soit tous en `text-2xl`. Préférence : **tous `text-2xl md:text-3xl`** pour hiérarchie claire sur desktop.

---

### 2.3 Couleur de l’intro de section

| Section | Classe intro | Problème |
|---------|--------------|----------|
| **Contact** | `text-text-secondary/90` | Cohérent avec la sémantique secondaire |
| **Projects** | `text-white` | Différent |
| **About** | `text-white` | Différent |

**Recommandation :** Utiliser `text-text-secondary/90` (ou `text-text-secondary`) partout pour l’intro, pour alignement avec Contact et lisibilité.

---

### 2.4 Tailles en pixels arbitraires

Plusieurs composants utilisent des valeurs en `px` au lieu de l’échelle Tailwind :

| Fichier | Valeurs | Équivalent Tailwind possible |
|---------|---------|------------------------------|
| ContactSection, ProjectsSection, AboutSection | `text-[15px]`, `text-[15.5px]` | `text-base` (16px) ou garder pour finesse |
| ProjectCardBody | `text-[13.5px]`, `md:text-[18px]`, `lg:text-[13.5px]`, `xl:text-[15px]` | Comportement responsive très spécifique (rétrécit en lg) → à revoir ou commenter |
| AboutOverlayCard | `text-[14px]`, `md:text-[15px]` | `text-sm` (14px), `text-base` (16px) |
| TestimonialsSlide (quote) | `text-base md:text-lg` | Déjà cohérent |

**Recommandation :**  
- Pour les intros de section : garder `text-sm` + `md:text-[15px]` + `lg:text-[15.5px]` si tu veux ce léger progressif, ou simplifier en `text-sm md:text-base`.  
- Pour ProjectCardBody : simplifier la cascade (ex. `text-sm md:text-base`) sauf si le design impose ce comportement.  
- Éviter d’ajouter d’autres `text-[…px]` sans raison ; privilégier `text-xs` / `text-sm` / `text-base` / `text-lg`.

---

### 2.5 Titre des pages simples (404, etc.)

| Composant | Classe | Problème |
|-----------|--------|----------|
| **SimpleContentPage** | `text-2xl font-bold` | Sections utilisent `font-semibold` pour les titres |

**Recommandation :** Passer à `text-2xl font-semibold text-text-primary` pour alignement avec les titres de section.

---

### 2.6 Testimonials : titre du slide

- Titre : `text-3xl md:text-4xl` (plus gros que les titres de section en `text-2xl md:text-3xl`).  
- C’est un écran full viewport dédié, donc une hiérarchie plus forte est acceptable.  
- **Recommandation :** Pas obligatoire de changer ; si tu veux tout aligner, passer à `text-2xl md:text-3xl` comme les autres sections.

---

### 2.7 Home (Hero)

| Élément | Actuel | Problème / remarque |
|--------|--------|----------------------|
| **Titre hero** | `text-3xl → lg:text-6xl`, **font-bold** | Les titres de section utilisent `font-semibold` → hero plus gras volontairement. Option : passer en `font-semibold` pour cohérence stricte. |
| **Bio** | `text-lg → lg:text-3xl`, `text-text-secondary` | ✅ Couleur et échelle OK (hero = bloc principal). |
| **CTA** | `.btn-cta` | ✅ Déjà cohérent. |
| **Eyebrow** | Aucun | Les autres sections ont un eyebrow (text-xs, uppercase) au-dessus du titre. La home n’en a pas → **option** : ajouter un petit label (ex. "Portfolio" / "Développeur") pour alignement visuel avec le reste du site. |

**Recommandations Home :**
- **Optionnel** : Aligner le titre hero en `font-semibold` comme les titres de section (ou garder `font-bold` pour l’impact).
- **Optionnel** : Ajouter un eyebrow sur la home (clé `hero.eyebrow` en EN/FR + une ligne au-dessus du titre dans `HeroText`) pour la même logique que Contact / Projects / About.

---

## 3. Récapitulatif des actions recommandées

| Priorité | Action | Fichier(s) |
|----------|--------|------------|
| Haute | Eyebrow Testimonials : `text-sm` → `text-xs` | `TestimonialsSlide.tsx` |
| Haute | Titres de section : ajouter `md:text-3xl` à Projects et About | `ProjectsSection.tsx`, `AboutSection.tsx` |
| Moyenne | Intro : `text-white` → `text-text-secondary/90` pour Projects et About | `ProjectsSection.tsx`, `AboutSection.tsx` |
| Moyenne | SimpleContentPage : `font-bold` → `font-semibold` | `SimpleContentPage.tsx` |
| Basse | (Optionnel) Simplifier ou documenter la cascade de tailles dans ProjectCardBody | `ProjectCardBody.tsx` |
| Basse | (Optionnel) Remplacer `text-[14px]` / `text-[15px]` par `text-sm` / `text-base` où c’est possible | AboutOverlayCard, etc. |
| Home | (Optionnel) Hero titre : `font-bold` → `font-semibold` pour cohérence avec les sections | `HeroText.tsx` |
| Home | (Optionnel) Ajouter un eyebrow au-dessus du titre hero (clé `hero.eyebrow`) | `HeroText.tsx`, `Hero.tsx`, `en.json`, `fr.json` |

---

## 4. Échelle de référence proposée (pour la suite)

Pour garder l’app cohérente, s’appuyer sur :

- **Eyebrow / labels courts :** `text-xs`, uppercase, tracking large, `text-text-secondary/80`.
- **Titre de section (H1) :** `text-2xl md:text-3xl`, `font-semibold`, `text-text-primary`.
- **Intro / paragraphe secondaire :** `text-sm md:text-[15px] lg:text-[15.5px]` (ou `text-sm md:text-base`), `text-text-secondary/90`.
- **Titres de cartes / blocs :** `text-lg` ou `text-xl md:text-2xl`, `font-semibold`.
- **Corps (quotes, descriptions) :** `text-base` ou `text-base md:text-lg`, `leading-relaxed`.
- **Très petit (tags, badges) :** `.tag-text` (11px) ou `text-xs`.

Couleurs : toujours `text-text-primary`, `text-text-secondary` (et variantes /80, /90), pas de `text-white` pour le texte courant sauf sur fonds très sombres où c’est voulu.
