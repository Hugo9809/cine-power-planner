(function registerDeferredBootHelpers(globalScope) {
  function createDeferredBootHelpers({
    sharedScope,
  }) {
    const CORE_BOOT_QUEUE_KEY_PART2 = (function resolveBootQueueKeyPart2(scope) {
      if (scope && typeof scope === 'object') {
        const existingPublic = scope.CORE_BOOT_QUEUE_KEY;
        const existingHidden = scope.__cineCoreBootQueueKey;

        if (typeof existingPublic === 'string' && existingPublic) {
          return existingPublic;
        }

        if (typeof existingHidden === 'string' && existingHidden) {
          return existingHidden;
        }
      }

      return '__coreRuntimeBootQueue';
    })(sharedScope);

    const CORE_BOOT_QUEUE_PART2 = (function bootstrapCoreBootQueuePart2(existingQueue) {
      if (Array.isArray(existingQueue)) {
        return existingQueue;
      }

      if (sharedScope && typeof sharedScope === 'object') {
        const shared = sharedScope.cineCoreShared;
        if (shared && typeof shared === 'object') {
          const sharedQueue = shared[CORE_BOOT_QUEUE_KEY_PART2];
          if (Array.isArray(sharedQueue)) {
            return sharedQueue;
          }
          if (Object.isExtensible(shared)) {
            shared[CORE_BOOT_QUEUE_KEY_PART2] = [];
            return shared[CORE_BOOT_QUEUE_KEY_PART2];
          }
        }

        if (!Array.isArray(sharedScope.CORE_BOOT_QUEUE)) {
          sharedScope.CORE_BOOT_QUEUE = [];
        }
        return sharedScope.CORE_BOOT_QUEUE;
      }

      return [];
    })(sharedScope && sharedScope.CORE_BOOT_QUEUE);

    if (sharedScope && sharedScope.CORE_BOOT_QUEUE !== CORE_BOOT_QUEUE_PART2) {
      sharedScope.CORE_BOOT_QUEUE = CORE_BOOT_QUEUE_PART2;
    }

    function flushCoreBootQueue() {
      if (!Array.isArray(CORE_BOOT_QUEUE_PART2) || CORE_BOOT_QUEUE_PART2.length === 0) {
        return;
      }

      const pending = CORE_BOOT_QUEUE_PART2.splice(0, CORE_BOOT_QUEUE_PART2.length);
      for (let index = 0; index < pending.length; index += 1) {
        const task = pending[index];
        if (typeof task !== 'function') {
          continue;
        }
        try {
          task();
        } catch (taskError) {
          if (typeof console !== 'undefined' && typeof console.error === 'function') {
            console.error('Core boot task failed', taskError);
          }
        }
      }
    }

    return {
      CORE_BOOT_QUEUE_KEY_PART2,
      CORE_BOOT_QUEUE_PART2,
      flushCoreBootQueue,
    };
  }

  if (globalScope && Object.isExtensible(globalScope)) {
    globalScope.CINE_CORE_PART2_CREATE_DEFERRED_BOOT_HELPERS = createDeferredBootHelpers;
  }
})(typeof globalThis !== 'undefined' ? globalThis : typeof self !== 'undefined' ? self : this);
