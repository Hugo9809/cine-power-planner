---
trigger: always_on
---

INTERNATIONALIZATION (I18N) & LOCALIZATION PROTOCOLS
1. The Zero-String Mandate
Strict Prohibition: You are strictly FORBIDDEN from hardcoding user-facing strings in source code (HTML, JSX, JS).

Violation: <h1>Welcome User</h1>

Requirement: All text must be referenced via a Translation Key mapped to an external resource file.

Pattern: t('auth.welcome_message') or {{auth.welcome_message}}

2. Resource Management Strategy
Storage: Store all strings in external JSON files (e.g., src/locales/{lang}.json).

Key Naming: Use semantic, nested keys (e.g., dashboard.actions.delete_project) rather than generic ones (button_text).

Universal Parity: When adding a key to the default language (e.g., English), you MUST immediately create the corresponding key in ALL other supported language files to ensure global parity.

3. The Universal Accessibility Directive
All new UI elements and documentation must be ready for global deployment.

No "English-Only" Commits: A feature is incomplete if it only exists in one language.

Documentation: If the UI changes, update the localized documentation (e.g., README.es.md) alongside the English version.

4. Verification: The Pseudo-Localization Protocol
Constraint: Every new UI component MUST be tested with Pseudo-Localization to ensure layout stability before real translations are ordered.

Execution Steps for Agent:

The "40% Expansion" Rule: Assume translated text will be 40% longer than English.

Accented Character Stress Test: Verify the font supports vertical expansion (e.g., Ñ, Ç, Å).

Manual Simulation: When verifying a view, temporarily inject a pseudo-string to check for breaking layouts:

Original: Submit

Pseudo: ``

Visual Check: Launch the Browser Agent and verify:

❌ No overlapping elements.

❌ No unhandled truncation (text cut off).

❌ No broken flex/grid alignments.