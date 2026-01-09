# Cine Power Planner

<img src="src/icons/app-icon.png" alt="Icona Cine Power Planner" width="160">

Cine Power Planner è una web app standalone per creare, verificare e condividere
piani di alimentazione professionali per camere senza che i dati lascino la
macchina. Pianifica rig V‑Mount, B‑Mount o Gold‑Mount, modella le aspettative di
runtime, raccogli i requisiti di progetto ed esporta bundle condivisibili —
interamente nel browser e anche offline. Ogni dipendenza vive in questo repo,
così la stessa esperienza funziona su workstation di set, laptop di campo o
archivi isolati.

## Promessa di protezione dei dati

- **Archiviazione solo locale.** Progetti, liste gear, feedback di runtime,
  export e backup restano sulla tua macchina; l’app non dipende da servizi
  esterni.
- **Reti di sicurezza a strati.** Salvataggio, auto-salvataggio, condivisione,
  importazione, backup e ripristino creano sempre snapshot di sicurezza per
  recuperare i dati prima della promozione.
- **Offline by design.** Tutte le icone, i font, gli Uicons e gli script di
  supporto sono nel repo, quindi l’uso offline non degrada usabilità o
  protezione dati.

## Inizia qui (drill breve)

1. Apri `index.html` in un browser supportato. Mantieni la struttura del repo
   per caricare localmente icone, font e aiuti offline.
2. Avvia **Help → Quick start checklist** per provare salvataggio,
   condivisione, importazione, backup e ripristino end-to-end su questa macchina.
3. Esporta subito un backup del planner e un bundle di progetto. Conserva
   entrambi su supporti offline separati per avere un punto di ripristino sicuro.
4. Disconnetti la rete e ricarica. Verifica che progetti, help e **Force reload**
   funzionino ancora senza toccare i dati salvati.

## Indice della documentazione

L’hub canonico della documentazione è in [`docs/README.md`](docs/README.md).
Raggruppa le guide offline per ruolo (utenti, operations, sviluppo) e per
workflow così ogni routine è documentata una sola volta.

- **Utenti:** inizia con lo
  [User Guide](docs/user/user-guide.md) e la
  [Data Protection Lifecycle Guide](docs/user/data-protection-lifecycle.md).
- **Operations:** prova con la
  [Operations Checklist](docs/ops/operations-checklist.md) e l’
  [Offline Readiness Runbook](docs/ops/offline-readiness.md).
- **Sviluppo:** segui il
  [Development & Maintenance Guide](docs/dev/development.md) e la
  [Documentation Maintenance Guide](docs/dev/documentation-maintenance.md).

## Funzionalità chiave

- **Base dati sui consumi.** Consulta valori integrati o estendi il catalogo
  locale con le tue attrezzature.
- **Pianificazione batterie.** Combina capacità, voltaggi e feedback di runtime
  per stime realistiche.
- **Configurazioni rig personalizzate.** Mescola camere, accessori e requisiti
  di crew ed esporta bundle o backup senza rischio di perdita dati.
- **Operatività offline-first.** Ogni asset è nel repo, quindi auto-salvataggio,
  backup, ripristino, condivisione e help funzionano senza rete.
- **Riepiloghi di compatibilità al ripristino.** Ogni ripristino elenca le
  sezioni mancanti e crea un backup di sicurezza prima della promozione.

## Nuovo: Interfaccia Utente V2

L'applicazione ora dispone di un'interfaccia utente V2 completamente riprogettata e responsive.

### Dashboard e Navigazione
- **Dashboard Moderno**: Gestisci tutti i tuoi progetti da una vista a griglia unificata e ricercabile con tile codificati per colore che mostrano stato del progetto, date e azioni rapide.
- **Navigazione con Sidebar**: Accedi rapidamente a Progetti, Libreria Dispositivi, Contatti, Attrezzatura Propria, Regole Automatiche Attrezzatura, Impostazioni e Aiuto da una sidebar persistente e comprimibile.
- **Design Mobile-First**: Layout completamente responsive con toggle sidebar mobile e controlli ottimizzati per il touch.

### Gestione Progetti
- **Tracciamento Stato Progetto**: Segui i progetti attraverso le fasi del workflow—Bozza, Pianificazione, In Attesa di Approvazione, Approvato, Riprese, Completato e Archiviato—con indicatori di stato codificati per colore.
- **Viste Progetto a Schede**: Naviga tra Pacchetto Camera, Riepilogo Potenza, Requisiti e Lista Attrezzatura in ogni progetto.
- **Menu Contestuali**: Fai clic destro sui tile del progetto per azioni rapide come duplicare, archiviare, esportare o eliminare.

### Strumenti e Dati
- **Libreria Dispositivi**: Sfoglia e gestisci il tuo database attrezzature con filtri e ricerca.
- **Gestione Contatti**: Mantieni un elenco del team con ruoli, dettagli di contatto e foto profilo. Importa contatti da file vCard.
- **Tracciamento Attrezzatura Propria**: Cataloga il tuo inventario personale di attrezzature con quantità e note di approvvigionamento.
- **Regole Automatiche Attrezzatura**: Configura aggiunte o rimozioni di attrezzature attivate da scenario.

### Miglioramenti Visivi
- **Modalità Scura Migliorata**: Tema scuro raffinato con contrasto e leggibilità migliorati.
- **Modalità Rosa**: Tema accent divertente con effetto animato di "pioggia di icone".
- **Controlli Tema**: Pulsanti di accesso rapido nella sidebar per modalità scura, modalità rosa e ricarica forzata.

## Installazione

1. Clona o scarica questo repository su un disco fidato:
   ```bash
   git clone /path/to/cine-power-planner.git
   cd cine-power-planner
   ```
   (Se hai ricevuto un bundle offline, decomprimilo in una cartella locale.)
2. Apri `index.html` direttamente in un browser supportato. Tutti gli asset si
   caricano dal repository, quindi puoi disconnetterti subito.
3. (Opzionale) Servi la cartella su `http://localhost` per abilitare il service
   worker e il prompt di installazione PWA. Qualsiasi server statico funziona
   offline:
   ```bash
   python -m http.server
   # oppure
   npm run serve
   ```

## Traduzioni

Mantieni i README localizzati sincronizzati con questo README quando i workflow
cambiano, soprattutto per salvataggio, condivisione, importazione, backup o
ripristino.

- [Deutsch](README.de.md)
- [English](README.en.md)
- [Español](README.es.md)
- [Français](README.fr.md)
- [Italiano](README.it.md)

## Licenza

Distribuito sotto licenza ISC. Vedi `package.json` per i dettagli.
