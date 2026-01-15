# Cine Power Planner

<img src="src/icons/app-icon.png" alt="Icona Cine Power Planner" width="160">

**Versione attuale:** 1.0.53 | **Licenza:** ISC | **Node:** >=18 (strumenti di sviluppo)

Cine Power Planner è una web app standalone per creare, verificare e condividere
piani di alimentazione professionali per camere senza che i dati lascino la
macchina. Pianifica rig V‑Mount, B‑Mount o Gold‑Mount, modella le aspettative di
runtime, raccogli i requisiti di progetto ed esporta bundle condivisibili —
interamente nel browser e anche offline. Ogni dipendenza vive in questo repo,
così la stessa esperienza funziona su workstation di set, laptop di campo o
archivi isolati.

## Promessa di protezione dei dati

- **Archiviazione solo locale.** Progetti, liste gear, feedback di runtime,
  export e backup restano sulla tua macchina in IndexedDB, con OPFS come
  destinazione di backup dove supportato; il localStorage legacy resta come
  fallback. L’app non dipende da servizi esterni.
- **Sync cloud opzionale (aggiornamento futuro).** La sync sarà un livello
  opt-in che copia i dati locali su Firebase Studio dopo aver completato un
  drill di backup ed export preliminare.
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
   Conferma che i temi di aiuto mostrino testo localizzato e Uicons offline
   nelle intestazioni e nell’indice.
3. Esporta subito un backup del planner e un bundle di progetto. Conserva
   entrambi su supporti offline separati per avere un punto di ripristino sicuro.
4. Disconnetti la rete e ricarica. Verifica che progetti, help e **Force reload**
   funzionino ancora senza toccare i dati salvati.

## Workflow di sicurezza dei dati (ogni sessione)

1. **Salvataggio + auto-salvataggio.** Salva dopo modifiche importanti;
   l’auto-salvataggio mantiene snapshot locali continui in caso di rollback.
2. **Condivisione/esportazione = copia, non spostamento.** I bundle di progetto
   e i backup del planner duplicano sempre i dati. Conserva almeno due copie
   offline prima di eliminare qualsiasi cosa.
3. **Importazione/ripristino con verifica.** Ogni ripristino crea un backup di
   sicurezza prima e mostra note di compatibilità prima della promozione.
4. **Drill di recupero.** Esegui regolarmente un ripristino da un backup o
   bundle condiviso per confermare che questa macchina può recuperare i dati
   end-to-end.

## Indice della documentazione

L’hub canonico della documentazione è in [`docs/README.md`](docs/README.md).
Raggruppa le guide offline per ruolo (utenti, operations, sviluppo) e per
workflow così ogni routine è documentata una sola volta.

- **Utenti:** inizia con lo
  [User Guide](docs/user/user-guide.md), la
  [Data Protection Lifecycle Guide](docs/user/data-protection-lifecycle.md)
  e la
  [Sicurezza sync cloud (aggiornamento futuro)](docs/user/cloud-sync-safety.md).
- **Operations:** prova con la
  [Operations Checklist](docs/ops/operations-checklist.md) e l’
  [Offline Readiness Runbook](docs/ops/offline-readiness.md).
- **Sviluppo:** segui il
  [Development & Maintenance Guide](docs/dev/development.md) e la
  [Documentation Maintenance Guide](docs/dev/documentation-maintenance.md).

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

## Funzionalità chiave

- **Base dati sui consumi.** Consulta valori integrati o estendi il catalogo
  locale con le tue attrezzature.
- **Pianificazione batterie.** Combina capacità, voltaggi e feedback di runtime
  per stime realistiche.
- **Configurazioni rig personalizzate.** Mescola camere, accessori e requisiti
  di crew ed esporta bundle o backup senza rischio di perdita dati.
- **Operatività offline-first.** Ogni asset è nel repo, quindi auto-salvataggio,
  backup, ripristino, condivisione e help funzionano senza rete.
- **Preparazione alla sync cloud (aggiornamento futuro).** La sync opzionale
  con Firebase Studio è pianificata; l'archiviazione locale resta la fonte di
  verità.
- **Riepiloghi di compatibilità al ripristino.** Ogni ripristino elenca le
  sezioni mancanti e crea un backup di sicurezza prima della promozione.

## Installazione

1. Clona o scarica questo repository su un disco fidato:
   ```bash
   git clone /path/to/cine-power-planner.git
   cd cine-power-planner
   npm install
   ```
   (Se hai ricevuto un bundle offline, decomprimilo in una cartella locale.)
2. Avvia il server di sviluppo:
   ```bash
   npm run dev
   ```
   Questo apre l'app su `http://localhost:3000` con hot module replacement.
3. Per build di produzione:
   ```bash
   npm run build      # Build su dist/
   npm run preview    # Anteprima del build di produzione
   ```
4. (Uso offline) Apri `index.html` direttamente in un browser supportato
   per uso completamente offline. Gli asset si caricano senza connessione.

## Riferimento rapido comandi

| Comando | Descrizione |
| --- | --- |
| `npm run dev` | Avvia il server di sviluppo Vite con HMR |
| `npm run build` | Build di produzione su `dist/` |
| `npm test` | Esegue la suite di test completa (lint + checks + Jest) |
| `npm run lint` | Esegue ESLint |
| `npm run check-consistency` | Valida i dati dei dispositivi e il manifesto SW |
| `npm run help` | Mostra tutti gli script disponibili |

Consulta [Development & Maintenance Guide](docs/dev/development.md) per il
riferimento completo agli script npm e consigli di troubleshooting.

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
