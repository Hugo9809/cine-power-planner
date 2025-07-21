const devices = require('./data.js');
const cameras = devices.cameras;
const requiredTopFields = ['powerDrawWatts', 'power', 'videoOutputs', 'fizConnectors', 'recordingMedia', 'viewfinder', 'lensMount', 'timecode'];
let inconsistent = [];
for (const [name, cam] of Object.entries(cameras)) {
  let missing = requiredTopFields.filter(f => !(f in cam));
  if (missing.length) {
    inconsistent.push({name, missing});
  }
}
console.log('Cameras missing fields:', inconsistent);
