const printModule = require('../../src/scripts/modules/features/print-workflow.js');

describe('cineFeaturePrint module', () => {
  test('exposes frozen workflow helpers', () => {
    expect(typeof printModule).toBe('object');
    expect(typeof printModule.createOverviewPrintWorkflow).toBe('function');
    expect(typeof printModule.triggerOverviewPrintWorkflow).toBe('function');

    const workflow = printModule.createOverviewPrintWorkflow({});
    expect(workflow).toHaveProperty('trigger');
    expect(typeof workflow.trigger).toBe('function');
    expect(Object.isFrozen(workflow)).toBe(true);
  });

  test('uses native print when available', () => {
    const printSpy = jest.fn();
    const fakeWindow = { print: printSpy };
    const fakeDocument = { title: 'Original Title' };

    const success = printModule.triggerOverviewPrintWorkflow({
      windowRef: fakeWindow,
      documentRef: fakeDocument,
      printDocumentTitle: 'Printable Title',
      originalDocumentTitle: 'Original Title',
      openFallbackPrintView: jest.fn(() => false),
      closeAfterPrint: jest.fn(),
      logger: { warn: jest.fn(), error: jest.fn() },
    }, {});

    expect(success).toBe(true);
    expect(printSpy).toHaveBeenCalledTimes(1);
    expect(fakeDocument.title).toBe('Printable Title');
  });

  test('falls back to window when native print fails', () => {
    const printSpy = jest.fn(() => { throw new Error('Print blocked'); });
    const fallbackSpy = jest.fn(() => true);
    const cleanupSpy = jest.fn();
    const warnSpy = jest.fn();
    const errorSpy = jest.fn();

    const success = printModule.triggerOverviewPrintWorkflow({
      windowRef: { print: printSpy },
      documentRef: { title: 'Original' },
      printDocumentTitle: 'Printable Title',
      originalDocumentTitle: 'Original',
      openFallbackPrintView: fallbackSpy,
      closeAfterPrint: cleanupSpy,
      logger: { warn: warnSpy, error: errorSpy },
    }, { reason: 'export' });

    expect(success).toBe(true);
    expect(printSpy).toHaveBeenCalledTimes(1);
    expect(fallbackSpy).toHaveBeenCalledTimes(1);
    expect(cleanupSpy).toHaveBeenCalledTimes(1);
    expect(warnSpy).toHaveBeenCalled();
  });

  test('respects preferFallback option', () => {
    const printSpy = jest.fn();
    const fallbackSpy = jest.fn(() => true);

    const success = printModule.triggerOverviewPrintWorkflow({
      windowRef: { print: printSpy },
      documentRef: { title: 'Original' },
      printDocumentTitle: 'Printable Title',
      originalDocumentTitle: 'Original',
      openFallbackPrintView: fallbackSpy,
      closeAfterPrint: jest.fn(),
      logger: { warn: jest.fn(), error: jest.fn() },
    }, { preferFallback: true });

    expect(success).toBe(true);
    expect(fallbackSpy).toHaveBeenCalledTimes(1);
    expect(printSpy).not.toHaveBeenCalled();
  });

  describe.each([
    {
      description: 'succeeds',
      fallbackSuccess: true,
      expectedResult: true,
    },
    {
      description: 'fails to open fallback window',
      fallbackSuccess: false,
      expectedResult: false,
    },
  ])('handles async native print rejection and %s fallback', ({
    description,
    fallbackSuccess,
    expectedResult,
  }) => {
    test(`${description}`, async () => {
      const closeAfterPrint = jest.fn();
      const fallbackSpy = jest.fn(() => fallbackSuccess);
      const documentRef = { title: 'Original Title' };
      const printSpy = jest.fn(() => Promise.reject(new Error('Async print failed')));

      const result = printModule.triggerOverviewPrintWorkflow({
        windowRef: { print: printSpy },
        documentRef,
        printDocumentTitle: 'Printable Title',
        originalDocumentTitle: 'Original Title',
        openFallbackPrintView: fallbackSpy,
        closeAfterPrint,
        logger: { warn: jest.fn(), error: jest.fn() },
      }, {});

      await expect(Promise.resolve(result)).resolves.toBe(expectedResult);

      await new Promise((resolve) => setImmediate(resolve));

      expect(fallbackSpy).toHaveBeenCalledTimes(1);
      if (fallbackSuccess) {
        expect(closeAfterPrint).toHaveBeenCalledTimes(1);
      } else {
        expect(closeAfterPrint).not.toHaveBeenCalled();
      }

      expect(documentRef.title).toBe('Original Title');
    });
  });
});
