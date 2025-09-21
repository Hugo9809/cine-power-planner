const fs = require('fs');
const path = require('path');

describe('loader script bundles', () => {
  const loaderPath = path.join(__dirname, '..', '..', 'src', 'scripts', 'loader.js');
  const loaderSource = fs.readFileSync(loaderPath, 'utf8');

  test('modern bundle loads charger data', () => {
    expect(loaderSource).toMatch(/['"]src\/data\/devices\/chargers\.js['"]/);
  });

  test('legacy bundle loads charger data', () => {
    expect(loaderSource).toMatch(/['"]legacy\/data\/devices\/chargers\.js['"]/);
  });
});
