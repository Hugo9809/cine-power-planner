const fs = require('fs');
const path = require('path');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`, {
    url: "http://localhost/",
    runScripts: "dangerously",
    resources: "usable"
});

global.window = dom.window;
global.document = dom.window.document;
global.navigator = dom.window.navigator;
global.globalThis = dom.window;

// Mocks for dependencies that might be expected
global.cineLocale = {
    resolveDocumentDirection: () => 'ltr',
    applyLocaleMetadata: () => { }
};

// Mock contacts/profile.js globals to reproduce the collision context (since we fixed it, it should pass)
// In the browser, profile.js runs first.
global.CONTACT_AVATAR_MAX_BYTES = 300 * 1024;
global.CONTACT_AVATAR_MAX_SOURCE_BYTES = 6 * 1024 * 1024;
global.createProfileController = function () { };
global.estimateDataUrlSize = function () { };
global.optimiseAvatarDataUrl = function () { };
global.readAvatarFile = function () { };
global.isSafeImageUrl = function () { };


try {
    console.log('Loading app-core-new-1.js...');
    const core1Path = path.join(__dirname, '../../src/scripts/app-core-new-1.js');
    const core1Content = fs.readFileSync(core1Path, 'utf8');
    dom.window.eval(core1Content);
    console.log('app-core-new-1.js loaded successfully.');
} catch (error) {
    console.error('FAILED to load app-core-new-1.js:', error);
    process.exit(1);
}

try {
    console.log('Loading app-core-new-2.js...');
    const core2Path = path.join(__dirname, '../../src/scripts/app-core-new-2.js');
    const core2Content = fs.readFileSync(core2Path, 'utf8');
    dom.window.eval(core2Content);
    console.log('app-core-new-2.js loaded successfully.');
} catch (error) {
    console.error('FAILED to load app-core-new-2.js:', error);
    process.exit(1);
}

// Check for exposed globals
if (typeof dom.window.checkSetupChanged === 'function') {
    console.log('checkSetupChanged is exposed.');
} else {
    console.error('checkSetupChanged is NOT exposed.');
    process.exit(1);
}

if (typeof dom.window.iconMarkup !== 'function' && typeof dom.window.exposeCoreRuntimeConstant !== 'function') {
    // Note: iconMarkup might be exposed via exposeCoreRuntimeConstant which might put it on window
    if (typeof dom.window.iconMarkup === 'function') {
        console.log('iconMarkup is exposed.');
    } else {
        console.log('iconMarkup might be exposed via runtime constant helper, verify...');
        // app-core-new-1.js does exposeCoreRuntimeConstant('iconMarkup', iconMarkup);
        // usage: window[name] = value;
        if (dom.window.iconMarkup) {
            console.log('iconMarkup is exposed directly on window.');
        } else {
            console.error('iconMarkup not found on window.');
            process.exit(1);
        }
    }
}
