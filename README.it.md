# Cine Power Planner

![Icona di Cine Power Planner](icon.svg)

Cine Power Planner è un’applicazione Web utilizzabile anche offline per pianificare rig di camera professionali alimentati da batterie V‑Mount, B‑Mount o Gold‑Mount. Calcola il consumo complessivo, verifica che ogni batteria possa erogare in sicurezza la corrente richiesta, stima autonomie realistiche a partire da dati di campo ponderati e mantiene insieme crew, scenari e liste attrezzatura così da non perdere informazioni tra i reparti.

---

## Punti di forza

### Configurazioni complesse senza tentativi alla cieca
- Combina camere, piastre batteria, collegamenti wireless, monitor, motori e accessori visualizzando potenza totale, corrente a 14,4 V/12 V (e 33,6 V/21,6 V per B‑Mount) e runtime previsto.
- Confronta le batterie compatibili affiancandole e ricevi avvisi quando l’assorbimento supera i limiti D‑Tap o pin.
- Visualizza il rig con un diagramma interattivo che supporta trascinamento, zoom, export SVG/JPG e avvisi di compatibilità.

### Tutti i reparti sulla stessa pagina
- Salva più progetti con requisiti, contatti della crew, scenari di ripresa e note personalizzate.
- Genera liste attrezzatura stampabili che raggruppano il kit per categoria, uniscono i duplicati, includono metadati tecnici e aggiungono accessori in base allo scenario.
- Condividi pacchetti JSON che includono selezioni, feedback sulle autonomie, liste attrezzatura e dispositivi personalizzati per un ripristino completo.

### Pronta a viaggiare e rispettosa della privacy
- Funziona interamente nel browser: apri `index.html` direttamente oppure ospita il repository in HTTPS per attivare il service worker.
- La cache offline conserva lingua, tema, preferiti e progetti ovunque senza inviare dati a server esterni.
- Svuota la cache locale o usa il ricaricamento forzato per aggiornare gli asset in cache senza toccare i progetti salvati.

### Su misura per il tuo team
- Passa all’istante tra English, Deutsch, Español, Italiano e Français; l’app ricorda l’ultima lingua utilizzata.
- Scegli temi scuro, rosa o ad alto contrasto, imposta un colore di accento, regola dimensione e famiglia del carattere in base al branding o alle esigenze di accessibilità.
- Menu a discesa con ricerca, preferiti fissati e aiuto al passaggio del mouse mantengono produttiva la crew sul set.

---

## Avvio rapido

1. Clona o scarica il repository.
2. Apri `index.html` in un browser moderno (Chromium, Firefox o Safari). Non serve alcuna build.
3. Facoltativo: servi la cartella via HTTPS per installare il service worker e ricevere aggiornamenti offline. Qualsiasi server statico va bene (`npx http-server -S` o simile).
4. L’app salva i dati nel browser. Usa **Impostazioni → Backup** per esportare snapshot JSON prima di cambiare macchina.

---

## Flusso di lavoro tipico

1. **Crea o carica un progetto.** Premi Invio o `Ctrl+S` (`⌘S` su macOS) per salvare rapidamente. Snapshot automatici ogni 10 minuti.
2. **Seleziona camera, alimentazione e accessori.** I menu si filtrano mentre digiti e i preferiti restano fissati.
3. **Controlla i risultati energetici.** Consulta watt, corrente, indicatori di sicurezza delle batterie e autonomie nel pannello di confronto.
4. **Raccogli i requisiti.** Registra ruoli della crew, giorni di ripresa, scenari e note così che ogni export riporti il contesto corretto.
5. **Genera gli output.** Produce liste attrezzatura, panoramiche stampabili e pacchetti progetto condivisi, quindi ripristinali più tardi con un solo upload.

---

## Elementi principali dell’interfaccia

- **Ricerca globale** (`/` o `Ctrl+K`/`⌘K`) per saltare a funzioni, selettori o argomenti di aiuto anche con il menu laterale chiuso.
- **Centro assistenza** (`?`, `H`, `F1` o `Ctrl+/`) con guide ricercabili, FAQ, scorciatoie e aiuto contestuale opzionale.
- **Diagramma del progetto** che visualizza le connessioni; tieni premuto Maiusc al download per esportare un JPG invece di un SVG.
- **Pannello di confronto batterie** che mostra le prestazioni di ogni pack compatibile e mette in evidenza i rischi di sovraccarico.
- **Generatore di liste attrezzatura** che trasforma le selezioni in tabelle per categoria con metadati, email della crew e aggiunte guidate dagli scenari.
- **Indicatore offline e ricarica forzata** per controllare la connettività e aggiornare gli asset in cache senza perdere progetti.

---

## Gestione dati ed export

- Progetti, impostazioni, liste attrezzatura, preferiti e dispositivi personalizzati risiedono in `localStorage`; backup e ripristini mantengono tutto intatto.
- La finestra Impostazioni offre promemoria orari per i backup, esportazioni manuali, ripristino con un clic e il pulsante **Cancella cache locale**.
- I file progetto condivisi riuniscono selezioni, requisiti, feedback sulle autonomie, liste attrezzatura e dispositivi personalizzati per passaggi di consegne tra team.
- Le anteprime stampabili includono nome progetto, dettagli di produzione, logo personalizzato opzionale e la lista attrezzatura generata.
- Snapshot automatici in background consentono di tornare facilmente a uno stato precedente.

---

## Intelligenza su batterie e runtime

- Calcola il consumo totale, il numero di batterie necessario per giornate da 10 ore e la corrente che ogni collegamento deve fornire.
- Avvisa oltre l’80 % di utilizzo e blocca carichi non sicuri quando l’assorbimento supera la potenza continua o D‑Tap della batteria.
- Le stime ponderate considerano temperatura, risoluzione, frame rate, codec, uso del Wi‑Fi, luminosità del monitor e quota di consumo di ogni dispositivo.
- Una dashboard delle autonomie ordina i feedback per peso, mostra le percentuali di contributo e evidenzia gli outlier.
- I feedback inviati dagli utenti raffinano le stime per i set reali.

---

## Personalizzazione e accessibilità

- Passa tra temi scuro, rosa o ad alto contrasto e regola la tipografia senza ricaricare la pagina.
- Carica un logo personalizzato per le stampe, imposta ruoli di monitoraggio predefiniti e configura requisiti di progetto standard.
- Navigazione da tastiera, stati di focus visibili e link di salto garantiscono accessibilità e usabilità con screen reader.
- Ricerca nei menu, preferiti fissati e pulsanti di duplicazione nelle liste accelerano l’inserimento ripetitivo dei dati.

---

## Scorciatoie da tastiera

| Azione | Scorciatoia |
| --- | --- |
| Mettere a fuoco la ricerca globale | `/`, `Ctrl+K`, `⌘K` |
| Aprire il dialogo di aiuto | `?`, `H`, `F1`, `Ctrl+/` |
| Salvare il progetto | `Invio`, `Ctrl+S`, `⌘S` |
| Attivare/disattivare il tema scuro | `D` |
| Attivare/disattivare il tema rosa | `P` |
| Ricarica forzata | Clic sull’icona 🔄 nell’intestazione |

---

## Sviluppo

- Installa le dipendenze con `npm install` (utili per linting, test e script dati; nessun build step necessario).
- Esegui `npm run lint` e `npm run test` prima del commit. Suite mirate disponibili tramite `npm run test:unit`, `npm run test:data`, `npm run test:dom` e `npm run test:script`.
- Script utili:
  - `npm run check-consistency` verifica l’allineamento dei dati.
  - `npm run normalize` e `npm run unify-ports` mantengono ordinato il catalogo.
  - `npm run generate-schema` aggiorna lo schema dei dispositivi.

---

## Traduzioni

La documentazione è disponibile in più lingue e l’app rileva automaticamente quella del browser al primo avvio. Puoi cambiare in qualsiasi momento dal menu lingua in alto a destra:

- 🇬🇧 [English](README.en.md)
- 🇩🇪 [Deutsch](README.de.md)
- 🇪🇸 [Español](README.es.md)
- 🇮🇹 [Italiano](README.it.md)
- 🇫🇷 [Français](README.fr.md)

Vuoi contribuire? Segui la [guida alle traduzioni](docs/translation-guide.md) per aggiungere nuove lingue all’interfaccia e alla documentazione.

---

## Contributi e supporto

Sono ben accette segnalazioni di bug, proposte di funzionalità e correzioni dei dati. Apri una issue o invia una pull request con quanti più dettagli possibile. Se trovi autonomie errate o attrezzatura mancante, allega il file progetto o dati di esempio per mantenere affidabile il catalogo.

---

## Licenza

Cine Power Planner è distribuito con licenza ISC.
