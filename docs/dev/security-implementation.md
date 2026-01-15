# Security Implementation Guide

This guide details the technical controls used to secure Cine Power Planner, focusing on ensuring the safety of local-first data and preventing XSS in a zero-trust offline environment.

## 1. Content Security Policy (CSP)

Since the app runs locally, often via `file://` or `localhost`, the CSP is our primary defense against malicious scripts if a user imports a compromised project file.

**Policy Strategy:**
*   `default-src 'self'`: Only allow assets from our own origin.
*   `script-src 'self' 'unsafe-inline'`: (Required for some legacy shims, but working to remove 'unsafe-inline').
*   `style-src 'self' 'unsafe-inline'`: Allow inline styles for dynamic theming (Pink Mode).
*   `worker-src 'self' blob:`: Allow service workers and web workers.
*   `connect-src 'self'`: Restrict network requests (ensuring no data exfiltration).

**Implementation Locaton:**
*   `index.html` `<meta>` tag.
*   We do **not** rely on headers since the app may be served statically.

## 2. Input Sanitization & Project Hydration

User Input comes from two sources:
1.  **Forms**: Direct typing.
2.  **Imports**: Loading `.json` files.

**The "Dirty" Zone:**
`JSON.parse()` is safe, but the resulting object may contain HTML strings.

**The Defense:**
*   **No `innerHTML`**: V2 components must use `textContent` or `innerText` when rendering user strings.
*   **Sanitized Exports**: We do not export functions or executable code in JSON wrappers.

## 3. Dependency Supply Chain

We minimize external dependencies to reduce the attack surface.

*   **Lockfiles**: `package-lock.json` is committed and strictly enforced.
*   **Audits**: `npm audit` runs in CI.
*   **Vendoring**: Critical libraries (like `lz-string`) are vendored or bundled rather than fetched from CDNs, ensuring the app works offline and the code cannot change underneath us.

## 4. Local Storage Security

Data is stored in `IndexedDB`.
*   **Isolation**: Browser Same-Origin Policy prevents other websites from reading our DB.
*   **Encryption**: Currently, data is stored loosely. **Future**: We plan to implement `SubtleCrypto` for "Vault" projects.

## 5. Developer Rules
1.  **Never commit secrets**: (AWS keys, etc.) - The repo is public.
2.  **No `eval()`**: Use `Function` constructor only if absolutely necessary and scoped (none present currently).
3.  **No Analytics**: Do not add Google Analytics or generic trackers that leak user metadata.
