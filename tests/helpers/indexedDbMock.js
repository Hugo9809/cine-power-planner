'use strict';

function createIndexedDbMock() {
  const stores = new Map();

  function ensureStore(name) {
    if (!stores.has(name)) {
      stores.set(name, new Map());
    }
    return stores.get(name);
  }

  function createRequest(executor) {
    const request = {
      onsuccess: null,
      onerror: null,
      onupgradeneeded: null,
      result: undefined,
      error: null,
    };

    const run = () => {
      try {
        executor({
          resolve(result) {
            request.result = result;
            if (typeof request.onsuccess === 'function') {
              request.onsuccess({ target: request });
            }
          },
          reject(err) {
            request.error = err;
            if (typeof request.onerror === 'function') {
              request.onerror({ target: request });
            }
          },
          upgrade(result) {
            request.result = result;
            if (typeof request.onupgradeneeded === 'function') {
              request.onupgradeneeded({ target: request });
            }
          },
        });
      } catch (error) {
        request.error = error;
        if (typeof request.onerror === 'function') {
          request.onerror({ target: request });
        }
      }
    };

    if (typeof queueMicrotask === 'function') {
      queueMicrotask(run);
    } else {
      Promise.resolve().then(run);
    }

    return request;
  }

  function createCursor(storeMap, transaction) {
    const keys = Array.from(storeMap.keys());
    let index = 0;
    const request = {
      onsuccess: null,
      onerror: null,
      result: null,
    };

    function dispatch() {
      if (index >= keys.length) {
        request.result = null;
        if (typeof request.onsuccess === 'function') {
          request.onsuccess({ target: request });
        }
        if (typeof transaction.oncomplete === 'function') {
          transaction.oncomplete();
        }
        return;
      }

      const key = keys[index];
      const cursor = {
        key,
        value: storeMap.get(key),
        continue() {
          index += 1;
          if (typeof queueMicrotask === 'function') {
            queueMicrotask(dispatch);
          } else {
            Promise.resolve().then(dispatch);
          }
        },
      };

      request.result = cursor;
      if (typeof request.onsuccess === 'function') {
        request.onsuccess({ target: request });
      }
    }

    if (typeof queueMicrotask === 'function') {
      queueMicrotask(dispatch);
    } else {
      Promise.resolve().then(dispatch);
    }
    return request;
  }

  function createStore(storeMap, transaction) {
    return {
      put(value, key) {
        return createRequest(({ resolve }) => {
          storeMap.set(String(key), value);
          resolve(key);
          if (typeof transaction.oncomplete === 'function') {
            transaction.oncomplete();
          }
        });
      },
      delete(key) {
        return createRequest(({ resolve }) => {
          storeMap.delete(String(key));
          resolve(undefined);
          if (typeof transaction.oncomplete === 'function') {
            transaction.oncomplete();
          }
        });
      },
      clear() {
        return createRequest(({ resolve }) => {
          storeMap.clear();
          resolve(undefined);
          if (typeof transaction.oncomplete === 'function') {
            transaction.oncomplete();
          }
        });
      },
      openCursor() {
        return createCursor(storeMap, transaction);
      },
    };
  }

  function createTransaction(storeMap) {
    const transaction = {
      oncomplete: null,
      onerror: null,
      objectStore() {
        return createStore(storeMap, transaction);
      },
      commit() {},
    };
    return transaction;
  }

  function createDatabase(_name) {
    return {
      objectStoreNames: {
        contains(storeName) {
          return stores.has(storeName);
        },
      },
      transaction(storeName) {
        const storeMap = ensureStore(storeName);
        return createTransaction(storeMap);
      },
      close() {},
    };
  }

  const mock = {
    open(name, _version) {
      return createRequest(({ resolve, upgrade }) => {
        const needsUpgrade = !stores.has('kv');
        const db = createDatabase(name);
        if (needsUpgrade) {
          ensureStore('kv');
          upgrade(db);
        }
        resolve(db);
      });
    },
    __stores: stores,
  };

  return mock;
}

module.exports = { createIndexedDbMock };
