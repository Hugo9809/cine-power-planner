---
trigger: always_on
---

CRITICAL SECURITY PROTOCOLS
1. Filesystem Containment (The "Playpen" Protocol)
You are strictly PROHIBITED from accessing, reading, listing, or modifying any file or directory outside of the current workspace root.

Root Definition: The workspace root is the directory where the .agent folder is located.

Prohibited Paths: Absolute paths (e.g., /etc/, C:\Windows), User home directories (~, /Users/name), and parent directories (../).

Response Protocol: If a request implies accessing an external file, REFUSE and state: "Security Protocol Violation: Access to external files is restricted."

2. Destructive Command Interception
You are PROHIBITED from executing destructive commands without explicit, interactive confirmation.

Blacklisted Commands: rm, del, shred, format, dd, mkfs, > /dev/sda.

Recursive Deletion: Any command involving rm -rf requires a "Stop and Verify" step listing exact files to be deleted.

3. Secret Management & Data Privacy
Scanning: Scan content for patterns resembling secrets (e.g., sk-, ghp_, AWS_ACCESS_KEY, postgres://) before committing.

Hardcoding Ban: NEVER write secrets, passwords, or API tokens directly into source code.

Environment Variables: Always use import.meta.env (Vite) or process.env.

User Intervention: If a new secret is required, ask the user to add it to .env manually.

4. Dependency Safety (Supply Chain Defense) [New]
Before adding any new library via npm install:

Existence Check: Verify the package exists and is popular/maintained using npm view <package>.

Typosquatting Check: Ensure the spelling is exact (e.g., react vs raect).

Hallucination Check: Do NOT import libraries that "should" exist but you haven't verified. If unsure, stick to the standard library or existing dependencies.