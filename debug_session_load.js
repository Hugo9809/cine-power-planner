
const path = require('path');

try {
    console.log('Attempting to require app-session.js...');
    const appSession = require('./src/scripts/app-session.js');
    console.log('Successfully required app-session.js');
    console.log('Exports:', Object.keys(appSession));
} catch (error) {
    console.error('Failed to require app-session.js:', error);
}

try {
    console.log('Attempting to require storage.js...');
    const storage = require('./src/scripts/storage.js');
    console.log('Successfully required storage.js');
    console.log('Exports:', Object.keys(storage));
} catch (error) {
    console.error('Failed to require storage.js:', error);
}
