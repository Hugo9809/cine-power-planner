const fs = require('fs');
const os = require('os');
const path = require('path');

const checkConsistency = require('../../tools/checkConsistency');
const { renderManifestModule } = require('../../tools/generateServiceWorkerAssets');
const { collectServiceWorkerAssets } = require('../../tools/serviceWorkerAssetManifest');

describe('checkServiceWorkerManifest', () => {
  test('passes when network primitives are disabled', () => {
    const http = require('http');
    const https = require('https');
    const dns = require('dns');

    const originalHttpRequest = http.request;
    const originalHttpGet = http.get;
    const originalHttpsRequest = https.request;
    const originalHttpsGet = https.get;
    const originalDnsLookup = dns.lookup;

    http.request = () => {
      throw new Error('Network request attempted during offline manifest check.');
    };
    http.get = () => {
      throw new Error('Network request attempted during offline manifest check.');
    };
    https.request = () => {
      throw new Error('Network request attempted during offline manifest check.');
    };
    https.get = () => {
      throw new Error('Network request attempted during offline manifest check.');
    };
    dns.lookup = () => {
      throw new Error('DNS lookup attempted during offline manifest check.');
    };

    try {
      const result = checkConsistency.checkServiceWorkerManifest();
      expect(result.ok).toBe(true);
    } finally {
      http.request = originalHttpRequest;
      http.get = originalHttpGet;
      https.request = originalHttpsRequest;
      https.get = originalHttpsGet;
      dns.lookup = originalDnsLookup;
    }
  });

  test('flags missing assets so releases block on drift', () => {
    const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'cpp-manifest-drift-'));

    try {
      fs.mkdirSync(path.join(tempRoot, 'docs'), { recursive: true });
      fs.writeFileSync(path.join(tempRoot, 'docs', 'example.md'), '# Example');
      fs.writeFileSync(path.join(tempRoot, 'index.html'), '<!doctype html>');

      const expectedAssets = collectServiceWorkerAssets(tempRoot);
      const staleAssets = expectedAssets.filter(asset => asset !== './docs/example.md');
      const manifestSource = renderManifestModule(staleAssets);
      fs.writeFileSync(path.join(tempRoot, 'service-worker-assets.js'), manifestSource, 'utf8');

      const result = checkConsistency.checkServiceWorkerManifest({ projectRoot: tempRoot });

      expect(result.ok).toBe(false);
      expect(result.differences.missing).toContain('./docs/example.md');
    } finally {
      fs.rmSync(tempRoot, { recursive: true, force: true });
    }
  });
});
