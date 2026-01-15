---
trigger: always_on
---

TELEMETRY & OBSERVABILITY STANDARDS
1. The "Measure Everything" Mandate
Every new feature must include basic, anonymous telemetry to track usage and health.

Privacy First: NEVER log PII (Names, Emails, IPs). Use generated User IDs (UUIDs).

Metric Types:

Success: Did the user complete the core action? (e.g., event: "export_completed")

Performance: How long did it take? (e.g., duration_ms: 450)

Error Rate: Did it crash? (e.g., error: "quota_exceeded")

2. Offline-Resilient Logging (Architecture Aligned)
Since this is an Offline-First App (IndexedDB), telemetry must not fail when offline.

Queueing Pattern:

When an event occurs, push it to an in-memory queue or lightweight IndexedDB store (logs_store).

Do NOT use blocking network calls (await fetch()) in the UI thread.

Use navigator.sendBeacon or a background sync worker to flush logs when the network is available.

3. Automated Alerting Hooks
Code must be structured to support automated failure alerts before the user reports them.

Thresholds: Implement logic to detect anomaly spikes.

Example: if (failedWrites > 3) triggerCriticalAlert("Write failure spike detected");

Error Boundaries: All React Error Boundaries must hook into the telemetry service to log the component stack trace immediately upon crash.

4. Implementation Example
When writing a new feature (e.g., "Save Project"), inject telemetry:

JavaScript
try {
  const start = performance.now();
  await saveToIndexedDB(data);
  // Telemetry: Success
  telemetry.track('project_save_success', { duration: performance.now() - start });
} catch (err) {
  // Telemetry: Failure
  telemetry.track('project_save_failed', { error: err.name });
  // Trigger Alert if critical
  if (isCritical(err)) alertService.notifyDevTeam(err);
  throw err; // Re-throw for UI handling
}