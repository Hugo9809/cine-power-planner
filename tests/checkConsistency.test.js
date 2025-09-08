const checkConsistency = require('../scripts/checkConsistency');

test('camera data includes required fields', () => {
  const result = checkConsistency();
  expect(result).toEqual([]);
});

test('reports missing fields for incomplete devices', () => {
  const data = {
    cameras: {
      TestCam: {
        power: {},
        videoOutputs: [],
        fizConnectors: [],
        recordingMedia: [],
        viewfinder: [],
        lensMount: [],
        timecode: []
      }
    },
    monitors: {},
    video: {}
  };
  const result = checkConsistency(data);
  expect(result).toEqual([
    { category: 'cameras', name: 'TestCam', missing: ['powerDrawWatts'] }
  ]);
});
