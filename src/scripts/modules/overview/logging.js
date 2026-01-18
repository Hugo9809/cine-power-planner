/**
 * @fileoverview OVERVIEW MODULE: Logging
 * 
 * Centralised logging utilities for the Overview dialog/feature.
 * Handles logger resolution, fallback to console, and metadata snapshotting.
 * 
 * @module modules/overview/logging
 */

import { cineLoggingResolver } from '../logging-resolver.js';

const OVERVIEW_LOG_META_DEFAULTS = Object.freeze({
    namespace: 'overview',
    source: 'overview-dialog',
});

// --- Scoping ---

function collectOverviewLoggingScopes() {
    const scopes = [];
    if (typeof globalThis !== 'undefined' && globalThis) scopes.push(globalThis);
    if (typeof window !== 'undefined' && window && scopes.indexOf(window) === -1) scopes.push(window);
    if (typeof self !== 'undefined' && self && scopes.indexOf(self) === -1) scopes.push(self);
    if (typeof global !== 'undefined' && global && scopes.indexOf(global) === -1) scopes.push(global);
    return scopes;
}

// --- Deep Clone (Replaces overviewDeepClone) ---

function overviewDeepClone(value) {
    if (value === null || typeof value !== 'object') {
        return value;
    }
    // Prefer native structuredClone
    try {
        if (typeof structuredClone === 'function') {
            return structuredClone(value);
        }
    } catch { /* ignore */ }

    // Fallback to JSON
    try {
        return JSON.parse(JSON.stringify(value));
    } catch {
        return value;
    }
}

// --- Logger Resolution ---

function resolveLegacyOverviewLogger() {
    const scopes = collectOverviewLoggingScopes();
    for (const scope of scopes) {
        if (!scope || typeof scope !== 'object') continue;
        try {
            const logging = scope.cineLogging;
            if (logging && typeof logging.createLogger === 'function') {
                return logging.createLogger('overview', { meta: { source: 'overview-dialog' } });
            }
        } catch { /* ignore */ }
    }
    return null;
}

const overviewLogger = (() => {
    // Try the module import first
    if (cineLoggingResolver && typeof cineLoggingResolver.resolveLogger === 'function') {
        try {
            const logger = cineLoggingResolver.resolveLogger('overview', { meta: { source: 'overview-dialog' } });
            if (logger) return logger;
        } catch { /* ignore */ }
    }
    return resolveLegacyOverviewLogger();
})();

const overviewConsoleFallback = (typeof console === 'object' && console) ? console : null;

// --- Meta Logic ---

function cloneOverviewLogMeta(meta) {
    if (!meta || typeof meta !== 'object') return {};
    return overviewDeepClone(meta); // Simplified using the robust clone
}

function createOverviewLogMetaSnapshot(level, meta) {
    const normalizedLevel = typeof level === 'string' && level ? level.toLowerCase() : 'info';
    const timestamp = Date.now();
    let isoTimestamp;
    try { isoTimestamp = new Date(timestamp).toISOString(); } catch { isoTimestamp = String(timestamp); }

    const baseMeta = {
        ...OVERVIEW_LOG_META_DEFAULTS,
        ...cloneOverviewLogMeta(meta),
        level: normalizedLevel,
        timestamp: isoTimestamp,
        timestampMs: timestamp,
    };

    if (!baseMeta.eventId) {
        baseMeta.eventId = `overview-${timestamp.toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
    }
    if (!baseMeta.correlationId) {
        baseMeta.correlationId = baseMeta.eventId;
    }
    return baseMeta;
}

// --- Main Export ---

export function logOverview(level, message, detail, meta) {
    const normalizedLevel = typeof level === 'string' && level ? level.toLowerCase() : 'info';
    const detailValue = typeof detail === 'undefined' ? undefined : detail;
    const baseMeta = createOverviewLogMetaSnapshot(normalizedLevel, meta);
    const loggerMeta = { ...baseMeta, channel: 'cineLogging' };
    const consoleMeta = { ...baseMeta, channel: 'console' };

    let loggerInvocationFailed = false;

    if (overviewLogger && typeof overviewLogger[normalizedLevel] === 'function') {
        try {
            overviewLogger[normalizedLevel](message, detailValue, loggerMeta);
        } catch (loggerError) {
            loggerInvocationFailed = true;
            consoleMeta.consoleFallbackUsed = true;
            consoleMeta.consoleFallbackReason = 'logger-invocation-failed';
            consoleMeta.loggerErrorMessage = loggerError?.message;

            if (overviewConsoleFallback?.warn) {
                overviewConsoleFallback.warn('Overview logger invocation failed', loggerError, { meta: consoleMeta });
            }
        }
    } else {
        loggerInvocationFailed = true;
        consoleMeta.consoleFallbackUsed = true;
        consoleMeta.consoleFallbackReason = overviewLogger ? 'logger-level-missing' : 'logger-unavailable';
    }

    if (overviewConsoleFallback) {
        const consoleMethod = overviewConsoleFallback[normalizedLevel === 'warn' ? 'warn' : normalizedLevel === 'error' ? 'error' : normalizedLevel === 'debug' ? 'debug' : 'info'] || overviewConsoleFallback.log;

        if (consoleMethod) {
            const consoleArgs = [`[overview:${baseMeta.eventId}] ${message}`];
            if (detailValue !== undefined) consoleArgs.push(detailValue);
            consoleArgs.push({ meta: consoleMeta });

            try {
                consoleMethod.apply(overviewConsoleFallback, consoleArgs);
            } catch { /* ignore */ }
        }
    }

    return baseMeta.eventId;
}

export function createOverviewLoggerProxy(baseMeta) {
    const frozenMeta = (baseMeta && typeof baseMeta === 'object') ? Object.freeze({ ...baseMeta }) : null;
    return Object.freeze({
        log: (msg, detail) => logOverview('info', msg, detail, frozenMeta),
        info: (msg, detail) => logOverview('info', msg, detail, frozenMeta),
        debug: (msg, detail) => logOverview('debug', msg, detail, frozenMeta),
        warn: (msg, detail) => logOverview('warn', msg, detail, frozenMeta),
        error: (msg, detail) => logOverview('error', msg, detail, frozenMeta),
    });
}
