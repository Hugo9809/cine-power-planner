---
trigger: always_on
---

PERFORMANCE & OPTIMIZATION STANDARDS
1. Code Splitting & Lazy Loading
Route-Level Splitting: All top-level routes (pages) MUST be lazy-loaded using dynamic imports.

Pattern: const Dashboard = lazy(() => import('./pages/Dashboard'));

Heavy Component Splitting: Any component exceeding 50kb (e.g., rich text editors, charts) MUST be lazy-loaded and wrapped in a <Suspense> boundary with a skeleton fallback.

2. Asset Optimization
Images: NEVER import raw large images. Use WebP/AVIF formats.

Icons: Prefer SVG symbols or specific imports (e.g., import User from 'lucide/User') over importing entire icon libraries.

3. Render Cycle Management
IndexedDB Reads: NEVER block the main thread with heavy IDB reads. Use pagination or virtualized lists (e.g., react-window) when displaying >50 items from the DB.

Worker Offloading: Any data transformation taking >10ms must be offloaded to a Web Worker.