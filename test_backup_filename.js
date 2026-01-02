

// Mock dependencies
const formatFullBackupFilename = (date) => {
    const safeDate = date instanceof Date && !Number.isNaN(date.valueOf())
        ? date
        : new Date();
    const pad = value => String(value).padStart(2, '0');
    const year = safeDate.getFullYear();
    const month = pad(safeDate.getMonth() + 1);
    const day = pad(safeDate.getDate());
    const hours = pad(safeDate.getHours());
    const minutes = pad(safeDate.getMinutes());
    const seconds = pad(safeDate.getSeconds());
    // Simplified offset for test
    const offsetSuffix = 'Z';
    const iso = `${year} -${month} -${day}T${hours}:${minutes}:${seconds}${offsetSuffix} `;
    const safeIso = iso.replace(/[:]/g, '-');
    return {
        iso,
        fileName: `${safeIso} full app backup.json`,
    };
};

async function buildSettingsBackupPackage(timestamp = new Date()) {
    const { fileName } = formatFullBackupFilename(timestamp);
    console.log('Generated Filename:', fileName);
    console.log('Timestamp source:', timestamp);
    return { fileName };
}

function createSettingsBackup(notify = true, timestamp = new Date()) {
    // Simulate how it's called from event listener
    console.log('createSettingsBackup called with:', { notify, timestamp });
    return buildSettingsBackupPackage(timestamp);
}

// Simulate Event Listener Call
const mockEvent = { type: 'click' };

console.log('--- Simulating Click Event ---');
createSettingsBackup(mockEvent);

// Simulate Direct Call
console.log('\n--- Simulating Direct Call ---');
createSettingsBackup(true); 
