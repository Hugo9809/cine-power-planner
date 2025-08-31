# 🎥 Planificateur de Consommation Caméra

Cet outil fonctionnant dans le navigateur aide à planifier des configurations professionnelles alimentées par des batteries V‑Mount. Il calcule la **consommation totale**, le **courant** (à 14,4 V et 12 V) et l'**autonomie estimée**, tout en vérifiant que la batterie peut fournir la puissance requise.

---

## 🌍 Langues
- 🇬🇧 English
- 🇩🇪 Deutsch
- 🇪🇸 Español
- 🇮🇹 Italiano
- 🇫🇷 Français (par défaut si le navigateur est en français)

La langue se change en haut à droite et est mémorisée pour la prochaine visite.

---

## 🆕 Fonctionnalités récentes
- Diagramme interactif de configuration permettant de faire glisser les appareils, de zoomer et d'exporter la mise en page en SVG ou JPG.
- Thème rose ludique qui persiste entre les visites.
- Fenêtre d'aide consultable avec sections pas à pas et FAQ; ouvrable via ?, H, F1 ou Ctrl+/.
- Aide contextuelle au survol pour les boutons, champs, menus déroulants et en-têtes.
- Prise en charge des caméras avec plaques batterie V et B‑Mount.
- Retour d'autonomie utilisateur avec détails d'environnement pour affiner les estimations.
- Tableau visuel de pondération des autonomies montrant comment température, résolution, cadence et codec influencent chaque rapport, trié par poids avec pourcentages exacts.

---

## 🔧 Fonctionnalités

### ✅ Gestion des Configurations
- Enregistrer, charger et supprimer plusieurs configurations
- Partager une configuration via un lien ou effacer la configuration actuelle
- Toutes les données sont stockées localement via `localStorage`
- Importer et exporter les configurations en JSON
- Générer un aperçu imprimable de toute configuration enregistrée
- Fonctionne hors ligne : langue, mode sombre, configurations et données des appareils sont conservées
- Sur les caméras compatibles, choisir une plaque **B‑Mount** ou **V‑Mount** ; la liste des batteries s'actualise automatiquement

### 📦 Catégories d'Appareils
- **Caméra** (1)
- **Moniteur** (optionnel)
- **Vidéo sans fil** (optionnel)
- **Moteurs FIZ** (0–4)
- **Contrôleurs FIZ** (0–4)
- **Capteur de distance** (0–1)
- **Plaque batterie** (uniquement pour les caméras acceptant V‑ ou B‑Mount)
- **Batterie V‑Mount** (0–1)

### ⚙️ Calculs de Puissance
- Consommation totale en watts
- Courant à 14,4 V et 12 V
- Autonomie estimée en heures

### 🔋 Vérification de la Batterie
- Avertit si la consommation dépasse la sortie Pin ou D‑Tap
- Indique lorsque la limite est proche (80 %)

### 📊 Comparaison de Batteries (optionnel)
- Comparer l'autonomie de toutes les batteries
- Graphique à barres pour référence rapide

### 🖼 Diagramme de Configuration
- Affiche les liaisons d’alimentation et vidéo entre les appareils sélectionnés
- Avertit en cas de marques FIZ incompatibles
- Faites glisser les nœuds pour les disposer, utilisez les boutons de zoom et téléchargez le diagramme en SVG ou JPG
- Des info‑bulles détaillées apparaissent au survol
- Utilise les icônes [OpenMoji](https://openmoji.org/) en ligne, sinon des emoji :
  🔋 batterie, 🎥 caméra, 🖥️ moniteur, 📡 vidéo, ⚙️ moteur,
  🎮 contrôleur, 📐 distance, 🎮 poignée et 🔌 plaque batterie

### 🔍 Recherche et Filtres
- Champ de recherche pour filtrer toutes les listes et menus déroulants
- Taper dans les menus pour trouver rapidement

### 🛠 Base de Données des Appareils
- Ajouter, modifier ou supprimer des appareils de chaque catégorie
- Importer ou exporter la base complète au format JSON
- Réinitialiser avec la base par défaut de `data.js`

### 🌓 Mode Sombre
- Bouton lune pour activer/désactiver le mode sombre
- La préférence est enregistrée dans le navigateur
- Couleur rose optionnelle via le bouton cheval/unicorne
- La fenêtre d’aide est consultable par recherche et FAQ. Ouvrez‑la avec ? ou les touches `?`/`H`/`F1`/`Ctrl+/` puis fermez‑la avec Échap ou en cliquant à l’extérieur.

---

## 🎨 Design
- Mise en page épurée avec titres bleus et champs gris
- Utilise la police Google "Open Sans"
- Mise en page responsive pour les petits écrans
- Thèmes clair et sombre séparés

---

## ▶️ Utilisation
1. **Lancer l'application :** ouvrir `index.html` dans un navigateur moderne
2. **Sélectionner les appareils :** choisir dans chaque catégorie via les menus déroulants
3. **Voir les calculs :** consommation, courant et autonomie apparaissent lorsqu'une batterie est sélectionnée
4. **Vérifier les limites :** des messages indiquent si la sortie de la batterie est dépassée
5. **Enregistrer et charger des configurations :** nommer et exporter/importer les configurations et générer un aperçu imprimable
6. **Gérer la liste des appareils :** « Éditer les données… » ouvre l'éditeur pour modifier ou réinitialiser

---

## 🗂️ Arborescence
```bash
index.html       # Page principale
style.css        # Styles et mise en page
script.js        # Logique de l'application
data.js          # Base par défaut
storage.js       # Fonctions LocalStorage
README.*.md      # Documentation en plusieurs langues
```
Les polices sont chargées via Google Fonts dans `index.html`.
Après ce premier chargement des polices, l'application fonctionne entièrement hors ligne.

## 🛠️ Développement
Nécessite Node.js 18 ou version ultérieure.
1. Installer les dépendances :
   ```bash
   npm install
   ```
2. Lancer l'analyse lint :
   ```bash
   npm run lint
   ```
3. Exécuter les tests :
   ```bash
   npm test
   ```

## 🤝 Contribuer
Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou à proposer une pull request sur GitHub.
