# Offline Readiness Runbook

This runbook prepares crews to operate Cine Power Planner without connectivity.
Complete it before travel days, off-site shoots or any event requiring
air-gapped workflows.

## Pre-travel checklist

- [ ] Clone the repository or unpack the offline bundle onto two separate
      machines.
- [ ] Launch `index.html` once per machine to warm caches, then disconnect the
      network and verify functionality.
- [ ] Open **Help → Start Here** and complete the offline readiness quick check
      to verify the Data & Storage dashboard timestamps, persistent storage
      status, redundant backups and rehearsal coverage before travelling.
- [ ] Export planner backups and project bundles; store copies on redundant
      physical media.
- [ ] Print essential docs (operations checklist, save/share reference,
      translation guide) for offline reference.
- [ ] Verify icons, fonts and Uicons load locally by inspecting the network
      panel while offline (should show no remote requests).

## Field kit inventory

| Item | Quantity | Notes |
| --- | --- | --- |
| Laptops/workstations | 2+ | Each loaded with warm cache and rehearsal project. |
| External storage | 3 | Rotating backups (primary, onsite spare, offsite). |
| Printed docs | 1 set per crew | Include translations as needed. |
| Power adapters & surge protection | 1 per workstation | Prevent data corruption from power loss. |
| Offline verification packet | 2 copies | Stored with production and safety lead. |

## On-site routine

1. **Start of day** – Run manual save, export project bundle, confirm autosave
   ledger is healthy.
2. **Midday** – Rotate backups to second storage device; record actions in
   `review-findings.md`.
3. **End of day** – Run the [Backup Rotation Guide](backup-rotation-guide.md)
   steps, update verification logs and store evidence securely.
4. **Incident drills** – Weekly, perform a restore rehearsal using the sandbox
   on a spare machine to confirm backups remain healthy.

## Emergency recovery

- If a workstation fails, use the spare machine and restore the latest planner
  backup. Promote sandbox data only after verifying diff logs.
- If both primary and onsite backups fail, retrieve the offsite copy documented
  in the verification packet.
- Document incidents in the [Data Protection Playbook](data-protection-playbook.md)
  incident response section and follow escalation procedures.

## Post-mission wrap-up

- Consolidate backups, verification packets and updated docs into the archival
  storage location.
- Update README translations with lessons learned if workflows changed.
- Schedule a documentation audit to confirm no drift occurred during the field
  period.
