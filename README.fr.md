# Cine Power Planner

![Icône Cine Power Planner](icon.svg)

Cine Power Planner est une application Web utilisable hors ligne pour planifier des rigs caméra professionnels alimentés par des batteries V‑Mount, B‑Mount ou Gold‑Mount. Elle calcule la consommation totale, vérifie que chaque batterie peut fournir en toute sécurité le courant requis, estime des autonomies réalistes à partir de données terrain pondérées et conserve au même endroit l’équipe, les scénarios et les listes de matériel afin qu’aucune information ne se perde entre les départements.

---

## Points forts

### Concevez des configurations complexes sans tâtonner
- Combinez caméras, plaques batteries, liaisons sans fil, moniteurs, moteurs et accessoires tout en visualisant la puissance totale, le courant à 14,4 V/12 V (et 33,6 V/21,6 V pour le B‑Mount) ainsi que l’autonomie estimée.
- Comparez les batteries compatibles côte à côte et recevez des alertes lorsque la demande dépasse les limites D‑Tap ou pin.
- Visualisez vos rigs avec un diagramme interactif offrant glisser-déposer, zoom, export SVG/JPG et avertissements de compatibilité.

### Gardez tous les départements alignés
- Enregistrez plusieurs projets avec exigences, contacts d’équipe, scénarios de tournage et notes personnalisées.
- Générez des listes de matériel imprimables qui regroupent l’équipement par catégorie, fusionnent les doublons, incluent les métadonnées techniques et ajoutent des accessoires en fonction des scénarios.
- Partagez des paquets JSON contenant sélections d’appareils, retours d’autonomie, listes de matériel et appareils personnalisés pour une restauration complète.

### Prête à voyager et respectueuse de la vie privée
- Fonctionne entièrement dans le navigateur : ouvrez `index.html` directement ou hébergez le dépôt en HTTPS pour activer le service worker.
- La mise en cache hors ligne conserve langue, thème, favoris et projets partout sans envoyer vos données à des serveurs externes.
- Videz le cache local ou utilisez le bouton de rechargement forcé pour actualiser les fichiers en cache sans toucher aux projets.

### Adaptez-la à votre équipe
- Basculez instantanément entre English, Deutsch, Español, Italiano et Français ; l’application retient la dernière langue utilisée.
- Choisissez les thèmes sombre, rose ou à fort contraste, définissez une couleur d’accent, ajustez la taille de police et sélectionnez la typographie adaptée à votre identité visuelle ou à vos besoins d’accessibilité.
- Les menus déroulants avec recherche, les favoris épinglés et l’aide au survol gardent l’équipe productive sur le plateau.

---

## Démarrage rapide

1. Clonez ou téléchargez le dépôt.
2. Ouvrez `index.html` dans un navigateur moderne (Chromium, Firefox ou Safari). Aucun processus de build n’est requis.
3. En option, servez le dossier en HTTPS pour installer le service worker et bénéficier des mises à jour hors ligne. Tout serveur statique convient (`npx http-server -S`, par exemple).
4. L’application stocke les données dans votre navigateur. Utilisez **Paramètres → Sauvegarde** pour exporter des instantanés JSON avant de changer de machine.

---

## Flux de travail type

1. **Créez ou chargez un projet.** Appuyez sur Entrée ou `Ctrl+S` (`⌘S` sur macOS) pour enregistrer rapidement. Des instantanés automatiques sont réalisés toutes les 10 minutes.
2. **Sélectionnez caméra, alimentation et accessoires.** Les menus se filtrent au fil de la saisie et les favoris restent épinglés.
3. **Analysez les résultats d’alimentation.** Vérifiez watts, intensité, alertes de sécurité batterie et autonomies dans le panneau comparatif.
4. **Consignez les exigences.** Enregistrez rôles de l’équipe, jours de tournage, scénarios et notes pour que chaque export reflète le bon contexte.
5. **Générez les livrables.** Produisez listes de matériel, aperçus imprimables et paquets de projet partageables, puis restaurez-les plus tard d’un simple import.

---

## Éléments essentiels de l’interface

- **Recherche globale** (`/` ou `Ctrl+K`/`⌘K`) pour accéder à toute fonctionnalité, sélection ou sujet d’aide, même avec le menu latéral replié.
- **Centre d’aide** (`?`, `H`, `F1` ou `Ctrl+/`) avec guides recherchables, FAQ, raccourcis et aide contextuelle optionnelle.
- **Diagramme de projet** qui visualise les connexions ; maintenez Maj lors du téléchargement pour exporter un JPG plutôt qu’un SVG.
- **Panneau de comparaison des batteries** affichant les performances de chaque pack compatible et les risques de surcharge.
- **Générateur de liste de matériel** transformant les sélections en tableaux catégorisés avec métadonnées, e-mails de l’équipe et ajouts liés aux scénarios.
- **Indicateur hors ligne & rechargement forcé** pour connaître l’état de connexion et actualiser les fichiers en cache sans perdre vos projets.

---

## Gestion des données et des exports

- Projets, paramètres, listes de matériel, favoris et appareils personnalisés résident dans `localStorage` ; sauvegardes et restaurations préservent l’ensemble.
- La fenêtre Paramètres propose rappels horaires de sauvegarde, exportations manuelles, restauration en un clic et un bouton **Effacer le cache local**.
- Les fichiers de projet partagés regroupent sélections, exigences, retours d’autonomie, listes de matériel et appareils personnalisés pour un transfert fluide entre équipes.
- Les aperçus imprimables incluent nom du projet, informations de production, logo personnalisé optionnel et liste de matériel générée.
- Des instantanés automatiques s’exécutent en arrière-plan pour revenir facilement à un état antérieur.

---

## Intelligence batterie & autonomie

- Calcule la consommation totale, le nombre de batteries nécessaires pour des journées de 10 h et le courant requis par chaque liaison.
- Alerte à 80 % de charge et bloque les charges dangereuses lorsque la demande dépasse la valeur continue ou D‑Tap d’une batterie.
- Les estimations pondérées prennent en compte température, résolution, cadence, codec, utilisation du Wi‑Fi, luminosité du moniteur et part de consommation de chaque appareil.
- Un tableau de bord des autonomies classe les retours selon leur poids, affiche leur pourcentage de contribution et met en évidence les valeurs aberrantes.
- Les retours envoyés par les utilisateurs affinent les estimations pour les tournages réels.

---

## Personnalisation & accessibilité

- Passez d’un thème à l’autre (sombre, rose ou contraste élevé) et ajustez la typographie sans recharger la page.
- Téléchargez un logo personnalisé pour les aperçus imprimables, définissez les rôles de monitoring par défaut et configurez des exigences projet prédéfinies.
- Navigation au clavier, états de focus visibles et liens d’évitement assurent l’accessibilité sur plateau et la compatibilité lecteur d’écran.
- Recherche dans les menus, favoris épinglés et boutons de duplication pour les lignes de liste accélèrent la saisie répétitive.

---

## Raccourcis clavier

| Action | Raccourci |
| --- | --- |
| Focaliser la recherche globale | `/`, `Ctrl+K`, `⌘K` |
| Ouvrir l’aide | `?`, `H`, `F1`, `Ctrl+/` |
| Enregistrer le projet | `Entrée`, `Ctrl+S`, `⌘S` |
| Activer/désactiver le thème sombre | `D` |
| Activer/désactiver le thème rose | `P` |
| Rechargement forcé | Cliquer sur l’icône 🔄 dans l’en-tête |

---

## Développement

- Installez les dépendances avec `npm install` (pour le linting, les tests et les scripts de données – aucun build n’est nécessaire).
- Exécutez `npm run lint` et `npm run test` avant de valider. Des suites ciblées existent via `npm run test:unit`, `npm run test:data`, `npm run test:dom` et `npm run test:script`.
- Scripts utiles :
  - `npm run check-consistency` vérifie la cohérence des données.
  - `npm run normalize` et `npm run unify-ports` gardent le catalogue propre.
  - `npm run generate-schema` régénère le schéma des appareils.

---

## Traductions

La documentation existe en plusieurs langues et l’application détecte automatiquement celle de votre navigateur au premier lancement. Changez à tout moment via le menu langue en haut à droite :

- 🇬🇧 [English](README.en.md)
- 🇩🇪 [Deutsch](README.de.md)
- 🇪🇸 [Español](README.es.md)
- 🇮🇹 [Italiano](README.it.md)
- 🇫🇷 [Français](README.fr.md)

Envie de contribuer ? Suivez le [guide de traduction](docs/translation-guide.md) pour ajouter de nouvelles langues à l’interface et à la documentation.

---

## Contributions & support

Bugs, idées de fonctionnalités et corrections de données sont les bienvenus. Ouvrez une issue ou soumettez une pull request en détaillant au maximum. Si vous repérez des autonomies incorrectes ou du matériel manquant, joignez le fichier projet ou des données d’exemple afin de conserver un catalogue fiable.

---

## Licence

Cine Power Planner est publié sous licence ISC.
