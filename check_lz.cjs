const lz = require('lz-string');
console.log('Type:', typeof lz);
console.log('Keys:', Object.keys(lz));
console.log('compressToUTF16 exists:', typeof lz.compressToUTF16 === 'function');
console.log('default exists:', typeof lz.default);
if (lz.default) {
    console.log('Keys of default:', Object.keys(lz.default));
}
