# Backend & iOS Sync Expansion Roadmap

This roadmap elaborates the staged plan for evolving the camera power planner from a purely offline-first web application into a platform with an optional server backend and native iOS companion app. Every milestone prioritises user data safety, redundant local persistence, and the human-friendly workflows crews already rely on. No step may compromise the existing offline guarantees—synchronisation is an additive capability that users can enable on their own terms.

## 1. Audit the current offline-first architecture
- Catalogue every persistence touchpoint, including manual saves, autosave timers, backup rotations, bundle exports, restore rehearsals, verification logs, and the conditions that trigger each safeguard.
- Inventory the locally bundled assets (Uicons, fonts, help content, diagrams) and service worker caches to ensure server features never break offline UI integrity or introduce external dependencies.
- Document the existing JSON schemas for projects, backups, rule presets, diagnostics, verification artefacts, and share bundles so the backend mirrors them without lossy transforms.
- Record the user flows that must remain 100% local (e.g., emergency recovery playbook, field mode checklists) and flag the telemetry or logging hooks that can remain device-only.
- Map current failure states (e.g., interrupted saves, storage quota exceeded) together with the UI responses so new code can replicate or enhance the human-friendly feedback already in place.

**Deliverables**
- Architecture dossier summarising storage layers, background jobs, and service worker caches with diagrams suitable for onboarding backend engineers.
- Data dictionary enumerating all persisted fields, validation rules, and encryption status, cross-referenced with code modules and tests.
- Risk register highlighting any brittle assumptions that must be addressed before syncing (e.g., implicit timestamps, single-device assumptions).

## 2. Define the server sync contract and data lifecycle
- Specify functional objectives: account registration, authentication, selective project sync, team sharing, remote backup mirroring, read-only observers, and administrative audit exports.
- Design the data lifecycle diagrams for create/update/delete events, ensuring local-first precedence: every mutation still commits to the on-device store before any network call fires.
- Establish versioning and conflict policies (e.g., vector clocks with append-only histories) that never overwrite unsynced local edits; merges must retain both sides for manual resolution and annotate conflicts with human-readable summaries.
- Model server storage around the existing JSON payloads so exports/imports remain compatible across offline-only, partially synced, and fully synced profiles, including identical checksum semantics.
- Define throttling, batching, and compression rules that preserve deterministic ordering and enable crews on poor connectivity to pause and resume sync safely.

**Deliverables**
- Sync contract specification covering endpoints, payload schemas, auth headers, retry semantics, and expected UI states for success, pending, and failure.
- Sequence diagrams illustrating offline-to-online transitions, including resume after partial uploads, merge prompts, and manual override paths.
- Compatibility test matrix to validate that legacy share bundles and backups can be imported/exported through the new APIs without data drift.

## 3. Lock in security, privacy, and reliability principles
- Enforce encryption in transit (TLS 1.3+) and at rest (per-project keys or envelope encryption) with zero-trust defaults; unauthorised actors must never access user data and can be revoked instantly.
- Define audit logging that mirrors local verification logs, capturing backup, restore, share, and sync conflict operations without exposing content payloads or personal data.
- Plan backup/restore rehearsals on the server side with the same rigor as local drills, including forced pre-restore backups, checksum validation, and automated integrity attestations appended to the verification logbook.
- Outline incident response procedures that keep users in control: if sync fails, the app must clearly show the state, preserve local data, and defer to manual exports while opening a diagnostics bundle.
- Specify data retention, deletion, and export policies that let users retrieve or purge their data without risking loss on any registered device.

**Deliverables**
- Security threat model and mitigation register signed off by engineering and security stakeholders.
- Disaster recovery playbook covering regional outages, database corruption scenarios, and compromised credentials, with rehearsed runbooks.
- Compliance matrix referencing privacy commitments, legal disclosures, and user-facing documentation updates required per milestone.

## 4. Select backend stack, deployment topology, and tooling
- Choose a technology stack aligned with the existing TypeScript ecosystem (e.g., Node.js with PostgreSQL or SQLite for deterministic storage, object storage for artefacts) while validating that all components can be deployed in isolated environments without internet access.
- Map environments (local, staging, production) with reproducible infrastructure-as-code and CI pipelines that run integrity checks, schema diff detection, rehearsal backups, and localisation linting for documentation updates.
- Define hosting expectations for studios that self-host versus centrally managed deployments, always allowing a fully air-gapped offline mode and providing sync gateways that can be switched off per site.
- Build developer tooling (mock servers, local sync simulators) to test offline/online transitions without risking real user data, including scripted load tests for bulk project migrations.
- Establish observability stack requirements (metrics, traces, logs) that protect user privacy and can run in on-premises deployments.

**Deliverables**
- Architecture decision record (ADR) for each core component, documenting trade-offs and fallback strategies.
- Infrastructure blueprints (Terraform, Ansible, or equivalent) with automated smoke tests that exercise backup and restore flows end-to-end.
- Developer onboarding guide describing how to spin up local stacks, seed test data, and run sync simulators alongside the existing web app.

## 5. Implement authentication, identity, and device management
- Deliver secure signup/login with multi-factor authentication, device registration, scoped access tokens, and offline-capable credential escrow so the app can prove identity after reconnecting.
- Provide explicit opt-in toggles in the planner for enabling sync per project, showing status indicators, last-sync timestamps, recovery codes, and error diagnostics.
- Store minimal profile metadata—project names, checksums, and timestamps—while keeping detailed payloads encrypted end-to-end and verifying signatures before accepting server data.
- Ensure the UI mirrors existing usability standards: consistent typography, locally stored icons, and accessible flows that explain data handling in plain language, including tutorial overlays that can be reviewed offline.
- Publish account management guidance in all supported languages covering device revocation, recovery codes, and how sync impacts manual backups.

**Deliverables**
- Authentication service with automated tests for MFA, token rotation, and offline login grace periods.
- Device management dashboard within the planner showing registered devices, last seen times, and revoke options.
- Documentation updates for help centre, printable guides, and translation files explaining new identity workflows.

## 6. Extend the web app with optional sync services
- Introduce a background synchronisation module that queues mutations locally, retries with exponential backoff, surfaces resumable logs for transparency, and respects airplane mode toggles.
- Update the settings, help topics, and diagnostics panels to display sync status, history, and recovery steps without adding external links, reusing localised components and icons already shipped.
- Maintain redundant local saves before and after each sync attempt; the runtime guard must fail closed, leaving local data intact if the server rejects a payload and prompting users to export a manual backup.
- Add instrumentation hooks to capture sync rehearsal artefacts (e.g., simulated conflicts) for inclusion in verification logs and training material while anonymising sensitive data.
- Ensure share, import, backup, and restore flows continue to execute locally even when sync is enabled, with clear messaging about which data is stored where.

**Deliverables**
- Sync queue subsystem with unit and integration tests covering interruption, retry, and manual resume scenarios.
- Updated UI views (settings, diagnostics, help) with localisation entries and offline-available walkthroughs.
- QA checklist for regression testing save/share/import/backup/restore flows across offline, syncing, and reconnecting states.

## 7. Develop the native iOS application with offline parity
- Reuse shared domain logic via a portable core (e.g., TypeScript compiled to JSCore or shared schema packages) to guarantee deterministic calculations across platforms and simplify verification.
- Implement local storage with Core Data or SQLite, mirroring autosave cadence, backup archives, manual export options, and integrity checks already present in the web app.
- Bundle identical help content, icons, documentation, and translation tables within the app package so crews can reference guides offline; include printable PDF exports for field kits.
- Build sync adapters that speak the same contract as the web app, honoring local-first writes, explicit user triggers, and human-readable diagnostics, with tooling to simulate poor connectivity.
- Integrate native notifications for backup reminders and sync failures that persist even when the device is offline, respecting user privacy settings.

**Deliverables**
- iOS project skeleton with automated UI tests covering save, autosave, backup, restore, and sync opt-in/out.
- Shared schema library published as an internal package consumed by both web and iOS clients.
- Mobile-specific help supplements and translation updates ensuring parity with web documentation.

## 8. Create migration, import/export, and recovery tooling
- Deliver scripts and UI wizards that migrate local-only data into server-backed profiles, performing redundant backups before any move and storing migration manifests locally.
- Keep project bundle exports and imports interoperable across web, iOS, and backend services, validating payload signatures before merges and logging verification hashes to the sync rehearsal logbook.
- Provide downgrade paths to return to offline-only operation, including instructions for disabling sync, exporting all server-stored archives locally, and clearing remote traces if desired.
- Update help, documentation, and training drills to rehearse migration scenarios, ensuring crews can practice without risking live projects and have printable checklists.
- Offer automated comparison tools to confirm that migrated data matches the source before deleting legacy copies.

**Deliverables**
- Migration toolkit with command-line scripts, UI flows, and automated tests for happy path and interruption cases.
- Updated save/share/import/backup/restore documentation with side-by-side guidance for offline-only and synced users.
- Training materials (videos, slide decks, printable guides) bundled for offline distribution.

## 9. Harden through testing, verification drills, and monitoring
- Expand automated tests to cover offline/online transitions, conflict resolution, backup rehearsals, cross-device state reconciliation, and translation accuracy for new strings.
- Run manual verification drills following the existing Save, Share & Import checklist, now adding sync rehearsal steps with captured logs stored offline and signed by a lead operator.
- Implement monitoring that respects privacy: aggregate operational metrics without logging user content, and alert on sync failures, backup anomalies, version drift, or unusual access patterns.
- Document rollback strategies for both backend and clients, including how to isolate faulty releases while preserving user data snapshots, and how to communicate rollbacks in every supported language.
- Establish quarterly disaster simulations that exercise full restore from server backups to fresh devices while keeping local copies untouched.

**Deliverables**
- Comprehensive automated test suite results stored with build artefacts and referenced in release notes.
- Verification playbook updates incorporating sync drills, conflict rehearsals, and monitoring checks.
- Monitoring runbooks describing thresholds, alert routing, and incident response steps with privacy safeguards.

## 10. Launch incrementally with user safeguards and documentation updates
- Start with an opt-in beta program, collecting feedback and iterating on usability while guarding against any data loss; log every rehearsal in the verification packet and circulate summaries to stakeholders.
- Publish transparent release notes in all supported languages, and update README, help overlays, printable guides, and onboarding tours to cover new sync features before each rollout.
- Provide in-app education (tooltips, help topics) describing how sync interacts with existing manual saves, backups, and restores, keeping instructions available offline and ensuring accessibility compliance.
- Maintain rollback toggles in settings so users can suspend sync, trigger manual backups, and continue working offline at any time without losing progress, with the option to export diagnostic bundles for support.
- Gather post-launch metrics on user satisfaction, sync reliability, and documentation clarity while offering direct support channels that do not require internet access.

**Deliverables**
- Beta program handbook outlining enrolment, feedback collection, and exit strategies for testers.
- Finalised documentation packs (READMEs, help centre, translations, printable PDFs) versioned alongside release tags.
- Post-launch review templates tracking data integrity incidents, user feedback, and roadmap adjustments.

## Supporting artefacts to produce alongside development
- **Schema alignment dossier:** living document comparing local JSON schemas with server representations, updated each milestone and linked to automated schema diff reports.
- **Sync rehearsal logbook:** appended to the verification log template, capturing conflict simulations, rollback drills, data integrity checks, and sign-offs from responsible engineers.
- **Documentation & translation tracker:** checklist for updating README variants, help copy, legal disclosures, and translation tables in lockstep with feature changes, highlighting items that must ship in every language before release.
- **Offline training bundle:** zipped package containing updated manuals, walkthrough videos, rehearsal exports, and troubleshooting guides to distribute to crews without network access.
- **Data integrity dashboard:** internal dashboard (exportable to PDF for offline review) summarising backup health, sync success rates, and outstanding migration tasks.

Maintaining this roadmap in the repository ensures every contributor approaches backend and iOS work with the same offline-first, data-protective mindset that defines the planner today.
