(function () {
  if (typeof require === 'function') {
    try {
      require('../../../../src/scripts/modules/features/backup.js');
      return;
    } catch (error) {
      void error;
    }
  }
})();
