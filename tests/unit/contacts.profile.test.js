const {
  assignUserProfileState,
  createProfileState,
  estimateDataUrlSize,
} = require('../../src/scripts/contacts/profile.js');

describe('contacts/profile module', () => {
  test('assignUserProfileState only updates changed fields', () => {
    const current = { name: 'Taylor', role: 'Director', avatar: '', phone: '', email: '' };
    const next = assignUserProfileState(current, { name: 'Taylor', role: 'Producer' });
    expect(next).not.toBe(current);
    expect(next).toMatchObject({ name: 'Taylor', role: 'Producer' });
    const unchanged = assignUserProfileState(next, {});
    expect(unchanged).toBe(next);
  });

  test('createProfileState throttles persistence and deduplicates writes', () => {
    jest.useFakeTimers();
    const saveMock = jest.fn();
    const store = createProfileState({
      load: () => ({ name: 'Cam' }),
      save: saveMock,
      throttleMs: 200,
      now: () => Date.now(),
    });

    store.handleInput('name', 'Dana');
    expect(saveMock).toHaveBeenCalledTimes(1);

    store.handleInput('name', 'Riley');
    expect(saveMock).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(250);
    return Promise.resolve().then(() => {
      expect(saveMock).toHaveBeenCalledTimes(2);
      jest.useRealTimers();
    });
  });

  test('estimateDataUrlSize helps detect oversize avatars', () => {
    const largeData = `data:image/png;base64,${'A'.repeat(440000)}`;
    expect(estimateDataUrlSize(largeData)).toBeGreaterThan(300 * 1024);
  });
});
