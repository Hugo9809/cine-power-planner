# 🎥 Cine Power Planner

Questo strumento basato sul browser ti aiuta a pianificare progetti camera professionali alimentati da batterie V‑Mount, B‑Mount o Gold-Mount. Calcola il **consumo totale**, la **corrente assorbita** (a 14,4 V e 12 V) e l’**autonomia stimata**, verificando che il pacco batteria possa erogare in sicurezza la potenza richiesta.

Tutta la pianificazione, gli input e gli export restano sul dispositivo davanti a te. Lingua, progetti, dispositivi personalizzati, preferiti e feedback sulle autonomie vivono nel browser, e gli aggiornamenti del service worker arrivano direttamente da questo repository. Avvia Cine Power Planner offline dal disco o ospitalo internamente così che ogni reparto utilizzi la stessa versione verificata.

## A colpo d'occhio

- **Pianifica senza rete.** Tutte le icone, i font e gli script ausiliari sono inclusi in questo repository; apri `index.html`
  direttamente e lavora offline.
- **I progetti restano sul dispositivo.** Salvataggi, feedback sulle autonomie, attrezzature personalizzate, preferiti e liste
  di attrezzatura restano locali; backup e pacchetti condivisibili sono file JSON leggibili.
- **Controlla gli aggiornamenti.** Il service worker si aggiorna solo dopo aver premuto **Forza ricarica**, mantenendo la
  produzione su una versione affidabile durante gli spostamenti.
- **Rete di sicurezza a più livelli.** Salvataggi manuali, auto-save e backup automatici con timestamp rendono semplice provare
  il ripristino prima delle riprese.

## Avvio rapido

1. Scarica o clona il repository e apri `index.html` in un browser moderno.
2. (Opzionale) Servi la cartella in locale (ad esempio con `npx http-server` o `python -m http.server`) così il service worker
   si registra e memorizza nella cache le risorse per l'uso offline.
3. Carica il planner una volta, chiudi la scheda, disconnettiti dalla rete e riapri `index.html`. L'indicatore offline dovrebbe
   lampeggiare brevemente mentre viene caricata l'interfaccia in cache.
4. Crea un progetto, premi **Invio** (o **Ctrl+S**/`⌘S`) per salvare e controlla il backup automatico che appare nel selettore
   dopo qualche minuto.
5. Esporta **Impostazioni → Backup e ripristino → Backup**, importa il file in un profilo privato del browser e verifica che
   progetti, preferiti e attrezzature personalizzate si ripristinino correttamente.
6. Esercitati a esportare un pacchetto `.cpproject` e a importarlo su un'altra macchina o profilo per validare la catena salvataggio →
   condivisione → importazione prima di arrivare sul set.

## Flussi di lavoro principali

- **Pianificare un rig.** Combina camere, piastre, collegamenti wireless, monitor, motori e accessori osservando aggiornarsi
  all'istante consumi e stime di autonomia.
- **Salvare versioni.** Mantieni istantanee esplicite dei progetti e lascia che backup automatici con timestamp catturino il
  lavoro in corso ogni 10 minuti.
- **Condividere in sicurezza.** Esporta pacchetti `.cpproject` che restano offline, convalidano lo schema in import e possono
  includere regole automatiche per l'attrezzatura.
- **Eseguire backup completi.** I backup del planner includono progetti, preferiti, attrezzature personalizzate, dati sulle
  autonomie e preferenze dell'interfaccia in modo da non perdere contesto.

## Proteggere i dati offline

- Verifica regolarmente la prontezza offline: carica l'applicazione, disconnettiti, aggiorna e assicurati che i progetti restino
  accessibili.
- Conserva copie ridondanti su supporti etichettati e importale in un secondo profilo dopo ogni esportazione.
- Prima di applicare aggiornamenti o modifiche importanti ai dati, crea un backup manuale e assicurati che il ripristino sia pulito.

---

## 🌍 Lingue
- 🇬🇧 [English](README.en.md)
- 🇩🇪 [Deutsch](README.de.md)
- 🇪🇸 [Español](README.es.md)
- 🇮🇹 [Italiano](README.it.md)
- 🇫🇷 [Français](README.fr.md)

Al primo avvio l’applicazione adotta la lingua del browser; puoi cambiarla dall’angolo in alto a destra e la scelta viene ricordata per la visita successiva.

---

## 🆕 Novità
- I confronti delle versioni dei backup permettono di scegliere qualsiasi salvataggio manuale o backup automatico con timestamp per rivedere le differenze, aggiungere note sugli incidenti ed esportare un registro prima di annullare una modifica o consegnare il materiale alla post.
- I backup ora normalizzano i pacchetti di dati legacy salvati come stringhe JSON o array di voci, così gli export storici si ripristinano correttamente.
- Le prove di ripristino caricano un backup completo dell’app o un bundle di progetto in una sandbox isolata così puoi confermare che il contenuto corrisponde ai dati live senza toccare i profili di produzione.
- Le regole automatiche dell'attrezzatura consentono di definire aggiunte o rimozioni guidate dallo scenario, esportarle e ripristinarle insieme ai bundle condivisi.
- Il cruscotto Dati e archiviazione controlla progetti salvati, elenchi, dispositivi personalizzati, preferiti e feedback sulle autonomie direttamente nelle Impostazioni e mostra la dimensione approssimativa del backup.
- Un overlay di stato dell'autosalvataggio riporta l’ultima nota di autosalvataggio dentro alle Impostazioni così le squadre vedono l’attività in background mentre provano le procedure di recupero.
- Un editor dell'attrezzatura sensibile al monitoraggio mette in evidenza accessori aggiuntivi per monitor e video solo quando gli scenari lo richiedono, mantenendo la creazione delle regole concentrata.
- I controlli di accento e tipografia nelle Impostazioni consentono di regolare colore, dimensione base e famiglia del font insieme ai temi scuro, rosa e ad alto contrasto.
- Le scorciatoie della ricerca globale portano il focus sul campo all’istante con / o Ctrl+K (⌘K su macOS), anche quando è nascosto nel menu laterale compresso.
- Il pulsante **Forza ricarica** cancella i file del service worker in cache per aggiornare l’applicazione offline senza eliminare progetti o dispositivi salvati.
- Le icone a stella di ogni selettore fissano videocamere, batterie e accessori preferiti in cima alla lista e li includono nei backup.
- Il flusso di **Ripristino di fabbrica** scarica automaticamente una copia di sicurezza prima di rimuovere progetti, dispositivi e impostazioni memorizzati.
- La lista attrezzatura e l’anteprima stampabile mostrano il nome del progetto per un riferimento veloce.
- Puoi caricare un logo personalizzato che apparirà nelle stampe e nei backup.
- I backup includono i preferiti e creano automaticamente una copia prima del ripristino.
- Le schede della troupe includono ora un campo e-mail dedicato.
- Nuovo tema ad alto contrasto per migliorare la leggibilità.
- I moduli dei dispositivi compilano le categorie in modo dinamico partendo dallo schema.
- Interfaccia ridisegnata con contrasto maggiore e spaziature più generose per un’esperienza più pulita su qualsiasi dispositivo.
- Condividere i progetti è più semplice: scarica un file JSON con selezioni, requisiti, lista attrezzatura, feedback di autonomia e dispositivi personalizzati, quindi importalo per ripristinare tutto.
- Icone dedicate per gli scenari obbligatori evidenziano subito i requisiti del progetto.
- Diagramma del progetto interattivo per trascinare i dispositivi, fare zoom, allineare alla griglia ed esportare in SVG o JPG.
- Tema rosa giocoso che resta attivo tra una visita e l’altra.
- Finestra di aiuto ricercabile con sezioni guidate e FAQ; aprila con ?, H, F1 o Ctrl+/.
- Suggerimenti contestuali al passaggio del mouse su pulsanti, campi, menu e intestazioni.
- Barra di ricerca globale per raggiungere rapidamente funzioni, selettori di dispositivi o argomenti di aiuto.
- Supporto per videocamere con piastre V‑, B‑ o Gold-Mount.
- Invia feedback di autonomia indicando la temperatura per affinare le stime.
- Dashboard visiva per la ponderazione delle autonomie che mostra l’impatto delle impostazioni su ogni misura, ordinata per peso con percentuali precise.
- Generatore di liste attrezzatura che riunisce l’equipaggiamento selezionato e i requisiti del progetto.
- I requisiti di progetto vengono salvati insieme a ogni configurazione così la lista mantiene tutto il contesto.
- I pulsanti a forchetta duplicano all’istante le voci personalizzate nei moduli della lista attrezzatura.

---

## 🔧 Funzionalità

### ✨ Punti salienti

- **Progetta rig complessi senza tentativi.** Combina camere, piastre batteria, link wireless, monitor, motori e accessori tenendo sotto controllo il consumo totale a 14,4 V/12 V (e 33,6 V/21,6 V per B‑Mount) e autonomie realistiche basate su dati di campo ponderati. Il pannello di confronto batterie segnala eventuali sovraccarichi prima che l’attrezzatura parta.
- **Mantieni allineati tutti i reparti.** Salva più progetti con requisiti, contatti della troupe, scenari e note. Le liste stampabili raggruppano il materiale per categoria, uniscono i duplicati, mostrano metadati tecnici e aggiungono accessori legati agli scenari così che camera, luce e grip condividano lo stesso contesto.
- **Lavora con serenità ovunque.** Apri `index.html` direttamente oppure servi la cartella via HTTPS per attivare il service worker. La cache offline conserva lingua, temi, preferiti e progetti, e **Forza ricarica** aggiorna gli asset senza toccare i dati salvati.
- **Adatta Cine Power Planner alla tua troupe.** Passa subito tra italiano, inglese, tedesco, spagnolo e francese, regola dimensione e font, scegli un colore accento personale, carica un logo per la stampa e alterna tema chiaro, scuro, rosa o ad alto contrasto. Selettori con ricerca, preferiti fissati, pulsanti di duplicazione e guide contestuali mantengono il ritmo sul set.

### ✅ Gestione dei progetti
- Salva, carica e cancella più progetti (premi Invio o Ctrl+S/⌘S per salvare rapidamente; il pulsante rimane disattivato finché non inserisci un nome).
- Vengono creati snapshot automatici ogni 10 minuti mentre Cine Power Planner è aperto, e nelle Impostazioni puoi attivare export orari di backup come promemoria.
- Scarica un file JSON che raggruppa selezioni, requisiti, lista attrezzatura, feedback di autonomia e dispositivi personalizzati; importalo dal selettore per ripristinare tutto in un passo.
- I dati si salvano localmente tramite `localStorage` e i preferiti vengono inclusi nei backup; l’opzione **Ripristino di fabbrica** scarica automaticamente una copia prima di cancellare progetti e modifiche ai dispositivi.
- Genera anteprime stampabili per ogni progetto e aggiungi un logo personalizzato così esportazioni e backup rispettano l’identità della produzione.
- I requisiti di progetto vengono salvati con il progetto, così la lista attrezzatura conserva il contesto completo.
- Funziona interamente offline grazie al service worker: lingua, tema, dati dei dispositivi e preferiti persistono tra le sessioni.
- Il layout responsive si adatta a desktop, tablet e smartphone.
- Sulle videocamere compatibili puoi scegliere piastre **V‑Mount**, **B‑Mount** o **Gold-Mount**; l’elenco delle batterie si aggiorna automaticamente.

### 🧭 Panoramica dell’interfaccia
- **Promemoria rapido:**
  - **Ricerca globale** (`/` o `Ctrl+K`/`⌘K`) salta a funzioni, selettori o argomenti di aiuto anche con il menu laterale chiuso.
  - **Centro assistenza** (`?`, `H`, `F1` o `Ctrl+/`) offre guide filtrabili, FAQ, scorciatoie e la modalità di aiuto al passaggio del mouse.
  - **Diagramma del progetto** visualizza le connessioni; tieni premuto Maiusc durante il download per salvare un JPG al posto di un SVG e vedere gli avvisi di compatibilità.
  - **Confronto batterie** mostra le prestazioni dei pack compatibili ed evidenzia i rischi di sovraccarico.
  - **Generatore di liste** produce tabelle per categoria con metadati, e-mail della troupe e aggiunte basate sugli scenari pronte per la stampa.
  - **Badge offline e Forza ricarica** indicano lo stato della connessione e aggiornano i file in cache senza eliminare i progetti.
- Un collegamento di salto e un indicatore offline mantengono l’interfaccia accessibile con tastiera e touch; il badge appare ogni volta che il browser perde la rete.
- La barra di ricerca globale consente di raggiungere funzioni, selettori o argomenti di aiuto; premi Invio per aprire il risultato evidenziato, usa / o Ctrl+K (⌘K su macOS) per focalizzarla subito (su schermi piccoli il menu laterale si apre automaticamente) e premi Esc o × per cancellare la ricerca.
- I controlli della barra superiore offrono cambio lingua, temi scuro e rosa e la finestra Impostazioni con colore accento, dimensione e famiglia del font, modalità ad alto contrasto e caricamento del logo, oltre agli strumenti di backup, ripristino e Ripristino di fabbrica che salvano una copia prima di cancellare i dati.
- Il pulsante di aiuto apre un dialogo ricercabile con sezioni guidate, scorciatoie da tastiera, FAQ e una modalità di suggerimenti al passaggio del mouse; lo puoi aprire anche con ?, H, F1 o Ctrl+/ mentre digiti.
- Il pulsante di ricarica forzata (🔄) elimina i file del service worker in cache così l’applicazione offline si aggiorna senza perdere progetti o dispositivi.
- Su schermi piccoli un menu laterale a scomparsa replica ogni sezione principale per navigare rapidamente.

### ♿ Personalizzazione e accessibilità
- Le preferenze di tema includono modalità scura, accento rosa giocoso e un interruttore dedicato ad alto contrasto.
- Le modifiche a colore accento, dimensione e tipografia si applicano subito e restano memorizzate nel browser, ideali per rispettare il brand o esigenze di accessibilità.
- Le scorciatoie integrate coprono ricerca globale (/ o Ctrl+K/⌘K), aiuto ( ?, H, F1, Ctrl+/ ), salvataggio (Invio o Ctrl+S/⌘S), modalità scura (D) e modalità rosa (P).
- La modalità di aiuto al passaggio del mouse trasforma pulsanti, campi, menu e intestazioni in tooltip su richiesta, perfetta per chi è alle prime armi.
- Gli input con ricerca incrementale, il focus visibile e le icone a stella accanto ai selettori consentono di filtrare elenchi lunghi e fissare i preferiti.
- Carica un logo per la stampa, configura i ruoli di monitoraggio predefiniti e regola i preset dei requisiti di progetto così gli export rispettano l’identità della produzione.
- I pulsanti a forchetta duplicano le righe dei moduli all’istante e i preferiti fissati mantengono l’attrezzatura abituale in cima alle liste, utile quando il tempo è limitato.

### 📋 Lista attrezzatura
Il generatore trasforma le tue scelte in una lista di carico ordinata per categorie:

- Clicca su **Genera lista attrezzatura** per raccogliere l’equipaggiamento selezionato e i requisiti del progetto in una tabella.
- La tabella si aggiorna non appena cambiano selezioni o requisiti.
- Gli elementi sono raggruppati per categoria (camera, ottiche, alimentazione, monitoraggio, rigging, grip, accessori, consumabili) e i duplicati sono uniti con la quantità corretta.
- Cavi, rigging e accessori necessari per monitor, motori, gimbal e scenari meteo vengono aggiunti automaticamente.
- Gli scenari selezionati aggiungono l’attrezzatura correlata:
  - *Handheld* + *Easyrig* inserisce una maniglia telescopica per un supporto stabile.
  - *Gimbal* aggiunge il gimbal scelto, bracci articolati, spigot e paraluce o kit filtri.
  - *Outdoor* fornisce spigot, ombrelli e coperture antipioggia CapIt.
  - Gli scenari *Vehicle* e *Steadicam* includono staffe, bracci di isolamento e ventose quando necessari.
- Le selezioni delle ottiche riportano diametro frontale, peso, dati dei rod e fuoco minimo, aggiungono i supporti per lenti e gli adattatori matte box e segnalano eventuali standard incompatibili.
- Le righe delle batterie riprendono i conteggi del calcolatore di potenza e includono piastre o dispositivi di hotswap quando richiesti.
- Le preferenze di monitoraggio assegnano monitor predefiniti a ogni ruolo (regista, DoP, fuochista, ecc.) con set di cavi e ricevitori wireless.
- Il modulo **Requisiti del progetto** alimenta la lista:
  - **Nome del progetto**, **casa di produzione**, **noleggio** e **DoP** compaiono nell’intestazione delle specifiche stampate.
  - Le voci **Troupe** raccolgono nomi, ruoli ed e-mail così i contatti viaggiano con il progetto.
  - **Giorni di preparazione** e **giorni di ripresa** aggiungono note di pianificazione e, con scenari outdoor, suggeriscono attrezzatura per il meteo.
  - Gli **scenari obbligatori** inseriscono rigging, gimbal e protezioni climatiche adeguati.
  - **Impugnatura camera** ed **estensione mirino** includono i componenti selezionati o i relativi supporti.
  - Le opzioni di **matte box** e **filtri** aggiungono il sistema scelto con cassetti, adattatori a clamp o filtri necessari.
  - Le configurazioni di **monitoraggio**, **distribuzione video** e **mirino** aggiungono monitor, cavi e overlay per ciascun ruolo.
  - Le scelte dei **pulsanti personalizzati** e delle **preferenze treppiede** vengono elencate per riferimento rapido.
- All’interno di ogni categoria gli elementi sono ordinati alfabeticamente e mostrano un tooltip al passaggio del mouse.
- La lista attrezzatura è inclusa nelle anteprime stampabili e nei file di progetto esportati.
- Le liste vengono salvate automaticamente insieme al progetto e sono incluse sia negli export sia nei backup.
- **Elimina lista attrezzatura** cancella la lista salvata e nasconde l’output.
- I moduli includono pulsanti a forchetta per duplicare le voci inserite al volo.

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
- Autonomia stimata in ore utilizzando la media ponderata della community
- Numero di batterie necessario per 10 h di riprese
- Nota sulla temperatura per adattare l’autonomia in condizioni estreme

### 🔋 Controllo dell’erogazione
- Avvisa se la corrente richiesta supera l’uscita della batteria (pin o D‑Tap)
- Indica quando il carico raggiunge l’80 % della capacità

### 📊 Confronto batterie (opzionale)
- Confronta le stime di autonomia fra tutte le batterie
- Grafici a barre per un colpo d’occhio immediato

### 🖼 Diagramma del progetto
- Visualizza le connessioni di alimentazione e video dei dispositivi selezionati
- Avvisa quando i brand FIZ non sono compatibili
- Trascina i nodi per riordinare il layout, usa i pulsanti per zoomare ed esporta il diagramma in SVG o JPG
- Tieni premuto Shift mentre clicchi Download per esportare uno snapshot JPG invece di un SVG
- Passa il mouse o tocca un dispositivo per vedere i dettagli in popover
- Utilizza icone OpenMoji quando è disponibile la connessione e passa agli emoji in assenza: 🔋 batteria, 🎥 camera, 🖥️ monitor, 📡 video, ⚙️ motore, 🎮 controller, 📐 distanza, 🎮 impugnatura e 🔌 piastra batteria

### 🧮 Ponderazione dei dati di autonomia
- I feedback inviati dagli utenti migliorano la stima finale
- Ogni voce viene corretta in base alla temperatura, passando da ×1 a 25 °C a:
  - ×1,25 a 0 °C
  - ×1,6 a −10 °C
  - ×2 a −20 °C
- Le impostazioni della camera influiscono sul peso:
  - Moltiplicatori di risoluzione: ≥12K ×3, ≥8K ×2, ≥4K ×1,5, ≥1080p ×1; risoluzioni inferiori scalate a 1080p
  - Il frame rate scala linearmente da 24 fps (es. 48 fps = ×2)
  - Wi‑Fi attivo aggiunge il 10 %
  - Fattori codec: RAW/BRAW/ARRIRAW/R3D/CinemaDNG/Canon RAW/X‑OCN ×1; ProRes ×1,1; DNx/AVID ×1,2; All‑Intra ×1,3; H.264/AVC ×1,5; H.265/HEVC ×1,7
  - Le voci dei monitor sotto la luminosità indicata vengono pesate in base al loro rapporto di luminosità
- Il peso finale riflette la quota di consumo di ciascun dispositivo, così i progetti simili contano di più
- La media ponderata viene applicata quando sono disponibili almeno tre voci
- Una dashboard ordina i contributi per peso e mostra la percentuale di ciascuno per un confronto immediato

### 🔍 Ricerca e filtri
- Digita nei menu a discesa per trovare rapidamente un elemento
- Filtra le liste di dispositivi tramite un campo di ricerca
- Usa la barra di ricerca globale in alto per saltare a funzioni, dispositivi o argomenti di aiuto; premi Invio per navigare, / o Ctrl+K (⌘K su macOS) per focalizzarla al volo ed Esc o × per cancellare
- Premi “/” o Ctrl+F (⌘F su macOS) per portare subito il focus sul campo di ricerca più vicino
- Clicca sulla stella accanto a qualsiasi selettore per fissare i preferiti in cima e sincronizzarli con i backup

### 🛠 Editor del database
- Aggiungi, modifica o elimina dispositivi in tutte le categorie
- Importa o esporta l’intero database in formato JSON
- Ripristina il database predefinito da `src/data/index.js`

### 🌓 Modalità scura
- Attivala con il pulsante a forma di luna accanto al selettore della lingua
- La preferenza viene salvata nel browser

### 🦄 Modalità rosa
- Clicca sul pulsante con l’unicorno (la modalità rosa alterna icone ogni 30 secondi con una delicata animazione pop e torna al cavallo quando esci) o premi **P** per attivare un accento rosa giocoso
- Funziona sia nel tema chiaro sia in quello scuro e persiste fra le visite

### ⚫ Modalità ad alto contrasto
- Attiva un tema ad alto contrasto per una migliore leggibilità

### 📝 Feedback di autonomia
- Clicca su <strong>Invia feedback di autonomia</strong> sotto la stima per aggiungere la tua misurazione
- Includi la temperatura per una ponderazione più accurata
- Le voci vengono salvate nel browser e migliorano le stime future
- Un cruscotto dedicato ordina i contributi in base al peso, mostra le percentuali e mette in evidenza gli outlier per valutarli rapidamente

### ❓ Aiuto ricercabile
- Apri il dialogo con il pulsante <strong>?</strong> o con <kbd>?</kbd>, <kbd>H</kbd>, <kbd>F1</kbd> o <kbd>Ctrl+/</kbd>
- Usa il campo di ricerca per filtrare subito gli argomenti; la query viene azzerata alla chiusura
- Chiudi con <kbd>Esc</kbd> o cliccando all’esterno del dialogo

---

## ▶️ Come usarlo
1. **Avvia l’applicazione:** apri `index.html` in un browser moderno; non serve alcun server.
2. **Esplora la barra superiore:** cambia lingua, alterna i temi scuro o rosa, apri Impostazioni per regolare accento e tipografia e lancia l’aiuto con ? o Ctrl+/.
3. **Seleziona i dispositivi:** scegli l’attrezzatura per ogni categoria dai menu; digita per filtrare, fissa i preferiti con la stella e lascia che gli scenari compilino gli accessori.
4. **Consulta i calcoli:** dopo aver scelto una batteria vedrai consumo, corrente e autonomia; gli avvisi evidenziano eventuali superamenti dei limiti.
5. **Salva ed esporta i progetti:** assegna un nome e salva la configurazione, i backup automatici creano snapshot e il pulsante Esporta scarica un bundle JSON mentre Importa lo ripristina.
6. **Genera la lista attrezzatura:** premi **Genera lista attrezzatura** per trasformare i requisiti in una lista categorizzata con tooltip e accessori.
7. **Gestisci i dati dei dispositivi:** clicca su “Modifica dati dispositivi…” per aprire l’editor, aggiornare il catalogo, esportare/importare JSON o tornare ai valori predefiniti.
8. **Invia feedback di autonomia:** usa “Invia feedback di autonomia” per registrare misurazioni reali e perfezionare le medie ponderate.

## 📱 Installare come applicazione

Cine Power Planner è un’applicazione web progressiva installabile direttamente dal browser:

- **Chrome/Edge (desktop):** fai clic sull’icona di installazione nella barra degli indirizzi.
- **Android:** apri il menu del browser e scegli *Aggiungi alla schermata Home*.
- **iOS/iPadOS Safari:** tocca *Condividi* e seleziona *Aggiungi alla schermata Home*.

Una volta installata, l’applicazione si avvia dalla schermata Home, funziona offline e si aggiorna automaticamente.

## 📡 Uso offline e archiviazione

Servire l’applicazione via HTTP(S) installa un service worker che memorizza in cache ogni file, così Cine Power Planner funziona completamente offline e si aggiorna in background. Progetti, feedback di autonomia e preferenze (lingua, tema, modalità rosa e liste salvate) risiedono nel `localStorage` del browser. Cancellare i dati del sito elimina tutte le informazioni e il menu Impostazioni offre un flusso di **Ripristino di fabbrica** che salva automaticamente un backup prima della stessa pulizia completa. L’intestazione mostra un badge offline quando la connessione cade e l’azione 🔄 **Forza ricarica** aggiorna i file in cache senza toccare i progetti.

---

## 🗂️ Struttura dei file
```bash
index.html                 # Layout HTML principale
src/styles/style.css       # Stili e layout di base
src/styles/overview.css    # Stili della panoramica stampabile
src/styles/overview-print.css # Regole di stampa per la panoramica
src/scripts/script.js        # Logica dell’applicazione
src/scripts/storage.js       # Helper per LocalStorage
src/scripts/static-theme.js  # Logica di tema condivisa per le pagine legali
src/data/index.js       # Elenco dispositivi predefinito
src/data/devices/       # Cataloghi dei dispositivi per categoria
src/data/schema.json    # Schema generato per i selettori
src/vendor/             # Librerie di terze parti incluse
legal/                     # Pagine legali offline
tools/                     # Script di manutenzione dei dati
tests/                     # Suite di test Jest
```
I font sono inclusi localmente tramite `fonts.css`; una volta in cache, l’applicazione funziona interamente offline.

## 🛠️ Sviluppo
Richiede Node.js 18 o successivo.

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

Esegui `npm run help` per un riepilogo rapido dei comandi di manutenzione e dell’ordine consigliato.

## 🤝 Contribuire
Contributi di ogni tipo sono benvenuti! Apri una issue o invia una pull request. Per correzioni sui dati, allega backup di progetto o misure di autonomia per mantenere un catalogo accurato per tutti.
