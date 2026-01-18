const real = require('lz-string/libs/lz-string');
module.exports = real; // Export the real implementation directly
module.exports.default = real; // Ensure default export is also strictly the real implementation
module.exports.__esModule = true;
