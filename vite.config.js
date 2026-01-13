import { defineConfig } from 'vite';
import { resolve, join, relative, extname } from 'path';
import { readdirSync, writeFileSync, copyFileSync, existsSync } from 'fs';

/**
 * File extensions to include in the service worker cache.
 */
const CACHEABLE_EXTENSIONS = new Set([
    '.html', '.js', '.css', '.json', '.webmanifest',
    '.woff', '.woff2', '.ttf', '.eot',
    '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico', '.webp',
]);

/**
 * Recursively collects all cacheable files from a directory.
 */
function collectAssets(dir, baseDir) {
    const assets = [];

    try {
        const entries = readdirSync(dir, { withFileTypes: true });

        for (const entry of entries) {
            const fullPath = join(dir, entry.name);
            const relativePath = relative(baseDir, fullPath);

            // Skip source maps and hidden files
            if (entry.name.endsWith('.map') || entry.name.startsWith('.')) {
                continue;
            }

            if (entry.isDirectory()) {
                assets.push(...collectAssets(fullPath, baseDir));
            } else if (entry.isFile()) {
                const ext = extname(entry.name).toLowerCase();
                if (CACHEABLE_EXTENSIONS.has(ext)) {
                    assets.push('./' + relativePath.replace(/\\/g, '/'));
                }
            }
        }
    } catch (error) {
        console.warn(`[sw-assets] Could not read directory ${dir}:`, error.message);
    }

    return assets;
}

/**
 * Generates service-worker-assets.js content.
 */
function generateManifestContent(assets) {
    const sortedAssets = ['./'].concat([...assets].filter(a => a !== './').sort());
    const json = JSON.stringify(sortedAssets, null, 2).replace(/\n/g, '\n  ');

    return `(function createServiceWorkerAssetManifest(globalScope) {
  const assets = ${json};

  if (globalScope && typeof globalScope === 'object') {
    globalScope.SERVICE_WORKER_ASSETS = assets;
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = assets;
  }

  return assets;
})(typeof self !== 'undefined' ? self : typeof globalThis !== 'undefined' ? globalThis : undefined);
`;
}

/**
 * Vite plugin to generate service worker assets and copy service worker files to dist.
 */
function serviceWorkerPlugin() {
    return {
        name: 'service-worker-build',
        apply: 'build',
        closeBundle() {
            const projectRoot = process.cwd();
            const distDir = join(projectRoot, 'dist');

            // 1. Copy service-worker.js to dist
            const swSource = join(projectRoot, 'service-worker.js');
            const swDest = join(distDir, 'service-worker.js');
            if (existsSync(swSource)) {
                copyFileSync(swSource, swDest);
                console.log('[sw-build] ✓ Copied service-worker.js to dist/');
            } else {
                console.warn('[sw-build] ⚠ service-worker.js not found in project root');
            }

            // 2. Generate app-version.js in dist (using package.json version)
            const versionDest = join(distDir, 'app-version.js');
            const version = process.env.npm_package_version || '1.0.0';
            const versionContent = `(function(s){s.APP_VERSION='${version}';if(typeof module!=='undefined')module.exports=s.APP_VERSION;})(typeof self!=='undefined'?self:this);`;

            try {
                writeFileSync(versionDest, versionContent, 'utf-8');
                console.log(`[sw-build] ✓ Generated app-version.js (${version}) in dist/`);
            } catch (err) {
                console.warn('[sw-build] ⚠ Failed to generate app-version.js:', err.message);
            }

            // 3. Generate service-worker-assets.js from dist contents
            const assets = collectAssets(distDir, distDir);
            const manifestContent = generateManifestContent(assets);
            const manifestPath = join(distDir, 'service-worker-assets.js');
            writeFileSync(manifestPath, manifestContent, 'utf-8');
            console.log(`[sw-build] ✓ Generated service-worker-assets.js with ${assets.length} assets`);
        },
    };
}

export default defineConfig({
    // Root directory is the project root (where index.html is)
    root: '.',

    // Plugins
    plugins: [serviceWorkerPlugin()],

    // Development server configuration
    server: {
        port: 3000,
        open: false, // Don't auto-open browser (user may have http-server running)
        strictPort: true, // Fail if port 3000 is taken
    },

    // Build configuration
    build: {
        outDir: 'dist',
        emptyOutDir: true,
        // Generate source maps for debugging
        sourcemap: true,
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
            },
            output: {
                // Code-splitting: Create separate chunks for better caching
                manualChunks: (id) => {
                    // V2 UI components
                    if (id.includes('/scripts/v2/')) {
                        return 'v2-ui';
                    }
                    // Data layer
                    if (id.includes('/data/')) {
                        return 'data';
                    }
                    // Core modules (converted to ESM)
                    if (id.includes('/scripts/modules/') && (
                        id.includes('icons') ||
                        id.includes('device-normalization') ||
                        id.includes('logging') ||
                        id.includes('persistence') ||
                        id.includes('storage')
                    )) {
                        return 'core-modules';
                    }
                    // Vendor/shims
                    if (id.includes('node_modules') || id.includes('-shim')) {
                        return 'vendor';
                    }
                },
            },
        },
    },

    // Resolve aliases for cleaner imports
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
            '@scripts': resolve(__dirname, 'src/scripts'),
            '@styles': resolve(__dirname, 'src/styles'),
            '@data': resolve(__dirname, 'src/data'),
        },
    },

    // Define global constants
    define: {
        // Preserve existing APP_VERSION behavior
        'import.meta.env.APP_VERSION': JSON.stringify(process.env.npm_package_version || '1.0.0'),
    },
});
