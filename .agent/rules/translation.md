---
trigger: always_on
---

The Universal Accessibility Directive: All new UI elements and documentation must be translated into all supported languages prior to deployment to ensure seamless global parity and accessibility.

No user-facing string shall exist in the source code. All text must be referenced via a Translation Key (e.g., {{auth.login_button}}) mapped to an externalized JSON/YAML resource file.

Every new UI component must be tested with Pseudo-Localization (text expanded by 40% with accented characters) to ensure layouts don’t overlap or truncate before real translations are even ordered.