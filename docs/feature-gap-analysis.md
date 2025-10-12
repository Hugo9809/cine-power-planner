# Feature gap analysis checklist

Use this checklist when evaluating new feature requests or auditing existing functionality. It ties each
question back to runtime safeguards so gaps can be prioritised without risking user data.

## 1. Persistence coverage
- Does the feature rely on data already captured by `cinePersistence` (projects, automatic gear, backups,
  feedback, favourites)? If not, identify which storage wrapper must be extended.【F:src/scripts/modules/persistence.js†L1036-L1109】
- Will the change alter autosave cadence or backup triggers? Review `app-events.js` thresholds before
  adjusting copy or docs.【F:src/scripts/app-events.js†L86-L205】

## 2. Restore & rehearsal impact
- Does the feature require Restore rehearsal to surface new comparisons or metrics? Ensure the settings UI
  exposes the change so crews can validate backups offline.【F:index.html†L2501-L2708】
- If restore workflows change, note which verification packet artefacts must be updated (diff logs,
  screenshots, documentation snippets).【F:docs/documentation-verification-packet.md†L1-L48】

## 3. Offline readiness
- Are new assets (icons, docs, translations) bundled and referenced in the service worker asset manifest?
  Regenerate the manifest after adding them.【F:service-worker.js†L192-L240】【F:package.json†L6-L21】
- Do help links, tooltips or translations need new entries? Update `translations.js` and help markup to
  maintain offline accuracy.【F:src/scripts/translations.js†L120-L220】【F:index.html†L4401-L4413】

## 4. User guidance
- Which documentation surfaces require updates (README, help dialog, offline drill guides)? Record tasks in
  the maintenance log and translation guide so localisation stays in sync.【F:docs/documentation-maintenance.md†L1-L140】【F:docs/translation-guide.md†L1-L134】
- Does the verification log template need a new field to capture evidence for the feature? Update it before
  release to avoid losing audit data.【F:docs/verification-log-template.md†L12-L67】

## 5. Risk rating
Classify the gap based on impact and mitigation effort:

| Rating | Criteria |
| --- | --- |
| High | Missing safeguard risks data loss or prevents offline recovery. Requires immediate work before release. |
| Medium | Documentation or translation drift that could confuse offline crews but does not endanger data. |
| Low | Cosmetic or future enhancement with no effect on persistence or offline rehearsals. |

Document findings in the verification log and status report template so stakeholders can track closures.
