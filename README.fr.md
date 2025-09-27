# Cine Power Planner

![Icône Cine Power Planner](src/icons/app-icon.svg)

Cine Power Planner est une application web autonome pour créer, auditer et partager des plans d’alimentation professionnels qui ne quittent jamais votre machine. Configurez des rigs V‑Mount, B‑Mount ou Gold-Mount, modélisez les autonomies, consignez les exigences du projet et exportez des lots partageables, entièrement dans le navigateur, même hors ligne. Toutes les dépendances résident dans ce dépôt, garantissant la même expérience sur un poste de plateau, un ordinateur portable de tournage ou un disque isolé.

## En résumé

- **Planification hors ligne en priorité.** Concevez des configurations V‑Mount, B‑Mount ou Gold-Mount directement dans le navigateur. Tous les Uicons, polices et scripts auxiliaires sont fournis localement, sans dépendre de CDNs ni du réseau. Clonez le dépôt, débranchez le câble et l’interface reste identique.
- **Données conservées sur l’appareil.** Projets, retours d’autonomie, favoris, équipements personnalisés, listes et préférences restent locaux. Les sauvegardes et lots partageables sont des fichiers JSON lisibles.
- **Réseaux de sécurité éprouvés.** Sauvegardes manuelles, enregistrements automatiques en arrière-plan et backups horodatés se complètent pour répéter la boucle Sauvegarder → Backup → Bundle → Restaurer dès la première utilisation.
- **Mises à jour sous contrôle.** Le service worker attend votre validation avant d’actualiser afin que les équipes restent sur une version vérifiée, même en déplacement ou avec une connectivité limitée.

## Vue d’ensemble

### Pensé pour les équipes

Le planner a été conçu pour les 1ers assistants caméra, data managers et chefs opérateurs. À chaque ajout de corps caméra, plaque batterie, lien sans fil ou accessoire, la consommation totale et les estimations d’autonomie se mettent à jour instantanément. Des alertes signalent les packs surchargés et les listes d’équipement restent liées au contexte du projet pour éviter toute perte lors du passage de relais.

### Prêt à voyager

Ouvrez `index.html` directement depuis le disque ou hébergez le dépôt sur votre réseau interne, sans build, serveur ni compte. Un service worker garde l’application disponible hors ligne, mémorise les préférences et n’applique les mises à jour que sur validation. Sauvegarde, partage, import, backup et restauration restent locaux pour protéger les données utilisateur.

### Pourquoi l’offline-first est crucial

Les plateaux disposent rarement d’une connectivité fiable et les studios exigent souvent des outils déconnectés. Cine Power Planner offre les mêmes capacités avec ou sans réseau : chaque ressource est incluse, chaque workflow fonctionne localement et chaque sauvegarde crée des artefacts que vous pouvez archiver sur des supports redondants. Vérifier ces workflows avant le tournage fait partie de la checklist pour ne dépendre d’aucun service externe en pleine production.

### Piliers fonctionnels

- **Planifier en confiance.** Calculez la consommation à 14,4 V/12 V (et 33,6 V/21,6 V pour le B‑Mount), comparez les batteries compatibles et visualisez l’impact dans un tableau de bord pondéré.
- **Rester prêt pour la production.** Les projets capturent équipements, exigences, scénarios, détails d’équipe et listes ; backups automatiques, bundles et mises à jour contrôlées gardent les données à jour sans sacrifier la stabilité.
- **Travailler à votre manière.** Détection de langue, thèmes sombre, rose et contraste élevé, contrôles typographiques, logos personnalisés et aide contextuelle rendent l’interface accessible en préparation comme sur le plateau. L’aide contextuelle renseigne désormais automatiquement des descriptions pour chaque bouton, champ et menu afin que chaque commande s’explique, même hors connexion.

## Principes fondamentaux

- **Toujours hors ligne.** L’application complète — icônes, pages légales et outils — est livrée dans le dépôt. Ouvrez `index.html` depuis le disque ou un intranet privé et le service worker synchronise les ressources sans imposer de connexion.
- **Pas de chemins cachés.** Sauvegardes, bundles, imports, backups et restaurations se déroulent intégralement dans le navigateur. Rien ne quitte la machine sauf export explicite.
- **Filets redondants.** Sauvegardes manuelles, autosaves en arrière-plan, backups périodiques, sauvegardes forcées avant restauration et exports lisibles empêchent toute disparition silencieuse.
- **Mises à jour prévisibles.** Elles ne s’appliquent que sur votre action. Les versions en cache restent disponibles jusqu’à ce que vous confirmiez **Forcer le rechargement**.
- **Présentation cohérente.** Uicons locaux, ressources OpenMoji et polices intégrées garantissent la même apparence en studio ou sur un poste déconnecté.

## Table des matières

- [En résumé](#en-résumé)
- [Vue d’ensemble](#vue-densemble)
- [Principes fondamentaux](#principes-fondamentaux)
- [Traductions](#traductions)
- [Nouveautés](#nouveautés)
- [Démarrage rapide](#démarrage-rapide)
- [Prérequis système et navigateurs](#prérequis-système-et-navigateurs)
- [Exercice sauvegarde/partage/import](#exercice-sauvegardepartageimport)
- [Routine quotidienne](#routine-quotidienne)
- [Sauvegarde et gestion de projet](#sauvegarde-et-gestion-de-projet)
- [Partage et imports](#partage-et-imports)
- [Formats de fichiers](#formats-de-fichiers)
- [Visite de l’interface](#visite-de-linterface)
- [Personnalisation et accessibilité](#personnalisation-et-accessibilité)
- [Sécurité des données et mode hors ligne](#sécurité-des-données-et-mode-hors-ligne)
- [Vue d’ensemble des données et du stockage](#vue-densemble-des-données-et-du-stockage)
- [Gestion des quotas et maintenance](#gestion-des-quotas-et-maintenance)
- [Backup et restauration](#backup-et-restauration)
- [Exercices d’intégrité](#exercices-dintégrité)
- [Check-lists opérationnelles](#check-lists-opérationnelles)
- [Plan de récupération d’urgence](#plan-de-récupération-durgence)
- [Listes de matériel et rapports](#listes-de-matériel-et-rapports)
- [Règles automatiques](#règles-automatiques)
- [Intelligence d’autonomie](#intelligence-dautonomie)
- [Raccourcis clavier](#raccourcis-clavier)
- [Localisation](#localisation)
- [Installer comme application](#installer-comme-application)
- [Flux de données matériel](#flux-de-données-matériel)
- [Développement](#développement)
- [Dépannage](#dépannage)
- [Retours et support](#retours-et-support)
- [Contribuer](#contribuer)
- [Remerciements](#remerciements)
- [Licence](#licence)

## Traductions

La documentation existe en plusieurs langues. L’application détecte automatiquement celle du navigateur lors du premier lancement et vous pouvez la modifier à tout moment depuis le menu en haut à droite ou via **Paramètres**.

- 🇬🇧 [English](README.en.md)
- 🇩🇪 [Deutsch](README.de.md)
- 🇪🇸 [Español](README.es.md)
- 🇮🇹 [Italiano](README.it.md)
- 🇫🇷 [Français](README.fr.md)

Consultez `docs/translation-guide.md` pour le guide de localisation.

## Nouveautés

- **Comparaison de sauvegardes** – Sélectionnez un enregistrement manuel ou un auto-backup, analysez les différences, ajoutez des notes d’incident et exportez un rapport avant toute restauration ou remise au montage.
- **Simulations de restauration** – Chargez un backup complet ou un bundle projet dans une sandbox isolée pour vérifier le contenu sans toucher aux profils de production.
- **Journal d’historique des sauvegardes** – Chaque téléchargement de backup complet enregistre localement l’horodatage et le nom de fichier. Consultez-le dans **Paramètres → Données & stockage** ou exportez le journal avec vos archives pour prouver la conservation hors ligne.
- **Règles automatiques de matériel** – Définissez des ajouts/suppressions déclenchés par scénario avec contrôle d’import/export et backups horodatés.
- **Tableau de couverture des règles** – Résume la couverture par scénario, les déclencheurs dupliqués, les bilans nets, les scénarios superposés, les conflits et les exigences non couvertes depuis Règles automatiques, applique des filtres de focus hors ligne et partage les mêmes informations via exports et impressions.
- **Tableau de bord données & stockage** – Auditez projets, listes, matériels personnalisés, favoris et retours d’autonomie directement depuis Paramètres et estimez la taille du backup.
- **Inspecteur de sauvegarde runtime** – Le bundle runtime consigne le résultat dans `window.__cineRuntimeIntegrity` et expose `window.cineRuntime.verifyCriticalFlows()` afin que l’équipe confirme les parcours de sauvegarde/partage/restauration avant le départ.
- **Superposition d’état d’autosave** – Réplique la dernière note d’autosave dans la boîte de dialogue des paramètres afin que les équipes voient l’activité de fond pendant les exercices.
- **Éditeur sensible au monitoring** – Affiche les champs de monitoring supplémentaires uniquement lorsque les scénarios l’exigent pour garder la création de règles focalisée.
- **Contrôles d’accent et typographie** – Ajustez couleur d’accent, taille et famille de police ; les thèmes sombre, rose et contraste élevé persistent entre les sessions.
- **Raccourcis de recherche globale** – Pressez `/` ou `Ctrl+K` (`⌘K` sur macOS) pour cibler la recherche instantanément, même avec la navigation mobile repliée.
- **Bouton Forcer le rechargement** – Rafraîchit les ressources du service worker sans effacer projets ni appareils.
- **Favoris épinglés** – Étoile les entrées pour garder caméras, batteries et accessoires préférés en tête de liste et inclus dans les backups.
- **Réinitialisation usine sécurisée** – Télécharge automatiquement un backup avant toute suppression de projets, appareils ou préférences.

Voir les README traduits pour les notes locales.

## Démarrage rapide

Appliquez cette checklist lors de l’installation ou après une mise à jour pour prouver que sauvegarde, partage, import, backup et restauration fonctionnent en ligne comme hors ligne.

1. Téléchargez ou clonez le dépôt.
2. Ouvrez `index.html` dans un navigateur moderne.
3. (Optionnel) Servez le dossier en HTTP(S) pour installer le service worker :
   ```bash
   npx http-server
   # ou
   python -m http.server
   ```
   L’application se met ensuite en cache pour un usage hors ligne et n’applique les mises à jour qu’après validation.
4. Chargez le planner, fermez l’onglet, coupez la connexion (ou activez le mode avion) puis rouvrez `index.html`. L’indicateur hors ligne doit clignoter brièvement pendant le chargement des ressources mises en cache, y compris les Uicons locaux.
5. Créez un projet, appuyez sur **Entrée** (ou **Ctrl+S**/`⌘S`) pour déclencher une sauvegarde manuelle et vérifiez l’apparition de l’auto-backup horodaté dans le sélecteur après quelques minutes.
6. Exportez **Paramètres → Backup & Restauration → Backup** et importez le fichier `planner-backup.json` dans un profil privé. Cette vérification garantit qu’aucune sauvegarde ne reste isolée et démontre le backup forcé avant restauration.
7. Entraînez-vous à exporter un bundle (`project-name.json`) puis à l’importer sur une seconde machine ou profil pour valider la chaîne Sauvegarder → Partager → Importer et s’assurer que les ressources locales suivent le projet hors ligne.
8. Archivez le backup vérifié et le bundle avec la copie du dépôt. Consignez date, machine et opérateur pour attester du succès de l’exercice et garder les flux synchronisés dès la première session.
9. Ouvrez la console du navigateur et capturez `window.__cineRuntimeIntegrity` (ou relancez `window.cineRuntime.verifyCriticalFlows()` puis enregistrez le rapport). Cette trace prouve que la sentinelle runtime a validé les parcours de sauvegarde/partage/restauration durant la répétition hors ligne.

## Prérequis système et navigateurs

- **Navigateurs modernes.** Validé sur les dernières versions de Chromium, Firefox et Safari. Activez service workers, l’accès à `localStorage` (stockage du site) et le stockage persistant.
- **Appareils adaptés au hors ligne.** Laptops et tablettes doivent autoriser le stockage persistant. Lancez l’application une fois en ligne pour mettre en cache toutes les ressources puis répétez la procédure de rechargement hors ligne avant le départ.
- **Espace local suffisant.** Les productions importantes accumulent projets, backups et listes. Surveillez l’espace disponible du profil navigateur et exportez régulièrement vers des supports redondants.
- **Aucune dépendance externe.** Tous les icônes, polices et scripts sont fournis. Copiez également `animated icons 3/` et les Uicons locaux lors du transfert du dossier.

## Exercice sauvegarde/partage/import

Cette routine prouve que sauvegarde, partage, import, backup et restauration fonctionnent hors ligne lorsqu’un nouveau membre rejoint l’équipe, qu’un poste est préparé ou qu’une mise à jour majeure arrive.

1. **Sauvegarde de base.** Ouvrez le projet courant, effectuez une sauvegarde manuelle et notez l’horodatage. Un auto-backup doit apparaître en moins de dix minutes.
2. **Export redondant.** Produisez un backup du planner et un bundle projet. Renommez-le en `.cpproject` si nécessaire et stockez les deux sur des supports distincts.
3. **Répétition de restauration.** Passez sur un profil privé (ou une seconde machine), importez d’abord le backup complet, puis le bundle. Vérifiez listes, tableaux de bord, règles et favoris.
4. **Vérification hors ligne.** Sur le profil d’essai, coupez la connexion et rechargez `index.html`. Confirmez l’affichage de l’indicateur hors ligne et le chargement des Uicons et scripts locaux.
5. **Archivage.** Supprimez le profil de test après validation et étiquetez les exports selon le protocole de production.
6. **Consignez la sentinelle runtime.** Dans le même profil, ouvrez la console et vérifiez que `window.__cineRuntimeIntegrity.ok` vaut `true`. Si besoin d’un nouveau rapport, exécutez `window.cineRuntime.verifyCriticalFlows({ warnOnFailure: true })` et archivez le résultat avec vos notes.

## Routine quotidienne

1. **Créer ou charger un projet.** Saisissez un nom et appuyez sur **Entrée**/**Sauvegarder**. Le nom actif apparaît dans les listes et exports.
2. **Ajouter caméras, alimentation et accessoires.** Sélectionnez les équipements via des menus catégorisés. Recherche incrémentale, favoris et raccourci `/` (`Ctrl+K`/`⌘K`) accélèrent la sélection.
3. **Contrôler puissance et autonomie.** Surveillez les alertes, comparez les batteries et consultez le tableau de bord d’autonomie pour comprendre l’impact de la température, du codec, de la cadence, etc.
4. **Rassembler les exigences.** Renseignez équipe, scénarios, poignées, matte box et configuration de monitoring. Les boutons dupliquer accélèrent la saisie. Utilisez **Paramètres → Règles automatiques** pour ajouter/retraiter du matériel spécifique avant export.
5. **Exporter ou archiver.** Générez la liste de matériel, exportez un backup ou téléchargez un bundle avant de partir sur le plateau. Les backups incluent équipements personnalisés, retours et favoris.
6. **Valider la préparation hors ligne.** Coupez le réseau, rechargez l’application et vérifiez que projets, réglages et listes restent accessibles. Restaurez le dernier backup en cas d’écart.

## Sauvegarde et gestion de projet

- **Sauvegardes manuelles pour des versions explicites.** Entrez le nom et appuyez sur **Entrée**/**Sauvegarder**. Chaque version conserve équipements, exigences, listes, favoris, schémas et observations.
- **Autosaves pour le travail en cours.** Tant qu’un projet est ouvert, l’application écrit les changements en arrière-plan. Des entrées `auto-backup-…` apparaissent toutes les dix minutes.
- **Afficher les auto-backups à la demande.** Activez **Paramètres → Backup & Restauration → Afficher les auto-backups** pour visualiser les horodatages.
- **Renommer crée une branche.** Modifier le nom puis valider duplique le projet — pratique pour comparer des variantes.
- **Changer de projet n’efface rien.** Sélectionnez un autre élément dans le menu ; la position et les saisies non sauvegardées se propagent.
- **Suppression avec confirmation.** L’icône corbeille demande toujours une validation avant d’effacer.

## Partage et imports

- **Bundles compacts.** **Exporter le projet** télécharge `project-name.json` avec le projet actif, les favoris et les équipements personnalisés. Renommez-le en `.cpproject` si votre flux le requiert.
- **Règles automatiques incluses.** Activez **Inclure les règles automatiques** pour qu’elles voyagent ; à l’import, vos collègues peuvent les ignorer, les appliquer uniquement au projet ou les fusionner au jeu global.
- **Imports validés hors ligne.** Lors de l’import d’un `auto-gear-rules-*.json`, le planner vérifie type, version sémantique et métadonnées avant d’écraser vos règles. Les fichiers provenant d’une autre version déclenchent des avertissements et l’ancienne capture est restaurée automatiquement en cas d’échec.
- **Restaurations double tampon.** Avant tout import, une sauvegarde du contexte courant est demandée. Une fois le bundle validé, le projet restauré apparaît en tête du sélecteur.
- **Workflows inter-appareils hors ligne.** Copiez `index.html`, `script.js`, `devices/` et vos fichiers de backup/bundle sur un support amovible, lancez depuis le disque et continuez sans connexion.
- **Exporter en conscience.** Relisez le JSON avant partage pour vérifier le contenu. Le format étant lisible, vous pouvez supprimer ou dupliquer les entrées nécessaires.
- **Le téléchargement manuel sécurise les exports.** Si le navigateur ou un bloqueur empêche la sauvegarde, le planner ouvre un onglet « Manual download » avec le contenu JSON. Appuyez sur `Ctrl+A`/`Ctrl+C` (`⌘A`/`⌘C` sur macOS), collez le texte dans un fichier `.json` et rangez-le avec vos sauvegardes avant de fermer l’onglet.
- **Synchroniser avec les check-lists.** Lorsqu’un collaborateur vous envoie un bundle mis à jour, importez-le, vérifiez les horodatages `Mis à jour` et archivez le JSON précédent pour garder l’historique.
- **Partager sans perdre le contexte.** Les bundles mémorisent langue, thème, logo et préférences pour que le destinataire retrouve un environnement familier même hors ligne.

## Formats de fichiers

- **`project-name.json` (bundle).** Contient un projet, les favoris et équipements personnalisés. Renommer en `.cpproject` ne change rien à l’import.
- **`planner-backup.json` (backup complet).** Généré via **Paramètres → Backup & Restauration → Backup**, il capture projets, auto-backups, favoris, retours, règles, préférences, polices et éléments de branding.
- **`auto-gear-rules-*.json` (règles).** Export optionnel depuis **Règles automatiques** avec métadonnées de type, version et horodatage pour validation hors ligne. Stockez-les avec les backups complets.

## Visite de l’interface

### Référence rapide

- **Recherche globale** (`/`, `Ctrl+K`, `⌘K`) pour accéder à toute fonctionnalité, liste ou thème d’aide, même navigation repliée.
  Les suggestions mettent désormais en avant les correspondances directes avec les fonctionnalités et appareils avant les sujets
  d’aide pour que les parcours clavier atteignent d’abord les commandes essentielles. Les petites fautes de frappe sont tolérées
  afin que les requêtes approximatives mènent tout de même au bon endroit.
- **Centre d’aide** (`?`, `H`, `F1`, `Ctrl+/`) proposant guides, raccourcis, FAQ et mode aide au survol.
- **Diagramme de projet** pour visualiser alimentation et signal ; maintenez Maj lors de l’export pour enregistrer un JPG.
- **Comparateur de batteries** affichant les performances et alertant sur les surcharges.
- **Générateur de listes** qui produit des tableaux catégorisés avec métadonnées, emails et accessoires liés aux scénarios.
- **Comparaison de versions** (**Paramètres → Sauvegarde & Restauration → Comparer les versions**) met en évidence les écarts entre sauvegardes manuelles ou automatiques, permet de consigner l’incident et d’exporter un journal avant archivage.
- **Répétition de restauration** charge les sauvegardes dans un bac à sable pour vérifier chaque enregistrement hors ligne avant de restaurer les données de production.
- **Indicateur hors ligne et Forcer le rechargement** montrant l’état de connexion et rafraîchissant les ressources sans toucher aux données.

### Barre supérieure

- Lien d’évitement, indicateur hors ligne et branding responsive assurent l’accessibilité.
- La recherche se focalise avec `/` ou `Ctrl+K` (`⌘K`), corrige les petites fautes automatiquement, ouvre la navigation sur
  mobile et se vide avec Échap.
- Les contrôles de langue, thèmes sombre/rose et le dialogue Paramètres permettent d’ajuster couleur d’accent, taille et police, contraste élevé, logo personnalisé ainsi que d’accéder aux outils de backup, restauration et réinitialisation (avec sauvegarde automatique).
- Le bouton d’aide ouvre un dialogue consultable et répond à `?`, `H`, `F1` ou `Ctrl+/` à tout moment.
- Le bouton 🔄 supprime les ressources mises en cache et recharge l’application sans effacer les projets ou données d’autonomie.

### Navigation et recherche

- Sur petits écrans, un menu latéral pliable réplique les sections principales.
- Chaque liste et éditeur propose une recherche inline et un filtrage instantané. `/` ou `Ctrl+F` (`⌘F`) ciblent le champ le plus proche.
- Les icônes étoile épinglent les favoris en tête de liste et les conservent dans les sauvegardes.

## Personnalisation et accessibilité

- Basculez entre thèmes clair, sombre, rose et contraste élevé ; couleur d’accent, taille et typographie persistent hors ligne.
- Lien d’évitement, focus visibles et mise en page responsive facilitent la navigation clavier, tablette et mobile.
- Raccourcis couverts : recherche (`/`, `Ctrl+K`, `⌘K`), aide (`?`, `H`, `F1`, `Ctrl+/`), sauvegarde (`Entrée`, `Ctrl+S`, `⌘S`), mode sombre (`D`) et thème rose (`P`).
- Le mode aide au survol transforme boutons, champs, menus et titres en infobulles à la demande.
- Téléchargez un logo personnalisé pour les impressions, définissez des valeurs de monitoring et des préréglages d’exigences.
- Les boutons dupliquer accélèrent la saisie et les favoris conservent les équipements récurrents à portée.

## Sécurité des données et mode hors ligne

- Le service worker met en cache chaque ressource pour une utilisation hors ligne et n’applique les mises à jour qu’après **Forcer le rechargement**.
- Projets, retours d’autonomie, favoris, équipements personnalisés, thèmes et listes résident dans le stockage du navigateur. Une demande de persistance est effectuée pour réduire le risque d’éviction.
- Les sauvegardes automatiques enchaînent des instantanés de projet toutes les dix minutes, des archives complètes horaires et des copies des règles automatiques en arrière-plan. Activez **Paramètres → Sauvegarde & Restauration → Afficher les auto-sauvegardes dans la liste** pour afficher la chronologie, ajuster la rétention et restaurer des instantanés sans connexion.
- Si le navigateur bloque les téléchargements, l’application ouvre un onglet **Téléchargement manuel** contenant le JSON afin de le copier dans un fichier `.json` et de le stocker sur un support hors ligne de confiance avant de fermer l’onglet.
- Utilisez **Paramètres → Sauvegarde & Restauration → Comparer les versions** pour confronter deux sauvegardes, consigner le contexte dans **Notes d’incident** et exporter un journal pour vos transmissions.
- Lancez **Répétition de restauration** depuis **Paramètres → Sauvegarde & Restauration** pour charger une sauvegarde dans un bac à sable jetable, revoir le tableau comparatif et confirmer son intégrité avant d’appliquer **Restaurer** aux données actives.
- Ouvrir le dépôt depuis le disque ou un réseau interne évite toute fuite vers l’extérieur. Les exports JSON sont lisibles pour audit.
- L’en-tête affiche un indicateur hors ligne lorsqu’il n’y a pas de connexion ; **Forcer le rechargement** rafraîchit les fichiers sans toucher aux sauvegardes.
- **Réinitialisation usine** ou nettoyage des données ne s’exécutent qu’après génération d’un backup automatique.
- Les mises à jour du service worker se téléchargent en tâche de fond et attendent votre accord. À l’apparition de **Mise à jour prête**, terminez vos modifications, créez un backup puis cliquez sur **Forcer le rechargement**.
- Les données résident dans un `localStorage` renforcé ; les profils restreints basculent sur `sessionStorage`. Chaque écriture crée un instantané `__legacyMigrationBackup` pour restaurer sans perte en cas d’erreur de quota ou de schéma. Les outils développeur peuvent inspecter ou exporter les enregistrements avant de vider les caches ou de lancer des tests.

## Vue d’ensemble des données et du stockage

- Ouvrez **Paramètres → Données & stockage** pour consulter projets, auto-backups, listes, équipements personnalisés, favoris, retours et cache de session avec des compteurs en temps réel.
- Chaque section précise son contenu ; les sections vides restent masquées pour identifier rapidement l’état du planner.
- Le résumé estime la taille d’un backup à partir de la dernière exportation.
- Les backups complets affichent leur total cumulé et alimentent le journal d’historique afin que vous confirmiez la capture des copies horaires avant archivage hors ligne.

## Gestion des quotas et maintenance

- **Valider l’accès au stockage persistant.** Vérifiez le statut sur chaque poste. Si le navigateur refuse, refaites la demande ou planifiez plus d’exports manuels.
- **Surveiller la marge disponible.** Utilisez le tableau de bord ou l’inspecteur du navigateur. En cas de place limitée, archivez les backups anciens, supprimez les entrées `auto-backup-…` redondantes et vérifiez que les nouveaux exports aboutissent.
- **Recharger les caches après mise à jour.** Après **Forcer le rechargement**, ouvrez le centre d’aide, les pages légales et les écrans les plus utilisés pour recharger Uicons, OpenMoji et polices.
- **Documenter l’état du stockage.** Ajoutez ces vérifications à vos rapports de préparation et de clôture : statut de persistance, espace restant et emplacement des derniers backups.

## Backup et restauration

- **Instantanés enregistrés** – Le sélecteur conserve chaque sauvegarde manuelle et crée un `auto-backup-…` toutes les dix minutes.
- **Backups complets** – **Paramètres → Backup & Restauration → Backup** télécharge `planner-backup.json` avec projets, équipements personnalisés, retours, favoris, règles automatiques et état UI. Les restaurations créent une copie de sécurité et avertissent si le fichier provient d’une autre version.
- **Journal d’historique** – Chaque backup complet ajoute une entrée consultable via **Paramètres → Données & stockage** ou exportable avec l’archive. Horodatages et noms restent alignés avec votre documentation même hors ligne.
- **Backups de migration cachés** – Avant d’écraser planners, configurations ou préférences, l’application enregistre le JSON précédent dans `__legacyMigrationBackup`. En cas d’échec, les outils de récupération reviennent automatiquement à cette copie.
- **Snapshots automatiques des règles** – Les modifications dans **Règles automatiques** génèrent des copies horodatées toutes les dix minutes.
- **Réinitialisation usine** – Efface les données uniquement après téléchargement d’un backup.
- **Rappels horaires** – Une tâche de fond invite à créer un backup toutes les heures pour disposer d’une capture récente.
- **Sentinelle d’intégrité runtime** – Avant un déplacement, ouvrez la console et vérifiez que `window.__cineRuntimeIntegrity.ok` vaut `true` (ou exécutez `window.cineRuntime.verifyCriticalFlows({ warnOnFailure: true })`). Le rapport démontre que les parcours de sauvegarde/partage/restauration restent protégés hors ligne.
- **Boucle de vérification** – Après chaque backup critique, importez-le dans un profil séparé pour confirmer le résultat avant de supprimer l’instance de test.
- **Habitudes de stockage sécurisées** – Étiquetez les backups avec nom de projet et horodatage puis stockez-les sur des supports redondants (RAID, clé chiffrée, disque optique).
- **Comparer avant d’écraser** – Téléchargez un backup du contexte actuel avant toute restauration et examinez les différences avec un outil diff JSON pour fusionner manuellement si besoin.

## Exercices d’intégrité

- **Validation pré-vol (quotidienne ou avant changements majeurs).** Sauvegardez manuellement, exportez un backup complet et un bundle, importez-les dans un profil privé, vérifiez projets, règles, favoris et tableaux puis supprimez le profil.
- **Répétition hors ligne (hebdomadaire ou avant déplacement).** Lancez le planner, déclenchez un backup, coupez tout réseau et rechargez `index.html`. Vérifiez l’indicateur, la netteté des Uicons et l’ouverture du projet vérifié.
- **Contrôle de changement (après mise à jour des données ou scripts).** Exécutez `npm test` puis répétez la validation pré-vol. Archivez le backup validé avec une note de changement.
- **Rotation de redondance (mensuelle ou avant archivage).** Stockez le backup le plus récent, un bundle vérifié (renommé `.cpproject` si besoin) et une archive ZIP du dépôt sur au moins deux supports. Alternez celui que vous testez pour détecter toute dégradation.

## Check-lists opérationnelles

Ces routines garantissent que projets, backups et ressources hors ligne restent synchronisés sur chaque machine utilisant Cine Power Planner. Une version imprimable se trouve dans `docs/operations-checklist.md` et le guide de déplacement `docs/offline-readiness.md` détaille les étapes supplémentaires pour les opérations prolongées sans connexion.

### Préparation avant tournage

1. **Valider la bonne révision.** Ouvrez `index.html`, cliquez sur **Forcer le rechargement** et vérifiez la version dans **Paramètres → À propos**. Ouvrez les pages légales pour précharger Uicons, OpenMoji et polices.
2. **Charger les projets critiques.** Ouvrez le plan en cours et un `auto-backup-…` récent. Vérifiez listes, retours et favoris dans les deux cas.
3. **Tester la chaîne de sauvegarde.** Apportez une modification, sauvegardez avec `Entrée` ou `Ctrl+S`/`⌘S`, exportez `planner-backup.json`, importez-le dans un profil privé et comparez le sélecteur.
4. **Valider le partage.** Exportez `project-name.json`, importez-le, vérifiez règles automatiques, équipements personnalisés et indicateur hors ligne. Supprimez ensuite le profil.
5. **Simuler l’absence de réseau.** Coupez la connexion ou activez le mode avion, rechargez le planner et vérifiez l’indicateur, la netteté des icônes et l’accès aux projets.
6. **Archiver les artefacts de validation.** Conservez le backup vérifié, le bundle et une archive du dépôt sur des supports redondants pour reconstruire l’environnement sans Internet.

### Handoff de fin de journée

1. **Capturer un backup final.** Avec le projet ouvert, exportez `planner-backup.json` et le dernier `project-name.json` (renommé `.cpproject` si besoin) et étiquetez-les (date, lieu, journée).
2. **Valider les imports.** Restaurez les deux fichiers sur une machine de vérification hors ligne pour détecter toute corruption.
3. **Consigner les changements.** Notez quels auto-backups ont été promus, quels équipements personnalisés ont été ajoutés et quelles règles ont changé. Archivez ces notes avec les backups.
4. **Actualiser les caches volontairement.** Après archivage, cliquez sur **Forcer le rechargement**, ouvrez le centre d’aide et les pages légales pour recharger les ressources avant la prochaine session hors ligne.
5. **Transmettre les supports redondants.** Fournissez des copies chiffrées à l’équipe stockage et conservez un second jeu selon la politique de rétention.

## Plan de récupération d’urgence

1. **Mettre en pause et préserver l’état.** Laissez l’onglet ouvert, coupez la connexion si possible et notez l’heure ainsi que l’état de l’indicateur hors ligne. Évitez de recharger.
2. **Exporter l’existant.** Lancez **Paramètres → Backup & Restauration → Backup** et téléchargez `planner-backup.json`. Même si la liste semble incorrecte, ce fichier capture auto-backups, favoris, retours et règles pour analyse.
3. **Dupliquer les auto-backups.** Affichez les entrées `auto-backup-…`, promouvez les snapshots récents en sauvegardes manuelles et renommez-les avec un identifiant d’incident ou l’horodatage.
4. **Examiner le bundle de vérification.** Importez le dernier `project-name.json`/`.cpproject` validé dans un profil privé ou une machine secondaire hors ligne pour vérifier projets, listes et paramètres.
5. **Restaurer avec soin.** Après validation, restaurez le backup récent sur la machine principale. Le processus crée d’abord une copie de sécurité, ce qui permet de comparer avec un diff JSON si nécessaire.
6. **Réhydrater et documenter.** Une fois la récupération terminée, cliquez sur **Forcer le rechargement**, ouvrez le centre d’aide et les pages légales pour réchauffer les caches, puis consignez l’incident (symptômes, fichiers exportés, emplacements, machine de vérification). Archivez ce rapport avec le backup.

## Listes de matériel et rapports

- **Générer la liste de matériel et des exigences** transforme la sélection et les exigences en tableaux catégorisés qui se mettent à jour automatiquement.
- Les entrées sont regroupées par catégorie et les doublons fusionnés. Les scénarios ajoutent rigging, protections météo et accessoires spécifiques pour refléter la réalité terrain.
- Les règles automatiques s’exécutent après le générateur pour ajouter ou retirer des éléments sans modifier le JSON à la main.
- Les annotations de couverture du tableau des règles apparaissent dans les vues imprimables, les exports et les bundles partagés afin que les revues hors ligne reflètent le même résumé.
- Les lignes d’objectifs incluent diamètre frontal, poids, mise au point minimale, besoin de rods et composants matte box. Les lignes batteries tiennent compte du nombre et du matériel de bascule à chaud.
- Détails de l’équipe, configurations de monitoring, distribution vidéo et notes personnalisées apparaissent dans les exports.
- Les listes sont sauvegardées avec le projet, visibles dans les aperçus imprimables et incluses dans les bundles ; utilisez **Supprimer la liste** pour repartir de zéro.

## Règles automatiques

Via **Paramètres → Règles automatiques**, ajustez chaque liste sans éditer le JSON manuellement :

- Déclenchez des règles uniquement lorsque des **Scénarios requis** spécifiques sont actifs ; ajoutez un libellé facultatif pour les identifier rapidement.
- Ajoutez du matériel avec catégorie et quantité ou utilisez **Ajouts personnalisés** pour des rappels, kits spécialisés ou notes. Les règles de retrait masquent certaines lignes générées automatiquement.
- Les règles s’exécutent après les packs intégrés pour se combiner proprement et sont incluses dans listes, backups et bundles.
- Un tableau dédié met en avant déclencheurs dupliqués, bilans nets, conflits et scénarios non couverts. Les cartes de focus filtrent la liste, renvoient vers les règles concernées et restent opérationnelles hors ligne.
- Orientez aussi les règles via le **Poids de la caméra** en comparant le boîtier sélectionné à un seuil en grammes (plus lourd, plus léger ou identique) avant que l’automatisation n’ajoute ou ne retire du matériel.
- Sauvegarder une liste conserve l’ensemble de règles actif ; charger le projet ou importer un bundle restaure son périmètre.
- Ces informations de couverture voyagent comme objet `coverage` dans les aperçus imprimables, backups, exports de projet et bundles partagés pour que les audits ultérieurs voient le même instantané.
- Exporte/importez l’ensemble en JSON, revenez aux paramètres d’usine ou utilisez l’historique automatique (toutes les dix minutes) si une modification pose problème.

## Intelligence d’autonomie

Les autonomies remontées par les utilisateurs alimentent un modèle pondéré reflétant l’expérience terrain :

- Ajustements de température : ×1 à 25 °C, ×1,25 à 0 °C, ×1,6 à −10 °C, ×2 à −20 °C.
- Résolution : ≥12K ×3, ≥8K ×2, ≥4K ×1,5, ≥1080p ×1, valeurs inférieures proportionnelles.
- Cadence : échelle linéaire à partir de 24 fps (48 fps = ×2).
- Wi‑Fi activé : +10 %.
- Codecs : RAW/BRAW/ARRIRAW/R3D/CinemaDNG/Canon RAW/X‑OCN ×1 ; ProRes ×1,1 ; DNx/AVID ×1,2 ; All-Intra ×1,3 ; H.264/AVC ×1,5 ; H.265/HEVC ×1,7.
- Les moniteurs sont pondérés selon le ratio de luminosité.
- Le poids final reflète la contribution de chaque composant afin que des rigs similaires influencent davantage le modèle.
- Un tableau de bord trie par poids, affiche les pourcentages et souligne les valeurs atypiques.

## Raccourcis clavier

| Raccourci | Action | Notes |
| --- | --- | --- |
| `/`, `Ctrl+K`, `⌘K` | Focaliser la recherche globale | Fonctionne même navigation repliée ; `Échap` efface |
| `Entrée`, `Ctrl+S`, `⌘S` | Sauvegarder le projet actif | Le bouton reste inactif tant qu’aucun nom n’est saisi |
| `?`, `H`, `F1`, `Ctrl+/` | Ouvrir l’aide | La boîte de dialogue reste consultable |
| `D` | Basculer en mode sombre | Aussi disponible dans **Paramètres → Thèmes** |
| `P` | Activer le thème rose | Compatible avec clair, sombre ou contraste élevé |
| 🔄 | Recharger les ressources en cache | Également via **Paramètres → Forcer le rechargement** |

## Localisation

Prévisualisez immédiatement de nouvelles langues :

1. Dupliquez le README le plus proche en `README.<lang>.md` et traduisez-le.
2. Ajoutez les chaînes dans `translations.js` en conservant les placeholders (`%s`).
3. Copiez et traduisez les pages statiques (confidentialité, mentions légales).
4. Exécutez `npm test` avant de soumettre une pull request.

## Installer comme application

Cine Power Planner est une Progressive Web App :

1. Ouvrez `index.html` dans un navigateur compatible.
2. Utilisez l’option **Installer** ou **Ajouter à l’écran d’accueil**.
   - **Chrome/Edge (desktop)** : icône d’installation dans la barre d’adresse.
   - **Android** : menu du navigateur → *Ajouter à l’écran d’accueil*.
   - **Safari iOS** : bouton partager → *Ajouter à l’écran d’accueil*.
3. Lancez l’application depuis votre liste de programmes. La version installée fonctionne hors ligne et se met à jour automatiquement après validation.

## Flux de données matériel

Les catalogues se trouvent dans `devices/`. Chaque fichier regroupe des équipements associés pour faciliter l’audit. Avant de valider une modification, exécutez :

```bash
npm run normalize
npm run unify-ports
npm run check-consistency
npm run generate-schema
```

`npm run normalize` nettoie les noms de connecteurs, `npm run unify-ports` unifie les libellés, `npm run check-consistency` vérifie les champs requis et `npm run generate-schema` régénère `schema.json`. Pour itérer sur les données :

```bash
npm run test:data
```

Ajoutez `--help` à n’importe quelle commande pour obtenir de l’aide et consultez les diffs générés avant d’ouvrir une pull request. `npm run help` récapitule les scripts disponibles.

## Développement

Installez Node.js 18 ou supérieur. Après clonage :

```bash
npm install
npm run lint
npm test
```

`npm test` exécute ESLint, les vérifications de données et Jest séquentiellement (`--runInBand`, `maxWorkers=1`). Pendant l’itération, lancez des suites ciblées :

```bash
npm run test:unit
npm run test:data
npm run test:dom
npm run test:script
```

### Bundle pour navigateurs anciens

Après modification de `src/scripts/` ou `src/data/`, lancez `npm run build:legacy` pour régénérer le bundle ES5 servi aux navigateurs plus anciens et maintenir les polyfills locaux à jour.

### Structure des fichiers

```
index.html
src/styles/style.css
src/styles/overview.css
src/styles/overview-print.css
src/scripts/script.js
src/scripts/storage.js
src/scripts/static-theme.js
src/data/index.js
src/data/devices/
src/data/schema.json
src/vendor/
legal/
tools/
tests/
```

## Dépannage

- **Service worker bloqué sur une ancienne version ?** Cliquez sur **Forcer le rechargement** ou faites un hard reload via les outils développeur.
- **Données manquantes après fermeture d’onglet ?** Vérifiez l’accès au stockage ; la navigation privée peut le bloquer.
- **Téléchargements bloqués ?** Autorisez les téléchargements multiples pour sauvegardes et bundles.
- **Scripts en ligne de commande en échec ?** Assurez-vous d’utiliser Node.js 18+, exécutez `npm install` et relancez. En cas d’erreur mémoire, ciblez une suite plus légère (`npm run test:unit`).

## Retours et support

Ouvrez une issue si vous rencontrez un problème, avez une question ou souhaitez proposer une fonctionnalité. Joindre des exports ou des exemples d’autonomie aide à maintenir un catalogue précis.

## Contribuer

Les contributions sont bienvenues ! Lisez `CONTRIBUTING.md`, puis ouvrez une issue ou soumettez une pull request. Lancez `npm test` avant envoi.

## Remerciements

Le planner inclut des Uicons locaux, des ressources OpenMoji et d’autres visuels empaquetés pour disposer d’icônes hors ligne, et utilise lz-string pour stocker les projets de façon compacte dans les URLs et backups.

## Licence

Distribué sous licence ISC. Voir `package.json` pour les détails.
