const mockData = {
  cameras: {
    CamA: {
      fizConnectors: [{ type: 'LEMO 4-pin (LBUS)' }],
      power: {
        powerDistributionOutputs: [{ type: 'Lemo 2-pin', count: '2' }],
        input: { portType: 'LEMO 8-pin (DC In / BAT)' }
      },
      recordingMedia: ['CFast', 'CFast 2.0 card slots', 'SD UHS-II card slots'],
      timecode: [{ type: 'BNC (Timecode)' }],
      viewfinder: [{ type: 'LCD Touch Panel' }],
      lensMount: ['PL Mount (native)', 'EF Mount (adapted)'],
      videoOutputs: [{ type: 'HDMI', count: '2' }]
    }
  },
  fiz: {
    motors: { M1: { fizConnector: 'Lemo 4-pin' } },
    controllers: { C1: { fizConnector: 'Lemo 4-pin' } }
  }
};

jest.mock('../data.js', () => mockData);

const { normalizeAll } = require('../normalizeData');

beforeEach(() => {
  // reset to original mock data before each test
  mockData.cameras.CamA.fizConnectors = [{ type: 'LEMO 4-pin (LBUS)' }];
  mockData.cameras.CamA.power = {
    powerDistributionOutputs: [{ type: 'Lemo 2-pin', count: '2' }],
    input: { portType: 'LEMO 8-pin (DC In / BAT)' }
  };
  mockData.cameras.CamA.recordingMedia = ['CFast', 'CFast 2.0 card slots', 'SD UHS-II card slots'];
  mockData.cameras.CamA.timecode = [{ type: 'BNC (Timecode)' }];
  mockData.cameras.CamA.viewfinder = [{ type: 'LCD Touch Panel' }];
  mockData.cameras.CamA.lensMount = ['PL Mount (native)', 'EF Mount (adapted)'];
  mockData.cameras.CamA.videoOutputs = [{ type: 'HDMI', count: '2' }];
  mockData.fiz.motors.M1.fizConnector = 'Lemo 4-pin';
  mockData.fiz.controllers.C1.fizConnector = 'Lemo 4-pin';
});

test('normalizeAll cleans and expands device data', () => {
  normalizeAll();

  const cam = mockData.cameras.CamA;
  expect(cam.fizConnectors[0].type).toBe('LBUS (LEMO 4-pin)');
  expect(mockData.fiz.motors.M1.fizConnector).toBe('LEMO 4-pin');
  expect(mockData.fiz.controllers.C1.fizConnector).toBe('LEMO 4-pin');

  expect(cam.power.powerDistributionOutputs).toEqual([
    { type: 'LEMO 2-pin' },
    { type: 'LEMO 2-pin' }
  ]);
  expect(cam.power.input.portType).toBe('Bat LEMO 8-pin');

  expect(cam.recordingMedia).toEqual([
    { type: 'CFast 2.0', notes: '' },
    { type: 'CFast 2.0', notes: 'Dual Slots' },
    { type: 'SD Card', notes: 'UHS-II (Dual Slots)' }
  ]);

  expect(cam.timecode[0].type).toBe('BNC');
  expect(cam.viewfinder[0].type).toBe('LCD touchscreen');
  expect(cam.lensMount).toEqual([
    { type: 'PL Mount', mount: 'native', notes: '' },
    { type: 'EF Mount', mount: 'adapted', notes: '' }
  ]);
  expect(cam.videoOutputs).toEqual([
    { type: 'HDMI' },
    { type: 'HDMI' }
  ]);
});
