const path = require('path');

const MODULES_DIR = path.join(__dirname, '..', '..', 'src', 'scripts', 'modules');
const REGISTRY_PATH = path.join(MODULES_DIR, 'registry.js');

describe('cineModules.createBlueprint', () => {
  let registry;

  beforeEach(() => {
    jest.resetModules();
    registry = require(REGISTRY_PATH);
    if (registry && typeof registry.__internalResetForTests === 'function') {
      registry.__internalResetForTests({ force: true });
    }
    delete global.__cinePendingModuleRegistrations__;
    delete global.__cinePendingModuleRegistrationsTimer__;
  });

  afterEach(() => {
    delete global.__cinePendingModuleRegistrations__;
    delete global.__cinePendingModuleRegistrationsTimer__;
  });

  test('registers a blueprint and exposes metadata', () => {
    const blueprint = registry.createBlueprint({
      name: 'cineBlueprintExample',
      category: 'infrastructure',
      description: 'Example blueprint module for tests.',
      connections: ['cineModuleBase'],
      factory: () => ({ ready: true }),
    });

    const api = blueprint.register();

    expect(api).toBe(registry.get('cineBlueprintExample'));
    expect(Object.isFrozen(api)).toBe(true);

    const metadata = blueprint.getMetadata();
    expect(metadata).toEqual(
      expect.objectContaining({
        name: 'cineBlueprintExample',
        category: 'infrastructure',
        description: 'Example blueprint module for tests.',
      }),
    );
    expect(Array.isArray(metadata.connections)).toBe(true);
    expect(metadata.connections).toEqual(expect.arrayContaining(['cineModuleBase']));

    const secondInstance = blueprint.instantiate();
    expect(secondInstance).toBe(api);
  });

  test('supports custom registries and option overrides', () => {
    const blueprint = registry.createBlueprint({
      name: 'cineBlueprintCustom',
      category: 'feature',
      description: 'Custom registry blueprint.',
      freeze: false,
      connections: ['cineModuleBase'],
      factory: ({ context }) => ({ value: context && context.value }),
    });

    const customRegistry = { register: jest.fn() };

    blueprint.register({
      registry: customRegistry,
      options: { freeze: true, connections: ['cineModuleBase', 'cineModuleContext'] },
      context: { value: 42 },
    });

    expect(customRegistry.register).toHaveBeenCalledTimes(1);
    const [name, api, options] = customRegistry.register.mock.calls[0];
    expect(name).toBe('cineBlueprintCustom');
    expect(api).toEqual({ value: 42 });
    expect(Object.isFrozen(api)).toBe(false);
    expect(options).toEqual(
      expect.objectContaining({
        category: 'feature',
        description: 'Custom registry blueprint.',
        freeze: true,
      }),
    );
    expect(options.connections).toEqual(expect.arrayContaining(['cineModuleBase', 'cineModuleContext']));
  });

  test('queues registration when the target registry throws', () => {
    const blueprint = registry.createBlueprint({
      name: 'cineBlueprintQueue',
      category: 'infrastructure',
      description: 'Queues when registry unavailable.',
      factory: () => ({ ok: true }),
    });

    const failingRegistry = {
      register() {
        throw new Error('forced failure');
      },
    };

    expect(() => blueprint.register({ registry: failingRegistry })).toThrow('forced failure');

    const queue = global.__cinePendingModuleRegistrations__;
    expect(Array.isArray(queue)).toBe(true);
    const lastEntry = queue[queue.length - 1];
    expect(lastEntry).toEqual(
      expect.objectContaining({
        name: 'cineBlueprintQueue',
      }),
    );
    expect(lastEntry.options).toEqual(
      expect.objectContaining({
        category: 'infrastructure',
        description: 'Queues when registry unavailable.',
      }),
    );
  });
});
