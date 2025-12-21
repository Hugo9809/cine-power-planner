
const { JSDOM } = require('jsdom');

const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
    url: 'http://localhost',
    contentType: 'text/html',
});

global.window = dom.window;
global.document = dom.window.document;
global.navigator = dom.window.navigator;
global.localStorage = dom.window.localStorage;
global.sessionStorage = dom.window.sessionStorage;
global.globalThis = global;

const { setupScriptEnvironment } = require('./tests/helpers/scriptEnvironment');

async function debugIntegrity() {
    console.log('Setting up script environment...');
    const { global: scriptGlobal } = await setupScriptEnvironment();

    console.log('Runtime loaded.');

    const cineRuntime = scriptGlobal.cineRuntime;
    if (!cineRuntime) {
        console.error('cineRuntime not found on scriptGlobal scope!');
        process.exit(1);
    }

    console.log('Verifying critical flows...');
    try {
        const result = cineRuntime.verifyCriticalFlows({ warnOnFailure: true });
        // console.log('Integrity check result:', JSON.stringify(result, null, 2));
        if (!result.ok) {
            console.error('Missing requirements:', JSON.stringify(result.missing, null, 2));
        } else {
            console.log('Integrity check PASSED');
        }
    } catch (error) {
        console.error('Integrity check THREW:', error.message);
        if (error.details) {
            console.error('Error details:', JSON.stringify(error.details, null, 2));
        }
    }

    console.log('Checking for buildVideoDistributionAutoRules...');
    if (typeof scriptGlobal.buildVideoDistributionAutoRules === 'function') {
        console.log('buildVideoDistributionAutoRules is DEFINED on scriptGlobal.');
    } else {
        console.log('Type of buildVideoDistributionAutoRules on scriptGlobal:', typeof scriptGlobal.buildVideoDistributionAutoRules);
        console.error('buildVideoDistributionAutoRules is NOT DEFINED on scriptGlobal.');
    }

    process.exit(0);
}

debugIntegrity().catch(err => {
    console.error('Debug script failed:', err);
    process.exit(1);
});
