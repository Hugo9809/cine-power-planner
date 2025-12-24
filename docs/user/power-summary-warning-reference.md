# Power Summary Warning Reference

## "Power Summary: Warnings and backups"

This checklist step fires whenever the **Power Summary** detects a mismatch between the load your connectors can safely deliver and the draw you have scheduled. It highlights four safeguard areas you must review before marking the step complete:

1. **Color-coded connector status (Pins and D-Tap)**
   Two warning boxes appear in Power Summary—one for *Pin* connectors and one for *D-Tap*. Each uses the same color scale: **green** confirms the battery feed is operating safely, **yellow** shows the battery feed is approaching its maximum rating, and **red** indicates the camera rig is pulling more power than the battery can provide. Record which box changed color and capture a screenshot or note in the offline incident log.

2. **Connector capacity alerts**
   *D-Tap, XLR, barrel, and custom pin assemblies* each publish a tested continuous amperage ceiling. When the projected draw for any attached device exceeds that ceiling—or when combined accessories on the same bus push the shared battery feed past its safe limit—the step raises a connector warning. You must log that warning and either rebalance the load across different batteries or down-rate the connected devices. Leaving the imbalance unaddressed risks overheated pins, brownouts, or permanent connector failure.

3. **Redundant power backups**
   The warning also verifies that every primary feed has at least one warm backup (typically a charged battery, UPS, or secondary generator tap) with runtime that matches or exceeds the expected session. If a feed is missing redundancy, or if the backup runtime drops below 80 % of the session estimate, the step flags the risk so you can stage additional packs and document the update in the offline log.

4. **Autosave and share state alignment**
   Because productions often review Power Summary snapshots offline, the autosave banner must show the same timestamped state as the share/export dialogs. A mismatch suggests an autosave lag, which could cause outdated plans to circulate. Confirm that autosave has completed, then regenerate any shared or exported copies so all collaborators reference the same warning history.

### Response checklist

- Capture the connector warning details in the offline incident log (source battery feed, expected load, mitigation).
- Reassign or shed load until every connector operates within its rated continuous current.
- Confirm the Pin and D-Tap warning boxes both return to green before closing the step.
- Stage and verify redundant backups that can assume the load without manual rewiring.
- Confirm the autosave banner timestamp matches the share/export preview before distributing the plan.
- Re-run the Power Summary check to ensure the warning clears and the updated state is synced across offline caches.

Keeping this step green protects equipment, preserves data integrity across offline workflows, and ensures crews receive the latest, fully backed-up plan—even without network access.
