# 🎥 Cine Power Planner

Questo strumento basato sul browser aiuta a pianificare progetti camera professionali alimentati da batterie V‑Mount, B‑Mount o Gold-Mount. Calcola il **consumo energetico totale**, la **corrente assorbita** (a 14,4 V e 12 V) e l’**autonomia stimata della batteria**, verificando che il pacco possa erogare in sicurezza la potenza richiesta.

Tutta la pianificazione, i dati inseriti e gli export restano sul dispositivo
davanti a te. Lingua, progetti, dispositivi personalizzati, preferiti e feedback
sulle autonomie sono salvati nel browser, e gli aggiornamenti del service worker
arrivano direttamente da questo repository. Puoi avviare l’app offline dal
disco oppure ospitarla internamente così che ogni reparto utilizzi la stessa
versione verificata.

---

## 🌍 Lingue
- 🇬🇧 [English](README.en.md)
- 🇩🇪 [Deutsch](README.de.md)
- 🇪🇸 [Español](README.es.md)
- 🇮🇹 [Italiano](README.it.md)
- 🇫🇷 [Français](README.fr.md)

L’app usa automaticamente la lingua del browser al primo avvio e puoi cambiarla in alto a destra. La scelta viene ricordata per la visita successiva.

---

## 🆕 Novità
- I controlli di accento e tipografia nelle Impostazioni ti permettono di modificare il colore accento, la dimensione base del font e la famiglia tipografica insieme ai temi scuro, rosa e ad alto contrasto.
- Le scorciatoie da tastiera per la ricerca globale consentono di premere / o Ctrl+K (⌘K su macOS) per focalizzarla all’istante, anche quando si trova nel menu laterale mobile compresso.
- Il pulsante di ricarica forzata svuota i file memorizzati dal service worker così l’app offline si aggiorna senza cancellare progetti o dispositivi salvati.
- Le icone a stella in ogni selettore fissano in alto le videocamere, le batterie e gli accessori preferiti e li includono nei backup.
- Il flusso di **Ripristino di fabbrica** scarica automaticamente un backup prima di rimuovere progetti, dispositivi e impostazioni salvati.
- La lista attrezzatura e l’anteprima stampabile mostrano il nome del progetto per un riferimento rapido.
- Carica un logo personalizzato da usare nelle stampe e nei backup.
- I backup includono i preferiti e creano una copia automatica prima del ripristino.
- Le voci della troupe dispongono ora di un campo e-mail.
- Tema ad alto contrasto per una leggibilità migliore.
- I moduli dei dispositivi compilano dinamicamente le categorie in base agli attributi dello schema.
- Interfaccia ridisegnata con più contrasto e spaziatura per un’esperienza più pulita su qualsiasi dispositivo.
- Condividere i progetti è più semplice: scarica un file JSON che raggruppa selezioni, requisiti, liste attrezzatura, feedback di autonomia e dispositivi personalizzati, poi importalo per ripristinare tutto.
- Icone dedicate per gli scenari obbligatori per riconoscere subito i requisiti del progetto.
- Diagramma del progetto interattivo che consente di trascinare i dispositivi, fare zoom, allineare alla griglia ed esportare in SVG o JPG.
- Tema rosa giocoso che resta attivo tra una visita e l’altra.
- Finestra di aiuto ricercabile con sezioni passo-passo e FAQ; aprila con ?, H, F1 o Ctrl+/.
- Suggerimenti contestuali al passaggio del mouse su pulsanti, campi, menu a discesa e intestazioni.
- Barra di ricerca globale per raggiungere rapidamente funzioni, selettori di dispositivi o argomenti di aiuto.
- Supporto per videocamere con piastre batteria V-, B- o Gold-Mount.
- Invia feedback di autonomia indicando anche la temperatura per affinare le stime.
- Dashboard visiva per la ponderazione delle autonomie che mostra l’influenza delle impostazioni su ogni misurazione, ordinata per peso con percentuali precise.
- Genera liste attrezzatura che riassumono l’equipaggiamento selezionato e i requisiti del progetto.
- Salva i requisiti di progetto con ogni configurazione così la lista attrezzatura mantiene tutto il contesto.
- Duplica all’istante le voci personalizzate dei moduli della lista attrezzatura grazie ai pulsanti a forchetta.

---

## 🔧 Funzionalità

### ✨ Punti salienti aggiuntivi

- **Progetta rig complessi senza tentativi.** Combina camere, piastre batteria,
  link wireless, monitor, motori e accessori vedendo consumo totale a
  14,4 V/12 V (e 33,6 V/21,6 V per B‑Mount) con autonomie realistiche basate su
  dati di campo ponderati. Il pannello di confronto batterie segnala le
  sovratensioni prima di preparare l’attrezzatura sbagliata.
- **Mantieni allineati tutti i reparti.** Salva più progetti con requisiti,
  contatti della troupe, scenari e note. Le liste stampabili raggruppano il
  materiale per categoria, uniscono i duplicati, mostrano metadati tecnici e
  includono accessori legati agli scenari così che camera, luce e grip condividano
  lo stesso contesto.
- **Lavora in tranquillità ovunque.** Apri `index.html` direttamente o servi la
  cartella via HTTPS per attivare il service worker. La cache offline conserva
  lingua, temi, preferiti e progetti, e **Forza ricarica** aggiorna gli asset
  senza toccare i dati salvati.
- **Adatta il planner alla tua troupe.** Passa subito tra italiano, inglese,
  tedesco, spagnolo e francese, regola dimensione e font, scegli un colore
  accento personalizzato, carica un logo per la stampa e alterna tema chiaro,
  scuro, rosa o ad alto contrasto. I menu con ricerca, i preferiti fissati, i
  pulsanti di duplicazione e le guide contestuali mantengono il ritmo sul set.

### ✅ Gestione dei progetti
- Salva, carica e cancella più progetti camera (premi Invio o Ctrl+S/⌘S per salvare rapidamente; il pulsante Salva resta disattivato finché non inserisci un nome).
- Vengono creati automaticamente snapshot ogni 10 minuti mentre il planner è aperto e dalla finestra Impostazioni puoi attivare esportazioni di backup orarie come promemoria.
- Scarica un file JSON che raccoglie selezioni, requisiti, lista attrezzatura, feedback di autonomia e dispositivi personalizzati; importalo dal selettore Importa progetto per ripristinare tutto in un passaggio.
- I dati sono archiviati localmente tramite `localStorage` e i preferiti vengono conservati nei backup; usa l'opzione **Ripristino di fabbrica** nelle Impostazioni per salvare automaticamente un backup prima di eliminare progetti e modifiche ai dispositivi memorizzati.
- Genera anteprime stampabili per ogni progetto salvato e aggiungi un logo personalizzato così esportazioni e backup rispettano l’identità della produzione.
- Salva i requisiti di progetto insieme a ciascun progetto, così la lista attrezzatura mantiene il contesto completo.
- Funziona completamente offline grazie al service worker installato: lingua, tema, dati dei dispositivi e preferiti persistono tra le sessioni.
- Layout responsive che si adatta senza sforzo a desktop, tablet e smartphone.
- Sulle videocamere compatibili scegli piastre **V‑Mount**, **B‑Mount** o **Gold-Mount**; l’elenco batterie si aggiorna automaticamente.

### 🧭 Panoramica dell’interfaccia
- **Promemoria rapido:**
  - **Ricerca globale** (`/` o `Ctrl+K`/`⌘K`) salta a funzioni, selettori o
    argomenti di aiuto anche quando il menu laterale è compresso.
  - **Centro assistenza** (`?`, `H`, `F1` o `Ctrl+/`) propone guide filtrabili,
    FAQ, scorciatoie e la modalità di aiuto al passaggio del mouse.
  - **Diagramma del progetto** visualizza le connessioni; tieni premuto Maiusc
    durante il download per salvare un JPG invece di un SVG e vedere gli avvisi
    di compatibilità.
  - **Confronto batterie** mostra come si comportano i pacchi compatibili e
    evidenzia subito i rischi di sovraccarico.
  - **Generatore di liste** produce tabelle per categoria con metadati, e-mail
    della troupe e aggiunte basate sugli scenari pronte per la stampa.
  - **Badge offline e Forza ricarica** indicano lo stato della connessione e
    aggiornano i file in cache senza eliminare i progetti.
- Un collegamento di salto e un indicatore offline mantengono il layout accessibile con tastiera e tocco; il badge appare ogni volta che il browser perde la connessione.
- La barra di ricerca globale consente di saltare a funzioni, selettori di dispositivi o argomenti di aiuto; premi Invio per attivare il risultato evidenziato, usa / o Ctrl+K (⌘K su macOS) per focalizzarla subito (sugli schermi piccoli il menu laterale si apre in automatico) e premi Esc o × per cancellare la ricerca.
- I controlli della barra superiore offrono cambio lingua, temi scuro e rosa e la finestra Impostazioni con colore accento, dimensione e famiglia del font, modalità ad alto contrasto e caricamento del logo, oltre agli strumenti di backup, ripristino e Ripristino di fabbrica che salvano automaticamente un backup prima di cancellare i dati.
- Il pulsante di aiuto apre un dialogo ricercabile con sezioni guidate, scorciatoie da tastiera, FAQ e una modalità di suggerimenti al passaggio del mouse; si può aprire anche con ?, H, F1 o Ctrl+/ mentre digiti.
- Il pulsante di ricarica forzata (🔄) cancella i file del service worker in cache così l’app offline si aggiorna senza perdere progetti o dispositivi.
- Sugli schermi più piccoli un menu laterale a scomparsa replica ogni sezione principale per navigare rapidamente.

### ♿ Personalizzazione e accessibilità
- Le preferenze di tema includono modalità scura, accento rosa giocoso e un interruttore dedicato ad alto contrasto per migliorare la leggibilità.
- Le modifiche al colore accento, alla dimensione base del font e alla famiglia tipografica si applicano all’istante e restano nel browser, ideali per rispettare il brand o esigenze di accessibilità.
- Le scorciatoie integrate coprono ricerca globale (/ o Ctrl+K/⌘K), aiuto ( ?, H, F1, Ctrl+/ ), salvataggio (Invio o Ctrl+S/⌘S), modalità scura (D) e modalità rosa (P).
- La modalità di aiuto al passaggio del mouse trasforma pulsanti, campi, menu e intestazioni in tooltip su richiesta, così chi è nuovo impara più velocemente.
- Gli input con ricerca incrementale, i controlli con focus visibile e le icone a stella accanto ai selettori permettono di filtrare elenchi lunghi e fissare i preferiti in cima.
- Carica un logo personalizzato per le stampe, configura i ruoli di monitoraggio
  predefiniti e regola i preset dei requisiti di progetto affinché gli export
  rispettino l’identità della produzione.
- I pulsanti di duplicazione replicano subito le righe dei moduli e i preferiti
  pinnati mantengono l’attrezzatura abituale in cima ai selettori, utile quando
  il tempo sul set è limitato.

### 📋 Lista attrezzatura
Il generatore converte le tue scelte in una lista di carico categorizzata:

- Clicca **Genera lista attrezzatura** per raccogliere l’equipaggiamento selezionato e i requisiti del progetto in una tabella.
- La tabella si aggiorna automaticamente quando cambiano selezioni e requisiti.
- Gli elementi sono raggruppati per categoria (camera, ottiche, alimentazione, monitoraggio, rigging, grip, accessori, consumabili) e i duplicati vengono uniti con la rispettiva quantità.
- Cavi, rigging e accessori necessari per monitor, motori, gimbal e scenari meteo vengono aggiunti automaticamente.
- Le selezioni degli scenari aggiungono l’attrezzatura correlata:
  - *Handheld* + *Easyrig* inserisce una maniglia telescopica per un supporto stabile.
  - *Gimbal* aggiunge il gimbal scelto, bracci articolati, spigot e paraluce o kit filtri.
  - *Outdoor* fornisce spigot, ombrelli e coperture antipioggia CapIt.
  - Gli scenari *Vehicle* e *Steadicam* includono staffe, bracci di isolamento e ventose quando necessari.
- Le selezioni delle ottiche riportano diametro frontale, peso, dati dei rod e fuoco minimo, aggiungono supporti per lenti e adattatori matte box e avvisano sugli standard di rod incompatibili.
- Le righe delle batterie rispecchiano i conteggi del calcolatore di potenza e includono piastre o dispositivi di *hotswap* quando richiesti.
- Le preferenze di monitoraggio assegnano monitor predefiniti per ogni ruolo (regista, DoP, fuochista, ecc.) con set di cavi e ricevitori wireless.
- Il modulo **Requisiti del progetto** alimenta la lista:
  - **Nome del progetto**, **casa di produzione**, **noleggio** e **DoP** compaiono nell’intestazione delle specifiche stampate.
  - Le voci **Troupe** raccolgono nomi, ruoli e indirizzi e-mail così i contatti viaggiano con il progetto.
  - **Giorni di preparazione** e **giorni di ripresa** aggiungono note di pianificazione e, con scenari outdoor, suggeriscono attrezzatura per il meteo.
  - Gli **scenari obbligatori** inseriscono rigging, gimbal e protezioni climatiche adeguati.
  - **Impugnatura camera** ed **estensione mirino** inseriscono i componenti selezionati o i relativi supporti.
  - Le opzioni di **matte box** e **filtri** aggiungono il sistema scelto con cassetti, adattatori a clamp o filtri necessari.
  - Le configurazioni di **monitoraggio**, **distribuzione video** e **mirino** aggiungono monitor, cavi e overlay per ciascun ruolo.
  - Le scelte dei **pulsanti personalizzati** e delle **preferenze treppiede** vengono elencate per riferimento rapido.
- Gli elementi di ogni categoria sono ordinati alfabeticamente e mostrano un tooltip al passaggio del mouse.
- La lista attrezzatura viene inclusa nelle anteprime stampabili e nei file di progetto esportati.
- Le liste vengono salvate automaticamente con il progetto e fanno parte sia dei file esportati sia dei backup.
- **Elimina lista attrezzatura** cancella la lista salvata e nasconde l’output.
- I moduli della lista attrezzatura includono pulsanti a forchetta per duplicare al volo le voci inserite.

### 📦 Categorie dei dispositivi
- **Camera** (1)
- **Monitor** (opzionale)
- **Trasmettitore wireless** (opzionale)
- **Motori FIZ** (0–4)
- **Controller FIZ** (0–4)
- **Sensore di distanza** (0–1)
- **Piastra batteria** (solo sulle camere compatibili con V‑ o B‑Mount)
- **Batteria V‑Mount** (0–1)

### ⚙️ Calcoli di potenza
- Consumo totale in watt
- Corrente a 14,4 V e 12 V
- Autonomia stimata in ore utilizzando la media ponderata dei feedback degli utenti
- Numero di batterie necessario per un giorno di riprese di 10 h (inclusa la riserva)
- Nota sulla temperatura per adattare l’autonomia in condizioni calde o fredde

### 🔋 Controllo dell’erogazione della batteria
- Avvisa se la corrente richiesta supera l’uscita della batteria (pin o D‑Tap)
- Indica quando il carico si avvicina al limite (80 % di utilizzo)

### 📊 Confronto batterie (opzionale)
- Confronta le stime di autonomia fra tutte le batterie
- Grafici a barre per un colpo d’occhio immediato

### 🖼 Diagramma del progetto
- Visualizza le connessioni di alimentazione e video dei dispositivi selezionati.
- Avvisa quando i brand FIZ non sono compatibili.
- Trascina i nodi per riordinare il layout, usa i pulsanti per zoomare ed esporta il diagramma in SVG o JPG.
- Tieni premuto Shift mentre fai clic su Download per esportare uno snapshot JPG invece di un SVG.
- Passa il mouse o tocca un dispositivo per vedere i dettagli nel popup.
- Utilizza le icone [OpenMoji](https://openmoji.org/) quando la connessione è attiva e ripiega sugli emoji: 🔋 batteria, 🎥 camera, 🖥️ monitor, 📡 video, ⚙️ motore, 🎮 controller, 📐 distanza, 🎮 impugnatura e 🔌 piastra batteria.

### 🧮 Ponderazione dei dati di autonomia
- I feedback di autonomia inviati dagli utenti migliorano la stima finale.
- Ogni voce viene corretta in base alla temperatura, passando da ×1 a 25 °C a:
  - ×1,25 a 0 °C
  - ×1,6 a −10 °C
  - ×2 a −20 °C
- Le impostazioni della camera influenzano il peso:
  - Moltiplicatori di risoluzione: ≥12K ×3, ≥8K ×2, ≥4K ×1,5, ≥1080p ×1; risoluzioni inferiori scalate a 1080p.
  - Il frame rate scala linearmente da 24 fps (es. 48 fps = ×2).
  - Il Wi‑Fi attivo aggiunge il 10 %.
  - Fattori codec: RAW/BRAW/ARRIRAW/R3D/CinemaDNG/Canon RAW/X‑OCN ×1; ProRes ×1,1; DNx/AVID ×1,2; All‑Intra ×1,3; H.264/AVC ×1,5; H.265/HEVC ×1,7.
  - Le voci dei monitor sotto la luminosità specificata vengono pesate secondo il loro rapporto di luminosità.
- Il peso finale riflette la quota di assorbimento di ciascun dispositivo, così i progetti simili contano di più.
- La media ponderata viene applicata quando sono disponibili almeno tre voci.
- Una dashboard ordina i contributi per peso e mostra la percentuale di ciascuno per un confronto immediato.

### 🔍 Ricerca e filtri
- Digita nei menu a discesa per trovare rapidamente un elemento.
- Filtra le liste di dispositivi tramite un campo di ricerca.
- Usa la barra di ricerca globale in alto per saltare a funzioni, dispositivi o argomenti di aiuto; premi Invio per navigare, / o Ctrl+K (⌘K su macOS) per focalizzarla al volo e Esc o × per cancellare.
- Premi “/” o Ctrl+F (⌘F su macOS) per portare subito il focus sul campo di ricerca più vicino.
- Clicca sulla stella accanto a qualsiasi selettore per fissare i preferiti in cima e sincronizzarli con i backup.

### 🛠 Editor del database dispositivi
- Aggiungi, modifica o elimina dispositivi in tutte le categorie.
- Importa o esporta l’intero database in formato JSON.
- Ripristina il database predefinito da `web/data/index.js`.

### 🌓 Modalità scura
- Attivala con il pulsante a forma di luna accanto al selettore della lingua.
- La preferenza viene salvata nel browser.

### 🦄 Modalità rosa
- Clicca sul pulsante con l'unicorno (la modalità rosa fa ruotare le icone dell'unicorno ogni 30 secondi con una delicata animazione pop e torna al cavallo quando disattivi il tema) o premi **P** per attivare un accento rosa giocoso.
- Funziona sia nel tema chiaro sia in quello scuro e resta attiva tra una visita e l’altra.

### ⚫ Modalità ad alto contrasto
- Attiva un tema ad alto contrasto per una migliore leggibilità.

### 📝 Feedback di autonomia
- Clicca su <strong>Invia feedback di autonomia</strong> sotto alla stima per aggiungere la tua misurazione.
- Includi la temperatura per una ponderazione più accurata.
- Le voci vengono salvate nel browser e migliorano le stime future.
- Un cruscotto dedicato ordina i contributi in base al peso, mostra le
  percentuali di contributo e mette in evidenza gli outlier per valutare
  rapidamente i dati di campo.

### ❓ Aiuto ricercabile
- Aprilo tramite il pulsante <strong>?</strong> oppure con <kbd>?</kbd>, <kbd>H</kbd>, <kbd>F1</kbd> o <kbd>Ctrl+/</kbd>.
- Usa il campo di ricerca per filtrare subito gli argomenti; la query viene azzerata alla chiusura.
- Chiudi con <kbd>Esc</kbd> o cliccando all’esterno della finestra.

---

## ▶️ Come usarlo
1. **Avvia l’app:** apri `index.html` in un browser moderno: non serve alcun server.
2. **Esplora la barra superiore:** cambia lingua, alterna i temi scuro o rosa, apri Impostazioni per regolare accento e tipografia e avvia l’aiuto con ? o Ctrl+/.
3. **Seleziona i dispositivi:** scegli l’attrezzatura per ogni categoria dai menu a discesa; digita per filtrare, clicca sulla stella per fissare i preferiti e lascia che gli scenari preconfigurati aggiungano automaticamente gli accessori.
4. **Consulta i calcoli:** una volta selezionata la batteria vedrai consumo, corrente e autonomia; gli avvisi evidenziano eventuali superamenti dei limiti.
5. **Salva ed esporta i progetti:** assegna un nome e salva la configurazione, i backup automatici creano snapshot e il pulsante Esporta scarica un bundle JSON per la troupe mentre Importa lo ripristina.
6. **Genera la lista attrezzatura:** premi **Genera lista attrezzatura** per trasformare i requisiti in una lista categorizzata con tooltip e accessori.
7. **Gestisci i dati dei dispositivi:** clicca su “Modifica dati dispositivi…” per aprire l’editor, aggiornare i dispositivi, esportare/importare JSON o tornare ai valori predefiniti.
8. **Invia feedback di autonomia:** usa “Invia feedback di autonomia” per registrare misurazioni reali e raffinare le medie ponderate.

## 📱 Installare come app

Il planner è una Progressive Web App e può essere installato direttamente dal browser:

- **Chrome/Edge (desktop):** fai clic sull’icona di installazione nella barra degli indirizzi.
- **Android:** apri il menu del browser e scegli *Aggiungi alla schermata Home*.
- **iOS/iPadOS Safari:** tocca *Condividi* e seleziona *Aggiungi alla schermata Home*.

Una volta installata, l’app si avvia dalla schermata Home, funziona offline e si aggiorna automaticamente.

## 📡 Uso offline e archiviazione dati

Servire l’app tramite HTTP(S) installa un service worker che memorizza in cache ogni file, così Cine Power Planner funziona completamente offline e si aggiorna in background. Progetti, feedback di autonomia e preferenze (lingua, tema, modalità rosa e liste attrezzatura salvate) vivono nel `localStorage` del browser. Cancellare i dati del sito elimina tutte le informazioni e nella finestra Impostazioni è disponibile anche il flusso di **Ripristino di fabbrica**, che salva automaticamente un backup prima di eseguire lo stesso azzeramento completo.
L’intestazione mostra un badge offline non appena cade la connessione, e l’azione
🔄 **Forza ricarica** aggiorna i file in cache senza toccare i progetti salvati.

---

## 🗂️ Struttura dei file
```bash
index.html                 # Layout HTML principale
web/styles/style.css       # Stili e layout
web/styles/overview.css    # Stili della panoramica stampabile
web/styles/overview-print.css # Regole di stampa per la panoramica
web/scripts/script.js        # Logica dell’applicazione
web/scripts/storage.js       # Helper per LocalStorage
web/scripts/static-theme.js  # Logica di tema condivisa per le pagine legali
web/data/index.js       # Elenco dispositivi predefinito
web/data/devices/       # Cataloghi dei dispositivi per categoria
web/data/schema.json    # Schema generato per i selettori
web/vendor/             # Librerie di terze parti incluse
legal/                     # Pagine legali offline
tools/                     # Script di manutenzione dei dati
tests/                     # Suite di test Jest
```
I font sono inclusi localmente tramite `fonts.css`, quindi una volta memorizzate le risorse l’app funziona interamente offline.

## 🛠️ Sviluppo
Richiede Node.js 18 o versione successiva.

```bash
npm install
npm run lint     # esegue solo ESLint
npm test         # esegue linting, controlli dati e test Jest
```

Dopo aver modificato i dati dei dispositivi, rigenera il database normalizzato:

```bash
npm run normalize
npm run unify-ports
npm run check-consistency
npm run generate-schema
```

Aggiungi `--help` a uno qualsiasi degli script per visualizzare le opzioni disponibili.

Esegui `npm run help` per ottenere rapidamente un riepilogo degli script di manutenzione e dell'ordine consigliato.

## 🤝 Contribuire
Sono benvenuti contributi di ogni tipo! Apri una issue o invia una pull request su GitHub.
Quando segnali dati errati, allegare backup dei progetti o misurazioni di
autonomia aiuta a mantenere il catalogo preciso per tutti.
