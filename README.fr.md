# 🎥 Cine Power Planner

Cet outil basé sur le navigateur aide à planifier des projets caméra professionnels alimentés par des batteries V‑Mount, B‑Mount ou Gold-Mount. Il calcule la **consommation totale**, l’**intensité demandée** (à 14,4 V et 12 V) et l’**autonomie estimée** tout en vérifiant que la batterie peut fournir la puissance requise en toute sécurité.

Toute la planification, les saisies et les exports restent sur la machine sous
vos yeux. La langue, les projets, les appareils personnalisés, les favoris et
les retours d’autonomie sont stockés dans votre navigateur, et les mises à jour
du service worker proviennent directement de ce dépôt. Vous pouvez lancer
l’application hors ligne depuis le disque ou l’héberger en interne pour que
tous les départements utilisent la même version vérifiée.

---

## 🌍 Langues
- 🇬🇧 [English](README.en.md)
- 🇩🇪 [Deutsch](README.de.md)
- 🇪🇸 [Español](README.es.md)
- 🇮🇹 [Italiano](README.it.md)
- 🇫🇷 [Français](README.fr.md)

L’application adopte automatiquement la langue de votre navigateur lors de la première visite et vous pouvez la modifier à tout moment en haut à droite. Le choix est mémorisé pour la prochaine session.

---

## 🆕 Nouveautés
- Les contrôles d’accent et de typographie dans Paramètres permettent d’ajuster la couleur d’accent, la taille de base de la police et la famille de caractères, en plus des thèmes sombre, rose et à fort contraste.
- Les raccourcis clavier de la recherche globale permettent d’appuyer sur / ou Ctrl+K (⌘K sur macOS) pour la focaliser instantanément, même lorsqu’elle se trouve dans le menu latéral mobile replié.
- Le bouton de rechargement forcé efface les fichiers mis en cache par le service worker afin que l’application hors ligne se mette à jour sans supprimer les projets ni les appareils enregistrés.
- Les icônes étoilées dans chaque sélecteur épinglent les caméras, batteries et accessoires favoris en haut de la liste et les incluent dans les sauvegardes.
- Le flux de **Réinitialisation d’usine** télécharge automatiquement une sauvegarde avant de supprimer les projets, appareils et paramètres stockés.
- La liste de matériel et l’aperçu imprimable affichent le nom du projet pour une consultation rapide.
- Importez un logo personnalisé pour les aperçus imprimables et les sauvegardes.
- Les sauvegardes contiennent les favoris et créent une copie automatique avant toute restauration.
- Les entrées d’équipe disposent désormais d’un champ e-mail.
- Un thème à fort contraste améliore la lisibilité.
- Les formulaires d’appareils remplissent les catégories dynamiquement selon le schéma.
- Interface repensée avec plus de contraste et d’espacement pour une expérience plus claire sur tous les appareils.
- Le partage de projets est simplifié : téléchargez un fichier JSON qui regroupe sélections, exigences, listes de matériel, retours d’autonomie et appareils personnalisés, puis importez-le pour tout restaurer.
- Des icônes uniques pour les scénarios requis facilitent l’identification des contraintes du projet.
- Diagramme de projet interactif permettant de faire glisser les appareils, de zoomer, d’aligner sur la grille et d’exporter en SVG ou JPG.
- Thème rose ludique persistant entre les visites.
- Boîte d’aide avec recherche, sections pas à pas et FAQ ; ouvrez-la avec ?, H, F1 ou Ctrl+/.
- Aides contextuelles au survol pour les boutons, champs, menus déroulants et en-têtes.
- Barre de recherche globale pour accéder rapidement aux fonctionnalités, sélecteurs d’appareils ou rubriques d’aide.
- Compatibilité avec les caméras dotées de plaques batterie V-, B- ou Gold-Mount.
- Soumettez des retours d’autonomie accompagnés de la température pour affiner les estimations.
- Tableau de pondération visuel pour analyser l’impact des réglages sur chaque mesure, trié par poids avec pourcentages précis.
- Génération de listes de matériel regroupant les équipements choisis et les exigences du projet.
- Sauvegarde des exigences de projet avec chaque configuration afin que la liste de matériel conserve tout le contexte.
- Duplication instantanée des entrées utilisateur dans les formulaires de liste de matériel grâce aux boutons en forme de fourche.

---

## 🔧 Fonctionnalités

### ✨ Points forts supplémentaires

- **Construisez des rigs complexes sans tâtonner.** Combinez caméras, plaques
  batteries, liaisons sans fil, moniteurs, moteurs et accessoires tout en
  visualisant la consommation totale à 14,4 V/12 V (et 33,6 V/21,6 V pour
  B‑Mount) ainsi que des autonomies réalistes issues de données terrain
  pondérées. Le panneau de comparaison des batteries signale les surcharges
  avant de charger le mauvais matériel.
- **Gardez chaque département aligné.** Enregistrez plusieurs projets avec
  exigences, contacts d’équipe, scénarios et notes. Les listes imprimables
  regroupent le matériel par catégorie, fusionnent les doublons, affichent les
  métadonnées techniques et ajoutent les accessoires dictés par les scénarios
  pour que caméra, lumière et machinerie partagent le même contexte.
- **Travaillez sereinement partout.** Ouvrez `index.html` directement ou servez
  le dossier en HTTPS pour activer le service worker. La mise en cache hors
  ligne conserve langue, thèmes, favoris et projets, et **Forcer le rechargement**
  actualise les fichiers sans toucher aux données.
- **Adaptez l’outil à votre équipe.** Basculez instantanément entre français,
  anglais, allemand, espagnol et italien, ajustez taille et police, choisissez
  une couleur d’accent personnalisée, importez un logo d’impression et alternez
  thème clair, sombre, rose ou à fort contraste. Les menus filtrables, favoris
  épinglés, boutons de duplication et aides contextuelles gardent un rythme
  rapide sur le plateau.

### ✅ Gestion de projet
- Enregistrez, chargez et supprimez plusieurs projets caméra (appuyez sur Entrée ou Ctrl+S/⌘S pour sauvegarder rapidement ; le bouton Enregistrer reste inactif tant qu’aucun nom n’est saisi).
- Des instantanés automatiques sont créés toutes les 10 minutes tant que le planner est ouvert, et la boîte de dialogue Paramètres peut déclencher des exports de sauvegarde horaires pour penser à archiver vos données.
- Téléchargez un fichier JSON qui regroupe sélections, exigences, liste de matériel, retours d’autonomie et appareils personnalisés ; chargez-le via le sélecteur Projet partagé pour tout restaurer en une étape.
- Les données sont stockées localement via `localStorage` et les favoris sont inclus dans les sauvegardes ; utilisez l’option **Réinitialisation d’usine** dans Paramètres pour enregistrer automatiquement une sauvegarde avant de supprimer projets mis en cache et modifications d’appareils.
- Générez des aperçus imprimables pour tout projet enregistré et ajoutez un logo personnalisé afin d’aligner exports et sauvegardes sur l’identité de votre production.
- Enregistrez les exigences de projet avec chaque projet afin que la liste de matériel conserve tout le contexte.
- Fonctionne entièrement hors ligne grâce au service worker installé : langue, thème, données d’appareils et favoris persistent entre les sessions.
- Mise en page responsive qui s’adapte sans effort aux ordinateurs, tablettes et téléphones.
- Sur les caméras compatibles, choisissez des plaques **V‑Mount**, **B‑Mount** ou **Gold-Mount** ; la liste de batteries se met à jour automatiquement.

### 🧭 Aperçu de l’interface
- **Rappel express :**
  - **Recherche globale** (`/` ou `Ctrl+K`/`⌘K`) rejoint fonctions, sélecteurs ou
    rubriques d’aide même quand le menu latéral est replié.
  - **Centre d’aide** (`?`, `H`, `F1` ou `Ctrl+/`) propose des guides filtrables,
    une FAQ, des raccourcis et le mode d’aide contextuelle.
  - **Diagramme de projet** visualise les connexions ; maintenez Maj en
    téléchargeant pour obtenir un JPG au lieu d’un SVG et afficher les alertes de
    compatibilité.
  - **Comparateur de batteries** révèle les performances des packs compatibles
    et signale les risques de surcharge.
  - **Générateur de liste** produit des tableaux catégorisés avec métadonnées,
    courriels de l’équipe et ajouts dépendant des scénarios prêts pour
    l’impression.
  - **Badge hors ligne et Forcer le rechargement** reflètent l’état de la
    connexion et renouvellent les fichiers en cache sans effacer les projets.
- Un lien d’évitement et un indicateur hors ligne maintiennent l’interface accessible au clavier et au tactile ; l’insigne apparaît dès que le navigateur perd la connexion.
- La barre de recherche globale permet d’atteindre des fonctionnalités, sélecteurs d’appareils ou rubriques d’aide ; appuyez sur Entrée pour valider le résultat en surbrillance, utilisez / ou Ctrl+K (⌘K sur macOS) pour la focaliser instantanément (le menu latéral s’ouvre automatiquement sur les petits écrans) et appuyez sur Échap ou × pour effacer la requête.
- Les commandes de la barre supérieure offrent le changement de langue, les thèmes sombre et rose, ainsi qu’une boîte de dialogue Paramètres avec la couleur d’accent, la taille et la famille de police, le mode à fort contraste et l’import de logo, ainsi que des outils de sauvegarde, restauration et Réinitialisation d’usine qui créent une sauvegarde avant l’effacement.
- Le bouton Aide ouvre une boîte de dialogue recherchable avec des sections pas à pas, des raccourcis clavier, une FAQ et un mode aide contextuelle optionnel ; vous pouvez aussi l’ouvrir avec ?, H, F1 ou Ctrl+/ même en cours de saisie.
- Le bouton de rechargement forcé (🔄) efface les fichiers du service worker en cache afin que l’application hors ligne se mette à jour sans supprimer projets ni appareils.
- Sur les petits écrans, un menu latéral repliable reflète chaque section principale pour une navigation rapide.

### ♿ Personnalisation et accessibilité
- Les thèmes incluent un mode sombre, un accent rose ludique et un interrupteur dédié à fort contraste pour une meilleure lisibilité.
- Les changements de couleur d’accent, de taille de police et de typographie s’appliquent instantanément et restent enregistrés dans le navigateur, ce qui facilite l’adaptation à la charte graphique ou aux besoins d’accessibilité.
- Les raccourcis intégrés couvrent la recherche globale (/ ou Ctrl+K/⌘K), l’aide ( ?, H, F1, Ctrl+/ ), l’enregistrement (Entrée ou Ctrl+S/⌘S), le mode sombre (D) et le mode rose (P).
- Le mode aide au survol transforme chaque bouton, champ, menu et en-tête en infobulle à la demande pour accélérer l’apprentissage des nouveaux utilisateurs.
- Les champs avec recherche incrémentale, les styles visibles au focus et les icônes étoilées à côté des sélecteurs facilitent le filtrage des longues listes et l’épinglage des favoris.
- Importez un logo pour l’impression, définissez des rôles de monitoring par
  défaut et ajustez les préréglages des exigences projet pour coller à la charte
  de production.
- Les boutons de duplication dupliquent instantanément les lignes des
  formulaires et les favoris épinglés gardent le matériel essentiel en tête de
  liste, idéal quand le temps est compté sur le plateau.

### 📋 Liste de matériel
Le générateur transforme vos sélections en une liste de préparation catégorisée :

- Cliquez sur **Générer la liste de matériel** pour compiler l’équipement choisi et les exigences du projet dans un tableau.
- Le tableau se met à jour automatiquement quand les sélections ou exigences changent.
- Les éléments sont regroupés par catégorie (caméra, optique, alimentation, monitoring, rigging, grip, accessoires, consommables) et les doublons sont fusionnés avec leur quantité.
- Les câbles, structures et accessoires requis pour les moniteurs, moteurs, gimbals et scénarios météo sont ajoutés automatiquement.
- Les scénarios sélectionnés injectent le matériel associé :
  - *Handheld* + *Easyrig* ajoute une poignée télescopique pour un soutien stable.
  - *Gimbal* ajoute le gimbal choisi, des bras articulés, des spigots et des pare-soleil ou kits de filtres.
  - *Outdoor* fournit des spigots, des parapluies et des housses de pluie CapIt.
  - Les scénarios *Vehicle* et *Steadicam* ajoutent fixations, bras isolants et ventouses selon le cas.
- Les sélections d’optique incluent diamètre frontal, poids, données de rods et mise au point minimale, ajoutent des supports d’objectif et adaptateurs de matte box, et avertissent des standards incompatibles.
- Les lignes de batteries reflètent les quantités du calculateur d’alimentation et incluent des plaques ou appareils de *hotswap* si nécessaire.
- Les préférences de monitoring attribuent des moniteurs par défaut pour chaque rôle (réalisateur, DoP, pointeur, etc.) avec jeux de câbles et récepteurs sans fil.
- Le formulaire **Exigences du projet** alimente la liste :
  - **Nom du projet**, **société de production**, **loueur** et **DoP** apparaissent dans l’en-tête des exigences imprimées.
  - Les entrées de **l’équipe** capturent noms, rôles et adresses e-mail afin que les contacts suivent le projet.
  - **Jours de préparation** et **jours de tournage** fournissent des notes de calendrier et, combinés à des scénarios extérieurs, suggèrent l’équipement météo.
  - Les **scénarios requis** ajoutent rigging, gimbals et protections climatiques correspondants.
  - **Poignée caméra** et **extension viseur** ajoutent les pièces ou supports sélectionnés.
  - Les choix de **matte box** et de **filtres** ajoutent le système retenu avec plateaux, adaptateurs à collier ou filtres nécessaires.
  - Les réglages de **monitoring**, **distribution vidéo** et **viseur** ajoutent moniteurs, câbles et incrustations pour chaque rôle.
  - Les sélections de **boutons utilisateur** et **préférences de trépied** sont listées pour référence rapide.
- Les éléments de chaque catégorie sont triés alphabétiquement et affichent une info-bulle au survol.
- La liste de matériel figure dans les aperçus imprimables et dans les fichiers de projet partagés.
- Les listes de matériel sont sauvegardées automatiquement avec le projet et incluses dans les fichiers partagés et les sauvegardes.
- **Supprimer la liste de matériel** efface la liste enregistrée et masque la sortie.
- Les formulaires de liste de matériel proposent des boutons en forme de fourche pour dupliquer instantanément les entrées utilisateur.

### 📦 Catégories d’appareils
- **Caméra** (1)
- **Moniteur** (optionnel)
- **Transmetteur sans fil** (optionnel)
- **Moteurs FIZ** (0–4)
- **Contrôleurs FIZ** (0–4)
- **Capteur de distance** (0–1)
- **Plaque batterie** (uniquement sur les caméras compatibles V‑ ou B‑Mount)
- **Batterie V‑Mount** (0–1)

### ⚙️ Calculs de puissance
- Consommation totale en watts
- Intensité à 14,4 V et 12 V
- Autonomie estimée en heures via la moyenne pondérée des retours utilisateurs
- Nombre de batteries nécessaires pour un tournage de 10 h (avec une de secours)
- Note de température pour ajuster l’autonomie en conditions chaudes ou froides

### 🔋 Vérification de la sortie batterie
- Avertit si l’intensité dépasse la sortie de la batterie (pin ou D‑Tap)
- Indique lorsque la consommation approche de la limite (80 % d’utilisation)

### 📊 Comparaison des batteries (optionnel)
- Compare les estimations d’autonomie de toutes les batteries
- Graphiques à barres pour une lecture immédiate

### 🖼 Diagramme du projet
- Visualise les connexions d’alimentation et de vidéo des appareils sélectionnés.
- Signale les marques FIZ incompatibles.
- Faites glisser les nœuds pour réorganiser le schéma, zoomez avec les boutons et exportez le diagramme en SVG ou JPG.
- Maintenez Shift enfoncé lors du clic sur Télécharger pour exporter une image JPG plutôt qu’un SVG.
- Survolez ou touchez un appareil pour afficher sa fiche détaillée.
- Utilise les icônes [OpenMoji](https://openmoji.org/) lorsqu’une connexion est disponible et se replie sur les emoji : 🔋 batterie, 🎥 caméra, 🖥️ moniteur, 📡 vidéo, ⚙️ moteur, 🎮 contrôleur, 📐 distance, 🎮 poignée et 🔌 plaque batterie.

### 🧮 Pondération des données d’autonomie
- Les autonomies remontées par les utilisateurs affinent l’estimation.
- Chaque saisie est ajustée en fonction de la température, en passant de ×1 à 25 °C à :
  - ×1,25 à 0 °C
  - ×1,6 à −10 °C
  - ×2 à −20 °C
- Les réglages caméra influencent la pondération :
  - Multiplicateurs de résolution : ≥12K ×3, ≥8K ×2, ≥4K ×1,5, ≥1080p ×1 ; les résolutions inférieures sont ramenées à 1080p.
  - La cadence est pondérée linéairement à partir de 24 i/s (ex. 48 i/s = ×2).
  - Le Wi-Fi activé ajoute 10 %.
  - Facteurs codecs : RAW/BRAW/ARRIRAW/R3D/CinemaDNG/Canon RAW/X‑OCN ×1 ; ProRes ×1,1 ; DNx/AVID ×1,2 ; All‑Intra ×1,3 ; H.264/AVC ×1,5 ; H.265/HEVC ×1,7.
  - Les entrées moniteur en dessous de la luminosité spécifiée sont pondérées selon leur ratio de luminosité.
- La pondération finale reflète la part de consommation de chaque appareil, de sorte que les projets similaires comptent davantage.
- La moyenne pondérée est utilisée dès que trois entrées au minimum sont disponibles.
- Un tableau de bord classe les mesures par poids et affiche le pourcentage associé pour comparer d’un coup d’œil.

### 🔍 Recherche et filtrage
- Tapez dans les menus déroulants pour trouver rapidement une entrée.
- Filtrez les listes d’appareils via un champ de recherche.
- Utilisez la barre de recherche globale en haut pour rejoindre une fonctionnalité, un appareil ou un sujet d’aide ; appuyez sur Entrée pour naviguer, / ou Ctrl+K (⌘K sur macOS) pour la focaliser instantanément et Échap ou × pour effacer.
- Appuyez sur « / » ou Ctrl+F (⌘F sur macOS) pour viser immédiatement le champ de recherche le plus proche.
- Cliquez sur l’étoile à côté d’un sélecteur pour épingler vos favoris en haut de la liste et les synchroniser avec les sauvegardes.

### 🛠 Éditeur de la base d’appareils
- Ajoutez, modifiez ou supprimez des appareils dans toutes les catégories.
- Importez ou exportez la base complète au format JSON.
- Revenez à la base par défaut issue de `data.js`.

### 🌓 Mode sombre
- Activez-le via le bouton lune près du sélecteur de langue.
- La préférence est mémorisée dans votre navigateur.

### 🦄 Mode rose
- Cliquez sur le bouton licorne (il scintille quand il est actif) ou appuyez sur **P** pour activer un accent rose ludique.
- Fonctionne avec les thèmes clair et sombre et persiste entre les visites.

### ⚫ Mode à fort contraste
- Active un thème à contraste élevé pour améliorer la lisibilité.

### 📝 Retours d’autonomie
- Cliquez sur <strong>Soumettre un retour d’autonomie</strong> sous l’autonomie pour ajouter votre mesure.
- Ajoutez la température pour une pondération plus précise.
- Les entrées sont sauvegardées dans votre navigateur et affinent les estimations futures.
- Un tableau de bord classe les retours selon leur poids, affiche les
  pourcentages de contribution et met en évidence les valeurs atypiques pour que
  l’équipe puisse analyser les données terrain en un clin d’œil.

### ❓ Aide avec recherche
- Ouvrez-la via le bouton <strong>?</strong> ou avec <kbd>?</kbd>, <kbd>H</kbd>, <kbd>F1</kbd> ou <kbd>Ctrl+/</kbd>.
- Utilisez le champ de recherche pour filtrer instantanément les sujets ; la requête est réinitialisée à la fermeture.
- Fermez avec <kbd>Échap</kbd> ou en cliquant hors de la boîte de dialogue.

---

## ▶️ Mode d’emploi
1. **Lancez l’application :** ouvrez `index.html` dans tout navigateur moderne – aucun serveur n’est requis.
2. **Explorez la barre supérieure :** changez de langue, activez les thèmes sombre ou rose, ouvrez Paramètres pour régler l’accent et la typographie, et lancez l’aide avec ? ou Ctrl+/.
3. **Sélectionnez les appareils :** choisissez l’équipement par catégorie via les menus déroulants ; saisissez pour filtrer, cliquez sur l’étoile pour épingler vos favoris et laissez les scénarios prédéfinis ajouter les accessoires automatiquement.
4. **Consultez les calculs :** dès qu’une batterie est sélectionnée, la consommation, l’intensité et l’autonomie apparaissent ; des alertes signalent les limites dépassées.
5. **Enregistrez et partagez les projets :** nommez et sauvegardez votre configuration, les sauvegardes automatiques capturent des instantanés et le bouton Partager exporte un bundle JSON pour vos partenaires.
6. **Générez la liste de matériel :** cliquez sur **Générer la liste de matériel** pour transformer les exigences en liste catégorisée avec infobulles et accessoires.
7. **Gérez les données d’appareils :** choisissez « Modifier les données d’appareils… » pour ouvrir l’éditeur, ajuster les appareils, exporter/importer du JSON ou revenir aux valeurs par défaut.
8. **Soumettez des retours d’autonomie :** utilisez « Soumettre un retour d’autonomie » pour enregistrer vos mesures terrain et enrichir la pondération.

## 📱 Installer l’application

Le planner est une application web progressive et peut être installée directement depuis le navigateur :

- **Chrome/Edge (bureau) :** cliquez sur l’icône d’installation dans la barre d’adresse.
- **Android :** ouvrez le menu du navigateur et choisissez *Ajouter à l’écran d’accueil*.
- **iOS/iPadOS Safari :** touchez le bouton *Partager* puis *Ajouter à l’écran d’accueil*.

Une fois installée, l’application se lance depuis l’écran d’accueil, fonctionne hors ligne et se met à jour automatiquement.

## 📡 Utilisation hors ligne et stockage des données

Servir l’application via HTTP(S) installe un service worker qui met chaque fichier en cache pour que Cine Power Planner fonctionne totalement hors ligne et se mette à jour en arrière-plan. Les projets, retours d’autonomie et préférences (langue, thème, mode rose et listes de matériel sauvegardées) sont stockés dans le `localStorage` du navigateur. Effacer les données du site supprime toutes les informations, et la boîte de dialogue Paramètres propose également un flux de **Réinitialisation d’usine** qui enregistre automatiquement une sauvegarde avant d’effectuer le même nettoyage complet.
L’en-tête affiche un badge hors ligne dès que la connexion tombe, et l’action 🔄
**Forcer le rechargement** actualise les fichiers mis en cache sans toucher aux
projets enregistrés.

---

## 🗂️ Structure des fichiers
```bash
index.html       # Mise en page HTML principale
style.css        # Styles et mise en page
script.js        # Logique applicative
data.js          # Liste d’appareils par défaut
storage.js       # Helpers LocalStorage
README.*.md      # Documentation multilingue
checkConsistency.js  # Vérifie les champs requis dans les données d’appareils
normalizeData.js     # Nettoie les entrées et unifie les noms de connecteurs
generateSchema.js    # Reconstruit schema.json à partir de data.js
unifyPorts.js        # Harmonise les anciens noms de ports
tests/               # Suite de tests Jest
```
Les polices sont intégrées localement via `fonts.css`, ce qui permet à l’application de fonctionner entièrement hors ligne une fois les ressources en cache.

## 🛠️ Développement
Nécessite Node.js 18 ou version ultérieure.

```bash
npm install
npm run lint     # exécute uniquement ESLint
npm test         # lance le linting, les vérifications de données et les tests Jest
```

Après modification des données d’appareils, régénérez la base normalisée :

```bash
npm run normalize
npm run unify-ports
npm run check-consistency
npm run generate-schema
```

Ajoutez `--help` à l’un de ces scripts pour afficher les options disponibles.

Exécutez `npm run help` pour afficher un résumé rapide des scripts de maintenance et de l’ordre recommandé.

## 🤝 Contribuer
Les contributions sont les bienvenues ! N’hésitez pas à ouvrir un ticket ou à proposer une pull request sur GitHub.
Pour corriger des données, joindre des sauvegardes de projet ou des mesures
d’autonomie aide à garder le catalogue fiable pour tout le monde.
