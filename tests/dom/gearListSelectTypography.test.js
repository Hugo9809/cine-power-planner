const fs = require('fs');
const path = require('path');
const { TextEncoder: UtilTextEncoder, TextDecoder: UtilTextDecoder } = require('util');

global.TextEncoder = global.TextEncoder || UtilTextEncoder;
global.TextDecoder = global.TextDecoder || UtilTextDecoder;

const { JSDOM } = require('jsdom');

test('gear list selects inherit the surrounding typography', () => {
  const html = `<!doctype html><html><head></head><body>
    <div id="gearListOutput">
      <table class="gear-table">
        <tbody>
          <tr>
            <td>
              <span class="gear-body-text">Camera Body</span>
              <span class="select-wrapper">
                <select>
                  <option>Option A</option>
                  <option>Option B</option>
                </select>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </body></html>`;

  const dom = new JSDOM(html, { url: 'http://localhost' });
  const { window } = dom;
  const { document } = window;

  const stylePath = path.join(__dirname, '../../src/styles/style.css');
  let styleContent = fs.readFileSync(stylePath, 'utf8');
  styleContent = styleContent.replace(/@import[^;]+;/g, '');

  const styleEl = document.createElement('style');
  styleEl.textContent = styleContent;
  document.head.appendChild(styleEl);

  const bodyText = document.querySelector('.gear-body-text');
  const select = document.querySelector('#gearListOutput select');

  const bodyTypography = window.getComputedStyle(bodyText);
  const selectTypography = window.getComputedStyle(select);
  const fallbackTypography = window.getComputedStyle(select.parentElement);

  const resolveValue = (styles, property) => {
    const value = styles[property];
    if (!value || value === 'inherit') {
      return fallbackTypography[property];
    }
    return value;
  };

  const properties = ['fontFamily', 'fontSize', 'fontWeight', 'color'];
  for (const property of properties) {
    const textValue = resolveValue(bodyTypography, property);
    const selectValue = resolveValue(selectTypography, property);
    expect(selectValue).toBe(textValue);
  }
});
