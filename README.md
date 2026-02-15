# Portfolio — Vision, ADN & Design System

## Objectif du projet

Créer un **portfolio qui sort radicalement du lot**, pensé comme un **produit**, pas comme une vitrine marketing.

Ce portfolio doit :

* refléter un **niveau senior confirmé**
* montrer une **maîtrise technique et visuelle**
* incarner un style **pixel‑perfect, street, urbain**, tout en restant **corporate et crédible**
* prouver la cohérence entre **discours, architecture et exécution**

---

## ADN & Concept

### Concept global

> **Developer Control Room**

Le portfolio est conçu comme :

* un poste de travail
* un dashboard vivant
* une interface système

Pas :

* de landing page marketing
* de hero inutile
* de storytelling artificiel

Mais :

* des panels
* de la donnée
* des modules
* une logique produit

---

## Design System — Palette officielle

### Principes couleur

* Ambiance **night / urban / néon**
* Contraste élevé
* Accents rares mais puissants
* Aucun blanc pur

### Palette exacte

#### Backgrounds

* `--bg-primary`: `#0B0F1A`
  Fond principal (bleu nuit profond)

* `--bg-secondary`: `#0E1224`
  Surfaces secondaires / panels

* `--bg-tertiary`: `#151A33`
  Hover, cartes actives, overlays

#### Textes

* `--text-primary`: `#E6E8EF`
  Texte principal (jamais blanc)

* `--text-secondary`: `#A1A6C3`
  Metadata, descriptions

* `--text-muted`: `#6F7390`
  Labels secondaires

#### Accents

* `--accent-primary`: `#FF7A18`
  Orange néon (actions, focus, highlights)

* `--accent-danger`: `#E5484D`
  Rouge urbain (états critiques)

* `--accent-info`: `#4C6FFF`
  Bleu tech (liens, info)

* `--accent-purple`: `#7C6FFF`
  Violet indigo (animations subtiles)

---

## Typographie — Identité forte

### Principes

* Lisibilité maximale
* Sérieux, technique, précis
* Hiérarchie claire
* Mono utilisée comme **signal technique**, pas gadget

### Font principale (UI / contenu)

**Inter**

* Moderne
* Corporate
* Excellente lisibilité
* Idéale pour interfaces complexes

Utilisation :

* paragraphes
* navigation
* descriptions

---

### Font secondaire (tech / data / labels)

**JetBrains Mono**

Utilisation :

* titres techniques
* chiffres
* badges
* metadata
* sections projets

La mono donne le ton : *engineering first*

---

### Règles typographiques

* Pas plus de 2 fonts
* Tailles strictement définies
* Pas de font décorative
* Pas de font "startup trendy"

---

## Implémentation technique (preview)

* `next/font` uniquement
* Fonts centralisées dans `/lib/config/fonts.ts`
* Aucune importation directe dans les composants

---
