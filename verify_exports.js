
const storage = require('./src/scripts/storage.js');

console.log('loadFeedback type:', typeof storage.loadFeedback);
console.log('saveFavorites type:', typeof storage.saveFavorites);
console.log('loadFavorites type:', typeof storage.loadFavorites);
console.log('loadProject type:', typeof storage.loadProject);
console.log('saveProject type:', typeof storage.saveProject);

if (typeof storage.loadFeedback !== 'function') {
    console.error('loadFeedback is NOT a function!');
}
