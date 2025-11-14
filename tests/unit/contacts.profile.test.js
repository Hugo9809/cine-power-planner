'use strict';

const { createProfileController } = require('../../src/scripts/contacts/profile.js');

describe('contacts/profile controller', () => {
  test('change detection avoids redundant saves', () => {
    const saveProfile = jest.fn();
    const controller = createProfileController({
      loadProfile: () => ({ name: '' }),
      saveProfile,
      announce: () => {},
      getText: () => 'saved',
      now: () => 0,
      schedule: fn => {
        fn();
        return 0;
      },
      throttleMs: 50
    });

    controller.handleFieldInput('name', 'Alpha');
    expect(saveProfile).toHaveBeenCalledTimes(1);

    controller.handleFieldInput('name', 'Alpha');
    expect(saveProfile).toHaveBeenCalledTimes(1);

    controller.handleFieldInput('name', 'Beta');
    expect(saveProfile).toHaveBeenCalledTimes(2);
  });

  test('persistence throttling batches rapid changes', () => {
    let currentTime = 0;
    const scheduled = [];
    const saveProfile = jest.fn();
    const controller = createProfileController({
      loadProfile: () => ({ name: '' }),
      saveProfile,
      announce: () => {},
      getText: () => 'saved',
      now: () => currentTime,
      schedule: fn => {
        scheduled.push(fn);
        return 0;
      },
      throttleMs: 100
    });

    controller.handleFieldInput('name', 'Alpha');
    expect(saveProfile).toHaveBeenCalledTimes(1);

    controller.handleFieldInput('name', 'Gamma');
    expect(saveProfile).toHaveBeenCalledTimes(1);

    currentTime += 150;
    scheduled.forEach(fn => fn());
    expect(saveProfile).toHaveBeenCalledTimes(2);
  });
});
