# 🎥 Cine Power Planner

Cet outil basé sur le navigateur aide à planifier des projets caméra professionnels alimentés par des batteries V‑Mount, B‑Mount ou Gold-Mount. Il calcule la **consommation totale**, l’**intensité demandée** (à 14,4 V et 12 V) et l’**autonomie estimée**, tout en vérifiant que la batterie peut fournir la puissance requise en toute sécurité.

L’ensemble de la planification, des saisies et des exports reste sur votre appareil. La langue, les projets, les appareils personnalisés, les favoris et les retours d’autonomie sont stockés dans votre navigateur, et les mises à jour du service worker proviennent directement de ce dépôt. Lancez Cine Power Planner hors ligne depuis le disque ou hébergez-le en interne pour que chaque département exploite la même version auditée.

## En bref

- **Planifiez sans réseau.** Toutes les icônes, polices et scripts d’assistance sont fournis dans ce dépôt ; ouvrez simplement
  `index.html` pour travailler hors ligne.
- **Les projets restent sur l’appareil.** Sauvegardes, retours d’autonomie, appareils personnalisés, favoris et listes de
  matériel demeurent locaux ; les sauvegardes et paquets partageables sont des JSON lisibles.
- **Gardez la main sur les mises à jour.** Le service worker ne se met à jour qu’après avoir cliqué sur **Forcer le rechargement**,
  maintenant l’équipe sur une version fiable en déplacement.
- **Filets de sécurité en cascade.** Sauvegardes manuelles, enregistrements automatiques et copies horodatées facilitent les
  exercices de restauration avant le tournage.

## Démarrage rapide

1. Téléchargez ou clonez le dépôt et ouvrez `index.html` dans un navigateur moderne.
2. (Optionnel) Servez le dossier en local (par exemple avec `npx http-server` ou `python -m http.server`) pour que le service
   worker s’enregistre et mette en cache les ressources pour l’usage hors ligne.
3. Chargez le planner une fois, fermez l’onglet, coupez la connexion et rouvrez `index.html`. L’indicateur hors ligne doit
   clignoter brièvement pendant le chargement de l’interface en cache.
4. Créez un projet, appuyez sur **Entrée** (ou **Ctrl+S**/`⌘S`) pour sauvegarder et surveillez la sauvegarde automatique qui
   apparaît dans le sélecteur après quelques minutes.
5. Exportez **Paramètres → Sauvegarde & Restauration → Sauvegarder**, importez le fichier dans un profil de navigation privé et
   confirmez que projets, favoris et appareils personnalisés se restaurent correctement.
6. Entraînez-vous à exporter un paquet `.cpproject` et à l’importer sur un autre appareil ou profil pour valider la chaîne
   sauvegarde → partage → import avant d’arriver sur le plateau.

## Flux de travail essentiels

- **Planifier un rig.** Combinez caméras, plaques, liaisons sans fil, moniteurs, moteurs et accessoires tout en suivant en temps
  réel la consommation et les estimations d’autonomie.
- **Sauvegarder des versions.** Conservez des instantanés explicites et laissez les sauvegardes automatiques horodatées capturer
  le travail en cours toutes les 10 minutes.
- **Partager en toute sécurité.** Exportez des paquets `.cpproject` hors ligne qui valident le schéma à l’import et peuvent inclure
  des règles automatiques de matériel.
- **Sauvegarder l’ensemble.** Les sauvegardes complètes incluent projets, favoris, appareils personnalisés, données d’autonomie
  et préférences d’interface pour ne perdre aucun contexte.

## Protéger les données hors ligne

- Vérifiez régulièrement la préparation hors ligne : chargez l’application, coupez la connexion, actualisez et assurez-vous que
  vos projets restent accessibles.
- Conservez des sauvegardes redondantes sur des supports étiquetés et réimportez-les dans un deuxième profil après chaque export.
- Avant toute mise à jour ou modification importante, créez une sauvegarde manuelle et vérifiez que la restauration est propre.

---

## 🌍 Langues
- 🇬🇧 [English](README.en.md)
- 🇩🇪 [Deutsch](README.de.md)
- 🇪🇸 [Español](README.es.md)
- 🇮🇹 [Italiano](README.it.md)
- 🇫🇷 [Français](README.fr.md)

L’application adopte automatiquement la langue de votre navigateur lors de la première visite. Vous pouvez ensuite changer de langue à tout moment depuis l’angle supérieur droit, et le choix est mémorisé pour la prochaine session.

---

## 🆕 Nouveautés
- Les comparaisons de versions de sauvegarde permettent de sélectionner n’importe quel enregistrement manuel ou sauvegarde automatique horodatée pour analyser les différences, ajouter des notes d’incident et exporter un journal avant un retour arrière ou une remise d’images à la post-production.
- Les sauvegardes normalisent désormais les anciens paquets de données enregistrés en chaînes JSON ou en tableaux d’entrées afin que les exports historiques se restaurent correctement.
- Les répétitions de restauration chargent une sauvegarde complète de l’application ou un bundle de projet dans un bac à sable isolé pour confirmer que son contenu correspond aux données actives sans toucher aux profils de production.
- Les règles automatiques d’équipement ajoutent ou retirent du matériel selon le scénario, avec export/import aux côtés des bundles partagés.
- Un tableau de bord de couverture met en évidence les déclencheurs doublons,
  les ajouts et retraits nets, les scénarios non couverts et les conflits
  potentiels. Les filtres restent utilisables hors ligne et les résumés
  accompagnent exports et sauvegardes automatiques.
- Le tableau de bord Données & stockage audite projets enregistrés, listes de matériel, appareils personnalisés, favoris et retours d’autonomie depuis les Réglages et affiche la taille approximative des sauvegardes.
- Une superposition d’état d’enregistrement automatique reflète la dernière note dans Paramètres afin que les équipes visualisent l’activité en arrière-plan pendant les exercices de récupération.
- Un éditeur d’équipement sensible au monitoring affiche des accessoires supplémentaires de monitoring et de vidéo uniquement lorsque les scénarios l’exigent, pour garder la conception des règles focalisée.
- Les réglages d’accent et de typographie dans Paramètres permettent d’ajuster couleur d’accent, taille de base et famille de police, aux côtés des thèmes sombre, rose et à fort contraste.
- Les raccourcis clavier de la recherche globale placent le focus sur le champ instantanément avec / ou Ctrl+K (⌘K sur macOS), même lorsqu’il se trouve dans le menu latéral replié.
- Le bouton **Forcer le rechargement** vide les fichiers mis en cache par le service worker afin de mettre à jour l’application hors ligne sans effacer projets ou appareils.
- Les icônes en forme d’étoile fixent caméras, batteries et accessoires favoris en haut des listes et les incluent dans les sauvegardes.
- Le flux de **Réinitialisation d’usine** télécharge automatiquement une sauvegarde avant de supprimer projets, appareils et paramètres stockés.
- La liste de matériel et l’aperçu imprimable affichent le nom du projet pour une référence immédiate.
- Importez un logo personnalisé pour les aperçus imprimables et les sauvegardes.
- Les sauvegardes incluent les favoris et génèrent une copie automatique avant chaque restauration.
- Les fiches équipe disposent désormais d’un champ e-mail.
- Nouveau thème à fort contraste pour améliorer la lisibilité.
- Les formulaires d’appareils complètent les catégories dynamiquement à partir du schéma.
- Interface repensée avec contraste renforcé et espacements plus généreux pour une expérience plus nette sur tout appareil.
- Partage simplifié : téléchargez un fichier JSON regroupant sélections, exigences, liste de matériel, retours d’autonomie et appareils personnalisés, puis importez-le pour tout restaurer. Activez l’option **Inclure les règles automatiques d’équipement** si vous souhaitez embarquer vos automatisations ou laissez-la désactivée pour les conserver en local.
- Des icônes dédiées pour les scénarios obligatoires mettent en évidence les contraintes du projet.
- Diagramme de projet interactif pour déplacer les appareils, zoomer, aligner sur la grille et exporter en SVG ou JPG.
- Thème rose ludique qui persiste entre les visites.
- Boîte d’aide avec recherche, sections guidées et FAQ ; ouvrez-la avec ?, H, F1 ou Ctrl+/.
- Aides contextuelles au survol des boutons, champs, menus et en-têtes.
- Barre de recherche globale pour rejoindre rapidement fonctionnalités, sélecteurs ou rubriques d’aide.
- Compatibilité avec les caméras équipées de plaques V‑, B‑ ou Gold-Mount.
- Soumettez des retours d’autonomie avec la température pour affiner les estimations.
- Tableau de pondération visuel pour analyser l’impact des réglages sur chaque mesure, trié par poids avec pourcentages précis.
- Générateur de liste de matériel qui agrège équipements choisis et exigences du projet.
- Les exigences de projet sont sauvegardées avec chaque configuration pour conserver tout le contexte.
- Les boutons en forme de fourche dupliquent désormais instantanément les entrées personnalisées dans les formulaires de liste de matériel.

---

## 🔧 Fonctionnalités

### ✨ Points forts détaillés

- **Construisez des rigs complexes sans tâtonner.** Combinez caméras, plaques batteries, liaisons sans fil, moniteurs, moteurs et accessoires tout en visualisant la consommation totale à 14,4 V/12 V (et 33,6 V/21,6 V pour B‑Mount) avec des autonomies réalistes issues de données terrain pondérées. Le panneau de comparaison des batteries signale les surcharges avant le départ du matériel.
- **Gardez chaque département aligné.** Enregistrez plusieurs projets avec exigences, contacts équipe, scénarios et notes. Les listes imprimables regroupent le matériel par catégorie, fusionnent les doublons, affichent les métadonnées techniques et ajoutent les accessoires dictés par les scénarios pour que caméra, lumière et machinerie restent synchronisées.
- **Travaillez sereinement partout.** Ouvrez `index.html` directement ou servez le dossier via HTTPS pour activer le service worker. La mise en cache hors ligne conserve langue, thèmes, favoris et projets, et **Forcer le rechargement** actualise les fichiers sans toucher aux données.
- **Adaptez l’outil à votre équipe.** Basculez instantanément entre français, anglais, allemand, espagnol et italien, ajustez taille et police, choisissez une couleur d’accent personnalisée, importez un logo d’impression et alternez thème clair, sombre, rose ou à fort contraste. Menus filtrables, favoris épinglés, boutons de duplication et aides contextuelles gardent un rythme rapide sur le plateau.

### ✅ Gestion de projet
- Enregistrez, chargez et supprimez plusieurs projets caméra (appuyez sur Entrée ou Ctrl+S/⌘S pour sauvegarder rapidement ; le bouton reste inactif tant qu’aucun nom n’est saisi).
- Des instantanés automatiques se créent toutes les 10 minutes tant que Cine Power Planner est ouvert, et la boîte de dialogue Paramètres peut déclencher des exports de sauvegarde horaires en guise de rappel.
- Téléchargez un fichier JSON qui regroupe sélections, exigences, liste de matériel, retours d’autonomie et appareils personnalisés ; importez-le via le sélecteur de projet pour tout restaurer d’un coup.
- Les données se stockent localement via `localStorage` et les favoris sont inclus dans les sauvegardes ; utilisez l’option **Réinitialisation d’usine** pour enregistrer automatiquement une copie avant d’effacer projets et modifications d’appareils.
- Générez des aperçus imprimables pour chaque projet et ajoutez un logo personnalisé afin d’aligner exports et sauvegardes sur l’identité de votre production.
- Les exigences de projet sont enregistrées avec chaque projet afin que la liste de matériel conserve l’intégralité du contexte.
- Fonctionne intégralement hors ligne grâce au service worker : langue, thème, données d’appareil et favoris persistent entre les sessions.
- Mise en page responsive qui s’adapte aux ordinateurs, tablettes et téléphones.
- Sur les caméras compatibles, choisissez des plaques **V‑Mount**, **B‑Mount** ou **Gold-Mount** ; la liste des batteries se met à jour automatiquement.

### 🧭 Aperçu de l’interface
- **Rappel express :**
  - **Recherche globale** (`/` ou `Ctrl+K`/`⌘K`) rejoint fonctionnalités, sélecteurs ou rubriques d’aide même avec le menu replié.
  - **Centre d’aide** (`?`, `H`, `F1` ou `Ctrl+/`) propose des guides filtrables, une FAQ, des raccourcis et le mode d’aide contextuelle.
  - **Diagramme de projet** visualise les connexions ; maintenez Maj au téléchargement pour obtenir un JPG plutôt qu’un SVG et afficher les alertes de compatibilité.
  - **Comparateur de batteries** montre les performances des packs compatibles et met en évidence les risques de surcharge.
  - **Générateur de liste** crée des tableaux catégorisés avec métadonnées, e-mails de l’équipe et compléments liés aux scénarios prêts pour l’impression.
  - **Badge hors ligne et Forcer le rechargement** reflètent l’état de la connexion et renouvellent les fichiers en cache sans supprimer les projets.
- Un lien d’évitement et un indicateur hors ligne maintiennent l’interface accessible au clavier et au tactile ; le badge apparaît dès que la connexion tombe.
- La barre de recherche globale permet d’atteindre fonctionnalités, sélecteurs ou rubriques d’aide ; appuyez sur Entrée pour valider le résultat en surbrillance, utilisez / ou Ctrl+K (⌘K sur macOS) pour focaliser le champ instantanément (le menu latéral s’ouvre automatiquement sur petit écran) et appuyez sur Échap ou × pour effacer la requête.
- Les commandes supérieures offrent le changement de langue, les thèmes sombre et rose, ainsi qu’un dialogue Paramètres avec couleur d’accent, taille et famille de police, mode à fort contraste et import de logo, sans oublier les outils de sauvegarde, restauration et Réinitialisation d’usine qui créent une copie avant effacement.
- Le bouton Aide ouvre une boîte de dialogue recherchable avec sections pas à pas, raccourcis clavier, FAQ et mode d’aide contextuelle optionnel ; vous pouvez aussi l’ouvrir avec ?, H, F1 ou Ctrl+/ même pendant la saisie.
- Le bouton de rechargement forcé (🔄) efface les fichiers du service worker en cache pour mettre à jour l’application hors ligne sans perdre projets ni appareils.
- Sur petits écrans, un menu latéral repliable reflète chaque section principale pour une navigation rapide.

### ♿ Personnalisation et accessibilité
- Les thèmes incluent mode sombre, accent rose ludique et interrupteur dédié à fort contraste pour une meilleure lisibilité.
- Les modifications de couleur d’accent, taille de police et typographie s’appliquent instantanément et restent mémorisées dans le navigateur – idéal pour respecter charte graphique ou besoins d’accessibilité.
- Les raccourcis intégrés couvrent recherche globale (/ ou Ctrl+K/⌘K), aide ( ?, H, F1, Ctrl+/ ), enregistrement (Entrée ou Ctrl+S/⌘S), mode sombre (D) et mode rose (P).
- Le mode d’aide au survol transforme chaque bouton, champ, menu et en-tête en infobulle à la demande pour accélérer l’apprentissage.
- Les champs avec recherche incrémentale, les styles visibles au focus et les icônes étoilées facilitent le filtrage des longues listes et l’épinglage des favoris.
- Importez un logo d’impression, définissez des rôles de monitoring par défaut et ajustez les préréglages d’exigences afin que les exports restent conformes à l’identité de production.
- Les boutons de duplication dupliquent instantanément les lignes de formulaire, et les favoris épinglés maintiennent le matériel clé en tête de liste – pratique quand le temps est compté.

### 📋 Liste de matériel
Le générateur transforme vos sélections en une liste de préparation classée par catégorie :

- Cliquez sur **Générer la liste de matériel** pour compiler équipement choisi et exigences du projet dans un tableau.
- Le tableau se met à jour dès que sélections ou exigences évoluent.
- Les éléments sont regroupés par catégorie (caméra, optique, alimentation, monitoring, rigging, machinerie, accessoires, consommables) et les doublons sont fusionnés avec leur quantité.
- Câbles, structures et accessoires requis pour moniteurs, moteurs, gimbals et scénarios météo sont ajoutés automatiquement.
- Les scénarios sélectionnés ajoutent l’équipement associé :
  - *Handheld* + *Easyrig* ajoute une poignée télescopique pour un soutien stable.
  - *Gimbal* ajoute le gimbal choisi, des bras articulés, des spigots et des pare-soleil ou kits de filtres.
  - *Outdoor* fournit spigots, parapluies et housses de pluie CapIt.
  - Les scénarios *Vehicle* et *Steadicam* ajoutent fixations, bras isolants et ventouses selon le besoin.
- Les sélections d’optique incluent diamètre frontal, poids, données de rods et mise au point minimale, ajoutent supports d’objectif et adaptateurs de matte box, et signalent les standards incompatibles.
- Les lignes de batteries reprennent les quantités calculées et incluent plaques ou appareils de hotswap lorsque nécessaire.
- Les préférences de monitoring attribuent des moniteurs par défaut pour chaque rôle (réalisateur, DoP, pointeur, etc.) avec jeux de câbles et récepteurs sans fil.
- Le formulaire **Exigences du projet** alimente la liste :
  - **Nom du projet**, **société de production**, **loueur** et **DoP** apparaissent dans l’en-tête des exigences imprimées.
  - Les entrées **Équipe** collectent noms, rôles et adresses e-mail pour que les contacts suivent le projet.
  - **Jours de préparation** et **jours de tournage** fournissent des notes de calendrier et, associés à des scénarios extérieurs, suggèrent l’équipement météo.
  - Les **scénarios requis** ajoutent rigging, gimbals et protections climatiques adaptés.
  - **Poignée caméra** et **extension viseur** ajoutent les composants sélectionnés ou leurs supports.
  - Les options de **matte box** et de **filtres** ajoutent le système choisi avec plateaux, adaptateurs à collier ou filtres nécessaires.
  - Les réglages de **monitoring**, **distribution vidéo** et **viseur** ajoutent moniteurs, câbles et incrustations pour chaque rôle.
  - Les sélections de **boutons utilisateur** et **préférences trépied** sont listées pour référence rapide.
- Les éléments de chaque catégorie sont triés alphabétiquement et affichent une info-bulle au survol.
- La liste de matériel est incluse dans les aperçus imprimables et les fichiers de projet exportés.
- Les listes sont enregistrées automatiquement avec le projet et incluses dans exports et sauvegardes.
- **Supprimer la liste de matériel** efface la liste enregistrée et masque la sortie.
- Les formulaires fournissent des boutons en forme de fourche pour dupliquer instantanément les entrées.

### 📦 Catégories d’appareils
- **Caméra** (1)
- **Moniteur** (optionnel)
- **Transmetteur sans fil** (optionnel)
- **Moteurs FIZ** (0–4)
- **Contrôleurs FIZ** (0–4)
- **Capteur de distance** (0–1)
- **Plaque batterie** (sur les caméras compatibles V‑ ou B‑Mount)
- **Batterie V‑Mount** (0–1)

### ⚙️ Calculs de puissance
- Consommation totale en watts
- Intensité à 14,4 V et 12 V
- Autonomie estimée en heures via la moyenne pondérée des retours
- Nombre de batteries nécessaire pour un tournage de 10 h
- Note de température pour ajuster l’autonomie par temps chaud ou froid

### 🔋 Vérification de la sortie batterie
- Avertit si l’intensité dépasse la sortie de la batterie (pin ou D‑Tap)
- Indique lorsque la consommation se rapproche de la limite (80 % d’utilisation)

### 📊 Comparaison des batteries (optionnel)
- Compare les estimations d’autonomie de toutes les batteries
- Graphiques à barres pour une lecture immédiate

### 🖼 Diagramme du projet
- Visualise les connexions d’alimentation et de vidéo des appareils sélectionnés
- Signale les marques FIZ incompatibles
- Faites glisser les nœuds pour réorganiser le schéma, zoomez avec les boutons et exportez le diagramme en SVG ou JPG
- Maintenez Shift enfoncé lors du clic sur Télécharger pour exporter une image JPG plutôt qu’un SVG
- Survolez ou touchez un appareil pour afficher ses détails
- Utilise les icônes OpenMoji lorsqu’une connexion est disponible et se replie sur les emoji : 🔋 batterie, 🎥 caméra, 🖥️ moniteur, 📡 vidéo, ⚙️ moteur, 🎮 contrôleur, 📐 distance, 🎮 poignée et 🔌 plaque batterie

### 🧮 Pondération des données d’autonomie
- Les autonomies remontées par les utilisateurs affinent l’estimation
- Chaque mesure est ajustée selon la température, en passant de ×1 à 25 °C à :
  - ×1,25 à 0 °C
  - ×1,6 à −10 °C
  - ×2 à −20 °C
- Les réglages caméra influencent la pondération :
  - Multiplicateurs de résolution : ≥12K ×3, ≥8K ×2, ≥4K ×1,5, ≥1080p ×1 ; les résolutions inférieures sont ramenées à 1080p
  - La cadence est pondérée linéairement à partir de 24 i/s (par ex. 48 i/s = ×2)
  - Le Wi-Fi activé ajoute 10 %
  - Facteurs codecs : RAW/BRAW/ARRIRAW/R3D/CinemaDNG/Canon RAW/X‑OCN ×1 ; ProRes ×1,1 ; DNx/AVID ×1,2 ; All‑Intra ×1,3 ; H.264/AVC ×1,5 ; H.265/HEVC ×1,7
  - Les entrées moniteur en dessous de la luminosité spécifiée sont pondérées selon leur ratio de luminosité
- La pondération finale reflète la part de consommation de chaque appareil, de sorte que les projets similaires comptent davantage
- La moyenne pondérée est utilisée dès que trois entrées minimum sont disponibles
- Un tableau de bord classe les mesures par poids et affiche le pourcentage associé pour comparer d’un coup d’œil

### 🔍 Recherche et filtrage
- Tapez dans les menus déroulants pour trouver rapidement une entrée
- Filtrez les listes d’appareils via un champ de recherche
- Utilisez la barre de recherche globale pour rejoindre fonctionnalités, appareils ou sujets d’aide ; appuyez sur Entrée pour naviguer, / ou Ctrl+K (⌘K sur macOS) pour focaliser instantanément et Échap ou × pour effacer
- Appuyez sur « / » ou Ctrl+F (⌘F sur macOS) pour atteindre immédiatement le champ de recherche le plus proche
- Cliquez sur l’étoile à côté d’un sélecteur pour épingler vos favoris et les synchroniser avec les sauvegardes

### 🛠 Éditeur de la base d’appareils
- Ajoutez, modifiez ou supprimez des appareils dans toutes les catégories
- Importez ou exportez la base complète au format JSON
- Revenez à la base par défaut depuis `src/data/index.js`

### 🌓 Mode sombre
- Activez-le via le bouton lune près du sélecteur de langue
- La préférence est mémorisée dans votre navigateur

### 🦄 Mode rose
- Cliquez sur le bouton licorne (le mode rose fait défiler des icônes toutes les 30 secondes avec une douce animation pop et revient au cheval quand vous quittez le thème) ou appuyez sur **P** pour activer un accent rose ludique
- Fonctionne avec les thèmes clair et sombre et persiste entre les visites

### ⚫ Mode à fort contraste
- Active un thème à contraste élevé pour améliorer la lisibilité

### 📝 Retours d’autonomie
- Cliquez sur <strong>Soumettre un retour d’autonomie</strong> sous l’autonomie pour ajouter votre mesure
- Ajoutez la température pour une pondération plus précise
- Les entrées sont sauvegardées dans votre navigateur et améliorent les estimations futures
- Un tableau de bord classe les retours selon leur poids, affiche les pourcentages de contribution et met en évidence les valeurs atypiques pour une analyse rapide

### ❓ Aide avec recherche
- Ouvrez-la via le bouton <strong>?</strong> ou avec <kbd>?</kbd>, <kbd>H</kbd>, <kbd>F1</kbd> ou <kbd>Ctrl+/</kbd>
- Utilisez le champ de recherche pour filtrer instantanément les sujets ; la requête est réinitialisée à la fermeture
- Fermez avec <kbd>Échap</kbd> ou en cliquant hors de la boîte de dialogue

---

## ▶️ Guide d’utilisation
1. **Lancez l’application :** ouvrez `index.html` dans un navigateur moderne – aucun serveur requis.
2. **Explorez la barre supérieure :** changez de langue, activez les thèmes sombre ou rose, ouvrez Paramètres pour régler accent et typographie et lancez l’aide avec ? ou Ctrl+/.
3. **Sélectionnez les appareils :** choisissez l’équipement par catégorie via les menus déroulants ; saisissez pour filtrer, épinglez vos favoris et laissez les scénarios préconfigurés ajouter automatiquement les accessoires.
4. **Consultez les calculs :** dès qu’une batterie est sélectionnée, consommation, intensité et autonomie apparaissent ; des alertes signalent les limites dépassées.
5. **Enregistrez et exportez les projets :** nommez et sauvegardez votre configuration, les sauvegardes automatiques capturent des instantanés et le bouton Exporter télécharge un bundle JSON tandis qu’Importer le restaure.
6. **Générez la liste de matériel :** cliquez sur **Générer la liste de matériel** pour transformer les exigences en liste catégorisée avec infobulles et accessoires.
7. **Gérez les données d’appareils :** sélectionnez « Modifier les données d’appareils… » pour ouvrir l’éditeur, ajuster les appareils, exporter/importer du JSON ou revenir aux valeurs par défaut.
8. **Soumettez des retours d’autonomie :** utilisez « Soumettre un retour d’autonomie » pour enregistrer vos mesures terrain et enrichir la pondération.

## 📱 Installer l’application

Cine Power Planner est une application web progressive installable directement depuis le navigateur :

- **Chrome/Edge (bureau) :** cliquez sur l’icône d’installation dans la barre d’adresse.
- **Android :** ouvrez le menu du navigateur et choisissez *Ajouter à l’écran d’accueil*.
- **iOS/iPadOS Safari :** touchez *Partager* puis *Ajouter à l’écran d’accueil*.

Une fois installée, l’application se lance depuis l’écran d’accueil, fonctionne hors ligne et se met à jour automatiquement.

## 📡 Utilisation hors ligne & stockage

Servir l’application via HTTP(S) installe un service worker qui met en cache chaque fichier pour que Cine Power Planner fonctionne totalement hors ligne et se mette à jour en arrière-plan. Projets, retours d’autonomie et préférences (langue, thème, mode rose et listes enregistrées) sont stockés dans le `localStorage` du navigateur. Effacer les données du site supprime toutes les informations, et la boîte de dialogue Paramètres propose un flux de **Réinitialisation d’usine** qui sauvegarde automatiquement une copie avant le nettoyage complet. L’en-tête affiche un badge hors ligne dès que la connexion tombe, et l’action 🔄 **Forcer le rechargement** actualise les fichiers en cache sans toucher aux projets enregistrés.

---

## 🗂️ Structure des fichiers
```bash
index.html                 # Mise en page HTML principale
src/styles/style.css       # Styles et mise en page
src/styles/overview.css    # Styles de l’aperçu imprimable
src/styles/overview-print.css # Ajustements d’impression pour l’aperçu
src/scripts/script.js        # Logique applicative
src/scripts/storage.js       # Helpers LocalStorage
src/scripts/static-theme.js  # Logique de thème partagée pour les pages légales
src/data/index.js       # Liste d’appareils par défaut
src/data/devices/       # Catalogues d’appareils par catégorie
src/data/schema.json    # Schéma généré pour les sélecteurs
src/vendor/             # Bibliothèques tierces incluses
legal/                     # Pages légales hors ligne
tools/                     # Scripts de maintenance des données
tests/                     # Suite de tests Jest
```
Les polices sont intégrées localement via `fonts.css`, ce qui permet à l’application de fonctionner entièrement hors ligne une fois les ressources en cache.

## 🛠️ Développement
Nécessite Node.js 18 ou version ultérieure.

```bash
npm install
npm run lint     # exécute uniquement ESLint
npm test         # lance le linting, les vérifications de données et les tests Jest
```

Après modification des données d’appareils, régénérez la base normalisée :

```bash
npm run normalize
npm run unify-ports
npm run check-consistency
npm run generate-schema
```

Ajoutez `--help` à l’un de ces scripts pour afficher les options disponibles.

Exécutez `npm run help` pour obtenir un rappel rapide des scripts de maintenance et de l’ordre recommandé.

## 🤝 Contribuer
Les contributions sont les bienvenues ! Ouvrez un ticket ou proposez une pull request. Lors de corrections de données, joignez des sauvegardes de projet ou des mesures d’autonomie pour aider à maintenir un catalogue fiable pour tous.
