const fs = require('fs');
const path = require('path');

let cachedBody = null;

function getHtmlBody() {
  if (cachedBody === null) {
    const html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
    cachedBody = html.split('<body>')[1].split('</body>')[0];
  }
  return cachedBody;
}

module.exports = { getHtmlBody };
