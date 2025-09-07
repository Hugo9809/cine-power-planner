const checkConsistency = require('../checkConsistency');

test('camera data includes required fields', () => {
  const validData = {
    cameras: {
      CamA: {
        powerDrawWatts: 1,
        power: {},
        videoOutputs: [],
        fizConnectors: [],
        recordingMedia: [],
        viewfinder: [],
        lensMount: [],
        timecode: []
      }
    },
    monitors: { MonA: { power: {}, videoInputs: [], videoOutputs: [] } },
    video: { VidA: { power: {}, videoInputs: [], videoOutputs: [] } }
  };
  const result = checkConsistency(validData);
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
