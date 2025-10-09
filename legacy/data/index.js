const devices = require('./devices');
const rentalHouses = require('./rental-houses');

if (devices && !Object.prototype.hasOwnProperty.call(devices, 'rentalHouses')) {
  Object.defineProperty(devices, 'rentalHouses', {
    configurable: false,
    enumerable: false,
    value: rentalHouses,
    writable: false
  });
}

module.exports = devices;