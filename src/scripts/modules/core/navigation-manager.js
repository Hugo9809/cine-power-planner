
const OFFLINE_RELOAD_TIMEOUT_MS = 5000;
const FORCE_RELOAD_CLEANUP_TIMEOUT_MS = 700;
const CACHE_KEY_TOKENS_FOR_RELOAD = ['cine-power-planner', 'cinepowerplanner'];

function readLocationHrefSafe(locationLike) {
    if (!locationLike || typeof locationLike !== 'object') {
        return '';
    }
    try {
        const href = locationLike.href;
        return typeof href === 'string' ? href : '';
    } catch (error) {
        void error;
        return '';
    }
}

function readLocationPathnameSafe(locationLike) {
    if (!locationLike || typeof locationLike !== 'object') {
        return '';
    }
    try {
        const pathname = locationLike.pathname;
        return typeof pathname === 'string' ? pathname : '';
    } catch (error) {
        void error;
        return '';
    }
}

function readLocationOriginSafe(locationLike) {
    if (!locationLike || typeof locationLike !== 'object') {
        return '';
    }
    try {
        const origin = locationLike.origin;
        if (typeof origin === 'string' && origin) {
            return origin;
        }
    } catch (error) {
        void error;
    }

    const href = readLocationHrefSafe(locationLike);
    if (!href) {
        return '';
    }

    if (typeof URL === 'function') {
        try {
            return new URL(href).origin;
        } catch (originError) {
            void originError;
        }
    }

    const originMatch = href.match(/^([a-zA-Z][a-zA-Z\d+.-]*:\/\/[^/]+)/);
    return originMatch && originMatch[1] ? originMatch[1] : '';
}

function getForceReloadBaseCandidates(locationLike, originalHref) {
    const candidates = [];
    const unique = new Set();

    const addCandidate = value => {
        if (typeof value !== 'string') {
            return;
        }
        const trimmed = value.trim();
        if (!trimmed || unique.has(trimmed)) {
            return;
        }
        unique.add(trimmed);
        candidates.push(trimmed);
    };

    const safeHref = readLocationHrefSafe(locationLike);
    if (safeHref) {
        addCandidate(safeHref);
    }
    if (typeof originalHref === 'string' && originalHref) {
        addCandidate(originalHref);
    }

    const origin = readLocationOriginSafe(locationLike);
    const pathname = readLocationPathnameSafe(locationLike);
    if (origin) {
        if (pathname) {
            addCandidate(`${origin}${pathname}`);
        }
        addCandidate(`${origin}/`);
    }

    if (typeof window !== 'undefined' && window && window.location) {
        const windowHref = readLocationHrefSafe(window.location);
        if (windowHref) {
            addCandidate(windowHref);
        }
    }
    return candidates;
}

function normaliseForceReloadHref(value, baseHref) {
    if (typeof value !== 'string') {
        return '';
    }
    const trimmed = value.trim();
    if (!trimmed) {
        return '';
    }
    if (typeof URL === 'function') {
        try {
            return new URL(trimmed).toString();
        } catch (primaryError) {
            void primaryError;
            if (typeof baseHref === 'string' && baseHref) {
                try {
                    return new URL(trimmed, baseHref).toString();
                } catch (secondaryError) {
                    void secondaryError;
                }
            }
        }
    }
    return trimmed;
}

function buildForceReloadHref(locationLike, paramName) {
    const param = typeof paramName === 'string' && paramName ? paramName : 'forceReload';
    const timestamp = Date.now().toString(36);
    const originalHref = readLocationHrefSafe(locationLike);
    const baseCandidates = getForceReloadBaseCandidates(locationLike, originalHref);

    if (!originalHref) {
        return { originalHref, nextHref: originalHref, param, timestamp };
    }

    if (typeof URL === 'function') {
        const urlCandidates = [originalHref, ...baseCandidates];
        for (let index = 0; index < urlCandidates.length; index += 1) {
            const candidate = urlCandidates[index];
            try {
                const url = index === 0 ? new URL(candidate) : new URL(originalHref, candidate);
                url.searchParams.set(param, timestamp);
                return { originalHref, nextHref: url.toString(), param, timestamp };
            } catch (candidateError) {
                void candidateError;
            }
        }
    }

    let href = originalHref;
    let hash = '';
    const hashIndex = href.indexOf('#');
    if (hashIndex !== -1) {
        hash = href.slice(hashIndex);
        href = href.slice(0, hashIndex);
    }

    const pattern = new RegExp(`([?&])${param}=[^&]*`);
    const replacement = `$1${param}=${timestamp}`;
    if (pattern.test(href)) {
        href = href.replace(pattern, replacement);
    } else if (href.indexOf('?') !== -1) {
        href += `&${param}=${timestamp}`;
    } else if (href) {
        href += `?${param}=${timestamp}`;
    }

    if (typeof URL === 'function') {
        for (let index = 0; index < baseCandidates.length; index += 1) {
            const candidate = baseCandidates[index];
            try {
                const absolute = new URL(href + hash, candidate).toString();
                return { originalHref, nextHref: absolute, param, timestamp };
            } catch (absoluteError) {
                void absoluteError;
            }
        }
    }

    return { originalHref, nextHref: href ? href + hash : originalHref, param, timestamp };
}

function scheduleForceReloadNavigationWarning(locationLike, baseHref, description, before, expected, initialAfter) {
    let schedule = null;
    try {
        if (typeof window !== 'undefined' && window && typeof window.setTimeout === 'function') {
            schedule = window.setTimeout.bind(window);
        }
    } catch (error) { void error; }

    if (!schedule) {
        if (typeof setTimeout === 'function') {
            schedule = setTimeout;
        } else {
            console.warn('Forced reload navigation attempt did not update location', {
                description, before, after: initialAfter, expected
            });
            return;
        }
    }

    let resolved = false;
    const evaluate = () => {
        const currentRaw = readLocationHrefSafe(locationLike);
        const current = normaliseForceReloadHref(currentRaw, baseHref);
        if ((expected && (current === expected || current === `${expected}#`)) ||
            (before !== current && current && (!expected || current === expected))) {
            resolved = true;
            return { matched: true, value: current };
        }
        return { matched: false, value: current };
    };

    const verifyDelays = [90, 240, 480];
    verifyDelays.forEach((delay, index) => {
        const isFinalCheck = index === verifyDelays.length - 1;
        const runCheck = () => {
            if (resolved) return;
            const result = evaluate();
            if (result.matched) return;
            if (isFinalCheck) {
                resolved = true;
                console.warn('Forced reload navigation attempt did not update location', {
                    description, before, after: result.value, expected
                });
            }
        };
        try { schedule(runCheck, delay); } catch (e) { if (isFinalCheck) runCheck(); }
    });
}

function attemptForceReloadNavigation(locationLike, nextHref, baseHref, applyFn, description) {
    if (!locationLike || typeof applyFn !== 'function' || typeof nextHref !== 'string' || !nextHref) {
        return false;
    }
    const beforeRaw = readLocationHrefSafe(locationLike);
    const before = normaliseForceReloadHref(beforeRaw, baseHref);
    try {
        applyFn(nextHref);
    } catch (error) {
        console.warn('Forced reload navigation helper failed', { description, error });
        return false;
    }
    const afterRaw = readLocationHrefSafe(locationLike);
    const after = normaliseForceReloadHref(afterRaw, baseHref);
    const expected = normaliseForceReloadHref(nextHref, baseHref);

    if ((expected && (after === expected || after === `${expected}#`)) ||
        (before !== after && after && (!expected || after === expected))) {
        return true;
    }
    scheduleForceReloadNavigationWarning(locationLike, baseHref, description, before, expected, after);
    return false;
}

function attemptForceReloadHistoryFallback(win, locationLike, nextHref, baseHref) {
    if (!win || !locationLike || typeof nextHref !== 'string' || !nextHref) {
        return false;
    }
    let historyLike = null;
    try {
        historyLike = win.history || null;
    } catch (error) {
        console.warn('Forced reload history access failed', error);
        historyLike = null;
    }
    if (!historyLike || typeof historyLike.replaceState !== 'function') {
        return false;
    }

    const beforeRaw = readLocationHrefSafe(locationLike);
    const before = normaliseForceReloadHref(beforeRaw, baseHref);
    const expected = normaliseForceReloadHref(nextHref, baseHref);

    let replaceUrl = nextHref;
    try {
        const reference = beforeRaw || baseHref || undefined;
        const parsed = typeof URL === 'function' ? new URL(nextHref, reference) : null;
        if (parsed) {
            replaceUrl = `${parsed.pathname || ''}${parsed.search || ''}${parsed.hash || ''}` || parsed.toString();
        }
    } catch (error) {
        console.warn('Forced reload history fallback URL parse failed', error);
        replaceUrl = nextHref;
    }

    let stateSnapshot = null;
    let hasStateSnapshot = false;
    try {
        stateSnapshot = historyLike.state;
        hasStateSnapshot = true;
    } catch (stateError) {
        console.warn('Forced reload history state snapshot failed', stateError);
    }

    try {
        historyLike.replaceState(hasStateSnapshot ? stateSnapshot : null, '', replaceUrl);
    } catch (replaceError) {
        console.warn('Forced reload history replaceState failed', replaceError);
        return false;
    }

    const afterRaw = readLocationHrefSafe(locationLike);
    const after = normaliseForceReloadHref(afterRaw, baseHref);
    const updated = (expected && (after === expected || after === `${expected}#`))
        || (before !== after && after && (!expected || after === expected));

    if (!updated) {
        scheduleForceReloadNavigationWarning(
            locationLike, baseHref, 'history.replaceState', before, expected, after
        );
        return false;
    }
    if (typeof locationLike.reload === 'function') {
        try {
            locationLike.reload();
            return true;
        } catch (reloadError) {
            console.warn('Forced reload via history replaceState reload failed', reloadError);
        }
    }
    return true;
}

function waitForReloadNavigation(beforeHref, options = {}) {
    if (typeof window === 'undefined' || !window) {
        return Promise.resolve(false);
    }

    const win = window;
    const startHref = typeof beforeHref === 'string' ? beforeHref : '';
    const timeout =
        options && typeof options.timeout === 'number' && options.timeout > 0
            ? options.timeout
            : 1500;
    const pollInterval =
        options && typeof options.interval === 'number' && options.interval > 0
            ? options.interval
            : 60;
    const schedule =
        typeof win.setTimeout === 'function' ? win.setTimeout.bind(win) : setTimeout;
    const cancel =
        typeof win.clearTimeout === 'function' ? win.clearTimeout.bind(win) : clearTimeout;

    return new Promise(resolve => {
        let resolved = false;
        let pollTimer = null;
        let timeoutTimer = null;

        const cleanup = () => {
            if (pollTimer) {
                try { cancel(pollTimer); } catch (cancelError) { void cancelError; }
                pollTimer = null;
            }
            if (timeoutTimer) {
                try { cancel(timeoutTimer); } catch (timeoutCancelError) { void timeoutCancelError; }
                timeoutTimer = null;
            }
            if (typeof win.removeEventListener === 'function') {
                try { win.removeEventListener('beforeunload', handleUnload, true); } catch (e) { void e; }
                try { win.removeEventListener('pagehide', handleUnload, true); } catch (e) { void e; }
                try { win.removeEventListener('unload', handleUnload, true); } catch (e) { void e; }
            }
        };

        const finish = value => {
            if (resolved) return;
            resolved = true;
            cleanup();
            resolve(value);
        };

        const handleUnload = () => { finish(true); };

        const evaluate = () => {
            if (resolved) return;
            try {
                const currentHref = readLocationHrefSafe(win.location);
                if (startHref && currentHref && currentHref !== startHref) {
                    finish(true);
                    return;
                }
            } catch (readError) { void readError; }
            pollTimer = schedule(evaluate, pollInterval);
        };

        if (typeof win.addEventListener === 'function') {
            try { win.addEventListener('beforeunload', handleUnload, true); } catch (e) { void e; }
            try { win.addEventListener('pagehide', handleUnload, true); } catch (e) { void e; }
            try { win.addEventListener('unload', handleUnload, true); } catch (e) { void e; }
        }

        evaluate();
        timeoutTimer = schedule(() => { finish(false); }, timeout);
    });
}

function awaitPromiseWithSoftTimeout(promise, timeoutMs, onTimeout, onLateRejection) {
    if (!promise || typeof promise.then !== 'function') {
        return Promise.resolve({ timedOut: false, result: promise });
    }

    const ms = typeof timeoutMs === 'number' && timeoutMs >= 0 ? timeoutMs : null;
    const schedule = typeof setTimeout === 'function' ? setTimeout : null;
    const cancel = typeof clearTimeout === 'function' ? clearTimeout : null;

    if (ms === null || !schedule) {
        return promise.then(result => ({ timedOut: false, result }));
    }

    let finished = false;
    let timerId = null;

    return new Promise((resolve, reject) => {
        promise.then(
            value => {
                if (finished) return value;
                finished = true;
                if (timerId != null && cancel) {
                    try { cancel(timerId); } catch (e) { void e; }
                }
                resolve({ timedOut: false, result: value });
                return value;
            },
            error => {
                if (finished) {
                    if (typeof onLateRejection === 'function') {
                        try { onLateRejection(error); } catch (e) { void e; }
                    }
                    return null;
                }
                finished = true;
                if (timerId != null && cancel) {
                    try { cancel(timerId); } catch (e) { void e; }
                }
                reject(error);
                return null;
            },
        );

        timerId = schedule(() => {
            if (finished) return;
            finished = true;
            if (typeof onTimeout === 'function') {
                try { onTimeout(); } catch (e) { void e; }
            }
            resolve({ timedOut: true, result: undefined });
        }, ms);
    });
}

function tryForceReload(win) {
    if (!win || !win.location) return false;
    const locationLike = win.location;
    const { nextHref, param } = buildForceReloadHref(locationLike);
    if (!nextHref) return false;

    const baseHref = readLocationHrefSafe(locationLike);

    // Attempt 1: location.replace
    if (typeof locationLike.replace === 'function') {
        const success = attemptForceReloadNavigation(
            locationLike, nextHref, baseHref,
            (url) => locationLike.replace(url), 'location.replace'
        );
        if (success) return true;
    }

    // Attempt 2: location.assign
    if (typeof locationLike.assign === 'function') {
        const success = attemptForceReloadNavigation(
            locationLike, nextHref, baseHref,
            (url) => locationLike.assign(url), 'location.assign'
        );
        if (success) return true;
    }

    // Attempt 3: location.href assignment
    const success = attemptForceReloadNavigation(
        locationLike, nextHref, baseHref,
        (url) => { locationLike.href = url; }, 'location.href'
    );
    if (success) return true;

    // Fallback: History Replacement
    const historySuccess = attemptForceReloadHistoryFallback(win, locationLike, nextHref, baseHref);
    return historySuccess;
}

function resolveForceReloadOfflineNotice() {
    if (typeof document === 'undefined') return null;
    try {
        return document.getElementById('forceReloadOfflineNotice');
    } catch { return null; }
}

function announceForceReloadOfflineNotice(noticeEl) {
    if (noticeEl) {
        noticeEl.removeAttribute('hidden');
        if (typeof noticeEl.focus === 'function') {
            try { noticeEl.focus(); } catch (e) { void e; }
        }
    }
}

function observeServiceWorkerControllerChangeForSession(navigatorLike) {
    const nav = navigatorLike && typeof navigatorLike === 'object' ? navigatorLike : null;
    if (!nav || !nav.serviceWorker) {
        return null;
    }
    const { serviceWorker } = nav;
    if (!serviceWorker) {
        return null;
    }
    let resolved = false;
    let detach = null;
    let resolver = null;
    let attached = false;

    const finalize = (value) => {
        if (resolved) return;
        resolved = true;
        const currentResolver = resolver;
        resolver = null;
        if (typeof detach === 'function') {
            try { detach(); } catch (error) { void error; }
            detach = null;
        }
        if (typeof currentResolver === 'function') {
            try { currentResolver(value); } catch (resolveError) { void resolveError; }
        }
    };

    const promise = new Promise((resolve) => {
        resolver = resolve;
        if (serviceWorker.controller) {
            finalize(true);
            return;
        }
        const handler = () => { finalize(true); };
        try {
            if (typeof serviceWorker.addEventListener === 'function') {
                serviceWorker.addEventListener('controllerchange', handler);
                detach = () => {
                    try { serviceWorker.removeEventListener('controllerchange', handler); } catch (removeError) { void removeError; }
                };
                attached = true;
            } else if ('oncontrollerchange' in serviceWorker) {
                const previous = serviceWorker.oncontrollerchange;
                serviceWorker.oncontrollerchange = function controllerchangeProxy(event) {
                    if (typeof previous === 'function') {
                        try { previous.call(this, event); } catch (previousError) { console.warn('Existing service worker controllerchange handler failed', previousError); }
                    }
                    handler(event);
                };
                detach = () => {
                    try { serviceWorker.oncontrollerchange = previous; } catch (restoreError) { void restoreError; }
                };
                attached = true;
            } else {
                finalize(false);
            }
        } catch (error) {
            console.warn('Failed to observe service worker controllerchange', error);
            finalize(false);
        }
    });

    if (!attached && !serviceWorker.controller) {
        finalize(false);
        return null;
    }

    return {
        promise,
        cancel() { finalize(false); },
    };
}

async function collectServiceWorkerRegistrationsForReload(serviceWorker) {
    if (!serviceWorker) {
        return [];
    }

    const registrations = [];
    const pushRegistration = (registration) => {
        if (registration) {
            registrations.push(registration);
        }
    };

    try {
        if (typeof serviceWorker.getRegistrations === 'function') {
            const regs = await serviceWorker.getRegistrations();
            if (Array.isArray(regs)) {
                regs.forEach(pushRegistration);
            }
        } else if (typeof serviceWorker.getRegistration === 'function') {
            const reg = await serviceWorker.getRegistration();
            pushRegistration(reg);
        } else if (serviceWorker.ready && typeof serviceWorker.ready.then === 'function') {
            try {
                const readyReg = await serviceWorker.ready;
                pushRegistration(readyReg);
            } catch (readyError) {
                console.warn('Failed to await active service worker', readyError);
            }
        }
    } catch (queryError) {
        console.warn('Failed to query service worker registrations', queryError);
    }

    return registrations;
}

function resolveCineCacheNameForReload() {
    const scopes = [
        typeof globalThis !== 'undefined' ? globalThis : null,
        typeof window !== 'undefined' ? window : null,
        typeof self !== 'undefined' ? self : null,
        typeof global !== 'undefined' ? global : null,
    ];

    for (let index = 0; index < scopes.length; index += 1) {
        const scope = scopes[index];
        if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
            continue;
        }

        try {
            const name = scope.CINE_CACHE_NAME;
            if (typeof name === 'string' && name) {
                return name;
            }
        } catch (error) {
            void error;
        }
    }

    return '';
}

function isRelevantCacheKeyForReload(key, explicitName, lowerExplicit) {
    if (typeof key !== 'string' || !key) {
        return false;
    }

    if (explicitName && (key === explicitName || key.toLowerCase() === lowerExplicit)) {
        return true;
    }

    const lowerKey = key.toLowerCase();
    for (let index = 0; index < CACHE_KEY_TOKENS_FOR_RELOAD.length; index += 1) {
        if (lowerKey.includes(CACHE_KEY_TOKENS_FOR_RELOAD[index])) {
            return true;
        }
    }

    return false;
}

function createReloadFallback(win, delayMs = 4500) {
    if (!win) {
        return null;
    }

    let schedule = null;
    let cancel = null;

    try {
        if (typeof win.setTimeout === 'function') {
            schedule = win.setTimeout.bind(win);
        }
    } catch (scheduleError) {
        void scheduleError;
    }

    try {
        if (typeof win.clearTimeout === 'function') {
            cancel = win.clearTimeout.bind(win);
        }
    } catch (cancelError) {
        void cancelError;
    }

    if (!schedule) {
        if (typeof setTimeout === 'function') {
            schedule = setTimeout;
        } else {
            return {
                triggerNow() {
                    tryForceReload(win);
                },
            };
        }
    }

    if (!cancel) {
        cancel = typeof clearTimeout === 'function' ? clearTimeout : null;
    }

    let executed = false;
    let timerId = null;

    const run = () => {
        if (executed) {
            return;
        }
        executed = true;
        timerId = null;

        try {
            if (!tryForceReload(win) && win && win.location && typeof win.location.reload === 'function') {
                win.location.reload();
            }
        } catch (error) {
            console.warn('Force reload fallback execution failed', error);
            try {
                if (win && win.location && typeof win.location.reload === 'function') {
                    win.location.reload();
                }
            } catch (reloadError) {
                console.warn('Ultimate force reload fallback failed', reloadError);
            }
        }
    };

    try {
        timerId = schedule(run, delayMs);
    } catch (scheduleError) {
        console.warn('Unable to schedule reload fallback timer', scheduleError);
        run();
    }

    return {
        triggerNow() {
            if (executed) {
                return;
            }

            if (timerId != null && typeof cancel === 'function') {
                try {
                    cancel(timerId);
                } catch (cancelError) {
                    void cancelError;
                }
            }

            run();
        },
    };
}

function prepareForceReloadContext(win) {
    if (!win || !win.location) {
        return null;
    }

    const { location } = win;
    const hasReplace = typeof location.replace === 'function';
    const hasAssign = typeof location.assign === 'function';
    const hasReload = typeof location.reload === 'function';
    const forceReloadUrl = buildForceReloadHref(location, 'forceReload');
    const { originalHref, nextHref, timestamp } = forceReloadUrl;
    const baseHref = normaliseForceReloadHref(originalHref, originalHref) || originalHref;

    return {
        win,
        location,
        hasReplace,
        hasAssign,
        hasReload,
        originalHref,
        nextHref,
        timestamp,
        baseHref,
    };
}

function executeForceReloadContext(context) {
    if (!context || !context.location) {
        return false;
    }

    const {
        win,
        location,
        hasReplace,
        hasAssign,
        hasReload,
        originalHref,
        nextHref,
        timestamp,
        baseHref,
    } = context;

    let navigationTriggered = false;

    if (hasReplace && nextHref) {
        navigationTriggered = attemptForceReloadNavigation(
            location,
            nextHref,
            baseHref,
            url => location.replace(url),
            'location.replace',
        );
    }

    if (!navigationTriggered && hasAssign && nextHref) {
        navigationTriggered = attemptForceReloadNavigation(
            location,
            nextHref,
            baseHref,
            url => location.assign(url),
            'location.assign',
        );
    }

    if (!navigationTriggered && nextHref && nextHref !== originalHref) {
        navigationTriggered = attemptForceReloadNavigation(
            location,
            nextHref,
            baseHref,
            url => {
                location.href = url;
            },
            'location.href assignment',
        );
    }

    if (!navigationTriggered && win && nextHref) {
        navigationTriggered = attemptForceReloadHistoryFallback(win, location, nextHref, baseHref);
    }

    const canOnlyReload = !nextHref || nextHref === originalHref;

    if (!navigationTriggered && canOnlyReload && hasReload) {
        try {
            location.reload();
            navigationTriggered = true;
        } catch (reloadError) {
            console.warn('Forced reload via location.reload failed', reloadError);
        }
    }

    if (!navigationTriggered) {
        scheduleForceReloadFallbacks(win, location, {
            originalHref,
            baseHref,
            nextHref,
            hasReload,
            timestamp,
        });
    }

    return navigationTriggered;
}

function scheduleForceReloadFallbacks(win, locationLike, options = {}) {
    if (!win || !locationLike) {
        return;
    }

    let schedule = null;
    try {
        if (typeof win.setTimeout === 'function') {
            schedule = win.setTimeout.bind(win);
        }
    } catch (error) {
        void error;
    }

    if (!schedule) {
        if (typeof setTimeout === 'function') {
            schedule = setTimeout;
        } else {
            return;
        }
    }

    const hasReload = options.hasReload === true && typeof locationLike.reload === 'function';
    const baseHref = typeof options.baseHref === 'string' ? options.baseHref : '';
    const nextHref = typeof options.nextHref === 'string' ? options.nextHref : '';
    const originalHref = typeof options.originalHref === 'string' ? options.originalHref : '';

    const fallbackHref = nextHref || baseHref || originalHref || '';
    const hashBase = fallbackHref ? fallbackHref.split('#')[0] : baseHref || originalHref || '';
    const fallbackToken =
        typeof options.timestamp === 'string' && options.timestamp
            ? options.timestamp
            : Date.now().toString(36);
    const hashFallback = hashBase ? `${hashBase}#forceReload-${fallbackToken}` : '';

    const steps = [];

    let nextDelay = 120;
    const delayIncrement = 120;

    const queueStep = run => {
        steps.push({
            delay: nextDelay,
            run,
        });
        nextDelay += delayIncrement;
    };

    if (fallbackHref) {
        if (typeof locationLike.assign === 'function') {
            queueStep(() => {
                try {
                    locationLike.assign(fallbackHref);
                } catch (error) {
                    console.warn('Forced reload fallback via location.assign failed', error);
                }
            });
        }

        if (typeof locationLike.replace === 'function') {
            queueStep(() => {
                try {
                    locationLike.replace(fallbackHref);
                } catch (error) {
                    console.warn('Forced reload fallback via location.replace failed', error);
                }
            });
        }

        queueStep(() => {
            try {
                locationLike.href = fallbackHref;
            } catch (error) {
                console.warn('Forced reload fallback via href assignment failed', error);
            }
        });
    }

    if (hashFallback && hashFallback !== fallbackHref) {
        queueStep(() => {
            try {
                locationLike.href = hashFallback;
            } catch (error) {
                console.warn('Forced reload fallback via hash injection failed', error);
            }
        });
    }

    if (hasReload) {
        const reloadDelay = steps.length ? Math.max(nextDelay, 280) : 280;
        steps.push({
            delay: reloadDelay,
            run() {
                try {
                    locationLike.reload();
                } catch (error) {
                    console.warn('Timed force reload fallback failed', error);
                }
            },
        });
    }

    if (!steps.length) {
        return;
    }

    steps.forEach(step => {
        try {
            schedule(step.run, step.delay);
        } catch (scheduleError) {
            console.warn('Unable to schedule forced reload fallback', scheduleError);
        }
    });
}

export const NavigationManager = {
    readLocationHrefSafe,
    readLocationOriginSafe,
    buildForceReloadHref,
    tryForceReload,
    resolveForceReloadOfflineNotice,
    announceForceReloadOfflineNotice,
    observeServiceWorkerControllerChangeForSession,
    collectServiceWorkerRegistrationsForReload,
    awaitPromiseWithSoftTimeout,
    waitForReloadNavigation,
    resolveCineCacheNameForReload,
    isRelevantCacheKeyForReload,
    createReloadFallback,
    OFFLINE_RELOAD_TIMEOUT_MS,
    FORCE_RELOAD_CLEANUP_TIMEOUT_MS,
    CACHE_KEY_TOKENS_FOR_RELOAD,

    async performForceReload(options = {}) {
        // High-level public API for triggering the reload
        if (typeof window === 'undefined') return;

        // 1. Check Offline
        if (typeof navigator !== 'undefined' && navigator.onLine === false) {
            const notice = resolveForceReloadOfflineNotice();
            if (notice) announceForceReloadOfflineNotice(notice);
            // We still proceed, but warn
        }

        // 3. Trigger Navigation
        tryForceReload(window);
    }
};
