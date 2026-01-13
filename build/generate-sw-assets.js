/**
 * Build-time service worker asset manifest generator.
 *
 * This module scans the dist/ directory after a Vite build and generates
 * a service-worker-assets.js file containing all cacheable assets.
 */

import { readdirSync, statSync, writeFileSync } from 'fs';
import { join, relative, extname } from 'path';

/**
 * File extensions to include in the service worker cache.
 * Source maps are excluded as they are development-only.
 */
const CACHEABLE_EXTENSIONS = new Set([
    '.html',
    '.js',
    '.css',
    '.json',
    '.webmanifest',
    '.woff',
    '.woff2',
    '.ttf',
    '.eot',
    '.png',
    '.jpg',
    '.jpeg',
    '.gif',
    '.svg',
    '.ico',
    '.webp',
]);

/**
 * Patterns to explicitly exclude from caching.
 */
const EXCLUDE_PATTERNS = [
    /\.map$/,           // Source maps
    /\.d\.ts$/,         // TypeScript declarations
    /^\.DS_Store$/,     // macOS metadata
    /^Thumbs\.db$/,     // Windows metadata
];

/**
 * Recursively collects all files matching cacheable criteria.
 * @param {string} dir - Directory to scan
 * @param {string} baseDir - Base directory for relative path calculation
 * @returns {string[]} Array of relative file paths
 */
function collectAssets(dir, baseDir) {
    const assets = [];

    try {
        const entries = readdirSync(dir, { withFileTypes: true });

        for (const entry of entries) {
            const fullPath = join(dir, entry.name);
            const relativePath = relative(baseDir, fullPath);

            // Skip excluded patterns
            if (EXCLUDE_PATTERNS.some(pattern => pattern.test(entry.name))) {
                continue;
            }

            if (entry.isDirectory()) {
                // Recursively scan subdirectories
                assets.push(...collectAssets(fullPath, baseDir));
            } else if (entry.isFile()) {
                const ext = extname(entry.name).toLowerCase();
                if (CACHEABLE_EXTENSIONS.has(ext)) {
                    // Use ./ prefix for service worker compatibility
                    assets.push('./' + relativePath.replace(/\\/g, '/'));
                }
            }
        }
    } catch (error) {
        console.warn(`[generate-sw-assets] Warning: Could not read directory ${dir}:`, error.message);
    }

    return assets;
}

/**
 * Generates the service-worker-assets.js file content.
 * Maintains compatibility with the existing service worker interface.
 * @param {string[]} assets - Array of asset paths
 * @returns {string} JavaScript file content
 */
function generateManifestContent(assets) {
    // Sort assets for consistent output
    const sortedAssets = [...assets].sort();

    // Ensure root alias is first if present
    const rootIndex = sortedAssets.indexOf('./');
    if (rootIndex === -1) {
        // Add root alias for SPA navigation
        sortedAssets.unshift('./');
    } else if (rootIndex > 0) {
        // Move to front
        sortedAssets.splice(rootIndex, 1);
        sortedAssets.unshift('./');
    }

    const assetListJson = JSON.stringify(sortedAssets, null, 2)
        .replace(/\n/g, '\n  '); // Indent for readability

    return `
(function createServiceWorkerAssetManifest(globalScope) {
  const assets = ${assetListJson};

  if (globalScope && typeof globalScope === 'object') {
    globalScope.SERVICE_WORKER_ASSETS = assets;
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = assets;
  }

  return assets;
})(typeof self !== 'undefined' ? self : typeof globalThis !== 'undefined' ? globalThis : undefined);
`.trim() + '\n';
}

/**
 * Main generation function.
 * @param {string} distDir - Path to the dist directory
 * @param {string} outputPath - Path to write the manifest file
 * @returns {{ assetCount: number, outputPath: string }}
 */
export function generateServiceWorkerAssets(distDir, outputPath) {
    console.log('[generate-sw-assets] Scanning:', distDir);

    const assets = collectAssets(distDir, distDir);

    console.log(`[generate-sw-assets] Found ${assets.length} cacheable assets`);

    const content = generateManifestContent(assets);
    writeFileSync(outputPath, content, 'utf-8');

    console.log('[generate-sw-assets] Generated:', outputPath);

    return {
        assetCount: assets.length,
        outputPath,
    };
}

/**
 * Vite plugin factory.
 * Generates service-worker-assets.js after each production build.
 * @returns {import('vite').Plugin}
 */
export function serviceWorkerAssetsPlugin() {
    return {
        name: 'generate-service-worker-assets',
        apply: 'build',
        closeBundle() {
            const distDir = join(process.cwd(), 'dist');
            const outputPath = join(distDir, 'service-worker-assets.js');

            try {
                const result = generateServiceWorkerAssets(distDir, outputPath);
                console.log(`[generate-sw-assets] ✓ Generated manifest with ${result.assetCount} assets`);
            } catch (error) {
                console.error('[generate-sw-assets] ✗ Failed to generate manifest:', error);
                throw error;
            }
        },
    };
}

export default serviceWorkerAssetsPlugin;
