/**
 * @jest-environment jsdom
 */
import {
    cineCoreAppCoreBootstrap
} from '../../../../src/scripts/modules/core/bootstrap.js';

const {
    createBootstrapSuite,
    createBootstrapEnvironment,
    normalizeBootstrapInvocationOptions,
    resolveBootstrapTools,
    resolveBootstrapEnvironmentTools
} = cineCoreAppCoreBootstrap;

describe('Bootstrap Core Module', () => {
    describe('normalizeBootstrapInvocationOptions', () => {
        it('should return a normalized options object', () => {
            const options = {
                runtimeScope: {
                    name: 'runtime'
                },
                extra: 'value'
            };
            const normalized = normalizeBootstrapInvocationOptions(options);

            expect(normalized.runtimeScope).toEqual({
                name: 'runtime'
            });
            expect(normalized.extra).toBe('value');
            expect(Array.isArray(normalized.fallbackScopes)).toBe(true);
        });

        it('should handle overrides', () => {
            const base = {
                baseKey: 'base'
            };
            const overrides = {
                overrideKey: 'override'
            };
            const normalized = normalizeBootstrapInvocationOptions(base, overrides);

            expect(normalized.baseKey).toBe('base');
            expect(normalized.overrideKey).toBe('override');
        });
    });

    describe('Environment Resolution', () => {
        it('should resolve bootstrap environment tools', () => {
            const mockTools = {
                collectFallbackScopes: jest.fn()
            };
            const options = {
                directBootstrapEnvironmentNamespace: mockTools
            };

            const resolved = resolveBootstrapEnvironmentTools(options);
            expect(resolved).toBe(mockTools);
        });
    });

    describe('createBootstrapEnvironment', () => {
        it('should create an environment object with fallback scopes', () => {
            const runtimeScope = {
                id: 'runtime'
            };
            const coreGlobalScope = {
                id: 'core'
            };
            const env = createBootstrapEnvironment({
                runtimeScope,
                coreGlobalScope
            });

            expect(env.fallbackScopes).toContain(runtimeScope);
            expect(env.fallbackScopes).toContain(coreGlobalScope);
            expect(typeof env.createInlineLocalizationFallback).toBe('function');
            expect(typeof env.createInlineRuntimeSharedFallback).toBe('function');
        });
    });

    describe('createBootstrapSuite', () => {
        it('should create a complete bootstrap suite', () => {
            const suite = createBootstrapSuite({});

            expect(suite).toHaveProperty('bootstrapEnvironment');
            expect(suite).toHaveProperty('createLocalizationBootstrapResult');
            expect(suite).toHaveProperty('createRuntimeSharedBootstrapResult');
            expect(typeof suite.createBootstrapEnvironment).toBe('function');
        });

        it('should use provided bootstrap tools', () => {
            const mockTools = {
                createLocalizationBootstrapResult: jest.fn(() => ({
                    mockResult: true
                }))
            };
            const suite = createBootstrapSuite({
                directBootstrapNamespace: mockTools
            });

            const result = suite.createLocalizationBootstrapResult({});
            expect(result).toEqual({
                mockResult: true
            });
            expect(mockTools.createLocalizationBootstrapResult).toHaveBeenCalled();
        });
    });

    describe('Tool Resolution', () => {
        it('should resolve bootstrap tools from direct namespace', () => {
            const mockTools = {};
            const resolved = resolveBootstrapTools({
                directBootstrapNamespace: mockTools
            });
            expect(resolved).toBe(mockTools);
        });

        it('should resolve bootstrap tools via resolveCoreSupportModule', () => {
            const mockTools = {};
            const resolveMock = jest.fn(() => mockTools);
            const resolved = resolveBootstrapTools({
                resolveCoreSupportModule: resolveMock
            });
            expect(resolved).toBe(mockTools);
            expect(resolveMock).toHaveBeenCalledWith(
                'cineCoreAppCoreBootstrap',
                './modules/app-core/bootstrap.js'
            );
        });
    });
});
