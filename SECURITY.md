# Security Policy

## Supported Versions

| Version | Supported          |
| :------ | :----------------- |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take the security of our users' data seriously. If you discover a vulnerability, please report it privately.

**Do NOT open a public GitHub Issue for security vulnerabilities.**

Instead, please email **security@lucazanner.de** with:
1.  A brief description of the vulnerability.
2.  Steps to reproduce the issue.
3.  Any potential impact (e.g., data leak, XSS).

We will acknowledge your report within 48 hours and provide a timeline for a fix.

## Data Safety Architecture
Our application is designed as "Local-First".
*   **No Cloud by Default**: All data stays in the user's browser (IndexedDB).
*   **No Tracking**: We do not use third-party analytics scripts that harvest PII.
*   **Safe Imports**: All project imports are sanitized against XSS before hydration.
