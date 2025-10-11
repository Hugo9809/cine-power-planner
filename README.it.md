# Cine Power Planner

![Icona di Cine Power Planner](src/icons/app-icon.svg)

Cine Power Planner è un’applicazione web autonoma pensata per creare, verificare e condividere piani di alimentazione professionali senza che i dati lascino mai il tuo dispositivo. Progetta rig V‑Mount, B‑Mount o Gold-Mount, stima le autonomie, raccogli i requisiti di progetto ed esporta pacchetti condivisibili – tutto nel browser, anche offline. Ogni dipendenza vive in questo repository, così l’esperienza resta identica in studio, sul portatile di campo o su un disco isolato.

## In breve

- **Pianifica offline-first.** Costruisci configurazioni V‑Mount, B‑Mount o Gold-Mount direttamente dal browser. Uicons, font e script di supporto sono inclusi localmente, senza affidarsi a CDN o alla rete. Clona il repository, scollega il cavo e l’interfaccia continua a funzionare allo stesso modo.
- **Dati sempre sul dispositivo.** Progetti, feedback sulle autonomie, preferiti, dispositivi personalizzati, liste e impostazioni restano locali. Backup e pacchetti condivisibili sono file JSON leggibili.
- **Metti alla prova le reti di sicurezza.** Salvataggi manuali, auto-save in background e backup automatici con timestamp si sommano per esercitarsi fin da subito nel ciclo Salva → Backup → Bundle → Ripristina.
- **Aggiornamenti sotto controllo.** Il service worker attende la tua conferma prima di aggiornarsi, mantenendo la troupe su una versione certificata anche in viaggio o con connettività limitata.

## Panoramica

### Progettato per le troupe

Il planner è stato ideato per 1st AC, data wrangler e direttori della fotografia. Quando aggiungi corpi camera, piastre, link wireless o accessori, consumo totale e stime di autonomia si aggiornano all’istante. Gli avvisi segnalano batterie sovraccariche e le liste restano legate al contesto di progetto per evitare perdite durante i passaggi di consegne.

### Nato per viaggiare

Apri `index.html` direttamente dal disco o ospita il repository sulla tua rete interna, senza build, server o account. Un service worker mantiene l’app disponibile offline, memorizza le preferenze e applica aggiornamenti solo con la tua approvazione. Salvataggi, condivisioni, import, backup e ripristini avvengono sempre in locale per proteggere i dati.

### Perché l’offline-first è fondamentale

Sul set la connettività non è garantita e molti studi richiedono strumenti isolati. Cine Power Planner offre le stesse funzionalità con o senza rete: tutte le risorse sono incluse, ogni flusso gira in locale e ogni salvataggio produce artefatti che puoi archiviare su supporti ridondanti. Verificare questi flussi prima delle riprese fa parte della checklist, così niente dipende da servizi esterni in piena produzione.

### Pilastri funzionali

- **Pianifica con sicurezza.** Calcola l’assorbimento a 14,4 V/12 V (e 33,6 V/21,6 V per B‑Mount), confronta batterie compatibili e visualizza l’impatto in un cruscotto ponderato.
- **Resta pronto per la produzione.** I progetti includono dispositivi, requisiti, scenari, dettagli della troupe e liste; auto-backup, bundle e aggiornamenti controllati mantengono i dati aggiornati senza perdere stabilità.
- **Lavora come preferisci.** Rilevamento lingua, temi scuro, rosa e alto contrasto, controlli tipografici, logo personalizzato e aiuto contestuale rendono l’interfaccia accogliente sia in preparazione sia sul set. L’aiuto contestuale ora compila automaticamente descrizioni per ogni pulsante, campo e menu così ogni controllo si spiega da solo anche offline.

## Principi chiave

- **Sempre offline.** L’intera applicazione – icone, pagine legali e strumenti – è inclusa nel repository. Apri `index.html` dal disco o da una intranet privata e il service worker sincronizza le risorse senza richiedere connessione.
- **Nessun percorso nascosto.** Salvataggi, bundle, import, backup e ripristini avvengono esclusivamente nel browser. Nulla lascia il dispositivo se non tramite un export volontario.
- **Reti ridondanti.** Salvataggi manuali, auto-save, backup periodici, backup forzati prima dei ripristini ed export leggibili lavorano insieme per evitare perdite silenziose.
- **Aggiornamenti prevedibili.** Si applicano solo quando li attivi. Le versioni in cache restano disponibili finché non confermi **Forza ricarica**.
- **Presentazione coerente.** Uicons locali, risorse OpenMoji e font inclusi garantiscono la stessa resa visiva in studio o su un portatile offline.
- **Proteggi ogni modifica.** Prima di qualsiasi ripristino, il planner crea un backup forzato e conserva le revisioni precedenti così nessun import sovrascrive il tuo lavoro. I registri di verifica e le note di checksum viaggiano con ogni archivio per dimostrarne l’integrità anche offline.

## Indice

- [In breve](#in-breve)
- [Panoramica](#panoramica)
- [Principi chiave](#principi-chiave)
- [Traduzioni](#traduzioni)
- [Novità](#novità)
- [Avvio rapido](#avvio-rapido)
- [Requisiti di sistema e browser](#requisiti-di-sistema-e-browser)
- [Drill di salvataggio, condivisione e import](#drill-di-salvataggio-condivisione-e-import)
- [Flusso quotidiano](#flusso-quotidiano)
- [Gestione di salvataggi e progetti](#gestione-di-salvataggi-e-progetti)
- [Condivisione e import](#condivisione-e-import)
- [Formati di file](#formati-di-file)
- [Tour dell’interfaccia](#tour-dellinterfaccia)
- [Personalizzazione e accessibilità](#personalizzazione-e-accessibilità)
- [Sicurezza dei dati e uso offline](#sicurezza-dei-dati-e-uso-offline)
- [Panoramica dati e archiviazione](#panoramica-dati-e-archiviazione)
- [Gestione quote e manutenzione](#gestione-quote-e-manutenzione)
- [Backup e ripristino](#backup-e-ripristino)
- [Drill di integrità](#drill-di-integrità)
- [Checklist operative](#checklist-operative)
- [Piano di emergenza](#piano-di-emergenza)
- [Liste attrezzatura e report](#liste-attrezzatura-e-report)
- [Regole automatiche](#regole-automatiche)
- [Intelligenza sulle autonomie](#intelligenza-sulle-autonomie)
- [Scorciatoie da tastiera](#scorciatoie-da-tastiera)
- [Localizzazione](#localizzazione)
- [Installazione come app](#installazione-come-app)
- [Workflow dati dispositivi](#workflow-dati-dispositivi)
- [Sviluppo](#sviluppo)
- [Risoluzione dei problemi](#risoluzione-dei-problemi)
- [Feedback e supporto](#feedback-e-supporto)
- [Contribuire](#contribuire)
- [Ringraziamenti](#ringraziamenti)
- [Licenza](#licenza)

## Traduzioni

La documentazione è disponibile in più lingue. L’app rileva automaticamente la lingua del browser al primo avvio e puoi cambiarla in qualsiasi momento dal menu in alto a destra o da **Impostazioni**.

- 🇬🇧 [English](README.en.md)
- 🇩🇪 [Deutsch](README.de.md)
- 🇪🇸 [Español](README.es.md)
- 🇮🇹 [Italiano](README.it.md)
- 🇫🇷 [Français](README.fr.md)

Consulta `docs/translation-guide.md` per i dettagli sulla localizzazione.

## Novità

- **Confronto backup** – Seleziona salvataggi manuali o auto-backup, analizza i diff, aggiungi note e esporta un log prima di ripristinare o consegnare il materiale.
- **Prove di ripristino** – Carica un backup completo o un bundle in una sandbox isolata per verificarne il contenuto senza toccare i profili di produzione.
- **Registro diagnostico** – Apri **Impostazioni → Dati e archiviazione** per vedere il log in tempo reale, filtrare per livello o namespace e regolare conservazione, mirroring sulla console, la cattura della console attiva per impostazione predefinita e la cattura degli errori senza uscire dal planner.
- **Registro storico dei backup** – Ogni download del backup completo salva localmente timestamp e nome file. Controllalo in **Impostazioni → Dati e archiviazione** o esporta il registro insieme agli archivi per dimostrare la conservazione offline.
- **Regole automatiche per l’attrezzatura** – Definisci aggiunte o rimozioni attivate dagli scenari con controlli di import/export e backup programmati.
- **Dashboard di copertura regole** – Riassume la copertura per scenario, i trigger duplicati, le variazioni nette, gli scenari sovrapposti, i conflitti e i requisiti non coperti nelle Regole automatiche, applica filtri di focus offline e condivide le stesse informazioni in export e stampe.
- **Dashboard dati e archiviazione** – Audita progetti, liste, dispositivi personalizzati, preferiti e feedback sulle autonomie direttamente da Impostazioni e stima la dimensione del backup.
- **Ispettore di salvaguardia runtime** – Il bundle runtime registra il risultato su `window.__cineRuntimeIntegrity` ed espone `window.cineRuntime.verifyCriticalFlows()` così la troupe può confermare i percorsi di salvataggio/condivisione/ripristino e la persistenza del feedback prima di partire.
- **Overlay stato auto-save** – Replica l’ultima nota di auto-save nel dialogo Impostazioni così la troupe vede l’attività in background durante gli esercizi.
- **Editor sensibile al monitoring** – Mostra campi aggiuntivi per monitor e distribuzione video solo quando richiesti dagli scenari.
- **Controlli di accento e tipografia** – Regola colore di accento, dimensione e famiglia di font; i temi scuro, rosa e alto contrasto restano attivi tra le sessioni.
- **Scorciatoie di ricerca globale** – Premi `/` o `Ctrl+K` (`⌘K` su macOS) per focalizzare subito la ricerca anche con navigazione mobile chiusa.
- **Pulsante Forza ricarica** – Aggiorna le risorse del service worker senza eliminare progetti o dispositivi.
- **Preferiti fissati** – Aggiungi una stella alle voci per mantenere camere, batterie e accessori principali in cima e inclusi nei backup.
- **Ripristino alle impostazioni di fabbrica con salvaguardia** – Scarica automaticamente un backup prima di cancellare progetti, dispositivi e preferenze.

Consulta i README localizzati per ulteriori dettagli.

## Avvio rapido

Segui questa checklist all’installazione o dopo un aggiornamento: dimostra che salvataggio, condivisione, import, backup e ripristino funzionano identici online e offline.

1. Clona o scarica il repository.
2. Apri `index.html` in un browser moderno.
3. (Opzionale) Servi la cartella via HTTP(S) per installare il service worker:
   ```bash
   npx http-server
   # oppure
   python -m http.server
   ```
   L’app viene messa in cache per l’uso offline e applica gli update solo con il tuo consenso.
4. Carica il planner, chiudi la scheda, disconnettiti (o attiva la modalità aereo) e riapri `index.html`. L’indicatore offline dovrebbe lampeggiare brevemente mentre carica le risorse memorizzate, inclusi gli Uicons locali.
5. Apri **Aiuto → Checklist di avvio rapido** e avvia il tutorial guidato. Copre creazione dei progetti, configurazione dei dispositivi, controllo del Riepilogo alimentazione con il suo checkpoint Riepilogo rapido e la nuova prova della rete di sicurezza offline che evidenzia indicatore e stato di salvataggio automatico nella barra superiore, gear list, contatti, attrezzatura personale, regole automatiche oltre a export, import e backup. Il navigatore dei passaggi e l’indicatore di avanzamento permettono di rivedere i flussi completati senza ricominciare; se interrompi il percorso, apparirà automaticamente **Riprendi il tutorial guidato** con i conteggi salvati così il progresso offline resta protetto. La riga della checklist mostra anche uno stato offline con i passaggi completati, il prossimo flusso e un indicatore temporale che segnala quando è stato chiuso l’ultimo passaggio prima di riaprire il tour.
6. Crea un progetto, premi **Invio** (o **Ctrl+S**/`⌘S`) per un salvataggio manuale e controlla che nel selettore compaia il backup automatico con timestamp dopo circa 50 modifiche registrate o entro dieci minuti.
7. Esporta **Impostazioni → Backup e ripristino → Backup** e importa il file `planner-backup.json` in un profilo privato. Così verifichi che nessuna copia resti isolata e che il backup forzato prima del ripristino funzioni.
8. Esercitati a esportare un bundle (`project-name.json`) e importarlo su un altro dispositivo o profilo per collaudare il flusso Salva → Condividi → Importa e assicurarti che risorse locali seguano il progetto.
9. Archivia backup e bundle verificati insieme alla copia del repository utilizzato. Annota data, macchina e operatore per documentare quando l’esercizio è stato convalidato e mantenere i flussi sincronizzati fin dalla prima sessione.
10. Apri la console del browser e acquisisci `window.__cineRuntimeIntegrity` (oppure riesegui `window.cineRuntime.verifyCriticalFlows()` e salva il report). In questo modo dimostri che la sentinella runtime ha validato i percorsi di salvataggio/condivisione/ripristino e la persistenza del feedback durante la prova offline.

## Requisiti di sistema e browser

- **Browser moderni.** Validato sulle ultime versioni di Chromium, Firefox e Safari. Attiva service worker, accesso a `localStorage` (archiviazione del sito) e archiviazione persistente.
- **Dispositivi orientati all’offline.** Laptop e tablet devono consentire storage persistente. Avvia l’app una volta online per mettere in cache tutte le risorse e ripeti la procedura di ricarica offline prima di partire.
- **Spazio locale adeguato.** Produzioni grandi accumulano progetti, backup e liste. Monitora lo spazio del profilo e esporta regolarmente su supporti ridondanti.
- **Zero dipendenze esterne.** Tutte le icone, i font e gli script sono inclusi. Copia anche `animated icons 3/` e gli Uicons locali quando trasferisci la cartella.

## Drill di salvataggio, condivisione e import

Ripeti questa routine quando arriva un nuovo membro, allestisci una postazione o pubblichi un aggiornamento importante per confermare che salvataggio, condivisione, import, backup e ripristino funzionano senza rete.

1. **Salvataggio base.** Apri il progetto attuale, esegui un salvataggio manuale e annota l’orario. Un auto-backup dovrebbe comparire entro dieci minuti.
2. **Export ridondanti.** Crea un backup completo e un bundle di progetto. Rinominalo in `.cpproject` se richiesto e salva entrambi su supporti diversi.
3. **Prova di ripristino.** Passa a un profilo privato (o seconda macchina), importa il backup completo e poi il bundle. Controlla liste, dashboard, regole e preferiti.
4. **Verifica offline.** Nel profilo di test, disconnetti la rete e ricarica `index.html`. Assicurati che l’indicatore offline appaia e che Uicons e script locali si carichino correttamente.
5. **Registra un diff.** Torna nel profilo principale, apri **Impostazioni → Backup e ripristino → Confronta versioni**, seleziona l’ultimo salvataggio manuale e l’auto-backup più recente, rivedi le differenze evidenziate, annota il contesto in **Note sull’incidente** ed esporta il JSON. Archivia il file con gli artefatti della prova così gli audit offline possono ricostruire la cronologia.
6. **Archiviazione sicura.** Elimina il profilo di test dopo la verifica e etichetta gli export secondo la procedura di produzione.
7. **Registra la sentinella runtime.** Nello stesso profilo apri la console, verifica che `window.__cineRuntimeIntegrity.ok` sia `true` e, se serve un report aggiornato, esegui `window.cineRuntime.verifyCriticalFlows({ warnOnFailure: true })`, archiviando l’output con le note dell’esercizio per confermare che resta protetta anche la persistenza del feedback.

## Flusso quotidiano

1. **Crea o carica un progetto.** Inserisci un nome e premi **Invio**/**Salva**. Il nome attivo compare in liste e export.
2. **Aggiungi camere, alimentazione e accessori.** Scegli dispositivi da menu categorizzati. Ricerca digitando, preferiti e scorciatoia `/` (`Ctrl+K`/`⌘K`) velocizzano la selezione.
3. **Controlla potenza e autonomia.** Monitora gli avvisi, confronta le batterie e consulta il cruscotto per capire l’impatto di temperatura, codec, fps, ecc.
4. **Documenta i requisiti.** Inserisci dati della troupe, scenari, maniglie, matte box e setup di monitoraggio. Il tuo profilo utente salvato compare automaticamente nell’elenco troupe: modifica ruolo o contatti per ogni progetto. I pulsanti duplica replicano le voci. **Impostazioni → Regole automatiche** aggiunge o rimuove elementi specifici prima dell’export.
5. **Esporta o archivia il piano.** Genera la lista attrezzatura, scarica un backup o un bundle prima di andare sul set. I backup includono dispositivi personalizzati, feedback e preferiti.
6. **Conferma la preparazione offline.** Disconnetti, ricarica l’app e verifica che tutto resti accessibile. Ripristina dall’ultimo backup se qualcosa non torna.

## Gestione di salvataggi e progetti

- **Salvataggi manuali per versioni esplicite.** Inserisci il nome e premi **Invio**/**Salva**. Ogni salvataggio conserva dispositivi, requisiti, liste, preferiti, diagrammi e osservazioni.
- **Auto-save per il lavoro in corso.** Con un progetto aperto, l’app scrive i cambiamenti in background. Le voci `auto-backup-…` compaiono ogni dieci minuti o dopo circa 50 modifiche tracciate. Quando cambi progetto, importi, esporti o prepari un ricaricamento, l’app registra subito un nuovo snapshot anche se l’intervallo non è ancora trascorso.
- **Salvaguardie rapide catturano backup completi all’istante.** Apri **Impostazioni → Dati e archiviazione → Quick safeguards** per scaricare subito un backup completo o aprire gli strumenti di ripristino senza lasciare la scheda; ogni esecuzione viene registrata nel pannello così da archiviare immediatamente il JSON.【F:index.html†L2548-L2570】
- **Mostra gli auto-backup su richiesta.** Attiva **Impostazioni → Backup e ripristino → Mostra auto-backup** per vedere gli orari.
- **Rinominare crea una copia.** Modifica il nome e premi **Invio** per duplicare il progetto, utile per confrontare varianti.
- **Cambiare progetto è sicuro.** Seleziona un’altra voce: posizione di scroll e campi non salvati si aggiornano senza perdere dati.
- **I contatti della troupe restano riutilizzabili.** Apri la voce **Contatti** nella barra laterale per mantenere un elenco con
    ruoli, email, numeri di telefono, siti web e foto profilo da inserire in qualsiasi progetto. I contatti vivono nello stesso snapshot di
    localStorage dei progetti, rientrano nei backup manuali e possono essere importati offline da file `.vcf` (vCard) per unire
    rubriche. Salvare una riga della troupe nell’elenco evita di riscrivere i dettagli nei progetti futuri.【F:index.html†L206-L209】【F:index.html†L7345-L7374】【F:src/scripts/app-core-new-1.js†L13632-L17848】
- **L’attrezzatura personale resta sincronizzata.** Apri **Attrezzatura personale** nella barra laterale per catalogare nomi,
    quantità, note e provenienza del tuo kit. Le voci vivono nello stesso snapshot offline dei progetti, alimentano le condizioni delle
    regole automatiche e viaggiano con i backup manuali, i bundle condivisi e le salvaguardie contro la quota così l’hardware personale
    non si perde mai nel planner.【F:index.html†L214-L219】【F:index.html†L6596-L6656】【F:src/scripts/modules/features/own-gear.js†L43-L172】【F:docs/save-share-restore-reference.md†L15-L17】
- **Eliminazione con conferma.** L’icona cestino chiede sempre conferma prima di rimuovere elementi.

## Condivisione e import

- **Bundle leggeri.** **Esporta progetto** scarica `project-name.json` con progetto attivo, preferiti e dispositivi personalizzati. Puoi rinominarlo `.cpproject`.
- **Regole automatiche insieme al bundle.** Attiva **Includi regole automatiche** per inserirle; all’import il destinatario può applicarle solo al progetto o fonderle con le proprie.
- **Gli import non sovrascrivono mai per errore.** Se un bundle in arrivo usa lo stesso nome di un progetto esistente, il planner salva la nuova copia come `nome-progetto-imported` così puoi confrontarle entrambe.
- **Import offline validati.** Importando `auto-gear-rules-*.json`, il planner controlla tipo, versione semantica e metadati prima di modificare le tue regole. Se qualcosa non torna, avvisa e ripristina lo snapshot precedente.
- **Ripristini a doppio buffer.** Prima dell’import viene richiesto un backup del contesto corrente. Dopo la validazione il progetto ripristinato appare in cima al selettore.
- **Flussi cross-device senza rete.** Copia `index.html`, `script.js`, `devices/` e i tuoi file di backup/bundle su un supporto removibile, avvia dal disco e continua senza internet.
- **Esporta con attenzione.** Controlla il JSON prima di condividerlo per verificare che contenga solo ciò che serve. Il formato è leggibile per eventuali modifiche.
- **Il download manuale tutela gli export.** Se il browser o un blocco impedisce lo scaricamento, il planner apre una scheda «Manual download» con il JSON. Premi `Ctrl+A`/`Ctrl+C` (`⌘A`/`⌘C` su macOS), incolla il testo in un file `.json` e archivialo con i backup prima di chiudere la scheda.
- **Sincronizza con le checklist.** Quando ricevi un bundle aggiornato, importalo, verifica i timestamp `Aggiornato` e archivia il JSON precedente per mantenere la storia.
- **Condividi senza perdere contesto.** I bundle ricordano lingua, tema, logo e preferenze, offrendo al destinatario un ambiente familiare anche offline.

## Formati di file

- **`project-name.json` (bundle).** Include un progetto, preferiti e dispositivi personalizzati. L’estensione `.cpproject` è equivalente.
- **`planner-backup.json` (backup completo).** Da **Impostazioni → Backup e ripristino → Backup** ottieni tutti i progetti,
  auto-backup, preferiti, feedback, regole, contatti, preferenze, font e branding.
- **`auto-gear-rules-*.json` (regole).** Export opzionali da **Regole automatiche** con metadati per la validazione offline; conservali insieme ai backup completi.

## Tour dell’interfaccia

### Riferimenti rapidi

- **Ricerca globale** (`/`, `Ctrl+K`, `⌘K`) per saltare a funzioni, menu o argomenti di aiuto anche con navigazione nascosta. I
  suggerimenti mostrano prima le corrispondenze dirette di funzionalità e dispositivi rispetto ai temi di aiuto, così i flussi da
  tastiera raggiungono subito i controlli principali. Le frasi esatte ora emergono per prime, quindi digitare il nome completo di
  un controllo come «battery health» porta quella funzione davanti alle corrispondenze più generiche. Quando svuoti il campo, le
  corrispondenze usate più di recente salgono in cima così ripeti i passaggi della troupe in un attimo. Inizia una ricerca con
  `recent` o `history` per concentrarti prima sui collegamenti usati di recente prima di scorrere l’intero catalogo.
- **Centro assistenza** (`?`, `H`, `F1`, `Ctrl+/`) con guide, scorciatoie, FAQ e modalità aiuto al passaggio. La checklist «Inizia
  qui» ora spiega come preparare l’indicatore offline, salvare esportazioni ridondanti e provare un’esercitazione di ripristino
  così la troupe verifica i backup prima della produzione. Un riquadro di
  verifica console elenca `window.__cineRuntimeIntegrity`,
  `window.cineRuntime.verifyCriticalFlows()` e gli helper
  `cinePersistence` per registrare le prove offline senza lasciare il
  dialogo.
- **Diagramma di progetto** per visualizzare alimentazione e segnali; tieni premuto Shift durante l’export per salvare un JPG.
- **Confronto batterie** che mostra le prestazioni dei pack compatibili e avvisa in caso di sovraccarichi.
- **Generatore di liste** che produce tabelle categorizzate con metadati, email e accessori basati sugli scenari.
- **Confronto versioni** (**Impostazioni → Backup e ripristino → Confronta versioni**) evidenzia le differenze tra salvataggi manuali o auto-backup, permette di annotare l’incidente ed esporta i log prima dell’archiviazione.
- **Prova di ripristino** carica i backup in un ambiente isolato così da verificare ogni record offline prima di ripristinare i dati di produzione.
- **Indicatore offline e Forza ricarica** per mostrare lo stato e aggiornare le risorse senza toccare i dati.

### Barra superiore

- Link di salto, indicatore offline e branding responsive garantiscono accessibilità.
- La ricerca si focalizza con `/` o `Ctrl+K` (`⌘K`), apre il menu laterale su mobile e si azzera con Esc.
- Switch lingua, temi scuro/rosa e dialogo Impostazioni consentono di regolare colore di accento, dimensione e font, modalità alto contrasto, logo personalizzato e accedere a backup, ripristino e reset (sempre preceduti da backup automatico).
- Il pulsante Aiuto apre un dialogo ricercabile e risponde a `?`, `H`, `F1` o `Ctrl+/` in qualsiasi momento.
- Il pulsante 🔄 cancella le risorse in cache e ricarica l’app senza eliminare progetti o dati runtime. Ora il browser precarica il nuovo pacchetto mentre la pulizia è in corso così la nuova versione arriva più rapidamente senza mettere a rischio i dati.

### Navigazione e ricerca

- Su schermi piccoli un menu laterale collassabile replica le sezioni principali.
- Liste e editor supportano la ricerca inline e il filtraggio digitando. `/` o `Ctrl+F` (`⌘F`) mettono a fuoco il campo più vicino.
- I suggerimenti di ricerca evidenziano le parole chiave corrispondenti così puoi confermare il risultato prima di procedere o avviare un'azione.
- Le icone a stella fissano i dispositivi preferiti in cima e li mantengono nei backup.

## Personalizzazione e accessibilità

- Passa tra temi chiaro, scuro, rosa e alto contrasto; colore di accento, dimensione di base e font persistono offline.
- Link di salto, focus visibile e layout responsive rendono la navigazione fluida con tastiera, tablet e smartphone.
- Scorciatoie disponibili: ricerca (`/`, `Ctrl+K`, `⌘K`), aiuto (`?`, `H`, `F1`, `Ctrl+/`), salvataggio (`Invio`, `Ctrl+S`, `⌘S`), dark mode (`D`) e tema rosa (`P`).
- La modalità aiuto al passaggio trasforma pulsanti, campi, menu e intestazioni in tooltip on demand.
- Carica un logo personalizzato per le overview stampabili, imposta default di monitoraggio e preset di requisiti.
- I pulsanti duplica replicano i campi, mentre i preferiti tengono a portata i dispositivi ricorrenti.

## Sicurezza dei dati e uso offline

- Un service worker mette in cache ogni risorsa per l’uso offline e applica gli aggiornamenti solo dopo **Forza ricarica**.
- Progetti, feedback runtime, preferiti, dispositivi personalizzati, temi e liste vivono nello storage del browser. Quando possibile viene richiesta la persistenza per ridurre i rischi di cancellazione.
- Le copie automatiche concatenano snapshot di progetto ogni dieci minuti o dopo circa 50 modifiche tracciate. Quando cambi progetto, importi, esporti o prepari un ricaricamento, l’app acquisisce subito una nuova istantanea anche se quell’intervallo non è ancora trascorso; i backup completi orari e gli archivi delle regole automatiche completano la protezione. Attiva **Impostazioni → Backup e ripristino → Mostra auto-backup nell’elenco** per vedere la timeline, regolare la conservazione e ripristinare le istantanee senza connessione.
- Se il browser blocca i download, l’app apre una scheda **Download manuale** con il JSON da copiare in un file `.json` e salvare su supporti offline affidabili prima di chiuderla.
- Usa **Impostazioni → Backup e ripristino → Confronta versioni** per confrontare due salvataggi, annotare il contesto nelle **Note sull’incidente** ed esportare un registro per il passaggio di consegne.
- Avvia **Prova di ripristino** da **Impostazioni → Backup e ripristino** per caricare un backup in un’area temporanea, rivedere la tabella di confronto e confermare che sia integro prima di applicare **Ripristina** ai dati attivi.
- Aprire il repository dal disco o da una rete interna mantiene i dati sensibili lontani da servizi esterni. Gli export JSON sono leggibili e auditabili.
- L’header mostra l’indicatore offline quando manca connessione; **Forza ricarica** aggiorna gli asset senza toccare i salvataggi.
- **Ripristino impostazioni di fabbrica** o pulizia dei dati del sito avviene solo dopo aver generato automaticamente un backup.
- Gli aggiornamenti del service worker vengono scaricati in background e attendono la tua approvazione. Quando compare **Aggiornamento pronto**, completa le modifiche, crea un backup e poi premi **Forza ricarica**.
- I dati risiedono in un `localStorage` rinforzato; i profili bloccati ricadono su `sessionStorage`. Ogni scrittura crea anche uno snapshot `__legacyMigrationBackup` per recuperare senza perdite eventuali errori di quota o di schema. Usa gli strumenti del browser per ispezionare o esportare i record prima di svuotare cache o fare prove.
- Un guardiano dell'archiviazione critica parte ad ogni avvio e duplica ogni chiave essenziale nello slot di backup prima di qualsiasi modifica, così anche i dati legacy mantengono sempre una copia ridondante pronta al ripristino.

## Panoramica dati e archiviazione

- Apri **Impostazioni → Dati e archiviazione** per vedere progetti salvati, auto-backup, liste, dispositivi personalizzati, preferiti, feedback e cache di sessione con conteggi in tempo reale.
- Ogni sezione descrive il proprio contenuto; quelle vuote restano nascoste per riconoscere subito lo stato del planner.
- Il riepilogo stima la dimensione del backup basandosi sull’export più recente.
- Il **registro diagnostico** replica tutte le voci di cineLogging, permette filtri per gravità o namespace e offre controlli su conservazione, mirroring sulla console, la cattura della console attiva per impostazione predefinita e la cattura degli errori, tutto offline dentro Impostazioni. Un avviso segnala quando i filtri nascondono tutte le voci così da evitare falsi allarmi durante le verifiche. Ogni voce registra ora un timestamp ISO, la marca in millisecondi, un ID evento e il canale così puoi collegare i fallback della console ai diagnostici salvati anche quando il logger strutturato non è disponibile. Gli avvisi e gli errori delle stampe o esportazioni della panoramica vengono ora registrati qui, con l’indicazione dell’eventuale apertura della finestra di fallback, così le prove di condivisione restano completamente tracciate.
- I backup completi mostrano il totale corrente e alimentano il registro storico, così puoi verificare che le copie orarie siano state registrate prima di archiviare offline.

## Gestione quote e manutenzione

- **Conferma l’accesso allo storage persistente.** Controlla il pannello su ogni workstation. Se il browser rifiuta, richiedi nuovamente o pianifica export manuali più frequenti.
- **Monitora lo spazio disponibile.** Usa il dashboard o l’inspector del browser. Se la soglia si riduce, archivia i backup vecchi, rimuovi voci `auto-backup-…` ridondanti e verifica che i nuovi export vadano a buon fine.
- **Prepara le cache dopo gli aggiornamenti.** Dopo **Forza ricarica**, apri il centro assistenza, le pagine legali e le viste principali per ricaricare Uicons, OpenMoji e font.
- **Documenta lo stato dello storage.** Aggiungi queste verifiche ai log di preparazione e chiusura: stato della persistenza, spazio residuo e posizione degli ultimi backup.

## Backup e ripristino

- **Snapshot salvati** – Il selettore conserva ogni salvataggio manuale e crea `auto-backup-…` ogni dieci minuti o dopo circa 50 modifiche tracciate. I cambi di progetto, le importazioni, le esportazioni e i ricaricamenti generano uno snapshot immediato anche se quell’intervallo non è ancora superato.
- **Backup completi** – **Impostazioni → Backup e ripristino → Backup** scarica `planner-backup.json` con progetti, dispositivi, feedback, preferiti, regole automatiche e stato UI. I ripristini creano un backup di sicurezza e avvisano se il file proviene da un’altra versione.
- **Blocco Quick safeguards** – In **Impostazioni → Dati e archiviazione** trovi un blocco dedicato **Quick safeguards** per avviare backup completi con un clic o aprire rapidamente gli strumenti di ripristino, così produci copie ridondanti senza cambiare scheda.【F:index.html†L2548-L2570】
- **Registro storico** – Ogni backup completo aggiunge una voce consultabile in **Impostazioni → Dati e archiviazione** o esportabile insieme al file. Mantiene timestamp e nomi allineati alla documentazione anche offline.
- **Backup di migrazione nascosti** – Prima di sovrascrivere planner, setup o preferenze, l’app salva il precedente JSON in `__legacyMigrationBackup`. In caso di errore, gli strumenti di recupero tornano automaticamente a quella copia. La compressione ora seleziona automaticamente la codifica sicura più compatta così i backup restano entro la quota del browser. Le scansioni di recupero della quota ora comprimono prima le voci archiviate più pesanti così da liberare spazio più velocemente senza toccare i backup attivi.【F:src/scripts/storage.js†L1541-L1652】
- **Snapshot automatici delle regole** – Le modifiche in **Regole automatiche** generano copie con timestamp ogni dieci minuti.
  Il controllo di conservazione ora parte da 36 copie per offrire più margine prima
  di eliminare quelle vecchie.
- **Ripristino impostazioni di fabbrica** – Cancella i dati solo dopo aver scaricato un backup.
- **Promemoria orari** – Una routine in background suggerisce un backup aggiuntivo ogni ora per avere sempre una copia recente.
- **Sentinella di integrità runtime** – Prima di partire, apri la console e assicurati che `window.__cineRuntimeIntegrity.ok` sia `true` (o esegui `window.cineRuntime.verifyCriticalFlows({ warnOnFailure: true })`). Il report dimostra che i percorsi di salvataggio/condivisione/ripristino e la persistenza del feedback restano protetti offline.
- **Loop di verifica** – Dopo ogni backup critico, importalo in un profilo separato per confermare il risultato prima di eliminare l’istanza di test.
- **Abitudini di archiviazione sicura** – Etichetta backup con nome progetto e orario, poi conserva su supporti ridondanti (RAID, USB cifrato, disco ottico).
- **Confronta prima di sovrascrivere** – Scarica un backup dello stato corrente prima di ripristinare e confronta le differenze con un diff JSON per eventuali fusioni manuali.

## Drill di integrità

- **Validazione pre-flight (quotidiana o prima di modifiche importanti).** Salva manualmente, esporta backup completo e bundle, importali in un profilo privato, verifica progetti, regole, preferiti e dashboard, poi elimina il profilo.
- **Esercizio offline (settimanale o prima di viaggi).** Avvia il planner, genera un backup, disconnettiti e ricarica `index.html`. Controlla indicatore offline, nitidezza degli Uicons e apertura del progetto verificato.
- **Controllo cambi (dopo modifiche a dati o script).** Esegui `npm test`, ripeti la validazione pre-flight e archivia il backup approvato con una nota di modifica.
- **Audit mensile dal centro assistenza (checklist integrata).** Apri **Guida → Controllo mensile dell'integrità dei dati**, segui i passaggi guidati per acquisire una nuova copia completa da **Impostazioni → Dati e archiviazione → Azioni rapide di sicurezza → Scarica backup completo**, esporta ogni progetto attivo, ricarica offline per confermare l’interfaccia in cache, chiudi con **Prova di ripristino**, poi esegui `window.cineRuntime.verifyCriticalFlows({ warnOnFailure: true })` e annota l’output della console insieme all’esito nel registro di rotazione.
- **Rotazione della ridondanza (mensile o prima dell’archiviazione).** Conserva l’ultimo backup, un bundle verificato (rinominato `.cpproject` se serve) e uno ZIP del repository su almeno due supporti e alterna quale controllare per individuare degrado.

## Checklist operative

Queste routine mantengono progetti, backup e risorse offline sincronizzati su ogni macchina che usa Cine Power Planner. Una versione stampabile è in `docs/operations-checklist.md` e la guida `docs/offline-readiness.md` approfondisce i passaggi per periodi prolungati senza connessione.

### Preparazione pre-shoot

1. **Verifica la revisione corretta.** Apri `index.html`, premi **Forza ricarica** e controlla la versione in **Impostazioni → Informazioni**. Apri le pagine legali per precaricare Uicons, OpenMoji e font.
2. **Carica i progetti critici.** Apri il piano attivo e un `auto-backup-…` recente. Controlla liste, feedback e preferiti in entrambi.
3. **Testa la catena di salvataggio.** Apporta una modifica, salva con `Invio` o `Ctrl+S`/`⌘S`, esporta `planner-backup.json`, importalo in un profilo privato e confronta il selettore.
4. **Verifica la condivisione.** Esporta `project-name.json`, importalo, controlla regole automatiche, dispositivi e indicatore offline. Elimina poi il profilo.
5. **Simula l’assenza di rete.** Disconnetti il dispositivo o attiva la modalità aereo, ricarica il planner e verifica indicatore, icone e accesso ai progetti.
6. **Archivia gli artefatti.** Conserva backup, bundle e un ZIP del repository su supporti ridondanti per ricostruire l’ambiente senza internet.

### Handoff di fine giornata

1. **Cattura un backup finale.** Con il progetto aperto, esporta `planner-backup.json` e l’ultimo `project-name.json` (rinominalo `.cpproject` se serve) e etichettali con data, luogo e giornata.
2. **Valida gli import.** Ripristina entrambi i file su una macchina di verifica offline per assicurarti che non ci siano corruzioni.
3. **Registra le modifiche.** Annota quali auto-backup sono stati promossi, quali dispositivi personalizzati aggiunti e quali regole cambiate. Archivia le note con i backup.
4. **Aggiorna le cache intenzionalmente.** Dopo l’archiviazione, premi **Forza ricarica**, apri centro assistenza e pagine legali per ricaricare le risorse prima della prossima sessione offline.
5. **Consegnare i supporti ridondanti.** Fornisci copie cifrate al team archiviazione e conserva un secondo set secondo la policy.

## Piano di emergenza

1. **Metti in pausa e preserva lo stato.** Lascia la scheda aperta, disconnetti la rete se possibile e annota ora e stato dell’indicatore offline. Evita di ricaricare.
2. **Esporta ciò che resta.** Avvia **Impostazioni → Backup e ripristino → Backup** e scarica `planner-backup.json`. Anche se l’elenco sembra errato, cattura auto-backup, preferiti, feedback e regole per l’analisi.
3. **Duplica gli auto-backup.** Mostra le voci `auto-backup-…`, promuovi gli snapshot più recenti a salvataggi manuali e rinominali con ID o timestamp.
4. **Controlla il bundle verificato.** Importa l’ultimo `project-name.json`/`.cpproject` noto in un profilo privato o su una seconda macchina offline per confrontare progetti, liste e impostazioni.
5. **Ripristina con attenzione.** Dopo la verifica, ripristina il backup recente sulla macchina principale. Il flusso salva prima una copia di sicurezza così puoi confrontarla tramite diff JSON se serve.
6. **Ricarica e documenta.** Al termine, premi **Forza ricarica**, apri centro assistenza e pagine legali per rigenerare le cache, poi documenta l’incidente (cosa è successo, file esportati, dove sono conservati e quale macchina ha verificato). Archivia il report con il backup.

## Liste attrezzatura e report

- **Genera lista attrezzatura e requisiti** trasforma selezioni e requisiti in tabelle categorizzate che si aggiornano automaticamente.
- Le voci sono raggruppate per categoria e i duplicati fusi. Gli scenari aggiungono rigging, protezioni meteo e accessori specialistici per rispecchiare il lavoro reale.
- Le regole automatiche si eseguono dopo il generatore per aggiungere o rimuovere elementi specifici senza toccare il JSON.
- Le annotazioni di copertura del pannello regole compaiono nelle stampe, negli export e nei bundle condivisi così le revisioni offline vedono lo stesso riepilogo.
- Le righe obiettivi includono diametro frontale, peso, minima di fuoco, necessità di aste e componenti della matte box. La panoramica stampabile replica queste scelte con marca, attacco, diametro, fuoco, peso, supporto aste e note così i dossier restano completi anche offline. Le righe batterie considerano quantità e hardware per l’hot swap.
- Dettagli troupe, configurazioni di monitoraggio, distribuzione video e note personalizzate appaiono negli export.
- Le liste vengono salvate con il progetto, compaiono nelle overview stampabili e nei bundle; puoi azzerarle con **Elimina lista attrezzatura**.

## Regole automatiche

Da **Impostazioni → Regole automatiche** puoi affinare ogni lista senza modificare JSON a mano:

- Attiva regole solo quando determinati **Scenari obbligatori** sono selezionati; aggiungi etichette opzionali per riconoscerle a colpo d’occhio.
- Aggiungi attrezzatura con categoria e quantità oppure usa **Aggiunte personalizzate** per promemoria, kit speciali o note. Le regole di rimozione nascondono righe che il generatore includerebbe.
- Le regole girano dopo i pacchetti predefiniti così si integrano con la logica di base e confluiscono in liste, backup e bundle.
- Un pannello dedicato mette in evidenza trigger duplicati, variazioni nette, conflitti e scenari scoperti. Le card di focus filtrano l’elenco, aprono le regole coinvolte e restano disponibili offline.
- Puoi anche vincolare le regole in base al **Peso della camera**, confrontando il corpo selezionato con una soglia in grammi (più pesante, più leggera o identica) prima che l’automazione aggiunga o rimuova elementi.
- Salvare una lista memorizza l’insieme di regole attivo; caricando il progetto o importando un bundle si ripristina lo stesso perimetro.
- Questi insight di copertura viaggiano come oggetto `coverage` in stampe, backup, export di progetto e bundle condivisi, così le verifiche successive trovano lo stesso stato.
- Esporta/importa l’insieme in JSON, ripristina le impostazioni di fabbrica o usa la cronologia automatica (ogni dieci minuti) se un editing va storto.

## Intelligenza sulle autonomie

Le autonomie fornite dagli utenti alimentano un modello ponderato per riflettere l’esperienza reale:

- Temperature: ×1 a 25 °C, ×1,25 a 0 °C, ×1,6 a −10 °C, ×2 a −20 °C.
- Risoluzione: ≥12K ×3, ≥8K ×2, ≥4K ×1,5, ≥1080p ×1; risoluzioni inferiori scalate rispetto a 1080p.
- Frame rate: scala lineare da 24 fps (48 fps = ×2).
- Wi‑Fi attivo: +10 %.
- Codec: RAW/BRAW/ARRIRAW/R3D/CinemaDNG/Canon RAW/X‑OCN ×1; ProRes ×1,1; DNx/AVID ×1,2; All-Intra ×1,3; H.264/AVC ×1,5; H.265/HEVC ×1,7.
- I monitor sono ponderati in base al rapporto di luminosità.
- Il peso finale riflette il contributo di ciascun componente, così rig simili influenzano maggiormente il modello.
- Un dashboard ordina per peso, mostra percentuali e segnala outlier.

## Scorciatoie da tastiera

| Scorciatoia | Azione | Note |
| --- | --- | --- |
| `/`, `Ctrl+K`, `⌘K` | Focalizza la ricerca globale | Funziona anche con navigazione collassata; `Esc` svuota |
| `Invio`, `Ctrl+S`, `⌘S` | Salva il progetto attivo | Il pulsante resta disabilitato finché non inserisci un nome |
| `?`, `H`, `F1`, `Ctrl+/` | Apri il centro assistenza | Il dialogo resta ricercabile |
| `D` | Attiva/disattiva il tema scuro | Disponibile anche in **Impostazioni → Temi** |
| `P` | Attiva il tema rosa | Compatibile con i temi chiaro, scuro o alto contrasto |
| 🔄 | Ricarica le risorse in cache | Anche tramite **Impostazioni → Forza ricarica** |

## Localizzazione

Puoi provare subito una nuova lingua senza build:

1. Duplica il README più simile come `README.<lang>.md` e traducilo.
2. Aggiungi le stringhe in `translations.js`, mantenendo i placeholder come `%s`.
3. Copia e traduci le pagine statiche (privacy, note legali).
4. Esegui `npm test` prima di inviare una pull request.

## Installazione come app

Cine Power Planner è una Progressive Web App:

1. Apri `index.html` in un browser supportato.
2. Usa l’opzione **Installa** o **Aggiungi alla schermata Home**.
   - **Chrome/Edge (desktop):** icona di installazione nella barra degli indirizzi.
   - **Android:** menu del browser → *Aggiungi alla schermata Home*.
   - **Safari iOS:** pulsante condividi → *Aggiungi alla schermata Home*.
3. Avvia l’app dall’elenco applicazioni. Funziona offline e si aggiorna automaticamente dopo che approvi la ricarica.

## Workflow dati dispositivi

I cataloghi risiedono in `devices/`. Ogni file raggruppa attrezzatura correlata per semplificare le revisioni. Prima di eseguire commit, lancia:

```bash
npm run normalize
npm run unify-ports
npm run check-consistency
npm run generate-schema
```

`npm run normalize` pulisce nomi e abbreviazioni dei connettori. `npm run unify-ports` uniforma le etichette. `npm run check-consistency` verifica i campi obbligatori e `npm run generate-schema` rigenera `schema.json`. Per iterare rapidamente sui dati:

```bash
npm run test:data
```

Aggiungi `--help` a ogni comando per avere istruzioni e controlla i diff generati prima di aprire una pull request. `npm run help` riepiloga tutti gli script disponibili.

> **Aggiornamento del catalogo.** Il catalogo delle hand unit FIZ ora elenca i controller Nucleus-M e Nucleus-M II di Tilta insieme alle hand wheel Nano e Nano II, la HU4 di Preston, la hand unit cPRO di cmotion, la hand unit MagNum di Chrosziel, la CTRL.3 di Teradek, le hand unit Focus e Focus Pro di DJI più la RS Focus Wheel (2022), la hand control YMER-3 di Hedén, il controller Pilot Pro di Freefly, la hand controller microRemote di Redrock e la handgrip MagicFIZ di SmallRig, così i pianificatori possono confrontare più ecosistemi offline senza uscire dall’app.

## Sviluppo

Installa Node.js 18 o superiore. Dopo il clone:

```bash
npm install
npm run lint
npm test
```

`npm test` esegue ESLint, controlli sui dati e Jest in sequenza (`--runInBand`, `maxWorkers=1`). Durante lo sviluppo usa suite dedicate:

```bash
npm run test:unit
npm run test:data
npm run test:dom
npm run test:script
```

### Registro dei moduli

Il runtime registra ogni bundle critico (`cinePersistence`, `cineOffline`,
`cineUi`, `cineRuntime` e le utility condivise) nel registro globale
`cineModules`. Ogni modulo viene congelato di default, documentato con metadati
e verificato all’avvio così che salvataggi, condivisioni, importazioni, backup
e ripristini non funzionino mai senza le relative protezioni. Consulta
[`docs/architecture/module-registry.md`](docs/architecture/module-registry.md)
prima di aggiungere nuovi moduli per mantenere allineate le garanzie offline,
la documentazione e le traduzioni.

Un pacchetto infrastrutturale — `cineModuleArchitectureCore`,
`cineModuleArchitectureHelpers`, `cineModuleBase`, `cineModuleContext` e
`cineModuleEnvironment` — mantiene
allineati il rilevamento dello scope, le interrogazioni al sistema di moduli, le
code di registrazione e l’esposizione globale tra bundle moderni e legacy senza
duplicare boilerplate.

Per i moduli nuovi usa `cineModules.createBlueprint({...})` per acquisire i
metadati e le opzioni di congelamento prima della registrazione. Il helper
congela l’API generata, normalizza categoria, descrizione e connessioni e
rimette in coda i registri falliti così che i flussi offline non perdano le
proprie protezioni.

### Bundle legacy

Dopo modifiche in `src/scripts/` o `src/data/`, esegui `npm run build:legacy` per rigenerare il bundle ES5 destinato ai browser datati e mantenere aggiornati i polyfill locali.

### Struttura dei file

```
index.html
src/styles/style.css
src/styles/overview.css
src/styles/overview-print.css
src/scripts/script.js
src/scripts/storage.js
src/scripts/static-theme.js
src/scripts/modules/        # Moduli congelati registrati in cineModules
src/data/index.js
src/data/devices/
src/data/schema.json
src/vendor/
legal/
tools/
tests/
```

## Risoluzione dei problemi

- **Service worker bloccato su una versione vecchia?** Premi **Forza ricarica** o esegui un hard reload dagli strumenti per sviluppatori.
- **Dati mancanti dopo la chiusura della scheda?** Assicurati che il sito abbia accesso allo storage; la navigazione privata può bloccarlo.
- **Download bloccati?** Consenti download multipli per backup e bundle.
- **Script da CLI in errore?** Verifica di usare Node.js 18+, esegui `npm install` e riprova. Con errori di memoria, avvia una suite più piccola come `npm run test:unit`.

## Feedback e supporto

Apri un’issue se incontri problemi, hai domande o vuoi proporre nuove funzionalità. Allegare export o campioni di autonomia aiuta a mantenere il catalogo accurato.

## Contribuire

Le contribuzioni sono benvenute! Dopo aver letto `CONTRIBUTING.md`, apri un’issue o invia una pull request. Esegui `npm test` prima dell’invio.

## Ringraziamenti

Il planner include Uicons locali, asset OpenMoji e altre grafiche pacchettizzate per avere icone offline, e usa lz-string per memorizzare i progetti in modo compatto in URL e backup.

## Licenza

Distribuito con licenza ISC. Dettagli in `package.json`.
