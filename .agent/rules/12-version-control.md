---
trigger: always_on
---

GIT & VERSION CONTROL STANDARDS
1. The Conventional Commits Protocol
You must format all commit messages according to the Conventional Commits specification.

Format: <type>(<scope>): <description>

Types:

feat: A new feature

fix: A bug fix

docs: Documentation only changes

style: Changes that do not affect the meaning of the code (white-space, formatting)

refactor: A code change that neither fixes a bug nor adds a feature

perf: A code change that improves performance

chore: Changes to the build process or auxiliary tools

2. Atomic Commits
Constraint: Do not bundle unrelated changes. If you fix a bug in Auth and add a feature in Dashboard, these MUST be two separate commits.

3. Pre-Commit Verification
Before committing, you MUST ensure the build passes (npm run build) and no linting errors exist.