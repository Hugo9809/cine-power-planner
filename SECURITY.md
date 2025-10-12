# Security Policy — camera-power-planner

We take the security of camera-power-planner seriously and appreciate responsible disclosures from the community.

## Supported Versions

We follow semantic versioning. The following tracks receive security fixes:

- **`main` branch** — actively developed
- **Latest stable release** — critical and high-severity fixes
- Older releases — best-effort only

If you rely on a specific version, please keep it updated to the latest patch/minor release.

## How to Report a Vulnerability

**Preferred:** Use GitHub’s **“Report a vulnerability”** button on this repository (Private Vulnerability Reporting). This opens a private thread with the maintainers. :contentReference[oaicite:0]{index=0}

**Fallback:** If the button is unavailable, email **<your-security-email@yourdomain>** with:
- A clear description of the issue and potential impact
- Minimal steps to reproduce (PoC if possible)
- Affected version/commit and environment details
- Your contact info for follow-up

Please **do not** open public issues or PRs for security problems.

We’ll acknowledge valid reports within **3 business days**, provide a status update within **7 days**, and work with you on a fix and coordinated disclosure.

## Coordinated Disclosure

By default we practice **coordinated vulnerability disclosure (CVD)**. We prefer to publish details **after a fix is available** and users have a reasonable update window. We aim to resolve most issues within **90 days** of acknowledgement, with extensions by mutual agreement for complex cases. :contentReference[oaicite:1]{index=1}

If appropriate, we’ll open a **GitHub Security Advisory** and, where warranted, request a **CVE ID** through GitHub’s CVE process. :contentReference[oaicite:2]{index=2}

## Safe Harbor / Research Guidelines

We won’t pursue legal action or DMCA claims against researchers who:
- Make a **good-faith** effort to follow this policy
- Avoid privacy violations, data destruction, and service degradation
- Don’t access data that isn’t yours
- Don’t exfiltrate more data than necessary to prove the issue
- Give us reasonable time to remediate before public disclosure

This “safe harbor” language is aligned with common disclose.io principles. :contentReference[oaicite:3]{index=3}

### In-Scope

- Code and configurations in this repository
- Build artifacts created from this repo when run locally/dev

### Out-of-Scope

- Social engineering, physical attacks, or third-party services
- Denial-of-service (volumetric or resource exhaustion) testing
- Issues that require a compromised device or rooted/jailbroken OS
- Vulnerabilities already flagged by our dependency alerts
- Non-security bugs (typos, UI polish, missing best-practices without exploitability)

## Security Development Practices

We continuously improve security with:
- **Private vulnerability reporting & advisories** on GitHub (see above)
- **Dependency updates and alerts** (e.g., Dependabot) and **code scanning/CodeQL** where applicable
- Design and code reviews mindful of the **OWASP Top 10** risks (e.g., Broken Access Control, Injection, Cryptographic Failures, etc.). :contentReference[oaicite:4]{index=4}

## Optional: security.txt

If you also operate a related site or domain, consider publishing an RFC 9116 `security.txt` to advertise your disclosure process (points to this policy and your contact). :contentReference[oaicite:5]{index=5}

**Example (replace with your details):**
Contact: mailto: info@lucazanner.com
Policy: https://github.com/Hugo9809/camera-power-planner/blob/main/SECURITY.md
Preferred-Languages: en, de

---

Thank you for helping keep camera-power-planner and its users safe.
