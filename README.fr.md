# Cine Power Planner

<img src="src/icons/app-icon.png" alt="Icône Cine Power Planner" width="160">

Cine Power Planner est une application web autonome pour créer, auditer et
partager des plans d’alimentation caméra professionnels sans que les données ne
quittent votre machine. Planifiez des rigs V‑Mount, B‑Mount ou Gold‑Mount,
modélisez les durées, capturez les exigences de projet et exportez des bundles
partageables — entièrement dans votre navigateur, même hors ligne. Toutes les
 dépendances vivent dans ce dépôt afin que la même expérience fonctionne sur
 une station de plateau, un portable de terrain ou un archive air‑gappée.

## Promesse de protection des données

- **Stockage local uniquement.** Projets, listes d’équipement, feedback de
  runtime, exports et backups restent sur votre machine ; l’app ne dépend d’aucun
  service externe.
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

## Index de documentation

Le hub canonique de documentation se trouve dans
[`docs/README.md`](docs/README.md). Il regroupe la guidance hors ligne par rôle
(utilisateurs, opérations, développement) et par workflow afin que chaque
routine soit documentée une seule fois.

- **Utilisateurs :** commencez par le
  [User Guide](docs/user/user-guide.md) et le
  [Data Protection Lifecycle Guide](docs/user/data-protection-lifecycle.md).
- **Opérations :** répétez avec la
  [Operations Checklist](docs/ops/operations-checklist.md) et le
  [Offline Readiness Runbook](docs/ops/offline-readiness.md).
- **Développement :** suivez le
  [Development & Maintenance Guide](docs/dev/development.md) et le
  [Documentation Maintenance Guide](docs/dev/documentation-maintenance.md).

## Fonctionnalités clés

- **Base de connaissance énergétique.** Référez-vous aux valeurs intégrées ou
  étendez le catalogue local avec vos propres entrées.
- **Planification des batteries.** Combinez capacités, tensions et feedback de
  runtime pour des estimations réalistes.
- **Configurations de rigs personnalisées.** Mélangez caméras, accessoires et
  besoins d’équipe, puis exportez des bundles ou backups sans perte de données.
- **Fonctionnement offline-first.** Chaque asset est dans le repo, donc autosave,
  backup, restauration, partage et aide restent pleinement hors ligne.
- **Résumé de compatibilité de restauration.** Chaque restauration liste les
  sections manquantes et crée un backup préalable pour vérifier les changements.

## Installation

1. Clonez ou téléchargez ce dépôt sur un disque fiable :
   ```bash
   git clone /path/to/cine-power-planner.git
   cd cine-power-planner
   ```
   (Si vous avez reçu un bundle hors ligne, décompressez-le dans un dossier
   local.)
2. Ouvrez `index.html` directement dans un navigateur compatible. Tous les
   assets se chargent depuis le dépôt, vous pouvez donc débrancher immédiatement.
3. (Optionnel) Servez le dossier via `http://localhost` pour activer le service
   worker et l’invite d’installation PWA. Tout serveur statique fonctionne
   hors ligne :
   ```bash
   python -m http.server
   # ou
   npm run serve
   ```

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
