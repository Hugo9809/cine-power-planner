/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

function extractSetupNameListener(source) {
  const marker = 'if (setupNameInput && saveSetupBtn) {';
  const startIndex = source.indexOf(marker);
  if (startIndex === -1) {
    throw new Error('setupNameInput listener block not found');
  }

  let depth = 0;
  let endIndex = -1;
  for (let index = startIndex; index < source.length; index += 1) {
    const char = source[index];
    if (char === '{') {
      depth += 1;
    } else if (char === '}') {
      depth -= 1;
      if (depth === 0) {
        endIndex = index;
        break;
      }
    }
  }

  if (endIndex === -1) {
    throw new Error('setupNameInput listener block not terminated');
  }

  return source.slice(startIndex, endIndex + 1);
}

describe('setup name input IME safeguards', () => {
  const modulePath = path.resolve(__dirname, '../../src/scripts/app-session.js');
  const source = fs.readFileSync(modulePath, 'utf8');
  const listenerBlock = extractSetupNameListener(source);

  function executeListener(setupNameInput, saveSetupBtn) {
    const runner = new Function('setupNameInput', 'saveSetupBtn', `'use strict';\n${listenerBlock}`);
    runner(setupNameInput, saveSetupBtn);
  }

  function createDomElements() {
    document.body.innerHTML = `
      <input id="setupName" />
      <button id="saveSetupBtn" type="button"></button>
    `;
    const input = document.getElementById('setupName');
    const button = document.getElementById('saveSetupBtn');
    input.value = 'Test setup';
    button.disabled = false;
    return { input, button };
  }

  test('ignores Enter keydown events while composing via IME', () => {
    const { input, button } = createDomElements();
    executeListener(input, button);
    const clickSpy = jest.spyOn(button, 'click');

    const event = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true });
    Object.defineProperty(event, 'isComposing', {
      value: true,
      configurable: true,
    });

    input.dispatchEvent(event);

    expect(clickSpy).not.toHaveBeenCalled();
  });

  test('ignores Enter keydown events with keyCode 229 to support legacy IME detection', () => {
    const { input, button } = createDomElements();
    executeListener(input, button);
    const clickSpy = jest.spyOn(button, 'click');

    const event = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true });
    Object.defineProperty(event, 'keyCode', {
      value: 229,
      configurable: true,
    });

    input.dispatchEvent(event);

    expect(clickSpy).not.toHaveBeenCalled();
  });

  test('submits when Enter is pressed outside of IME composition', () => {
    const { input, button } = createDomElements();
    executeListener(input, button);
    const clickSpy = jest.spyOn(button, 'click');

    const event = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true });

    input.dispatchEvent(event);

    expect(clickSpy).toHaveBeenCalledTimes(1);
  });
});
