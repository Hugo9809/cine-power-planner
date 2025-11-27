(function () {
  function getModuleDirectory(moduleId) {
    const segments = moduleId.split('/');
    segments.pop();
    return segments.join('/');
  }

  function normalizeFromDir(moduleDir, request) {
    const segments = moduleDir ? moduleDir.split('/') : [];
    const parts = request.split('/');
    for (let index = 0; index < parts.length; index += 1) {
      const segment = parts[index];
      if (!segment || segment === '.') {
        continue;
      }
      if (segment === '..') {
        if (segments.length) {
          segments.pop();
        }
        continue;
      }
      segments.push(segment);
    }
    return segments.join('/');
  }

  /* eslint-disable no-unused-vars */
  const MODULE_FACTORIES = {
    'modules/core/pink-mode-animations.js': function (module, exports, require) {
      /* global applyPinkModeIcon, startPinkModeIconRotation, stopPinkModeIconRotation, handlePinkModeIconPress */

      /*
       * Pink mode animation helpers extracted from the main app runtime.
       *
       * This module centralises all logic that coordinates the pink mode icons,
       * animated decorations and their supporting Lottie runtime loader so that
       * the main app-core bundle can stay leaner.
       */
      (function () {
        function detectGlobalScope() {
          if (typeof globalThis !== "undefined" && globalThis && typeof globalThis === "object") {
            return globalThis;
          }
          if (typeof window !== "undefined" && window && typeof window === "object") {
            return window;
          }
          if (typeof self !== "undefined" && self && typeof self === "object") {
            return self;
          }
          if (typeof global !== "undefined" && global && typeof global === "object") {
            return global;
          }
          return null;
        }

        const GLOBAL_SCOPE = detectGlobalScope();

        function normalizePinkModeAssetKey(path) {
          if (typeof path !== 'string') {
            return '';
          }
          const trimmed = path.trim();
          return trimmed;
        }

        function normalizePinkModeBaseHref(href) {
          if (typeof href !== 'string' || !href) {
            return '';
          }

          const fallbackBase =
            (GLOBAL_SCOPE &&
              GLOBAL_SCOPE.location &&
              typeof GLOBAL_SCOPE.location.href === 'string' &&
              GLOBAL_SCOPE.location.href) ||
            (typeof location !== 'undefined' &&
              location &&
              typeof location.href === 'string'
              ? location.href
              : undefined);

          try {
            const url = fallbackBase ? new URL(href, fallbackBase) : new URL(href);
            const path = typeof url.pathname === 'string' ? url.pathname : '';

            let baseAdjusted = false;
            if (path) {
              const stripSegments = Object.freeze(['/src/scripts/', '/scripts/', '/legacy/scripts/']);
              for (let index = 0; index < stripSegments.length; index += 1) {
                const marker = stripSegments[index];
                const markerIndex = path.indexOf(marker);
                if (markerIndex === -1) {
                  continue;
                }

                const basePath = path.slice(0, markerIndex);
                if (basePath) {
                  url.pathname = basePath.endsWith('/') ? basePath : `${basePath}/`;
                } else {
                  url.pathname = '/';
                }
                baseAdjusted = true;
                break;
              }
            }
            if (!baseAdjusted && path && !path.endsWith('/')) {
              const lastSlash = path.lastIndexOf('/');
              const lastSegment = lastSlash !== -1 ? path.slice(lastSlash + 1) : path;
              if (lastSegment && lastSegment.indexOf('.') === -1) {
                url.pathname = `${path}/`;
              } else {
                url.pathname = lastSlash >= 0 ? path.slice(0, lastSlash + 1) : '/';
              }
            }

            if (!url.pathname.endsWith('/')) {
              url.pathname = `${url.pathname}/`;
            }

            url.search = '';
            url.hash = '';

            return url.href;
          } catch (error) {
            void error;
            return '';
          }
        }

        function resolvePinkModeAssetBaseUrl() {
          const candidates = [];

          if (typeof document !== 'undefined' && document) {
            if (typeof document.baseURI === 'string' && document.baseURI) {
              candidates.push(document.baseURI);
            }
            if (document.currentScript && document.currentScript.src) {
              candidates.push(document.currentScript.src);
            }
          }

          if (
            GLOBAL_SCOPE &&
            GLOBAL_SCOPE.location &&
            typeof GLOBAL_SCOPE.location.href === 'string' &&
            GLOBAL_SCOPE.location.href
          ) {
            candidates.push(GLOBAL_SCOPE.location.href);
          }

          if (
            typeof location !== 'undefined' &&
            location &&
            typeof location.href === 'string' &&
            location.href
          ) {
            candidates.push(location.href);
          }

          for (let index = 0; index < candidates.length; index += 1) {
            const normalized = normalizePinkModeBaseHref(candidates[index]);
            if (normalized) {
              return normalized;
            }
          }

          return '';
        }

        function resolvePinkModeAssetUrl(path) {
          const normalized = normalizePinkModeAssetKey(path);
          if (!normalized) {
            return null;
          }

          const encodedNormalized = encodeURI(normalized);

          if (normalized.slice(0, 2) === '//' || normalized.indexOf('://') !== -1) {
            try {
              return new URL(normalized).href;
            } catch (error) {
              void error;
              return encodedNormalized;
            }
          }

          const baseUrl = resolvePinkModeAssetBaseUrl();
          if (!baseUrl) {
            return encodedNormalized;
          }

          try {
            return new URL(normalized, baseUrl).href;
          } catch (error) {
            void error;
          }

          try {
            return new URL(encodedNormalized, baseUrl).href;
          } catch (encodedError) {
            void encodedError;
          }

          if (encodedNormalized.charAt(0) === '/') {
            return encodedNormalized;
          }

          if (baseUrl.charAt(baseUrl.length - 1) === '/') {
            return baseUrl + encodedNormalized;
          }

          return `${baseUrl}/${encodedNormalized}`;
        }

        function createPinkModeAssetRequest(url) {
          if (typeof Request !== 'function' || !url) {
            return null;
          }

          try {
            return new Request(url, { credentials: 'same-origin' });
          } catch (error) {
            void error;
            return null;
          }
        }

        async function readResponseTextSafe(response) {
          if (!response) {
            return null;
          }

          try {
            return await response.text();
          } catch (error) {
            console.warn('Could not read pink mode asset response text', error);
            return null;
          }
        }

        async function fetchPinkModeAssetFromNetwork(requestOrUrl) {
          if (typeof fetch !== 'function' || !requestOrUrl) {
            return null;
          }

          try {
            const response = await fetch(requestOrUrl);
            if (!response) {
              return null;
            }

            if (response.ok || response.type === 'opaque') {
              return readResponseTextSafe(response.clone());
            }
          } catch (error) {
            void error;
          }

          return null;
        }

        async function fetchPinkModeAssetFromCaches(requestOrUrl) {
          if (
            typeof caches === 'undefined' ||
            !caches ||
            typeof caches.match !== 'function' ||
            !requestOrUrl
          ) {
            return null;
          }

          try {
            const cached = await caches.match(requestOrUrl, { ignoreSearch: true });
            if (!cached) {
              return null;
            }
            return readResponseTextSafe(cached.clone());
          } catch (error) {
            console.warn('Could not load pink mode asset from cache storage', error);
            return null;
          }
        }

        function createPinkModeXhrUrlVariants(url) {
          const variants = [];
          const registerVariant = candidate => {
            if (typeof candidate !== 'string' || !candidate) {
              return;
            }
            if (variants.indexOf(candidate) === -1) {
              variants.push(candidate);
            }
          };

          registerVariant(url);

          if (typeof url === 'string') {
            try {
              const decoded = decodeURI(url);
              registerVariant(decoded);
            } catch (decodeError) {
              void decodeError;
            }
          }

          return variants;
        }

        async function fetchPinkModeAssetViaXHR(url) {
          if (typeof XMLHttpRequest === 'undefined' || !url) {
            return null;
          }

          const candidates = createPinkModeXhrUrlVariants(url);

          for (let index = 0; index < candidates.length; index += 1) {
            const candidateUrl = candidates[index];
            const result = await new Promise(resolve => {
              try {
                const request = new XMLHttpRequest();
                request.open('GET', candidateUrl, true);
                request.onreadystatechange = function handleReadyStateChange() {
                  if (request.readyState !== 4) {
                    return;
                  }
                  if ((request.status >= 200 && request.status < 300) || request.status === 0) {
                    resolve(request.responseText || '');
                    return;
                  }
                  resolve(null);
                };
                request.onerror = function handleXHRError() {
                  resolve(null);
                };
                request.send();
              } catch (error) {
                void error;
                resolve(null);
              }
            });

            if (result !== null) {
              return result;
            }
          }

          return null;
        }

        const pinkModeAssetTextCache = new Map();
        const pinkModeAssetTextPromiseCache = new Map();

        function getPinkModeEmbeddedAssetStore() {
          const scope = GLOBAL_SCOPE ||
            (typeof window !== 'undefined' && window) ||
            (typeof self !== 'undefined' && self) ||
            null;

          if (!scope) {
            return null;
          }

          try {
            const store = scope.cinePinkModeAnimatedIconData;
            if (store && typeof store === 'object') {
              return store;
            }
          } catch (error) {
            void error;
          }

          return null;
        }

        function resolvePinkModeEmbeddedAsset(key) {
          if (typeof key !== 'string' || !key) {
            return null;
          }

          const store = getPinkModeEmbeddedAssetStore();
          if (!store) {
            return null;
          }

          const candidates = [];
          const registerCandidate = candidate => {
            if (typeof candidate !== 'string' || !candidate) {
              return;
            }
            if (candidates.indexOf(candidate) === -1) {
              candidates.push(candidate);
            }
          };

          registerCandidate(key);

          const trimmed = key.replace(/^\.\/+/, '');
          if (trimmed && trimmed !== key) {
            registerCandidate(trimmed);
          }

          const decoded = decodePinkModeUriCandidate(key);
          if (decoded) {
            registerCandidate(decoded);
          }

          const encoded = encodeURI(key);
          if (encoded && encoded !== key) {
            registerCandidate(encoded);
          }

          if (trimmed) {
            const encodedTrimmed = encodeURI(trimmed);
            if (encodedTrimmed && encodedTrimmed !== trimmed) {
              registerCandidate(encodedTrimmed);
            }
          }

          for (let index = 0; index < candidates.length; index += 1) {
            const candidate = candidates[index];
            if (!Object.prototype.hasOwnProperty.call(store, candidate)) {
              continue;
            }
            const value = store[candidate];
            if (typeof value === 'string' && value) {
              return value;
            }
          }

          return null;
        }

        function decodePinkModeUriCandidate(value) {
          if (typeof value !== 'string' || !value) {
            return null;
          }

          try {
            const decoded = decodeURI(value);
            if (decoded && decoded !== value) {
              return decoded;
            }
          } catch (error) {
            void error;
          }

          return null;
        }

        function registerPinkModeNetworkVariant(variants, seen, candidate) {
          if (!candidate) {
            return;
          }

          const key =
            typeof candidate === 'string'
              ? candidate
              : candidate && typeof candidate.url === 'string'
                ? candidate.url
                : null;

          if (!key || seen.has(key)) {
            return;
          }

          seen.add(key);
          variants.push(candidate);
        }

        function createPinkModeNetworkRequestVariants(request, fallbackUrl, normalized) {
          const variants = [];
          const seen = new Set();

          if (request) {
            registerPinkModeNetworkVariant(variants, seen, request);

            if (typeof request.url === 'string') {
              const decodedRequestUrl = decodePinkModeUriCandidate(request.url);
              if (decodedRequestUrl) {
                registerPinkModeNetworkVariant(
                  variants,
                  seen,
                  createPinkModeAssetRequest(decodedRequestUrl) || decodedRequestUrl
                );
              }
            }
          }

          const urlCandidates = [];
          if (typeof fallbackUrl === 'string' && fallbackUrl) {
            urlCandidates.push(fallbackUrl);
            const decodedFallbackUrl = decodePinkModeUriCandidate(fallbackUrl);
            if (decodedFallbackUrl) {
              urlCandidates.push(decodedFallbackUrl);
            }
          }

          for (const url of urlCandidates) {
            registerPinkModeNetworkVariant(
              variants,
              seen,
              createPinkModeAssetRequest(url) || url
            );
          }

          if (typeof normalized === 'string' && normalized) {
            const normalizedVariants = [];
            normalizedVariants.push(normalized);

            const normalizedWithoutLeadingDot =
              normalized.charAt(0) === '.' ? normalized.slice(1) : normalized;
            if (normalizedWithoutLeadingDot) {
              normalizedVariants.push(normalizedWithoutLeadingDot);
            }

            if (normalized.charAt(0) !== '/') {
              normalizedVariants.push(`./${normalized}`);
              normalizedVariants.push(`/${normalized}`);
            } else {
              const trimmed = normalized.replace(/^\/+/, '');
              if (trimmed) {
                normalizedVariants.push(trimmed);
                normalizedVariants.push(`./${trimmed}`);
              }
            }

            const encoded = encodeURI(normalized);
            if (encoded && encoded !== normalized) {
              normalizedVariants.push(encoded);
              if (encoded.charAt(0) !== '/') {
                normalizedVariants.push(`./${encoded}`);
                normalizedVariants.push(`/${encoded}`);
              }
              const decodedEncoded = decodePinkModeUriCandidate(encoded);
              if (decodedEncoded) {
                normalizedVariants.push(decodedEncoded);
                if (decodedEncoded.charAt(0) !== '/') {
                  normalizedVariants.push(`./${decodedEncoded}`);
                  normalizedVariants.push(`/${decodedEncoded}`);
                }
              }
            }

            for (const variant of normalizedVariants) {
              registerPinkModeNetworkVariant(
                variants,
                seen,
                createPinkModeAssetRequest(variant) || variant
              );
            }
          }

          return variants;
        }

        function createPinkModeCacheKeyVariants(normalized, resolvedUrl, request) {
          const variants = [];

          if (request) {
            variants.push(request);
            if (typeof request.url === 'string' && request.url) {
              variants.push(request.url);
            }
          }

          if (resolvedUrl) {
            variants.push(resolvedUrl);
            const decodedResolvedUrl = decodePinkModeUriCandidate(resolvedUrl);
            if (decodedResolvedUrl) {
              variants.push(decodedResolvedUrl);
            }
          }

          if (!normalized) {
            return variants;
          }

          variants.push(normalized);

          const normalizedWithoutLeadingDot = normalized.charAt(0) === '.' ? normalized.slice(1) : normalized;
          if (normalizedWithoutLeadingDot) {
            variants.push(normalizedWithoutLeadingDot);
          }

          if (normalized.charAt(0) !== '/') {
            variants.push(`./${normalized}`);
            variants.push(`/${normalized}`);
          } else {
            const trimmed = normalized.replace(/^\/+/, '');
            if (trimmed) {
              variants.push(trimmed);
              variants.push(`./${trimmed}`);
            }
          }

          const encoded = encodeURI(normalized);
          if (encoded && encoded !== normalized) {
            variants.push(encoded);
            if (encoded.charAt(0) !== '/') {
              variants.push(`./${encoded}`);
              variants.push(`/${encoded}`);
            }
            const decodedEncoded = decodePinkModeUriCandidate(encoded);
            if (decodedEncoded) {
              variants.push(decodedEncoded);
              if (decodedEncoded.charAt(0) !== '/') {
                variants.push(`./${decodedEncoded}`);
                variants.push(`/${decodedEncoded}`);
              }
            }
          }

          const deduped = [];
          const seen = new Set();
          for (const variant of variants) {
            if (!variant) {
              continue;
            }
            const key = typeof variant === 'string' ? variant : variant.url || variant;
            if (!key || seen.has(key)) {
              continue;
            }
            seen.add(key);
            deduped.push(variant);
          }

          return deduped;
        }

        function loadPinkModeAssetText(path) {
          const normalized = normalizePinkModeAssetKey(path);
          if (!normalized) {
            return Promise.resolve(null);
          }

          if (pinkModeAssetTextCache.has(normalized)) {
            return Promise.resolve(pinkModeAssetTextCache.get(normalized));
          }

          const embedded = resolvePinkModeEmbeddedAsset(normalized);
          if (typeof embedded === 'string') {
            pinkModeAssetTextCache.set(normalized, embedded);
            return Promise.resolve(embedded);
          }

          if (pinkModeAssetTextPromiseCache.has(normalized)) {
            return pinkModeAssetTextPromiseCache.get(normalized);
          }

          const promise = (async () => {
            const resolvedUrl = resolvePinkModeAssetUrl(normalized);
            const encodedNormalized = encodeURI(normalized);
            const fallbackUrl = resolvedUrl || (encodedNormalized || normalized);
            const request = createPinkModeAssetRequest(fallbackUrl);

            const networkCandidates = createPinkModeNetworkRequestVariants(
              request,
              fallbackUrl,
              normalized
            );

            for (const candidate of networkCandidates) {
              const networkResult = await fetchPinkModeAssetFromNetwork(candidate);
              if (networkResult !== null) {
                pinkModeAssetTextCache.set(normalized, networkResult);
                return networkResult;
              }
            }

            const cacheVariants = createPinkModeCacheKeyVariants(
              normalized,
              resolvedUrl || fallbackUrl,
              request
            );
            for (const variant of cacheVariants) {
              const cacheResult = await fetchPinkModeAssetFromCaches(variant);
              if (cacheResult !== null) {
                pinkModeAssetTextCache.set(normalized, cacheResult);
                return cacheResult;
              }
            }

            const xhrResult = await fetchPinkModeAssetViaXHR(fallbackUrl || normalized);
            if (xhrResult !== null) {
              pinkModeAssetTextCache.set(normalized, xhrResult);
              return xhrResult;
            }

            return null;
          })()
            .catch(error => {
              console.warn('Could not load pink mode asset', error);
              return null;
            })
            .finally(() => {
              pinkModeAssetTextPromiseCache.delete(normalized);
            });

          pinkModeAssetTextPromiseCache.set(normalized, promise);
          return promise;
        }

        function fallbackEscapeHtml(value) {
          if (value === null || typeof value === "undefined") {
            return "";
          }
          return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");
        }

        function resolveEscapeHtml() {
          if (GLOBAL_SCOPE && typeof GLOBAL_SCOPE.escapeHtml === "function") {
            try {
              return GLOBAL_SCOPE.escapeHtml;
            } catch (escapeHtmlResolveError) {
              void escapeHtmlResolveError;
            }
          }
          return fallbackEscapeHtml;
        }

        const escapeHtml = resolveEscapeHtml();

        let pinkModeLottieRuntime = null;
        let pinkModeLottiePromise = null;

        function sharePinkModeLottieRuntime(runtime) {
          if (!runtime || typeof runtime.loadAnimation !== 'function') {
            return;
          }

          const assignAlias = (scope, name) => {
            if (!scope || typeof scope !== 'object') {
              return;
            }
            if (scope[name] && scope[name] === runtime) {
              return;
            }
            try {
              if (!scope[name]) {
                scope[name] = runtime;
              }
            } catch (error) {
              void error;
            }
          };

          if (typeof window !== 'undefined' && window) {
            assignAlias(window, 'lottie');
            assignAlias(window, 'bodymovin');
          }

          if (GLOBAL_SCOPE) {
            assignAlias(GLOBAL_SCOPE, 'lottie');
            assignAlias(GLOBAL_SCOPE, 'bodymovin');
          }
        }

        function disablePinkModeLottieWebWorkers(instance) {
          if (!instance || typeof instance.useWebWorker !== 'function') {
            return;
          }

          try {
            instance.useWebWorker(false);
          } catch (error) {
            console.warn('Unable to disable Lottie web workers', error);
          }
        }

        function resolvePinkModeLottieRuntime() {
          if (
            pinkModeLottieRuntime &&
            typeof pinkModeLottieRuntime.loadAnimation === 'function'
          ) {
            return pinkModeLottieRuntime;
          }

          if (typeof window !== 'undefined' && window) {
            const browserRuntime =
              (window.lottie && typeof window.lottie.loadAnimation === 'function'
                ? window.lottie
                : null) ||
              (window.bodymovin && typeof window.bodymovin.loadAnimation === 'function'
                ? window.bodymovin
                : null);

            if (browserRuntime) {
              pinkModeLottieRuntime = browserRuntime;
              sharePinkModeLottieRuntime(browserRuntime);
              disablePinkModeLottieWebWorkers(pinkModeLottieRuntime);
              return pinkModeLottieRuntime;
            }
          }

          if (GLOBAL_SCOPE && typeof GLOBAL_SCOPE === 'object') {
            const globalRuntime =
              (GLOBAL_SCOPE.lottie &&
                typeof GLOBAL_SCOPE.lottie.loadAnimation === 'function'
                ? GLOBAL_SCOPE.lottie
                : null) ||
              (GLOBAL_SCOPE.bodymovin &&
                typeof GLOBAL_SCOPE.bodymovin.loadAnimation === 'function'
                ? GLOBAL_SCOPE.bodymovin
                : null);

            if (globalRuntime) {
              pinkModeLottieRuntime = globalRuntime;
              sharePinkModeLottieRuntime(globalRuntime);
              disablePinkModeLottieWebWorkers(pinkModeLottieRuntime);
              return pinkModeLottieRuntime;
            }
          }

          return null;
        }

        function ensurePinkModeLottieRuntime() {
          const existing = resolvePinkModeLottieRuntime();
          if (existing) {
            return Promise.resolve(existing);
          }

          if (typeof document === 'undefined') {
            return Promise.resolve(null);
          }

          if (pinkModeLottiePromise) {
            return pinkModeLottiePromise;
          }

          const loaderPromise = new Promise((resolve, reject) => {
            const head =
              document.head ||
              document.getElementsByTagName('head')[0] ||
              document.documentElement;

            if (!head) {
              reject(new Error('Unable to resolve document head for pink mode animations.'));
              return;
            }

            const existingScript = document.querySelector(
              'script[data-loader="pink-mode-lottie"]'
            );

            if (existingScript) {
              const markLoaded = () => {
                existingScript.removeEventListener('load', markLoaded);
                existingScript.removeEventListener('error', markFailed);
                existingScript.setAttribute('data-loaded', 'true');
                resolve(resolvePinkModeLottieRuntime());
              };

              const markFailed = event => {
                existingScript.removeEventListener('load', markLoaded);
                existingScript.removeEventListener('error', markFailed);
                const error = new Error('Failed to load pink mode animation runtime.');
                error.event = event;
                reject(error);
              };

              if (
                existingScript.getAttribute('data-loaded') === 'true' ||
                existingScript.readyState === 'complete'
              ) {
                resolve(resolvePinkModeLottieRuntime());
                return;
              }

              existingScript.addEventListener('load', markLoaded, { once: true });
              existingScript.addEventListener('error', markFailed, { once: true });
              return;
            }

            const script = document.createElement('script');
            script.src = 'src/vendor/lottie.min.js';
            script.async = true;
            script.setAttribute('data-loader', 'pink-mode-lottie');

            const handleLoad = () => {
              script.removeEventListener('load', handleLoad);
              script.removeEventListener('error', handleError);
              script.setAttribute('data-loaded', 'true');
              resolve(resolvePinkModeLottieRuntime());
            };

            const handleError = event => {
              script.removeEventListener('load', handleLoad);
              script.removeEventListener('error', handleError);
              const error = new Error('Failed to load pink mode animation runtime.');
              error.event = event;
              reject(error);
            };

            script.addEventListener('load', handleLoad, { once: true });
            script.addEventListener('error', handleError, { once: true });

            head.appendChild(script);
          });

          pinkModeLottiePromise = loaderPromise
            .then(instance => {
              if (instance && typeof instance.loadAnimation === 'function') {
                sharePinkModeLottieRuntime(instance);
                return instance;
              }
              const resolved = resolvePinkModeLottieRuntime();
              if (resolved) {
                sharePinkModeLottieRuntime(resolved);
              }
              return resolved;
            })
            .catch(error => {
              console.warn('Unable to load pink mode animations', error);
              return null;
            })
            .then(runtime => {
              if (!runtime || typeof runtime.loadAnimation !== 'function') {
                pinkModeLottiePromise = null;
                pinkModeLottieRuntime = null;
                return null;
              }

              pinkModeLottieRuntime = runtime;
              sharePinkModeLottieRuntime(runtime);
              disablePinkModeLottieWebWorkers(runtime);
              pinkModeLottiePromise = Promise.resolve(runtime);
              return runtime;
            });

          return pinkModeLottiePromise;
        }

        const HORSE_ICON_SVG = `
        <svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path
            d="m1 40c0-8 3-17 3-17a4.84 4.84 0 0 0-1.829-3.064 1 1 0 0 1 .45-1.716 19.438 19.438 0 0 1 4.379-.22c.579-2.317-1.19-3.963-2.782-4.938a1 1 0 0 1 .393-1.85 14.128 14.128 0 0 1 6.389.788c0-.958-1.147-2.145-2.342-3.122a1 1 0 0 1 .708-1.773 40.655 40.655 0 0 1 6.634.895 3.723 3.723 0 0 0-1.049-2.264 1 1 0 0 1 .823-1.652c6.151.378 9.226 1.916 9.226 1.916l10-1s8.472-2.311 15.954.5a1 1 0 0 1-.084 1.9c-1.455.394-2.87 1.143-2.87 2.6 0 0 4.426.738 5.675 4.114a1 1 0 0 1-1.228 1.317c-1.64-.48-4.273-.88-6.447.569Z"
            fill="#805333"
          />
          <path
            d="m30.18 42.82c1.073 2.7 2.6 9.993 3.357 13.8a2 2 0 0 1-1.964 2.38h-28.573a2 2 0 0 1-2-2v-18c0-2.55 10.03-22.11 23.99-23.87Z"
            fill="#a56a43"
          />
          <path
            d="m55.67 48.46-6.34 2.97a6 6 0 0 1-7.98-2.88l-.25-.54-.76-1.6a4.956 4.956 0 0 0-4.68-2.87c-.22.01-.44.02-.66.02a16.019 16.019 0 0 1-8.28-29.66c-1.81-2.97-3.45-8.03 2.03-12.49a2.1 2.1 0 0 1 2.5 0c4.23 3.45 4.21 7.25 3.16 10.17a16 16 0 0 1 15.91 11.36l5.31 11.31 2.92 6.22a6.008 6.008 0 0 1-2.88 7.99Z"
            fill="#cb8252"
          />
          <circle cx="42" cy="26" r="3" fill="#2c2f38" />
          <circle cx="54" cy="43" r="1" fill="#805333" />
          <path
            d="m58.55 40.47-2.92-6.22-14.53 13.76.25.54a6 6 0 0 0 7.98 2.88l6.34-2.97a6.008 6.008 0 0 0 2.88-7.99Zm-4.55 3.53a1 1 0 1 1 1-1 1 1 0 0 1-1 1Z"
            fill="#cf976a"
          />
          <circle cx="41" cy="25" r="1.25" fill="#ecf0f1" />
        </svg>
      `.trim();

        const PINK_MODE_ICON_FILES = Object.freeze([
          'src/illustrations/unicorns/unicorn.svg',
          'src/illustrations/unicorns/unicorn-2.svg',
          'src/illustrations/unicorns/celebrate.svg',
          'src/illustrations/unicorns/sunglasses.svg',
          'src/illustrations/unicorns/toy.svg'
        ]);

        function createPinkModeIconImageMarkup(path) {
          if (typeof path !== 'string' || !path) {
            return '';
          }

          const safePath = escapeHtml(path);

          return `<img src="${safePath}" alt="" decoding="async" aria-hidden="true" class="pink-mode-icon-image">`;
        }

        const PINK_MODE_ICON_FALLBACK_MARKUP = Object.freeze(
          PINK_MODE_ICON_FILES.map(createPinkModeIconImageMarkup).filter(Boolean)
        );

        const PINK_MODE_ANIMATED_ICON_FILES = Object.freeze([
          'src/animations/cat.json',
          'src/animations/cup.json',
          'src/animations/cupcake.json',
          'src/animations/flamingo.json',
          'src/animations/float.json',
          'src/animations/float-2.json',
          'src/animations/fox.json',
          'src/animations/heart.json',
          'src/animations/horn.json',
          'src/animations/invitation.json',
          'src/animations/mask.json',
          'src/animations/rainbow.json',
          'src/animations/rocking-horse.json',
          'src/animations/slippers.json',
          'src/animations/sunglasses.json',
          'src/animations/unicorn.json',
          'animated icons 3/camera.json',
          'animated icons 3/director-chair.json',
          'animated icons 3/dog.json',
          'animated icons 3/fox.json',
          'animated icons 3/fox-2.json',
          'animated icons 3/fox-3.json',
          'animated icons 3/horse.json',
          'animated icons 3/mountains.json',
          'animated icons 3/movie-camera.json',
          'animated icons 3/pinata.json',
          'animated icons 3/script.json',
          'animated icons 3/video-camera.json'
        ]);

        function collectPinkModeAnimatedIconFiles() {
          const seen = new Set();
          const collected = [];

          const register = candidate => {
            const normalized = normalizePinkModeAssetKey(candidate);
            if (!normalized || seen.has(normalized)) {
              return;
            }
            seen.add(normalized);
            collected.push(normalized);
          };

          if (Array.isArray(PINK_MODE_ANIMATED_ICON_FILES)) {
            PINK_MODE_ANIMATED_ICON_FILES.forEach(register);
          }

          const embeddedStore = getPinkModeEmbeddedAssetStore();
          if (embeddedStore && typeof embeddedStore === 'object') {
            Object.keys(embeddedStore)
              .filter(key => typeof key === 'string' && key.indexOf('animated icons 3/') === 0)
              .forEach(register);
          }

          return collected;
        }

        const PINK_MODE_ICON_RAIN_MIN_COUNT = 18;
        const PINK_MODE_ICON_RAIN_MAX_COUNT = 30;
        const PINK_MODE_ICON_RAIN_MIN_DURATION_MS = 4200;
        const PINK_MODE_ICON_RAIN_MAX_DURATION_MS = 6400;
        const PINK_MODE_ICON_RAIN_MIN_SIZE_PX = 56;
        const PINK_MODE_ICON_RAIN_MAX_SIZE_PX = 96;
        const PINK_MODE_ICON_RAIN_VERTICAL_START_VH_MIN = 12;
        const PINK_MODE_ICON_RAIN_VERTICAL_START_VH_MAX = 26;
        const PINK_MODE_ICON_RAIN_HORIZONTAL_MARGIN_PERCENT = 0;
        const PINK_MODE_ICON_RAIN_HORIZONTAL_DRIFT_VW_MIN = -12;
        const PINK_MODE_ICON_RAIN_HORIZONTAL_DRIFT_VW_MAX = 12;
        const PINK_MODE_ICON_RAIN_MIN_SCALE = 0.78;
        const PINK_MODE_ICON_RAIN_MAX_SCALE = 1.12;
        const PINK_MODE_ICON_RAIN_MAX_ACTIVE = 64;
        const PINK_MODE_ICON_RAIN_COOLDOWN_MS = 8000;
        const PINK_MODE_ICON_RAIN_DELAY_SPREAD_MS = 720;

        var pinkModeIcons = {
          off: Object.freeze({
            className: 'icon-svg pink-mode-icon',
            markup: HORSE_ICON_SVG
          }),
          onSequence: Object.freeze([])
        };

        var pinkModeIconRotationTimer = null;
        var pinkModeIconIndex = 0;

        const PINK_MODE_ANIMATED_ICON_MIN_INTERVAL_MS = 5200;
        const PINK_MODE_ANIMATED_ICON_MAX_INTERVAL_MS = 8800;
        const PINK_MODE_ANIMATED_ICON_MIN_DURATION_MS = 6400;
        const PINK_MODE_ANIMATED_ICON_MAX_DURATION_MS = 10800;
        const PINK_MODE_ANIMATED_ICON_MIN_SIZE_PX = 72;
        const PINK_MODE_ANIMATED_ICON_MAX_SIZE_PX = 72;
        const PINK_MODE_ANIMATED_ICON_MAX_ACTIVE = 4;
        const PINK_MODE_ANIMATED_ICON_MIN_ACTIVE = 3;
        const PINK_MODE_ANIMATED_ICON_SPAWN_STAGGER_MS = 1200;
        const PINK_MODE_ANIMATED_ICON_MAX_PLACEMENT_ATTEMPTS = 12;
        const PINK_MODE_ANIMATED_ICON_AVOID_MARGIN_PX = 28;
        const PINK_MODE_ANIMATED_ICON_MIN_SCALE = 0.65;
        const PINK_MODE_ANIMATED_ICON_FULL_SIZE_VIEWPORT_MIN = 920;
        const PINK_MODE_ANIMATED_ICON_AVOID_SELECTOR = [
          'a',
          'button',
          'input',
          'select',
          'textarea',
          'label',
          'summary',
          '[role="button"]',
          '[role="link"]',
          '[role="menu"]',
          '[role="dialog"]',
          '[role="listbox"]',
          '[role="combobox"]',
          '[role="textbox"]',
          '[contenteditable="true"]',
          '.form-row',
          '.form-row-actions',
          '.form-actions',
          '.toolbar',
          '.controls',
          '.dialog',
          '.modal'
        ].join(', ');
        const PINK_MODE_ANIMATED_ICON_RECENT_SPOT_LIMIT = 6;
        const PINK_MODE_ANIMATED_ICON_RECENT_SPOT_MARGIN_PX = 120;
        const PINK_MODE_ANIMATED_ICON_PROBE_POINTS = Object.freeze([
          Object.freeze({ x: 0, y: 0 }),
          Object.freeze({ x: 0.35, y: 0 }),
          Object.freeze({ x: -0.35, y: 0 }),
          Object.freeze({ x: 0, y: 0.35 }),
          Object.freeze({ x: 0, y: -0.35 }),
          Object.freeze({ x: 0.25, y: 0.25 }),
          Object.freeze({ x: -0.25, y: 0.25 }),
          Object.freeze({ x: 0.25, y: -0.25 }),
          Object.freeze({ x: -0.25, y: -0.25 })
        ]);

        let pinkModeAnimatedIconLayer = null;
        let pinkModeIconRainLayer = null;
        let pinkModeAnimatedIconTimeoutId = null;
        let pinkModeAnimatedIconsActive = false;
        let pinkModeAnimatedIconTemplates = null;
        let pinkModeAnimatedIconTemplatesPromise = null;
        const pinkModeAnimatedIconInstances = new Set();
        let pinkModeAnimatedIconLastTemplateName = null;
        const pinkModeAnimatedIconPlacementHistory = [];
        let pinkModeAnimatedIconTemplateOrder = [];
        let pinkModeAnimatedIconTemplateCursor = 0;
        const pinkModeIconRainInstances = new Set();
        let pinkModeIconRainLastTriggeredAt = 0;
        const pinkModeBodyReadyQueue = [];
        let pinkModeBodyReadyScheduled = false;
        let pinkModeBodyReadyTimerId = null;

        function flushPinkModeBodyReadyQueue() {
          if (!pinkModeBodyReadyQueue.length) {
            return;
          }

          const callbacks = pinkModeBodyReadyQueue.splice(0, pinkModeBodyReadyQueue.length);
          for (const callback of callbacks) {
            if (typeof callback !== 'function') {
              continue;
            }
            try {
              callback();
            } catch (error) {
              console.warn('Could not run deferred pink mode callback', error);
            }
          }
        }

        function schedulePinkModeBodyReadyCheck() {
          if (pinkModeBodyReadyTimerId) {
            return;
          }

          pinkModeBodyReadyTimerId = setTimeout(() => {
            pinkModeBodyReadyTimerId = null;

            if (typeof document === 'undefined' || !document) {
              pinkModeBodyReadyScheduled = false;
              pinkModeBodyReadyQueue.length = 0;
              return;
            }

            if (document.body) {
              pinkModeBodyReadyScheduled = false;
              flushPinkModeBodyReadyQueue();
              return;
            }

            if (document.readyState === 'loading') {
              const resume = () => {
                document.removeEventListener('DOMContentLoaded', resume);
                schedulePinkModeBodyReadyCheck();
              };

              try {
                document.addEventListener('DOMContentLoaded', resume, { once: true });
              } catch (listenerError) {
                void listenerError;
                document.addEventListener('DOMContentLoaded', resume);
              }
              return;
            }

            schedulePinkModeBodyReadyCheck();
          }, 16);
        }

        function whenPinkModeBodyReady(callback) {
          if (typeof callback !== 'function' || typeof document === 'undefined') {
            return false;
          }

          if (document.body) {
            callback();
            return true;
          }

          if (!pinkModeBodyReadyQueue.includes(callback)) {
            pinkModeBodyReadyQueue.push(callback);
          }

          if (!pinkModeBodyReadyScheduled) {
            pinkModeBodyReadyScheduled = true;
            schedulePinkModeBodyReadyCheck();
          } else if (!pinkModeBodyReadyTimerId) {
            schedulePinkModeBodyReadyCheck();
          }

          return true;
        }

        let pinkModeAnimatedIconPressListenerCleanup = null;
        let pinkModeAnimatedIconPressListenerAttached = false;
        let pinkModeAnimatedIconLastTouchTime = 0;

        const pinkModeReduceMotionQuery =
          typeof window !== 'undefined' && typeof window.matchMedia === 'function'
            ? window.matchMedia('(prefers-reduced-motion: reduce)')
            : null;

        const PINK_MODE_REDUCE_MOTION_TRUTHY_VALUES = Object.freeze([
          'true',
          '1',
          'yes',
          'on',
          'enabled'
        ]);

        const PINK_MODE_REDUCE_MOTION_FALSY_VALUES = Object.freeze([
          'false',
          '0',
          'no',
          'off',
          'disabled'
        ]);

        function readPinkModeStoredReduceMotionPreference() {
          if (typeof window === 'undefined') {
            return null;
          }

          let storage = null;
          try {
            storage = window.localStorage || null;
          } catch (storageError) {
            void storageError;
            storage = null;
          }

          if (!storage) {
            return null;
          }

          try {
            const value = storage.getItem('reduceMotion');
            if (typeof value !== 'string') {
              return null;
            }

            const trimmed = value.trim();
            if (!trimmed) {
              return null;
            }

            const normalized = trimmed.toLowerCase();

            if (PINK_MODE_REDUCE_MOTION_TRUTHY_VALUES.includes(normalized)) {
              return 'true';
            }

            if (PINK_MODE_REDUCE_MOTION_FALSY_VALUES.includes(normalized)) {
              return 'false';
            }

            return trimmed;
          } catch (readError) {
            void readError;
          }

          return null;
        }

        function isPinkModeReduceMotionClassActive() {
          if (typeof document === 'undefined' || !document) {
            return false;
          }

          const root = document.documentElement;
          const body = document.body;

          return (
            (root && root.classList && root.classList.contains('reduce-motion')) ||
            (body && body.classList && body.classList.contains('reduce-motion'))
          );
        }

        function shouldRespectPinkModeReduceMotion() {
          const stored = readPinkModeStoredReduceMotionPreference();
          if (stored === 'true') {
            return true;
          }
          if (stored === 'false') {
            return false;
          }
          if (isPinkModeReduceMotionClassActive()) {
            return true;
          }
          return Boolean(pinkModeReduceMotionQuery && pinkModeReduceMotionQuery.matches);
        }

        function ensureSvgHasAriaHidden(markup) {
          if (typeof markup !== 'string') return '';
          const trimmed = markup.trim();
          if (!trimmed) return '';
          if (!/^<svg\b/i.test(trimmed)) return trimmed;
          if (/\baria-hidden\s*=\s*['"]/i.test(trimmed)) return trimmed;
          return trimmed.replace(/<svg\b/i, match => `${match} aria-hidden="true"`);
        }

        function normalizePinkModeIconMarkup(markup) {
          if (typeof markup !== 'string') return '';
          const trimmed = markup.trim();
          if (!trimmed) return '';
          // Preserve the original SVG colors for pink mode artwork instead of forcing
          // them to match the accent color.
          return trimmed;
        }

        function createPinkModeIconConfigs(markupList) {
          if (!Array.isArray(markupList) || !markupList.length) {
            return [];
          }
          return markupList
            .map(markup => normalizePinkModeIconMarkup(ensureSvgHasAriaHidden(markup)))
            .filter(Boolean)
            .map(markup =>
              Object.freeze({
                className: 'icon-svg pink-mode-icon',
                markup
              })
            );
        }

        function applyPinkModeIconSequence(configs) {
          if (!Array.isArray(configs) || !configs.length) {
            return false;
          }

          const sequence = Object.freeze(configs.slice());
          pinkModeIcons.onSequence = sequence;

          if (
            typeof document !== 'undefined' &&
            document.body &&
            document.body.classList.contains('pink-mode')
          ) {
            if (typeof stopPinkModeIconRotation === 'function') {
              stopPinkModeIconRotation();
            }
            pinkModeIconIndex = 0;
            if (typeof applyPinkModeIcon === 'function') {
              applyPinkModeIcon(sequence[pinkModeIconIndex], { animate: false });
            }
            if (typeof startPinkModeIconRotation === 'function') {
              startPinkModeIconRotation();
            }
          }

          return true;
        }

        function setPinkModeIconSequence(markupList) {
          const configs = createPinkModeIconConfigs(markupList);
          if (!configs.length) {
            return false;
          }

          return applyPinkModeIconSequence(configs);
        }

        function ensurePinkModeFallbackIconSequence() {
          if (pinkModeIcons.onSequence && pinkModeIcons.onSequence.length) {
            return false;
          }

          if (!Array.isArray(PINK_MODE_ICON_FALLBACK_MARKUP) || !PINK_MODE_ICON_FALLBACK_MARKUP.length) {
            return false;
          }

          return setPinkModeIconSequence(PINK_MODE_ICON_FALLBACK_MARKUP);
        }

        async function loadPinkModeIconsFromFiles() {
          const responses = await Promise.all(
            PINK_MODE_ICON_FILES.map(path =>
              loadPinkModeAssetText(path).catch(() => null)
            )
          );

          const markupList = responses.filter(response => typeof response === 'string' && response);
          if (markupList.length) {
            const applied = setPinkModeIconSequence(markupList);
            if (!applied) {
              ensurePinkModeFallbackIconSequence();
            }
          } else {
            ensurePinkModeFallbackIconSequence();
          }
        }

        function updatePinkModeAnimatedIconTemplateRotation(templates) {
          if (!Array.isArray(templates) || !templates.length) {
            pinkModeAnimatedIconTemplateOrder = [];
            pinkModeAnimatedIconTemplateCursor = 0;
            return;
          }

          pinkModeAnimatedIconTemplateOrder = templates.map((_, index) => index);
          pinkModeAnimatedIconTemplateCursor = 0;
        }

        async function loadPinkModeAnimatedIconTemplates() {
          if (pinkModeAnimatedIconTemplates) {
            return pinkModeAnimatedIconTemplates;
          }
          if (pinkModeAnimatedIconTemplatesPromise) {
            return pinkModeAnimatedIconTemplatesPromise;
          }
          const animatedIconFiles = collectPinkModeAnimatedIconFiles();
          pinkModeAnimatedIconTemplatesPromise = Promise.all(
            animatedIconFiles.map(path =>
              loadPinkModeAssetText(path).catch(() => null)
            )
          )
            .then(contents =>
              Object.freeze(
                contents
                  .map((content, index) =>
                    content
                      ? Object.freeze({
                        name: animatedIconFiles[index],
                        data: content
                      })
                      : null
                  )
                  .filter(Boolean)
              )
            )
            .catch(error => {
              console.warn('Could not load pink mode animated icons', error);
              return Object.freeze([]);
            })
            .then(templates => {
              pinkModeAnimatedIconTemplates = templates;
              updatePinkModeAnimatedIconTemplateRotation(templates);
              return templates;
            });
          return pinkModeAnimatedIconTemplatesPromise;
        }

        function selectPinkModeAnimatedIconTemplate(availableTemplates) {
          if (!Array.isArray(availableTemplates) || !availableTemplates.length) {
            return null;
          }

          const sanitized = availableTemplates.filter(Boolean);
          if (!sanitized.length) {
            return null;
          }

          const templates = pinkModeAnimatedIconTemplates;
          const order = pinkModeAnimatedIconTemplateOrder;

          if (Array.isArray(templates) && templates.length && Array.isArray(order) && order.length) {
            const availableSet = new Set(sanitized);
            const uniqueAvailableNames = new Set();

            sanitized.forEach(template => {
              if (template && typeof template.name === 'string') {
                uniqueAvailableNames.add(template.name);
              }
            });

            const allowImmediateRepeat = uniqueAvailableNames.size <= 1;
            let cursor = pinkModeAnimatedIconTemplateCursor;

            for (let attempt = 0; attempt < order.length; attempt += 1) {
              const orderIndex = order[cursor % order.length];
              cursor += 1;
              if (typeof orderIndex !== 'number' || orderIndex < 0 || orderIndex >= templates.length) {
                continue;
              }

              const candidate = templates[orderIndex];
              if (!availableSet.has(candidate)) {
                continue;
              }

              if (!allowImmediateRepeat && candidate && candidate.name === pinkModeAnimatedIconLastTemplateName) {
                continue;
              }

              pinkModeAnimatedIconTemplateCursor = cursor % order.length;
              return candidate;
            }

            cursor = pinkModeAnimatedIconTemplateCursor;

            for (let attempt = 0; attempt < order.length; attempt += 1) {
              const orderIndex = order[cursor % order.length];
              cursor += 1;
              if (typeof orderIndex !== 'number' || orderIndex < 0 || orderIndex >= templates.length) {
                continue;
              }

              const candidate = templates[orderIndex];
              if (!availableSet.has(candidate)) {
                continue;
              }

              pinkModeAnimatedIconTemplateCursor = cursor % order.length;
              return candidate;
            }
          }

          return sanitized[Math.floor(Math.random() * sanitized.length)];
        }

        function ensurePinkModeAnimationLayer(options) {
          if (typeof document === 'undefined') {
            return null;
          }
          const useGlobalLayer = Boolean(options && options.global);
          const host = useGlobalLayer
            ? document.body || document.getElementById('mainContent')
            : document.getElementById('mainContent') || document.body;
          if (!host) {
            return null;
          }
          let layer = useGlobalLayer ? pinkModeIconRainLayer : pinkModeAnimatedIconLayer;
          if (layer && layer.isConnected && host.contains(layer)) {
            return layer;
          }
          if (layer && layer.parentNode) {
            layer.parentNode.removeChild(layer);
          }
          layer = document.createElement('div');
          layer.className = useGlobalLayer
            ? 'pink-mode-animation-layer pink-mode-animation-layer--global'
            : 'pink-mode-animation-layer';
          layer.setAttribute('aria-hidden', 'true');
          host.appendChild(layer);
          if (useGlobalLayer) {
            pinkModeIconRainLayer = layer;
          } else {
            pinkModeAnimatedIconLayer = layer;
          }
          return layer;
        }

        function readScrollExtent(target) {
          if (!target || (typeof target !== 'object' && typeof target !== 'function')) {
            return null;
          }

          let value = null;

          try {
            value = target.scrollHeight;
          } catch (error) {
            void error;
            return null;
          }

          if (typeof value === 'number' && Number.isFinite(value) && value > 0) {
            return value;
          }

          return null;
        }

        function resolvePinkModeScrollHeight(host) {
          const globalDocument = typeof document !== 'undefined' ? document : null;
          const candidateHost =
            host && typeof host === 'object'
              ? host
              : globalDocument && globalDocument.body
                ? globalDocument.body
                : globalDocument && globalDocument.documentElement
                  ? globalDocument.documentElement
                  : null;

          if (!candidateHost || typeof candidateHost !== 'object') {
            return null;
          }

          const directValue = readScrollExtent(candidateHost);
          if (typeof directValue === 'number' && directValue > 0) {
            return directValue;
          }

          const ownerDocument =
            (candidateHost && typeof candidateHost.ownerDocument !== 'undefined' && candidateHost.ownerDocument) ||
            globalDocument ||
            null;

          if (!ownerDocument || typeof ownerDocument !== 'object') {
            return null;
          }

          const fallbacks = [
            ownerDocument.scrollingElement,
            ownerDocument.body,
            ownerDocument.documentElement
          ];

          for (const fallback of fallbacks) {
            if (!fallback || typeof fallback !== 'object' || fallback === candidateHost) {
              continue;
            }
            const fallbackHeight = readScrollExtent(fallback);
            if (typeof fallbackHeight === 'number' && fallbackHeight > 0) {
              return fallbackHeight;
            }
          }

          return null;
        }

        function resolvePinkModeHostExtent(host, hostRect, fallbackHeight) {
          const scrollHeight = resolvePinkModeScrollHeight(host);
          if (typeof scrollHeight === 'number' && scrollHeight > 0) {
            return scrollHeight;
          }

          if (hostRect && typeof hostRect.height === 'number' && hostRect.height > 0) {
            return hostRect.height;
          }

          if (
            hostRect &&
            typeof hostRect.top === 'number' &&
            typeof hostRect.bottom === 'number'
          ) {
            const derivedHeight = hostRect.bottom - hostRect.top;
            if (Number.isFinite(derivedHeight) && derivedHeight > 0) {
              return derivedHeight;
            }
          }

          return fallbackHeight;
        }

        function computePinkModeAnimationAvoidRegions(layer) {
          if (
            typeof document === 'undefined' ||
            typeof document.querySelectorAll !== 'function'
          ) {
            return Object.freeze([]);
          }
          const elements = document.querySelectorAll(PINK_MODE_ANIMATED_ICON_AVOID_SELECTOR);
          if (!elements || !elements.length) {
            return Object.freeze([]);
          }
          const regions = [];
          for (const element of elements) {
            if (!element) {
              continue;
            }
            if (layer && layer.contains(element)) {
              continue;
            }
            if (typeof element.getBoundingClientRect !== 'function') {
              continue;
            }
            const rect = element.getBoundingClientRect();
            if (!rect) {
              continue;
            }
            const { width, height, left, right, top, bottom } = rect;
            if (!Number.isFinite(width) || !Number.isFinite(height)) {
              continue;
            }
            if (width <= 0 || height <= 0) {
              continue;
            }
            const margin = Math.max(
              PINK_MODE_ANIMATED_ICON_AVOID_MARGIN_PX,
              Math.min(width, height) * 0.3
            );
            regions.push({ left, right, top, bottom, margin });
          }
          return Object.freeze(regions);
        }

        function collectPinkModeAnimationInstanceRegions(layer) {
          if (!pinkModeAnimatedIconInstances.size) {
            return Object.freeze([]);
          }
          const regions = [];
          for (const instance of pinkModeAnimatedIconInstances) {
            if (!instance || !instance.container) {
              continue;
            }
            const node = instance.container;
            if (!node.isConnected) {
              continue;
            }
            if (layer && node.parentNode && layer !== node.parentNode && !layer.contains(node)) {
              continue;
            }
            if (typeof node.getBoundingClientRect !== 'function') {
              continue;
            }
            const rect = node.getBoundingClientRect();
            if (!rect) {
              continue;
            }
            const { left, right, top, bottom, width, height } = rect;
            if (!Number.isFinite(width) || !Number.isFinite(height)) {
              continue;
            }
            if (width <= 0 || height <= 0) {
              continue;
            }
            const largestSide = Math.max(width, height);
            regions.push({
              left,
              right,
              top,
              bottom,
              margin: Math.max(PINK_MODE_ANIMATED_ICON_AVOID_MARGIN_PX * 1.25, largestSide * 0.6)
            });
          }
          return Object.freeze(regions);
        }

        function callPinkModeAnimatedIconPressHandler() {
          let handler = null;
          if (typeof window !== 'undefined' && typeof window.handlePinkModeIconPress === 'function') {
            handler = window.handlePinkModeIconPress;
          } else if (typeof handlePinkModeIconPress === 'function') {
            handler = handlePinkModeIconPress;
          }
          if (typeof handler === 'function') {
            try {
              handler();
              return true;
            } catch (error) {
              console.warn('Could not process pink mode icon press', error);
            }
          }
          return false;
        }

        function extractPinkModeAnimatedIconPoint(event) {
          if (!event) {
            return null;
          }
          if (typeof event.clientX === 'number' && typeof event.clientY === 'number') {
            return { x: event.clientX, y: event.clientY };
          }
          const touches =
            (event.touches && event.touches.length ? event.touches : null) ||
            (event.changedTouches && event.changedTouches.length ? event.changedTouches : null);
          if (touches) {
            const touch = touches[0];
            if (touch && typeof touch.clientX === 'number' && typeof touch.clientY === 'number') {
              return { x: touch.clientX, y: touch.clientY };
            }
          }
          return null;
        }

        function isPointWithinRect(point, rect) {
          if (!point || !rect) {
            return false;
          }
          const { x, y } = point;
          const { left, right, top, bottom } = rect;
          if (!Number.isFinite(x) || !Number.isFinite(y)) {
            return false;
          }
          if (!Number.isFinite(left) || !Number.isFinite(right) || !Number.isFinite(top) || !Number.isFinite(bottom)) {
            return false;
          }
          return x >= left && x <= right && y >= top && y <= bottom;
        }

        function detectPinkModeAnimatedIconPress(point) {
          if (!point || !pinkModeAnimatedIconInstances.size) {
            return false;
          }
          const instances = Array.from(pinkModeAnimatedIconInstances);
          for (let index = instances.length - 1; index >= 0; index -= 1) {
            const instance = instances[index];
            if (!instance || instance.destroyed) {
              continue;
            }
            const container = instance.container;
            if (!container || !container.isConnected || typeof container.getBoundingClientRect !== 'function') {
              continue;
            }
            const rect = container.getBoundingClientRect();
            if (!rect || rect.width <= 0 || rect.height <= 0) {
              continue;
            }
            if (isPointWithinRect(point, rect) && callPinkModeAnimatedIconPressHandler()) {
              return true;
            }
          }
          return false;
        }

        function handlePinkModeAnimatedIconPointerEvent(event) {
          if (!event || event.defaultPrevented || !event.isTrusted) {
            return;
          }
          if (typeof event.button === 'number' && event.button !== 0) {
            return;
          }
          const pointerType = typeof event.pointerType === 'string' ? event.pointerType.toLowerCase() : '';
          if (pointerType === 'touch' || pointerType === 'pen') {
            pinkModeAnimatedIconLastTouchTime = Date.now();
          } else {
            pinkModeAnimatedIconLastTouchTime = 0;
          }
          const point = extractPinkModeAnimatedIconPoint(event);
          if (!point) {
            return;
          }
          detectPinkModeAnimatedIconPress(point);
        }

        function handlePinkModeAnimatedIconMouseEvent(event) {
          if (!event || event.defaultPrevented || !event.isTrusted) {
            return;
          }
          if (typeof event.button === 'number' && event.button !== 0) {
            return;
          }
          if (pinkModeAnimatedIconLastTouchTime) {
            const now = Date.now();
            if (now - pinkModeAnimatedIconLastTouchTime < 450) {
              return;
            }
          }
          const point = extractPinkModeAnimatedIconPoint(event);
          if (!point) {
            return;
          }
          detectPinkModeAnimatedIconPress(point);
        }

        function handlePinkModeAnimatedIconTouchEvent(event) {
          if (!event || !event.isTrusted) {
            return;
          }
          pinkModeAnimatedIconLastTouchTime = Date.now();
          const point = extractPinkModeAnimatedIconPoint(event);
          if (!point) {
            return;
          }
          detectPinkModeAnimatedIconPress(point);
        }

        function teardownPinkModeAnimatedIconPressListener() {
          if (!pinkModeAnimatedIconPressListenerAttached) {
            return;
          }
          const cleanup = pinkModeAnimatedIconPressListenerCleanup;
          try {
            if (typeof cleanup === 'function') {
              cleanup();
            }
          } catch (cleanupError) {
            console.warn('Could not detach pink mode animation press listener', cleanupError);
          }
          pinkModeAnimatedIconPressListenerCleanup = null;
          pinkModeAnimatedIconLastTouchTime = 0;
          pinkModeAnimatedIconPressListenerAttached = false;
        }

        function ensurePinkModeAnimatedIconPressListener() {
          if (pinkModeAnimatedIconPressListenerAttached || typeof document === 'undefined') {
            return;
          }
          const target = document;
          if (!target) {
            return;
          }
          if (typeof window !== 'undefined' && typeof window.PointerEvent === 'function') {
            target.addEventListener('pointerdown', handlePinkModeAnimatedIconPointerEvent, true);
            pinkModeAnimatedIconPressListenerCleanup = () => {
              target.removeEventListener('pointerdown', handlePinkModeAnimatedIconPointerEvent, true);
              pinkModeAnimatedIconLastTouchTime = 0;
            };
            pinkModeAnimatedIconPressListenerAttached = true;
            return;
          }
          target.addEventListener('mousedown', handlePinkModeAnimatedIconMouseEvent, true);
          target.addEventListener('touchstart', handlePinkModeAnimatedIconTouchEvent, true);
          pinkModeAnimatedIconPressListenerCleanup = () => {
            target.removeEventListener('mousedown', handlePinkModeAnimatedIconMouseEvent, true);
            target.removeEventListener('touchstart', handlePinkModeAnimatedIconTouchEvent, true);
            pinkModeAnimatedIconLastTouchTime = 0;
          };
          pinkModeAnimatedIconPressListenerAttached = true;
        }

        function isPinkModeAnimationSpotClear(
          layer,
          hostRect,
          x,
          y,
          size,
          avoidRegions,
          options
        ) {
          if (
            typeof document === 'undefined' ||
            typeof document.elementFromPoint !== 'function'
          ) {
            return true;
          }
          const allowLayerOverlap = Boolean(options && options.allowLayerOverlap);
          const allowInteractiveOverlap = Boolean(
            options && options.allowInteractiveOverlap
          );
          const viewportWidth =
            typeof window !== 'undefined' && typeof window.innerWidth === 'number'
              ? window.innerWidth
              : document.documentElement && typeof document.documentElement.clientWidth === 'number'
                ? document.documentElement.clientWidth
                : null;
          const viewportHeight =
            typeof window !== 'undefined' && typeof window.innerHeight === 'number'
              ? window.innerHeight
              : document.documentElement && typeof document.documentElement.clientHeight === 'number'
                ? document.documentElement.clientHeight
                : null;
          const baseX = (hostRect ? hostRect.left : 0) + x;
          const baseY = (hostRect ? hostRect.top : 0) + y;
          const candidate = {
            left: baseX - size / 2,
            right: baseX + size / 2,
            top: baseY - size / 2,
            bottom: baseY + size / 2
          };

          if (Array.isArray(avoidRegions) && avoidRegions.length) {
            for (const region of avoidRegions) {
              if (!region) {
                continue;
              }
              const regionMargin =
                typeof region.margin === 'number'
                  ? Math.max(
                    PINK_MODE_ANIMATED_ICON_AVOID_MARGIN_PX,
                    size * 0.25,
                    region.margin
                  )
                  : Math.max(PINK_MODE_ANIMATED_ICON_AVOID_MARGIN_PX, size * 0.25);
              if (
                candidate.left < region.right + regionMargin &&
                candidate.right > region.left - regionMargin &&
                candidate.top < region.bottom + regionMargin &&
                candidate.bottom > region.top - regionMargin
              ) {
                return false;
              }
            }
          }

          for (const point of PINK_MODE_ANIMATED_ICON_PROBE_POINTS) {
            const sampleX = baseX + point.x * size;
            const sampleY = baseY + point.y * size;
            if (
              viewportWidth !== null && (sampleX < 0 || sampleX > viewportWidth)
            ) {
              continue;
            }
            if (
              viewportHeight !== null && (sampleY < 0 || sampleY > viewportHeight)
            ) {
              continue;
            }
            const elementsAtPoint =
              typeof document.elementsFromPoint === 'function'
                ? document.elementsFromPoint(sampleX, sampleY)
                : [document.elementFromPoint(sampleX, sampleY)].filter(Boolean);
            for (const element of elementsAtPoint) {
              if (!element) {
                continue;
              }
              if (layer && element === layer) {
                continue;
              }
              if (layer && layer.contains(element)) {
                if (allowLayerOverlap) {
                  continue;
                }
                return false;
              }
              if (
                !allowInteractiveOverlap &&
                ((typeof element.matches === 'function' &&
                  element.matches(PINK_MODE_ANIMATED_ICON_AVOID_SELECTOR)) ||
                  (typeof element.closest === 'function' &&
                    element.closest(PINK_MODE_ANIMATED_ICON_AVOID_SELECTOR)))
              ) {
                return false;
              }
            }
          }
          return true;
        }

        function findPinkModeAnimationPlacement({
          layer,
          hostRect,
          hostTop,
          visibleTop,
          visibleBottom,
          horizontalPadding,
          verticalPadding,
          hostWidth,
          size,
          avoidRegions,
          leftMarginExtension = 0,
          rightMarginExtension = 0,
          spotOptions = null
        }) {
          const minY = Math.max(visibleTop - hostTop + verticalPadding, verticalPadding);
          const maxY = Math.max(visibleBottom - hostTop - verticalPadding, minY);
          const marginLeft = Math.max(0, leftMarginExtension);
          const marginRight = Math.max(0, rightMarginExtension);
          const baseMinX = horizontalPadding;
          const baseMaxX = Math.max(hostWidth - horizontalPadding, baseMinX);
          const minX = baseMinX - marginLeft;
          const maxX = baseMaxX + marginRight;

          for (let attempt = 0; attempt < PINK_MODE_ANIMATED_ICON_MAX_PLACEMENT_ATTEMPTS; attempt += 1) {
            const y = maxY > minY ? minY + Math.random() * (maxY - minY) : minY;
            const x = maxX > minX ? minX + Math.random() * (maxX - minX) : minX;
            if (
              isPinkModeAnimationSpotClear(
                layer,
                hostRect,
                x,
                y,
                size,
                avoidRegions,
                spotOptions
              )
            ) {
              return { x, y };
            }
          }
          return null;
        }

        function destroyPinkModeAnimatedIconInstance(instance) {
          if (!instance || instance.destroyed) {
            return;
          }
          if (typeof instance.cleanup === 'function') {
            try {
              instance.cleanup();
            } catch (cleanupError) {
              console.warn('Could not detach pink mode animation interactions', cleanupError);
            }
            instance.cleanup = null;
          }
          instance.destroyed = true;
          if (instance.animation && typeof instance.animation.destroy === 'function') {
            try {
              instance.animation.destroy();
            } catch (error) {
              console.warn('Could not dispose pink mode animation', error);
            }
          }
          if (instance.container && instance.container.parentNode) {
            instance.container.parentNode.removeChild(instance.container);
          }
          pinkModeAnimatedIconInstances.delete(instance);
          if (pinkModeAnimatedIconsActive) {
            ensurePinkModeAnimatedIconPopulation(pinkModeAnimatedIconTemplates, {
              immediate: true,
              staggerMs: Math.round(PINK_MODE_ANIMATED_ICON_SPAWN_STAGGER_MS * 0.75)
            });
          }
        }

        function destroyPinkModeIconRainInstance(instance) {
          if (!instance || instance.destroyed) {
            return;
          }
          if (typeof instance.cleanup === 'function') {
            try {
              instance.cleanup();
            } catch (cleanupError) {
              console.warn('Could not detach pink mode rain interactions', cleanupError);
            }
            instance.cleanup = null;
          }
          instance.destroyed = true;
          if (instance.animation && typeof instance.animation.destroy === 'function') {
            try {
              instance.animation.destroy();
            } catch (error) {
              console.warn('Could not dispose pink mode rain animation', error);
            }
          }
          if (instance.container && instance.container.parentNode) {
            instance.container.parentNode.removeChild(instance.container);
          }
          pinkModeIconRainInstances.delete(instance);
          if (
            !pinkModeIconRainInstances.size &&
            pinkModeIconRainLayer &&
            pinkModeIconRainLayer.parentNode
          ) {
            pinkModeIconRainLayer.parentNode.removeChild(pinkModeIconRainLayer);
            pinkModeIconRainLayer = null;
          }
        }

        function spawnPinkModeIconRainInstance(templates) {
          const lottieRuntime = resolvePinkModeLottieRuntime();
          if (
            !Array.isArray(templates) ||
            !templates.length ||
            !lottieRuntime ||
            typeof lottieRuntime.loadAnimation !== 'function'
          ) {
            return false;
          }
          const layer = ensurePinkModeAnimationLayer({ global: true });
          if (!layer) {
            return false;
          }
          const sanitizedTemplates = templates.filter(Boolean);
          if (!sanitizedTemplates.length) {
            return false;
          }

          const activeTemplateNames = new Set();
          for (const instance of pinkModeIconRainInstances) {
            if (!instance) continue;
            const { templateName } = instance;
            if (typeof templateName === 'string' && templateName) {
              activeTemplateNames.add(templateName);
            }
          }
          for (const instance of pinkModeAnimatedIconInstances) {
            if (!instance) continue;
            const { templateName } = instance;
            if (typeof templateName === 'string' && templateName) {
              activeTemplateNames.add(templateName);
            }
          }

          let availableTemplates = sanitizedTemplates.filter(template => {
            if (!template || typeof template.name !== 'string') {
              return true;
            }
            return !activeTemplateNames.has(template.name);
          });

          if (!availableTemplates.length) {
            availableTemplates = sanitizedTemplates;
          }

          const template = selectPinkModeAnimatedIconTemplate(availableTemplates);
          if (!template || !template.data) {
            return false;
          }

          const container = document.createElement('div');
          container.className = 'pink-mode-animation-instance pink-mode-icon-rain';
          container.setAttribute('aria-hidden', 'true');

          const horizontalPercent = Math.random() * 100;
          container.style.setProperty('--pink-mode-animation-x', `${horizontalPercent.toFixed(2)}vw`);

          // Use default top: 110vh from CSS, so we don't set --pink-mode-animation-y

          const duration = Math.round(4000 + Math.random() * 3000);
          container.style.setProperty('--pink-mode-rain-duration', `${duration}ms`);

          const scale = 0.6 + Math.random() * 0.6;
          container.style.setProperty('--pink-mode-rain-scale', scale.toFixed(3));

          const drift = (Math.random() - 0.5) * 30;
          container.style.setProperty('--pink-mode-rain-drift', `${drift.toFixed(2)}vw`);

          const rotation = (Math.random() - 0.5) * 90;
          container.style.setProperty(
            '--pink-mode-rain-rotation',
            `${rotation.toFixed(2)}deg`
          );

          layer.appendChild(container);

          let animationData;
          try {
            animationData = JSON.parse(template.data);
          } catch (error) {
            console.warn('Could not parse pink mode rain animation', error);
            if (container.parentNode) {
              container.parentNode.removeChild(container);
            }
            return false;
          }

          let animationInstance;
          try {
            animationInstance = lottieRuntime.loadAnimation({
              container,
              renderer: 'svg',
              loop: true,
              autoplay: true,
              animationData
            });
          } catch (error) {
            console.warn('Could not start pink mode rain animation', error);
            if (container.parentNode) {
              container.parentNode.removeChild(container);
            }
            return false;
          }

          const instance = {
            container,
            animation: animationInstance,
            destroyed: false,
            templateName: typeof template.name === 'string' ? template.name : null
          };

          container.addEventListener(
            'animationend',
            () => {
              destroyPinkModeIconRainInstance(instance);
            },
            { once: true }
          );

          pinkModeIconRainInstances.add(instance);
          if (pinkModeIconRainInstances.size > PINK_MODE_ICON_RAIN_MAX_ACTIVE) {
            const oldest = pinkModeIconRainInstances.values().next().value;
            if (oldest && oldest !== instance) {
              destroyPinkModeIconRainInstance(oldest);
            }
          }

          return true;
        }

        function triggerPinkModeIconRain() {
          if (typeof window === 'undefined' || typeof document === 'undefined') {
            return;
          }

          if (!document.body) {
            whenPinkModeBodyReady(triggerPinkModeIconRain);
            return;
          }

          if (shouldRespectPinkModeReduceMotion()) {
            return;
          }

          const now = Date.now();
          if (
            pinkModeIconRainLastTriggeredAt &&
            now - pinkModeIconRainLastTriggeredAt < PINK_MODE_ICON_RAIN_COOLDOWN_MS
          ) {
            return;
          }
          pinkModeIconRainLastTriggeredAt = now;

          const proceedWithTemplates = () => {
            if (!document || !document.body || !document.body.classList.contains('pink-mode')) {
              return;
            }

            loadPinkModeAnimatedIconTemplates()
              .then(templates => {
                if (!Array.isArray(templates) || !templates.length) {
                  return templates;
                }

                const dropCount = 80;
                const duration = 20000; // 20 seconds total rain

                for (let i = 0; i < dropCount; i += 1) {
                  const delay = Math.random() * duration;
                  window.setTimeout(() => {
                    spawnPinkModeIconRainInstance(templates);
                  }, delay);
                }

                return templates;
              })
              .catch(error => {
                console.warn('Could not trigger pink mode icon rain', error);
              });
          };

          const runtime = resolvePinkModeLottieRuntime();
          if (runtime && typeof runtime.loadAnimation === 'function') {
            proceedWithTemplates();
            return;
          }

          ensurePinkModeLottieRuntime()
            .then(lottie => {
              if (!lottie || typeof lottie.loadAnimation !== 'function') {
                return null;
              }
              proceedWithTemplates();
              return lottie;
            })
            .catch(error => {
              console.warn('Could not trigger pink mode icon rain', error);
            });
        }

        function ensurePinkModeAnimatedIconPopulation(templates, options) {
          if (!pinkModeAnimatedIconsActive) {
            return;
          }

          const resolvedTemplates =
            (Array.isArray(templates) && templates.length
              ? templates
              : pinkModeAnimatedIconTemplates) || null;

          if (!Array.isArray(resolvedTemplates) || !resolvedTemplates.length) {
            return;
          }

          const targetCount = Math.min(
            PINK_MODE_ANIMATED_ICON_MAX_ACTIVE,
            Math.max(PINK_MODE_ANIMATED_ICON_MIN_ACTIVE, 1)
          );

          const missing = targetCount - pinkModeAnimatedIconInstances.size;
          if (missing <= 0) {
            return;
          }

          const immediate = Boolean(options && options.immediate);
          const staggerMs =
            options && typeof options.staggerMs === 'number'
              ? Math.max(0, options.staggerMs)
              : PINK_MODE_ANIMATED_ICON_SPAWN_STAGGER_MS;

          for (let index = 0; index < missing; index += 1) {
            const scheduleSpawn = () => {
              if (
                !pinkModeAnimatedIconsActive ||
                pinkModeAnimatedIconInstances.size >= PINK_MODE_ANIMATED_ICON_MAX_ACTIVE
              ) {
                return;
              }
              spawnPinkModeAnimatedIconInstance(resolvedTemplates);
            };

            let delay = 0;
            if (index === 0) {
              delay = immediate ? 0 : Math.round(staggerMs * Math.random() * 0.35);
            } else {
              delay = Math.round(
                staggerMs * index * (0.55 + Math.random() * 0.65)
              );
            }

            if (delay <= 0) {
              scheduleSpawn();
            } else if (typeof window !== 'undefined' && typeof window.setTimeout === 'function') {
              window.setTimeout(scheduleSpawn, delay);
            } else {
              scheduleSpawn();
            }
          }
        }

        function spawnPinkModeAnimatedIconInstance(templates) {
          const lottieRuntime = resolvePinkModeLottieRuntime();
          if (
            !pinkModeAnimatedIconsActive ||
            !Array.isArray(templates) ||
            !templates.length ||
            !lottieRuntime ||
            typeof lottieRuntime.loadAnimation !== 'function'
          ) {
            return false;
          }
          const layer = ensurePinkModeAnimationLayer();
          if (!layer) {
            return false;
          }
          const sanitizedTemplates = templates.filter(Boolean);
          if (!sanitizedTemplates.length) {
            return false;
          }

          const activeTemplateNames = new Set();
          for (const instance of pinkModeAnimatedIconInstances) {
            if (!instance) {
              continue;
            }
            const templateName =
              typeof instance.templateName === 'string' && instance.templateName
                ? instance.templateName
                : null;
            if (templateName) {
              activeTemplateNames.add(templateName);
            }
          }

          let availableTemplates = sanitizedTemplates.filter(template => {
            if (!template || typeof template.name !== 'string') {
              return true;
            }
            return !activeTemplateNames.has(template.name);
          });

          if (!availableTemplates.length) {
            availableTemplates = sanitizedTemplates;
          }

          if (availableTemplates.length > 1 && pinkModeAnimatedIconLastTemplateName) {
            const filteredTemplates = availableTemplates.filter(
              template => template && template.name !== pinkModeAnimatedIconLastTemplateName
            );
            if (filteredTemplates.length) {
              availableTemplates = filteredTemplates;
            }
          }

          const template = selectPinkModeAnimatedIconTemplate(availableTemplates);
          if (!template || !template.data) {
            return false;
          }
          const container = document.createElement('div');
          container.className = 'pink-mode-animation-instance';
          container.setAttribute('aria-hidden', 'true');

          // New floating logic
          const duration = Math.round(15000 + Math.random() * 10000);
          const size = Math.round(64 + Math.random() * 64);
          const xPercent = Math.random() * 90 + 5; // 5% to 95%

          container.style.setProperty('--pink-mode-animation-duration', `${duration}ms`);
          container.style.setProperty('--pink-mode-animation-size', `${size}px`);
          container.style.setProperty('--pink-mode-animation-x', `${xPercent.toFixed(2)}vw`);
          // Use default top: 110vh

          // Sway variables
          for (let i = 1; i <= 5; i++) {
            const sway = (Math.random() - 0.5) * 60;
            container.style.setProperty(`--pink-mode-animation-sway-${i}`, `${sway.toFixed(2)}px`);
          }

          // Rotation variables
          container.style.setProperty('--pink-mode-animation-rotation-start', `${(Math.random() - 0.5) * 30}deg`);
          container.style.setProperty('--pink-mode-animation-rotation-mid', `${(Math.random() - 0.5) * 20}deg`);
          container.style.setProperty('--pink-mode-animation-rotation-end', `${(Math.random() - 0.5) * 30}deg`);

          layer.appendChild(container);

          let animationData;
          try {
            animationData = JSON.parse(template.data);
          } catch (error) {
            console.warn('Could not parse pink mode animation', error);
            if (container.parentNode) {
              container.parentNode.removeChild(container);
            }
            return false;
          }

          let animationInstance;
          try {
            animationInstance = lottieRuntime.loadAnimation({
              container,
              renderer: 'svg',
              loop: true,
              autoplay: true,
              animationData
            });
          } catch (error) {
            console.warn('Could not start pink mode animation', error);
            if (container.parentNode) {
              container.parentNode.removeChild(container);
            }
            return false;
          }

          const instance = {
            container,
            animation: animationInstance,
            destroyed: false,
            templateName: typeof template.name === 'string' ? template.name : null,
            clicks: 0,
            lastClickTime: 0
          };

          // Click listener for Rain Trigger
          container.addEventListener('click', (e) => {
            e.stopPropagation();
            const now = Date.now();
            if (now - instance.lastClickTime > 1000) {
              instance.clicks = 0;
            }
            instance.lastClickTime = now;
            instance.clicks += 1;

            // Visual feedback could be added here (e.g. scale punch)

            if (instance.clicks > 3) {
              triggerPinkModeIconRain();
              instance.clicks = 0;
            }
          });

          container.addEventListener(
            'animationend',
            () => {
              destroyPinkModeAnimatedIconInstance(instance);
            },
            { once: true }
          );

          pinkModeAnimatedIconInstances.add(instance);
          if (pinkModeAnimatedIconInstances.size > PINK_MODE_ANIMATED_ICON_MAX_ACTIVE) {
            const oldest = pinkModeAnimatedIconInstances.values().next().value;
            if (oldest && oldest !== instance) {
              destroyPinkModeAnimatedIconInstance(oldest);
            }
          }

          pinkModeAnimatedIconLastTemplateName = typeof template.name === 'string' ? template.name : null;
          ensurePinkModeAnimatedIconPressListener();

          return true;
        }

        function scheduleNextPinkModeAnimatedIcon(templates) {
          if (!pinkModeAnimatedIconsActive) {
            return;
          }
          const delay = Math.round(
            Math.random() * (PINK_MODE_ANIMATED_ICON_MAX_INTERVAL_MS - PINK_MODE_ANIMATED_ICON_MIN_INTERVAL_MS) +
            PINK_MODE_ANIMATED_ICON_MIN_INTERVAL_MS
          );
          pinkModeAnimatedIconTimeoutId = window.setTimeout(() => {
            pinkModeAnimatedIconTimeoutId = null;
            if (!pinkModeAnimatedIconsActive) {
              return;
            }
            ensurePinkModeAnimatedIconPopulation(templates);
            if (pinkModeAnimatedIconsActive) {
              scheduleNextPinkModeAnimatedIcon(templates);
            }
          }, delay);
          if (
            pinkModeAnimatedIconTimeoutId &&
            typeof pinkModeAnimatedIconTimeoutId.unref === 'function'
          ) {
            pinkModeAnimatedIconTimeoutId.unref();
          }
        }

        function activatePinkModeAnimatedIcons() {
          if (
            pinkModeAnimatedIconsActive ||
            !document ||
            !document.body ||
            !document.body.classList.contains('pink-mode')
          ) {
            return;
          }

          pinkModeAnimatedIconsActive = true;
          loadPinkModeAnimatedIconTemplates()
            .then(templates => {
              if (!pinkModeAnimatedIconsActive) {
                return templates;
              }
              if (!templates.length) {
                stopPinkModeAnimatedIcons();
                return templates;
              }
              ensurePinkModeAnimatedIconPopulation(templates, {
                immediate: true
              });
              scheduleNextPinkModeAnimatedIcon(templates);
              return templates;
            })
            .catch(error => {
              console.warn('Could not prepare pink mode animated icons', error);
              stopPinkModeAnimatedIcons();
            });
        }

        function startPinkModeAnimatedIcons() {
          if (pinkModeAnimatedIconsActive) {
            return;
          }
          if (typeof document === 'undefined' || !document) {
            return;
          }
          if (!document.body) {
            whenPinkModeBodyReady(startPinkModeAnimatedIcons);
            return;
          }
          if (shouldRespectPinkModeReduceMotion()) {
            return;
          }
          if (!document.body.classList.contains('pink-mode')) {
            return;
          }

          ensurePinkModeAnimatedIconPressListener();

          const runtime = resolvePinkModeLottieRuntime();
          if (runtime && typeof runtime.loadAnimation === 'function') {
            activatePinkModeAnimatedIcons();
            return;
          }

          ensurePinkModeLottieRuntime()
            .then(lottie => {
              if (!lottie || typeof lottie.loadAnimation !== 'function') {
                return null;
              }
              if (
                !document ||
                !document.body ||
                !document.body.classList.contains('pink-mode') ||
                shouldRespectPinkModeReduceMotion()
              ) {
                return null;
              }

              activatePinkModeAnimatedIcons();
              return lottie;
            })
            .catch(error => {
              console.warn('Could not prepare pink mode animated icons', error);
              stopPinkModeAnimatedIcons();
            });
        }

        function stopPinkModeAnimatedIcons() {
          pinkModeAnimatedIconsActive = false;
          if (pinkModeAnimatedIconTimeoutId) {
            clearTimeout(pinkModeAnimatedIconTimeoutId);
            pinkModeAnimatedIconTimeoutId = null;
          }
          if (pinkModeAnimatedIconInstances.size) {
            Array.from(pinkModeAnimatedIconInstances).forEach(instance => {
              destroyPinkModeAnimatedIconInstance(instance);
            });
            pinkModeAnimatedIconInstances.clear();
          }
          if (!pinkModeAnimatedIconInstances.size) {
            teardownPinkModeAnimatedIconPressListener();
          }
          pinkModeAnimatedIconPlacementHistory.length = 0;
          if (pinkModeAnimatedIconLayer && pinkModeAnimatedIconLayer.parentNode) {
            pinkModeAnimatedIconLayer.parentNode.removeChild(pinkModeAnimatedIconLayer);
          }
          pinkModeAnimatedIconLayer = null;
          pinkModeAnimatedIconLastTemplateName = null;
          pinkModeAnimatedIconTemplateCursor = 0;
        }

        if (pinkModeReduceMotionQuery) {
          const handlePinkModeReduceMotionChange = () => {
            if (shouldRespectPinkModeReduceMotion()) {
              stopPinkModeAnimatedIcons();
            } else if (document.body && document.body.classList.contains('pink-mode')) {
              startPinkModeAnimatedIcons();
            }
          };
          if (typeof pinkModeReduceMotionQuery.addEventListener === 'function') {
            pinkModeReduceMotionQuery.addEventListener('change', handlePinkModeReduceMotionChange);
          } else if (typeof pinkModeReduceMotionQuery.addListener === 'function') {
            pinkModeReduceMotionQuery.addListener(handlePinkModeReduceMotionChange);
          }
        }

        var PINK_MODE_ICON_INTERVAL_MS = 30000;
        var PINK_MODE_ICON_ANIMATION_CLASS = 'pink-mode-icon-pop';
        var PINK_MODE_ICON_ANIMATION_RESET_DELAY = 450;

        function readPinkModeIconRotationTimer() {
          return typeof pinkModeIconRotationTimer === "undefined" ? null : pinkModeIconRotationTimer;
        }

        function writePinkModeIconRotationTimer(value) {
          if (typeof value === "number" || value === null || (value && typeof value === "object")) {
            pinkModeIconRotationTimer = value;
          }
        }

        function readPinkModeIconIndex() {
          return typeof pinkModeIconIndex === "number" ? pinkModeIconIndex : 0;
        }

        function writePinkModeIconIndex(value) {
          if (typeof value === "number") {
            pinkModeIconIndex = value;
          }
        }

        ensurePinkModeFallbackIconSequence();

        const exports = {
          pinkModeIcons,
          ensureSvgHasAriaHidden,
          setPinkModeIconSequence,
          loadPinkModeIconsFromFiles,
          loadPinkModeAnimatedIconTemplates,
          ensurePinkModeLottieRuntime,
          resolvePinkModeLottieRuntime,
          startPinkModeAnimatedIcons,
          stopPinkModeAnimatedIcons,
          triggerPinkModeIconRain,
          getPinkModeIconRotationTimer: readPinkModeIconRotationTimer,
          setPinkModeIconRotationTimer: writePinkModeIconRotationTimer,
          getPinkModeIconIndex: readPinkModeIconIndex,
          setPinkModeIconIndex: writePinkModeIconIndex,
          PINK_MODE_ICON_INTERVAL_MS,
          PINK_MODE_ICON_ANIMATION_CLASS,
          PINK_MODE_ICON_ANIMATION_RESET_DELAY,
          PINK_MODE_ICON_FALLBACK_MARKUP
        };

        if (typeof module !== "undefined" && module.exports) {
          module.exports = exports;
        }

        if (GLOBAL_SCOPE) {
          try {
            const target = GLOBAL_SCOPE.cineCorePinkModeAnimations || {};
            Object.assign(target, exports);
            GLOBAL_SCOPE.cineCorePinkModeAnimations = target;
          } catch (pinkModeGlobalAssignError) {
            void pinkModeGlobalAssignError;
          }
        }
      })();

    },

    'modules/core/pink-mode-support.js': function (module, exports, require) {
      /* global cineCorePinkModeAnimations */

      (function () {
        function detectScope() {
          if (typeof globalThis !== 'undefined' && globalThis && typeof globalThis === 'object') {
            return globalThis;
          }

          if (typeof window !== 'undefined' && window && typeof window === 'object') {
            return window;
          }

          if (typeof self !== 'undefined' && self && typeof self === 'object') {
            return self;
          }

          if (typeof global !== 'undefined' && global && typeof global === 'object') {
            return global;
          }

          return null;
        }

        function isObject(value) {
          return !!value && (typeof value === 'object' || typeof value === 'function');
        }

        function createSafeResolvedPromise(value) {
          if (typeof Promise !== 'undefined' && typeof Promise.resolve === 'function') {
            return Promise.resolve(value);
          }

          const promiseLike = {
            then(callback) {
              if (typeof callback === 'function') {
                try {
                  return createSafeResolvedPromise(callback(value));
                } catch (callbackError) {
                  void callbackError;
                  return createSafeResolvedPromise(undefined);
                }
              }
              return promiseLike;
            },
            catch() {
              return promiseLike;
            },
          };

          return promiseLike;
        }

        function createFallbackSupport() {
          const fallbackIcons = Object.freeze({
            off: Object.freeze({ className: 'icon-svg pink-mode-icon', markup: '' }),
            onSequence: Object.freeze([]),
          });

          const fallbackMarkup = Object.freeze([]);

          function ensureSvgHasAriaHidden(markup) {
            return typeof markup === 'string' ? markup.trim() : '';
          }

          function noop() { }

          function returnFalse() {
            return false;
          }

          function getNull() {
            return null;
          }

          function getZero() {
            return 0;
          }

          return {
            pinkModeIcons: fallbackIcons,
            ensureSvgHasAriaHidden,
            setPinkModeIconSequence: returnFalse,
            loadPinkModeIconsFromFiles() {
              return createSafeResolvedPromise();
            },
            ensurePinkModeLottieRuntime() {
              return createSafeResolvedPromise(null);
            },
            resolvePinkModeLottieRuntime: getNull,
            startPinkModeAnimatedIcons: noop,
            stopPinkModeAnimatedIcons: noop,
            triggerPinkModeIconRain: noop,
            getPinkModeIconRotationTimer: getNull,
            setPinkModeIconRotationTimer: noop,
            getPinkModeIconIndex: getZero,
            setPinkModeIconIndex: noop,
            PINK_MODE_ICON_INTERVAL_MS: 30000,
            PINK_MODE_ICON_ANIMATION_CLASS: 'pink-mode-icon-pop',
            PINK_MODE_ICON_ANIMATION_RESET_DELAY: 450,
            PINK_MODE_ICON_FALLBACK_MARKUP: fallbackMarkup,
          };
        }

        function resolvePinkModeAnimations(scope) {
          if (typeof cineCorePinkModeAnimations !== 'undefined' && isObject(cineCorePinkModeAnimations)) {
            return cineCorePinkModeAnimations;
          }

          if (scope && isObject(scope.cineCorePinkModeAnimations)) {
            return scope.cineCorePinkModeAnimations;
          }

          if (typeof require === 'function') {
            try {
              const required = require('./pink-mode-animations.js');
              if (isObject(required)) {
                return required;
              }
            } catch (pinkModeRequireError) {
              void pinkModeRequireError;
            }
          }

          return null;
        }

        function resolvePinkModeSupport(scope) {
          const fallback = createFallbackSupport();
          const animations = resolvePinkModeAnimations(scope);

          if (!isObject(animations)) {
            return fallback;
          }

          return {
            pinkModeIcons: isObject(animations.pinkModeIcons)
              ? animations.pinkModeIcons
              : fallback.pinkModeIcons,
            ensureSvgHasAriaHidden:
              typeof animations.ensureSvgHasAriaHidden === 'function'
                ? animations.ensureSvgHasAriaHidden
                : fallback.ensureSvgHasAriaHidden,
            setPinkModeIconSequence:
              typeof animations.setPinkModeIconSequence === 'function'
                ? animations.setPinkModeIconSequence
                : fallback.setPinkModeIconSequence,
            loadPinkModeIconsFromFiles:
              typeof animations.loadPinkModeIconsFromFiles === 'function'
                ? animations.loadPinkModeIconsFromFiles
                : fallback.loadPinkModeIconsFromFiles,
            ensurePinkModeLottieRuntime:
              typeof animations.ensurePinkModeLottieRuntime === 'function'
                ? animations.ensurePinkModeLottieRuntime
                : fallback.ensurePinkModeLottieRuntime,
            resolvePinkModeLottieRuntime:
              typeof animations.resolvePinkModeLottieRuntime === 'function'
                ? animations.resolvePinkModeLottieRuntime
                : fallback.resolvePinkModeLottieRuntime,
            startPinkModeAnimatedIcons:
              typeof animations.startPinkModeAnimatedIcons === 'function'
                ? animations.startPinkModeAnimatedIcons
                : fallback.startPinkModeAnimatedIcons,
            stopPinkModeAnimatedIcons:
              typeof animations.stopPinkModeAnimatedIcons === 'function'
                ? animations.stopPinkModeAnimatedIcons
                : fallback.stopPinkModeAnimatedIcons,
            triggerPinkModeIconRain:
              typeof animations.triggerPinkModeIconRain === 'function'
                ? animations.triggerPinkModeIconRain
                : fallback.triggerPinkModeIconRain,
            getPinkModeIconRotationTimer:
              typeof animations.getPinkModeIconRotationTimer === 'function'
                ? animations.getPinkModeIconRotationTimer
                : fallback.getPinkModeIconRotationTimer,
            setPinkModeIconRotationTimer:
              typeof animations.setPinkModeIconRotationTimer === 'function'
                ? animations.setPinkModeIconRotationTimer
                : fallback.setPinkModeIconRotationTimer,
            getPinkModeIconIndex:
              typeof animations.getPinkModeIconIndex === 'function'
                ? animations.getPinkModeIconIndex
                : fallback.getPinkModeIconIndex,
            setPinkModeIconIndex:
              typeof animations.setPinkModeIconIndex === 'function'
                ? animations.setPinkModeIconIndex
                : fallback.setPinkModeIconIndex,
            PINK_MODE_ICON_INTERVAL_MS:
              typeof animations.PINK_MODE_ICON_INTERVAL_MS === 'number'
                ? animations.PINK_MODE_ICON_INTERVAL_MS
                : fallback.PINK_MODE_ICON_INTERVAL_MS,
            PINK_MODE_ICON_ANIMATION_CLASS:
              typeof animations.PINK_MODE_ICON_ANIMATION_CLASS === 'string'
                ? animations.PINK_MODE_ICON_ANIMATION_CLASS
                : fallback.PINK_MODE_ICON_ANIMATION_CLASS,
            PINK_MODE_ICON_ANIMATION_RESET_DELAY:
              typeof animations.PINK_MODE_ICON_ANIMATION_RESET_DELAY === 'number'
                ? animations.PINK_MODE_ICON_ANIMATION_RESET_DELAY
                : fallback.PINK_MODE_ICON_ANIMATION_RESET_DELAY,
            PINK_MODE_ICON_FALLBACK_MARKUP:
              Array.isArray(animations.PINK_MODE_ICON_FALLBACK_MARKUP)
                ? animations.PINK_MODE_ICON_FALLBACK_MARKUP
                : fallback.PINK_MODE_ICON_FALLBACK_MARKUP,
          };
        }

        const scope = detectScope();
        const support = resolvePinkModeSupport(scope);

        const api = {
          resolvePinkModeSupport() {
            return support;
          },
          createFallbackSupport,
          pinkModeIcons: support.pinkModeIcons,
          ensureSvgHasAriaHidden: support.ensureSvgHasAriaHidden,
          setPinkModeIconSequence: support.setPinkModeIconSequence,
          loadPinkModeIconsFromFiles: support.loadPinkModeIconsFromFiles,
          ensurePinkModeLottieRuntime: support.ensurePinkModeLottieRuntime,
          resolvePinkModeLottieRuntime: support.resolvePinkModeLottieRuntime,
          startPinkModeAnimatedIcons: support.startPinkModeAnimatedIcons,
          stopPinkModeAnimatedIcons: support.stopPinkModeAnimatedIcons,
          triggerPinkModeIconRain: support.triggerPinkModeIconRain,
          getPinkModeIconRotationTimer: support.getPinkModeIconRotationTimer,
          setPinkModeIconRotationTimer: support.setPinkModeIconRotationTimer,
          getPinkModeIconIndex: support.getPinkModeIconIndex,
          setPinkModeIconIndex: support.setPinkModeIconIndex,
          PINK_MODE_ICON_INTERVAL_MS: support.PINK_MODE_ICON_INTERVAL_MS,
          PINK_MODE_ICON_ANIMATION_CLASS: support.PINK_MODE_ICON_ANIMATION_CLASS,
          PINK_MODE_ICON_ANIMATION_RESET_DELAY: support.PINK_MODE_ICON_ANIMATION_RESET_DELAY,
          PINK_MODE_ICON_FALLBACK_MARKUP: support.PINK_MODE_ICON_FALLBACK_MARKUP,
        };

        if (typeof module !== 'undefined' && module.exports) {
          module.exports = api;
        }

        if (scope && isObject(scope)) {
          try {
            const target = scope.cineCorePinkModeSupport || {};
            Object.assign(target, api);
            scope.cineCorePinkModeSupport = target;
          } catch (pinkModeSupportAssignError) {
            void pinkModeSupportAssignError;
          }
        }
      })();

    }
  };
  /* eslint-enable no-unused-vars */


  const MODULE_CACHE = Object.create(null);

  function loadModule(moduleId) {
    if (MODULE_CACHE[moduleId]) {
      return MODULE_CACHE[moduleId].exports;
    }

    const factory = MODULE_FACTORIES[moduleId];
    if (typeof factory !== 'function') {
      throw new Error('Unknown pink mode module: ' + moduleId);
    }

    const module = { exports: {} };
    MODULE_CACHE[moduleId] = module;

    const moduleDir = getModuleDirectory(moduleId);

    function localRequire(request) {
      if (typeof request === 'string') {
        let normalized = null;
        if (request.startsWith('./modules/core/')) {
          normalized = request.slice(2);
        } else if (request.startsWith('../core/')) {
          normalized = 'modules/core/' + request.slice(8);
        } else if (request.startsWith('./') || request.startsWith('../')) {
          normalized = normalizeFromDir(moduleDir, request);
        }
        if (normalized && MODULE_FACTORIES[normalized]) {
          return loadModule(normalized);
        }
      }
      return require(request);
    }

    factory(module, module.exports, localRequire);

    return module.exports;
  }

  const exportsMap = {};
  Object.keys(MODULE_FACTORIES).forEach(moduleId => {
    exportsMap[moduleId] = loadModule(moduleId);
  });

  if (typeof module === 'object' && module && module.exports) {
    module.exports = exportsMap;
  }

  const globalScope = typeof globalThis === 'object' && globalThis
    ? globalThis
    : typeof window === 'object' && window
      ? window
      : typeof self === 'object' && self
        ? self
        : typeof global === 'object' && global
          ? global
          : null;

  if (globalScope) {
    const targetName = 'cineCorePinkModeModules';
    const existing = globalScope[targetName] && typeof globalScope[targetName] === 'object'
      ? globalScope[targetName]
      : {};
    Object.keys(exportsMap).forEach(key => {
      existing[key] = exportsMap[key];
    });
    try {
      globalScope[targetName] = existing;
    } catch (assignError) {
      void assignError;
    }
  }
})();
