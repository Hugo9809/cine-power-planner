const checkConsistency = require('../../checkConsistency');

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
    monitors: {
      TestMonitor: {
        power: {},
        videoInputs: [],
        videoOutputs: []
      }
    },
    video: {
      TestVideo: {
        power: {},
        videoInputs: [],
        videoOutputs: []
      }
    }
  };
  const result = checkConsistency(data);
  expect(result).toEqual([
    { category: 'cameras', name: 'TestCam', missing: ['powerDrawWatts'] },
    { category: 'monitors', name: 'TestMonitor', missing: ['powerDrawWatts'] },
    { category: 'video', name: 'TestVideo', missing: ['powerDrawWatts'] }
  ]);
});
