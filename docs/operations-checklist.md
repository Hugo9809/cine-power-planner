# Operations checklist

Use this checklist for day-to-day operations or when onboarding new crew members. It keeps runtime
guards, backups and documentation aligned so no user data is lost.

## Daily
- Open Cine Power Planner, confirm the offline indicator is active and note any warnings in the Data &
  Storage panel.【F:index.html†L1-L120】【F:index.html†L2722-L2778】
- Trigger a manual save and ensure the Latest activity list updates with the new timestamp.【F:index.html†L2722-L2778】
- Export a planner backup or project bundle if significant changes were made. Store copies on the shared
  operations drive and update the verification log.【F:src/scripts/modules/persistence.js†L1036-L1109】【F:docs/verification-log-template.md†L12-L67】

## Weekly
- Run `window.cineRuntime.verifyCriticalFlows({ warnOnFailure: true })` and archive the console output.
  Investigate any missing bindings immediately.【F:src/scripts/modules/runtime.js†L2216-L2335】
- Perform the offline cache verification drill to ensure cached assets remain current.【F:docs/offline-cache-verification-drill.md†L1-L63】
- Review documentation maintenance entries and close outstanding tasks or translation blockers.【F:docs/documentation-maintenance.md†L1-L140】【F:docs/translation-guide.md†L1-L134】

## Monthly / Pre-release
- Complete the data protection playbook rehearsal, capturing backups, restore rehearsals and diff logs.
  Archive artefacts in the documentation verification packet.【F:docs/data-protection-playbook.md†L1-L173】【F:docs/documentation-verification-packet.md†L1-L48】
- Regenerate `service-worker-assets.js` and rerun the offline cache drill after updating docs or assets.【F:package.json†L6-L21】【F:service-worker.js†L192-L240】
- Update the documentation status report and feature gap analysis to reflect current risks and mitigations.【F:docs/documentation-status-report-template.md†L1-L60】【F:docs/feature-gap-analysis.md†L1-L55】

## Incident response
- Follow the Save, Share & Restore reference to capture emergency backups and bundles before attempting
  recovery.【F:docs/save-share-restore-reference.md†L1-L140】
- Log all actions, timestamps and artefact locations in the verification log and documentation maintenance
  tracker for traceability.【F:docs/verification-log-template.md†L12-L67】【F:docs/documentation-maintenance.md†L1-L140】

Keeping this checklist up to date ensures operations teams can prove offline readiness, maintain
redundant backups and keep documentation aligned with the runtime safeguards that protect user data.【F:src/scripts/modules/persistence.js†L1036-L1109】【F:index.html†L2501-L2778】
