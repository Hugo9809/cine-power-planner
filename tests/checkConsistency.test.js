const checkConsistency = require('../checkConsistency');

test('camera data includes required fields', () => {
  const result = checkConsistency();
  expect(result).toEqual([]);
});
