# Documentation Index

**Version:** 1.0.53

> **Quick Links**: [User Guide](user/user-guide.md) · [Development Guide](dev/development.md) · [Changelog](../CHANGELOG.md) · [Contributing](../CONTRIBUTING.md)

Welcome to the Cine Power Planner documentation. Everything here is designed
for offline use and stays entirely local—no external links, no external
services, and no dependencies beyond this repository.

## Start here

1. **Learn the data safety lifecycle.**
   Read the [Data Protection Lifecycle Guide](user/data-protection-lifecycle.md)
   to understand manual save → autosave → backup → share → restore rehearsal →
   promotion, plus the offline evidence to capture.
2. **Practice the core workflows.**
   Use the [Save, Share, Import, Backup & Restore Reference](user/save-share-restore-reference.md)
   as your step-by-step companion for day-to-day data protection.
3. **Run the operational rehearsal.**
   Follow the [Operations Checklist](ops/operations-checklist.md) and the
   [Offline Readiness Runbook](ops/offline-readiness.md) before any production
   day or offline deployment.

## Quick Dev Start

New to the codebase? Use Vite to start developing instantly:

```bash
npm install
npm run dev     # Start dev server at localhost:3000
npm run build   # Build for production
```

Before you ship or rehearse, verify offline usage by opening `index.html` directly
from disk and keeping all local-only assets intact (icons, fonts, cached files)
to protect save/share/import/backup/restore data paths. Follow the [Offline
Readiness Runbook](ops/offline-readiness.md) and the [Offline Cache Verification
Drill](ops/offline-cache-verification-drill.md) for the full local rehearsal flow.

See [Development & Maintenance Guide](dev/development.md#vite-build-system) for details.

## By role

### Users & crew

- [User Guide](user/user-guide.md)
- [Data Protection Lifecycle Guide](user/data-protection-lifecycle.md)
- [Save, Share, Import, Backup & Restore Reference](user/save-share-restore-reference.md)
- [Cloud Sync Safety (Future Update)](user/cloud-sync-safety.md)
- [Power Summary Warning Reference](user/power-summary-warning-reference.md)
- [Automatic Gear Rule Options](user/auto-gear-rule-options.md)
- [Onboarding Tour Reference](user/onboarding-tour-reference.md)
- [Pink Mode Reference](user/pink-mode-reference.md)

### Operations & production

- [Operations Checklist](ops/operations-checklist.md)
- [Offline Readiness Runbook](ops/offline-readiness.md)
- [Backup Rotation Guide](ops/backup-rotation-guide.md)
- [Data Protection Playbook](ops/data-protection-playbook.md)
- [Emergency Recovery Playbook](ops/emergency-recovery-playbook.md)
- [Offline Cache Verification Drill](ops/offline-cache-verification-drill.md)
- [Offline Help & Translation Verification](ops/offline-help-verification.md)
- [Documentation Verification Packet](ops/documentation-verification-packet.md)
- [Verification Log Template](ops/verification-log-template.md)

### Developers & maintainers

- [Development & Maintenance Guide](dev/development.md)
- [Documentation Maintenance](dev/documentation-maintenance.md)
- [Documentation Update Checklist](dev/documentation-update-checklist.md)
- [Documentation Drift Runbook](dev/documentation-drift-runbook.md)
- [Documentation Audit Checklist](dev/documentation-audit-checklist.md)
- [Documentation Coverage Matrix](dev/documentation-coverage-matrix.md)
- [Documentation Status Report Template](dev/documentation-status-report-template.md)
- [Translation Guide](dev/translation-guide.md)
- [Testing Plan](dev/testing-plan.md)
- [API Quick Reference](dev/api-quick-reference.md)
- [Schema Inventory](dev/schema-inventory.md)
- [Feature Gap Analysis](dev/feature-gap-analysis.md)
- [Runtime Refactor Plan](dev/runtime-refactor-plan.md)
- [Runtime Refactor Status](dev/runtime-refactor-status.md)
- [Missing Devices Research](dev/missing_devices_research.md)
- Architecture & Guides:
  - [Codebase Overview](dev/codebase-overview.md)
  - [Application Lifecycle](dev/architecture/application-lifecycle.md)
  - [Design System & Tokens](dev/architecture/design-system.md)
  - [Module Registry](dev/architecture/module-registry.md)
  - [Runtime Environment](dev/architecture/runtime-environment.md)
  - [Storage Layer](dev/architecture/storage-layer.md)
  - [Data Catalog Maintenance](dev/data-catalog-maintenance.md)
  - [Release Management](dev/release-management.md)
  - [Debugging Guide](dev/debugging-guide.md)
  - [Schema Evolution](dev/schema-evolution-guide.md)
  - [Security Implementation](dev/security-implementation.md)
  - [V2 Component Cookbook](dev/v2-component-cookbook.md)
  - [Vite Migration Guide](dev/vite-migration.md)
  - [Offline Strategy](dev/architecture/offline-strategy.md)
- Reference:
  - [API Quick Reference](dev/api-quick-reference.md)
  - [Runtime Event Reference](dev/runtime-events.md)
  - [Tooling Reference](dev/tooling-reference.md)
  - [Performance Standards](dev/performance-standards.md)
  - [Security Policy](../SECURITY.md)
- Archives & Reports:
  - [Runtime Refactor Status](dev/reports/runtime-refactor-status-2025.md)
  - [Feature Gap Analysis](dev/feature-gap-analysis.md)



## By workflow

- **Save, share, import, backup, restore:**
  [Save, Share, Import, Backup & Restore Reference](user/save-share-restore-reference.md)
- **End-to-end data safety lifecycle:**
  [Data Protection Lifecycle Guide](user/data-protection-lifecycle.md)
- **Offline readiness rehearsal:**
  [Operations Checklist](ops/operations-checklist.md) +
  [Offline Readiness Runbook](ops/offline-readiness.md)
- **Backup rotation & archival planning:**
  [Backup Rotation Guide](ops/backup-rotation-guide.md)
- **Emergency recovery & incident response:**
  [Emergency Recovery Playbook](ops/emergency-recovery-playbook.md) +
  [Data Protection Playbook](ops/data-protection-playbook.md)
- **Offline caching verification:**
  [Offline Cache Verification Drill](ops/offline-cache-verification-drill.md)
- **Offline help & translation verification:**
  [Offline Help & Translation Verification](ops/offline-help-verification.md)
- **Documentation refresh & verification:**
  [Documentation Update Checklist](dev/documentation-update-checklist.md) +
  [Documentation Verification Packet](ops/documentation-verification-packet.md)
- **Documentation coverage & drift prevention:**
  [Documentation Coverage Matrix](dev/documentation-coverage-matrix.md) +
  [Documentation Drift Runbook](dev/documentation-drift-runbook.md)
- **Translation updates:**
  [Translation Guide](dev/translation-guide.md)
