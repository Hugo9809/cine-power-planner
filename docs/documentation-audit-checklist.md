# Documentation Audit Checklist

Use this checklist to run recurring documentation audits that prove every help topic,
localized README and translation key still describes the exact offline workflows the
application enforces. Pair it with the broader maintenance guide and pre-merge
checklist so crews rehearsing without connectivity inherit guidance that matches the
live runtime and cannot lose user data.

## When to run this audit

- Monthly while a release is in active use so the bundled manuals, in-app help and
  translations never drift from the runtime safeguards.
- Immediately before tagging or distributing a build alongside the
  [Documentation Update Checklist](documentation-update-checklist.md) to confirm the
  release packet reflects the final UI and storage contracts.【F:docs/documentation-update-checklist.md†L5-L38】
- After landing a significant feature, translation batch or legal update to ensure the
  offline caches, localized READMEs and verification packet all match the shipped
  experience.【F:docs/documentation-coverage-matrix.md†L1-L63】【F:docs/documentation-verification-packet.md†L1-L52】

## Preparation

1. Update your working copy of the repository and collect the latest verification log,
   planner backups and project bundles stored with the release so you can compare the
   current UI against prior rehearsals.【F:docs/verification-log-template.md†L12-L41】
2. Print or open the Documentation Coverage Matrix and highlight rows tied to the
   features you touched since the last audit. These rows drive the spot checks below
   and guarantee every workflow that touches user data remains documented across all
   surfaces.【F:docs/documentation-coverage-matrix.md†L1-L56】
3. Note the browsers, devices and offline profiles you will use. The audit should
   include at least one fully offline session so cached help topics, locally stored
   Uicons and service-worker data are verified without network access.【F:README.md†L216-L266】

## Step 1 – Align the written guides

1. Read through the primary README sections that describe rehearsals—**Quick Start**,
   **Save, Share & Import Drill** and **Documentation, Help & Translation
   Maintenance**—to confirm the instructions mirror the current workflows and
   terminology. Update wording immediately if labels, safeguards or storage notes have
   changed since the last audit.【F:README.md†L210-L337】【F:README.md†L964-L1004】
2. Open each localized README and spot-check that the same sections reference the
   latest safeguards. If a translation lags behind, duplicate the English copy so the
   offline manuals stay accurate until translators provide localized wording.【F:README.md†L960-L1004】
3. Review printable manuals and runbooks (`docs/offline-readiness.md`,
   `docs/operations-checklist.md`, `docs/save-share-restore-reference.md`) for the same
   terminology. Mark any drift in your verification log and schedule copy updates before
   the audit closes.【F:docs/offline-readiness.md†L1-L109】【F:docs/operations-checklist.md†L1-L99】【F:docs/save-share-restore-reference.md†L1-L137】

## Step 2 – Confirm in-app help and shortcuts

1. Launch the planner, open **Help → Quick start checklist** and run the guided tutorial
   entry to ensure the step navigator, resume prompt and workflow notes remain aligned
   with current UI labels.【F:index.html†L2916-L2980】
2. Traverse the help search and contextual links for saving, backups and restores to
   confirm button IDs and hover-help references still match the live controls. Update
   `index.html` or help scripts immediately if you notice mismatched anchors so offline
   crews never click into stale guidance.【F:index.html†L2540-L2600】
3. Trigger the **Quick safeguards** actions inside **Settings → Data & Storage** and
   confirm the activity board records the backup. The audit should log the resulting
   filenames and timestamps alongside screenshots so downstream crews can prove the same
   safeguard exists when they rehearse offline.【F:index.html†L2540-L2600】

## Step 3 – Translation and selector sweep

1. In **Settings → General**, toggle through each language and confirm the labels, help
   copy and settings headings render correctly without network access. Pay special
   attention to the language selector and the accessibility notes so every locale clearly
   describes saving, backup and restore safeguards defined in
   `src/scripts/translations.js`.【F:src/scripts/translations.js†L140-L186】
2. Repeat the help dialog spot checks in at least one non-English locale to confirm
   translated strings reference the same buttons and workflow order as the English
   source. If any locale diverges, log the gaps in your verification notes and copy the
   English wording into the translation key as a placeholder until the localized text is
   updated.【F:README.md†L960-L1004】【F:docs/documentation-update-checklist.md†L19-L24】

## Step 4 – Persistence and diagnostics evidence

1. Open the developer console and inspect `window.__cineRuntimeIntegrity`. Record the
   output or rerun `window.cineRuntime.verifyCriticalFlows({ warnOnFailure: true })` to
   prove every persistence, offline and UI safeguard is still active. Attach the capture
   to your verification log.【F:src/scripts/script.js†L316-L357】
2. Run `window.cinePersistence.__internal.inspectAllBindings()` and
   `window.cinePersistence.storage.exportAllData()` to confirm every storage wrapper is
   registered and that full backups export the expected payload before you archive new
   artifacts.【F:src/scripts/modules/persistence.js†L768-L858】
3. While still offline, use the **Quick safeguards → Download full backup** control to
   capture a fresh planner backup and verify the **Latest activity** board reflects the
   new timestamp while the safety reminders switch to an all-clear message. Store the
   JSON alongside a checksum in your verification log entry so the audit produces tangible
   recovery artifacts.【F:index.html†L2540-L2600】【F:docs/verification-log-template.md†L26-L41】

## Step 5 – Archive the results

1. Update the verification log with timestamps, browsers, commands run and the filenames
   plus hashes of every export captured during the audit. Include screenshots or console
   transcripts that prove the help dialog, Quick safeguards and runtime guard all matched
   the documentation.【F:docs/verification-log-template.md†L12-L67】
2. Rebuild the documentation verification packet with the refreshed manuals, captured
   backups, share bundles and diagnostic evidence. Store redundant copies on the offline
  media noted in the packet guide and record the storage locations in the log so future
   crews can retrieve the canonical documentation bundle quickly.【F:docs/documentation-verification-packet.md†L9-L48】

Running this audit on a predictable schedule ensures the README family, help center,
translations and printed manuals stay aligned with the runtime safeguards that keep every
save, share, import, backup and restore workflow lossless—even when crews rely on the
planner entirely offline.【F:docs/documentation-coverage-matrix.md†L1-L63】【F:README.md†L210-L337】

> _2025-02 alignment:_ Verified instructions against the current runtime guard and Backup & Restore UI so offline rehearsals match the shipped safeguards.【F:src/scripts/modules/runtime.js†L2203-L2368】【F:index.html†L2501-L2560】
