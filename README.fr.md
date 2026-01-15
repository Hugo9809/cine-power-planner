# Cine Power Planner

<img src="src/icons/app-icon.png" alt="Icône Cine Power Planner" width="160">

**Version actuelle :** 1.0.53 | **Licence :** ISC | **Node :** >=18 (outils de développement)

Cine Power Planner est une application web autonome pour créer, auditer et
partager des plans d’alimentation caméra professionnels sans que les données ne
quittent votre machine. Planifiez des rigs V‑Mount, B‑Mount ou Gold‑Mount,
modélisez les durées, capturez les exigences de projet et exportez des bundles
partageables — entièrement dans votre navigateur, même hors ligne. Toutes les
 dépendances vivent dans ce dépôt afin que la même expérience fonctionne sur
 une station de plateau, un portable de terrain ou un archive air‑gappée.

## Promesse de protection des données

- **Stockage local uniquement.** Projets, listes d’équipement, feedback de
  runtime, exports et backups restent sur votre machine dans IndexedDB, avec
  OPFS comme cible de sauvegarde lorsque c’est pris en charge ; le localStorage
  hérité reste un recours. L’app ne dépend d’aucun service externe.
- **Sync cloud optionnelle (mise à jour future).** La sync sera une couche
  opt-in qui copie les données locales vers Firebase Studio après un exercice
  pré-vol de backup et d’export.
- **Filets de sécurité en couches.** Sauvegarde, autosave, partage, import,
  backup et restauration créent toujours des snapshots de sécurité pour pouvoir
  récupérer avant promotion.
- **Conçu pour l’offline.** Tous les icônes, polices, Uicons et scripts d’aide
  sont stockés dans ce repo, donc l’usage hors ligne ne dégrade ni l’ergonomie
  ni la protection des données.

## Commencer ici (drill court)

1. Ouvrez `index.html` dans un navigateur compatible. Conservez la structure du
   dépôt pour que les icônes, polices et aides hors ligne se chargent localement.
2. Lancez **Help → Quick start checklist** pour répéter sauvegarde, partage,
   import, backup et restauration de bout en bout sur ce poste.
3. Exportez immédiatement un backup du planner et un bundle de projet. Stockez
   les deux sur des supports hors ligne séparés pour établir un point de
   restauration sûr.
4. Déconnectez le réseau et rechargez. Vérifiez que les projets, l’aide et
   **Force reload** fonctionnent toujours sans toucher aux données sauvegardées.

## Workflow de sécurité des données (chaque session)

1. **Sauvegarde + autosave.** Sauvegardez après des modifications importantes ;
   l’autosave conserve des snapshots locaux continus en cas de retour arrière.
2. **Partage/export = copie, pas déplacement.** Les bundles de projet et backups
   du planner dupliquent toujours les données. Stockez au moins deux copies hors
   ligne avant de supprimer quoi que ce soit.
3. **Import/restauration avec vérification.** Chaque restauration crée un backup
   préalable et liste des notes de compatibilité avant promotion.
4. **Exercice de récupération.** Testez régulièrement une restauration depuis un
   backup ou un bundle partagé pour confirmer que ce poste peut récupérer les
   données de bout en bout.

## Index de documentation

Le hub canonique de documentation se trouve dans
[`docs/README.md`](docs/README.md). Il regroupe la guidance hors ligne par rôle
(utilisateurs, opérations, développement) et par workflow afin que chaque
routine soit documentée une seule fois.

- **Utilisateurs :** commencez par le
  [User Guide](docs/user/user-guide.md), le
  [Data Protection Lifecycle Guide](docs/user/data-protection-lifecycle.md)
  et le
  [Sécurité de la sync cloud (mise à jour future)](docs/user/cloud-sync-safety.md).
- **Opérations :** répétez avec la
  [Operations Checklist](docs/ops/operations-checklist.md) et le
  [Offline Readiness Runbook](docs/ops/offline-readiness.md).
- **Développement :** suivez le
  [Development & Maintenance Guide](docs/dev/development.md) et le
  [Documentation Maintenance Guide](docs/dev/documentation-maintenance.md).

## Nouveau : Interface Utilisateur V2

L'application dispose désormais d'une interface utilisateur V2 entièrement repensée et responsive.

### Tableau de bord et Navigation
- **Tableau de bord moderne** : Gérez tous vos projets depuis une vue grille unifiée et consultable avec des tuiles colorées affichant le statut du projet, les dates et les actions rapides.
- **Navigation par barre latérale** : Accédez rapidement aux Projets, à la Bibliothèque d'équipements, aux Contacts, à l'Équipement personnel, aux Règles automatiques d'équipement, aux Paramètres et à l'Aide depuis une barre latérale persistante et repliable.
- **Design Mobile-First** : Mise en page entièrement responsive avec toggle de barre latérale mobile et contrôles optimisés pour le tactile.

### Gestion de projets
- **Suivi du statut de projet** : Suivez les projets à travers les étapes du workflow—Brouillon, Planification, En attente d'approbation, Approuvé, Tournage, Terminé et Archivé—avec des indicateurs de statut colorés.
- **Vues projet par onglets** : Naviguez entre Package Caméra, Résumé Puissance, Exigences et Liste d'équipement dans chaque projet.
- **Menus contextuels** : Clic droit sur les tuiles de projet pour des actions rapides comme dupliquer, archiver, exporter ou supprimer.

### Outils et Données
- **Bibliothèque d'équipements** : Parcourez et gérez votre base de données d'équipements avec filtrage et recherche.
- **Gestion des contacts** : Maintenez un répertoire d'équipe avec rôles, coordonnées et photos de profil. Importez des contacts depuis des fichiers vCard.
- **Suivi de l'équipement personnel** : Cataloguez votre inventaire d'équipement personnel avec quantités et notes d'approvisionnement.
- **Règles automatiques d'équipement** : Configurez des ajouts ou suppressions d'équipements déclenchés par scénario.

### Améliorations visuelles
- **Mode sombre amélioré** : Thème sombre affiné avec un meilleur contraste et lisibilité.
- **Mode rose** : Thème d'accent ludique avec effet animé de « pluie d'icônes ».
- **Contrôles de thème** : Boutons d'accès rapide dans la barre latérale pour le mode sombre, le mode rose et le rechargement forcé.

## Fonctionnalités clés

- **Base de connaissance énergétique.** Référez-vous aux valeurs intégrées ou
  étendez le catalogue local avec vos propres entrées.
- **Planification des batteries.** Combinez capacités, tensions et feedback de
  runtime pour des estimations réalistes.
- **Configurations de rigs personnalisées.** Mélangez caméras, accessoires et
  besoins d’équipe, puis exportez des bundles ou backups sans perte de données.
- **Fonctionnement offline-first.** Chaque asset est dans le repo, donc autosave,
  backup, restauration, partage et aide restent pleinement hors ligne.
- **Préparation à la sync cloud (mise à jour future).** Une sync optionnelle
  via Firebase Studio est prévue ; le stockage local reste la source de vérité.
- **Résumé de compatibilité de restauration.** Chaque restauration liste les
  sections manquantes et crée un backup préalable pour vérifier les changements.

## Installation

1. Clonez ou téléchargez ce dépôt sur un disque fiable :
   ```bash
   git clone /path/to/cine-power-planner.git
   cd cine-power-planner
   npm install
   ```
   (Si vous avez reçu un bundle hors ligne, décompressez-le dans un dossier
   local.)
2. Démarrez le serveur de développement :
   ```bash
   npm run dev
   ```
   Cela ouvre l'app à `http://localhost:3000` avec hot module replacement.
3. Pour les builds de production :
   ```bash
   npm run build      # Build vers dist/
   npm run preview    # Prévisualiser le build de production
   ```
4. (Usage hors ligne) Ouvrez `index.html` directement dans un navigateur
   compatible pour un usage entièrement hors ligne sans connexion réseau.

## Référence rapide des commandes

| Commande | Description |
| --- | --- |
| `npm run dev` | Démarrer le serveur de dev Vite avec HMR |
| `npm run build` | Build de production vers `dist/` |
| `npm test` | Exécuter la suite de tests complète (lint + checks + Jest) |
| `npm run lint` | Exécuter ESLint |
| `npm run check-consistency` | Valider les données des appareils et le manifeste SW |
| `npm run help` | Afficher tous les scripts disponibles |

Voir [Development & Maintenance Guide](docs/dev/development.md) pour la
référence complète des scripts npm et des conseils de dépannage.

## Traductions

Gardez les README localisés synchronisés avec ce README quand les workflows
changent, en particulier ceux liés à la sauvegarde, au partage, à l’import,
au backup ou à la restauration.

- [Deutsch](README.de.md)
- [English](README.en.md)
- [Español](README.es.md)
- [Français](README.fr.md)
- [Italiano](README.it.md)

## Licence

Distribué sous licence ISC. Voir `package.json` pour les détails.
