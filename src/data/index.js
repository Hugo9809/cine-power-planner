import devices from './devices/index.js';
import rentalHouses from './rental-houses.js';

if (devices && !Object.prototype.hasOwnProperty.call(devices, 'rentalHouses')) {
  Object.defineProperty(devices, 'rentalHouses', {
    configurable: false,
    enumerable: false,
    value: rentalHouses,
    writable: false
  });
}

export default devices;
export { devices, rentalHouses };
