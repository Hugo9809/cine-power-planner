const fs = require('fs');
const path = require('path');

test('index.html loads wireless receiver definitions', () => {
  const html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
  expect(html).toContain('<script src="devices/wirelessReceivers.js"></script>');
});
