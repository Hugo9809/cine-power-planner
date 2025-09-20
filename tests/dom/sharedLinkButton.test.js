const fs = require('fs');
const path = require('path');
const { TextEncoder: UtilTextEncoder, TextDecoder: UtilTextDecoder } = require('util');
global.TextEncoder = global.TextEncoder || UtilTextEncoder;
global.TextDecoder = global.TextDecoder || UtilTextDecoder;
const { JSDOM } = require('jsdom');
const { getHtmlBody } = require('../helpers/domUtils');

test('load shared project button aligns with input', () => {
  const dom = new JSDOM(`<!doctype html><html><head></head><body>${getHtmlBody()}</body></html>`, {
    url: 'http://localhost'
  });
  const { window } = dom;
  const { document } = window;
  const stylePath = path.join(__dirname, '../../src/styles/style.css');
  let styleContent = fs.readFileSync(stylePath, 'utf8');
  styleContent = styleContent.replace(/@import[^;]+;/, '');
  const styleEl = document.createElement('style');
  styleEl.textContent = styleContent;
  document.head.appendChild(styleEl);

  const btn = document.getElementById('applySharedLinkBtn');
  const computed = window.getComputedStyle(btn);
  expect(computed.marginTop).toBe('0px');
  expect(computed.alignSelf).toBe('center');
});
