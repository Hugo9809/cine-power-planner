# 🎥 Pianificatore del Consumo della Fotocamera

Questo strumento basato sul browser aiuta a pianificare configurazioni professionali alimentate da batterie V‑Mount. Calcola **consumo totale**, **corrente** (a 14,4 V e 12 V) e **durata stimata della batteria**, verificando che la batteria possa fornire in sicurezza la potenza richiesta.
---

## 🌍 Lingue
- 🇬🇧 English
- 🇩🇪 Deutsch
- 🇪🇸 Español
- 🇮🇹 Italiano (predefinito se il browser è in italiano)
- 🇫🇷 Français

Puoi cambiare lingua nell'angolo in alto a destra. La scelta viene memorizzata per la prossima visita.

---

## 🆕 Novità
- Diagramma interattivo della configurazione che consente di trascinare i dispositivi, zoomare ed esportare il layout in SVG o JPG.
- Tema rosa giocoso che persiste tra una visita e l'altra.
- Finestra di aiuto ricercabile con sezioni passo passo e FAQ; apribile con ?, H, F1 o Ctrl+/.
- Aiuto contestuale al passaggio del mouse su pulsanti, campi, menu a discesa e intestazioni.
- Supporto per fotocamere con piastre batteria V e B‑Mount.
- Inviare feedback sull'autonomia reale con dettagli ambientali per affinare le stime.
- Dashboard visiva della ponderazione della durata che mostra come temperatura, risoluzione, frame rate e codec influenzano ogni report, ordinati per peso con percentuali esatte.

---

## 🔧 Funzionalità

### ✅ Gestione delle configurazioni
- Salvare, caricare ed eliminare più configurazioni di camera
- Condividere una configurazione tramite link o azzerare la configurazione corrente
- Tutti i dati sono memorizzati localmente tramite `localStorage`
- Importare ed esportare le configurazioni in formato JSON
- Generare una panoramica stampabile di qualsiasi configurazione salvata
- Funziona completamente offline: lingua, modalità scura, configurazioni e dati dei dispositivi vengono conservati
- Sulle fotocamere compatibili è possibile scegliere una piastra **B‑Mount** o **V‑Mount**; l'elenco delle batterie si adatta automaticamente

### 📦 Categorie di dispositivi
- **Camera** (1)
- **Monitor** (opzionale)
- **Video wireless** (opzionale)
- **Motori FIZ** (0–4)
- **Controller FIZ** (0–4)
- **Sensore di distanza** (0–1)
- **Piastra batteria** (solo su fotocamere che accettano V‑ o B‑Mount)
- **Batteria V‑Mount** (0–1)

### ⚙️ Calcoli di potenza
- Consumo totale in watt
- Corrente a 14,4 V e 12 V
- Autonomia stimata in ore

### 🔋 Controllo uscita batteria
- Avvisa se l'assorbimento supera l'uscita della batteria (Pin o D‑Tap)
- Indica quando il carico è vicino al limite (80 % dell'uso)

### 📊 Confronto batterie (opzionale)
- Confronta le stime di autonomia di tutte le batterie
- Grafico a barre per un rapido riferimento

### 🖼 Diagramma della configurazione
- Visualizza le connessioni di alimentazione e video dei dispositivi selezionati
- Avvisa quando i marchi FIZ sono incompatibili
- Trascina i nodi per spostarli, usa i pulsanti di zoom e scarica il diagramma in formato SVG o JPG
- Le finestre popup mostrano dettagli sui dispositivi
- Usa le icone colorate di [OpenMoji](https://openmoji.org/) quando sei online, passando agli emoji se non possono essere caricate:
  🔋 batteria, 🎥 camera, 🖥️ monitor, 📡 video, ⚙️ motore,
  🎮 controller, 📐 distanza, 🎮 impugnatura e 🔌 piastra batteria

### 🔍 Ricerca e filtri
- Filtra ogni menu a discesa e lista dispositivi con un campo di ricerca
- Digita nei menu a discesa per trovare rapidamente le voci

### 🛠 Editor del database dei dispositivi
- Aggiungi, modifica o elimina dispositivi in tutte le categorie
- Importa o esporta l'intero database in formato JSON
- Ripristina il database predefinito da `data.js`

### 🌓 Modalità scura
- Attivabile tramite il pulsante con la luna accanto al selettore della lingua
- La preferenza viene salvata nel browser
- Modalità rosa opzionale con il pulsante cavallo/unicorno
- La finestra di aiuto è ricercabile con FAQ. Aprila con ? o con i tasti `?`/`H`/`F1`/`Ctrl+/` e chiudila con Esc o clic fuori dal popup

---

## 🎨 Design
- Layout pulito con titoli blu e campi di input grigi
  - Utilizza il font "Ubuntu" incluso localmente
- Design responsivo adatto anche agli schermi piccoli
- Temi chiaro e scuro separati

---

## ▶️ Come usare
1. **Avvia l'app:** apri `index.html` in un qualsiasi browser moderno – non serve alcun server
2. **Seleziona i dispositivi:** scegli i dispositivi in ogni categoria usando i menu a discesa
3. **Vedi i calcoli:** quando selezioni una batteria compaiono consumo totale, corrente e autonomia
4. **Verifica i limiti di uscita:** gli indicatori mostrano se l'uscita della batteria viene superata
5. **Salva e carica le configurazioni:** dai un nome alla configurazione, salvala, esportala/importala e genera una panoramica stampabile
6. **Gestisci la lista dei dispositivi:** clicca su “Modifica dati dispositivi…” per aprire l'editor, modificare i dispositivi o ripristinare i valori predefiniti

---

## 🗂️ Struttura dei file
```bash
index.html       # Layout HTML principale
style.css        # Stili e layout
script.js        # Logica dell'applicazione
data.js          # Elenco dispositivi predefinito
storage.js       # Funzioni di LocalStorage
README.*.md      # Documentazione in diverse lingue
```
I font sono inclusi localmente in `index.html`.
L'applicazione funziona completamente offline fin dal primo caricamento.

## 🛠️ Sviluppo
È necessario Node.js 18 o successivo.
1. Installa le dipendenze:
   ```bash
   npm install
   ```
2. Esegui il lint:
   ```bash
   npm run lint
   ```
3. Avvia i test:
   ```bash
   npm test
   ```

## 🤝 Contribuire
Sono benvenuti i contributi! Apri una issue o invia una pull request su GitHub.
