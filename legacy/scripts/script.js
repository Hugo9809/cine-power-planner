  var APP_VERSION = "1.0.4";

  try {
    if (typeof window !== 'undefined') {
      window.APP_VERSION = APP_VERSION;
    }
  } catch (versionGlobalError) {
    void versionGlobalError;
  }

  (function updateLegacyVersionLabel() {
    if (typeof document === 'undefined') {
      return;
    }

    var aboutVersionElem = document.getElementById('aboutVersion');
    if (!aboutVersionElem) {
      return;
    }

    var docLang = '';
    try {
      docLang = document.documentElement && document.documentElement.lang;
    } catch (langDetectionError) {
      void langDetectionError;
    }

    var dictionaries = typeof texts === 'object' && texts ? texts : null;
    var languageKey = docLang && dictionaries && dictionaries[docLang] ? docLang : 'en';
    var dictionary = dictionaries && dictionaries[languageKey] ? dictionaries[languageKey] : null;
    if (!dictionary && dictionaries) {
      var fallbackKeys = Object.keys(dictionaries);
      for (var i = 0; i < fallbackKeys.length; i += 1) {
        var key = fallbackKeys[i];
        if (key && dictionaries[key] && typeof dictionaries[key].versionLabel === 'string') {
          dictionary = dictionaries[key];
          break;
        }
      }
    }

    var label = dictionary && dictionary.versionLabel ? dictionary.versionLabel : 'Version';
    aboutVersionElem.textContent = label + ' ' + APP_VERSION;
  })();

  if (settingsTablist) {
    var sectionsLabel =
      texts[lang].settingsSectionsLabel ||
      (texts.en && texts.en.settingsSectionsLabel) ||
      settingsTablist.getAttribute('aria-label') ||
      texts[lang].settingsHeading ||
      'Settings sections';
    settingsTablist.setAttribute('aria-label', sectionsLabel);
  }
  var applySettingsTabLabel = function (button, labelValue, helpValue) {
    if (!button) {
      return;
    }
    var label = labelValue || button.textContent || '';
    button.textContent = label;
    button.setAttribute('aria-label', label);
    var help = helpValue || label;
    button.setAttribute('data-help', help);
    button.setAttribute('title', help);
  };
  if (settingsTabGeneral) {
    var generalLabel =
      texts[lang].settingsTabGeneral ||
      (texts.en && texts.en.settingsTabGeneral) ||
      settingsTabGeneral.textContent ||
      'General';
    var generalHelp =
      texts[lang].settingsTabGeneralHelp ||
      (texts.en && texts.en.settingsTabGeneralHelp) ||
      texts[lang].settingsHeadingHelp ||
      generalLabel;
    applySettingsTabLabel(settingsTabGeneral, generalLabel, generalHelp);
    if (generalSettingsHeading) {
      generalSettingsHeading.textContent = generalLabel;
      generalSettingsHeading.setAttribute('data-help', generalHelp);
    }
  }
  applySettingsTabLabel(
    settingsTabAutoGear,
    texts[lang].settingsTabAutoGear ||
      (texts.en && texts.en.settingsTabAutoGear) ||
      texts[lang].autoGearHeading ||
      (texts.en && texts.en.autoGearHeading),
    texts[lang].settingsTabAutoGearHelp ||
      (texts.en && texts.en.settingsTabAutoGearHelp) ||
      texts[lang].autoGearHeadingHelp ||
      (texts.en && texts.en.autoGearHeadingHelp)
  );
  applySettingsTabLabel(
    settingsTabAccessibility,
    texts[lang].settingsTabAccessibility ||
      (texts.en && texts.en.settingsTabAccessibility) ||
      texts[lang].accessibilityHeading ||
      (texts.en && texts.en.accessibilityHeading),
    texts[lang].settingsTabAccessibilityHelp ||
      (texts.en && texts.en.settingsTabAccessibilityHelp) ||
      texts[lang].accessibilityHeadingHelp ||
      (texts.en && texts.en.accessibilityHeadingHelp)
  );
  applySettingsTabLabel(
    settingsTabBackup,
    texts[lang].settingsTabBackup ||
      (texts.en && texts.en.settingsTabBackup) ||
      texts[lang].backupHeading ||
      (texts.en && texts.en.backupHeading),
    texts[lang].settingsTabBackupHelp ||
      (texts.en && texts.en.settingsTabBackupHelp) ||
      texts[lang].backupHeadingHelp ||
      (texts.en && texts.en.backupHeadingHelp)
  );
  applySettingsTabLabel(
    settingsTabData,
    texts[lang].settingsTabData ||
      (texts.en && texts.en.settingsTabData) ||
      texts[lang].dataHeading ||
      (texts.en && texts.en.dataHeading),
    texts[lang].settingsTabDataHelp ||
      (texts.en && texts.en.settingsTabDataHelp) ||
      texts[lang].dataHeadingHelp ||
      (texts.en && texts.en.dataHeadingHelp)
  );
  applySettingsTabLabel(
    settingsTabAbout,
    texts[lang].settingsTabAbout ||
      (texts.en && texts.en.settingsTabAbout) ||
      texts[lang].aboutHeading ||
      (texts.en && texts.en.aboutHeading),
    texts[lang].settingsTabAboutHelp ||
      (texts.en && texts.en.settingsTabAboutHelp) ||
      texts[lang].aboutHeadingHelp ||
      (texts.en && texts.en.aboutHeadingHelp)
  );
var settingsTablist = document.getElementById('settingsTablist');
var settingsTabButtons = settingsTablist
  ? Array.prototype.slice.call(settingsTablist.querySelectorAll('[role="tab"]'))
  : [];
var settingsTabPanels = settingsDialog
  ? Array.prototype.slice.call(settingsDialog.querySelectorAll('.settings-panel'))
  : [];
var settingsTabGeneral = document.getElementById('settingsTab-general');
var settingsTabAutoGear = document.getElementById('settingsTab-autoGear');
var settingsTabAccessibility = document.getElementById('settingsTab-accessibility');
var settingsTabBackup = document.getElementById('settingsTab-backup');
var settingsTabData = document.getElementById('settingsTab-data');
var settingsTabAbout = document.getElementById('settingsTab-about');
var generalSettingsHeading = document.getElementById('generalSettingsHeading');

var activeSettingsTabId = '';
if (settingsTabButtons.length) {
  var initiallySelected = null;
  for (var sti = 0; sti < settingsTabButtons.length; sti += 1) {
    if (settingsTabButtons[sti].getAttribute('aria-selected') === 'true') {
      initiallySelected = settingsTabButtons[sti];
      break;
    }
  }
  if (initiallySelected) {
    activeSettingsTabId = initiallySelected.id;
  } else if (settingsTabButtons[0]) {
    activeSettingsTabId = settingsTabButtons[0].id;
  }
  try {
    var storedTab = localStorage.getItem('settingsActiveTab');
    if (storedTab) {
      for (var stj = 0; stj < settingsTabButtons.length; stj += 1) {
        if (settingsTabButtons[stj].id === storedTab) {
          activeSettingsTabId = storedTab;
          break;
        }
      }
    }
  } catch (e) {
    console.warn('Could not load settings tab preference', e);
  }
}

function activateSettingsTab(tabId, options) {
  if (!settingsTabButtons.length) {
    return;
  }
  var focusTab = options && options.focusTab;
  var target = null;
  for (var i = 0; i < settingsTabButtons.length; i += 1) {
    if (settingsTabButtons[i].id === tabId) {
      target = settingsTabButtons[i];
      break;
    }
  }
  if (!target) {
    target = settingsTabButtons[0];
  }
  if (!target) {
    return;
  }

  for (var j = 0; j < settingsTabButtons.length; j += 1) {
    var button = settingsTabButtons[j];
    var selected = button === target;
    button.setAttribute('aria-selected', selected ? 'true' : 'false');
    button.tabIndex = selected ? 0 : -1;
    if (selected && focusTab && typeof button.focus === 'function') {
      try {
        button.focus({ preventScroll: true });
      } catch (err) {
        try {
          button.focus();
        } catch (err2) {}
      }
    }
    if (button.classList && typeof button.classList.toggle === 'function') {
      button.classList.toggle('active', selected);
    } else if (!button.classList) {
      if (selected) {
        if (button.className.indexOf('active') === -1) {
          button.className = (button.className + ' active').trim();
        }
      } else {
        button.className = button.className.replace(/\bactive\b/g, '').replace(/\s+/g, ' ').trim();
      }
    }
  }

  for (var k = 0; k < settingsTabPanels.length; k += 1) {
    var panel = settingsTabPanels[k];
    if (!panel) {
      continue;
    }
    var labelledBy = panel.getAttribute('aria-labelledby');
    if (labelledBy === target.id) {
      panel.removeAttribute('hidden');
    } else {
      panel.setAttribute('hidden', '');
    }
  }

  if (
    settingsTablist &&
    typeof settingsTablist.scrollWidth === 'number' &&
    typeof settingsTablist.clientWidth === 'number' &&
    settingsTablist.scrollWidth > settingsTablist.clientWidth + 4 &&
    typeof target.scrollIntoView === 'function'
  ) {
    try {
      target.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
    } catch (err4) {
      try {
        target.scrollIntoView();
      } catch (err5) {}
    }
  }

  activeSettingsTabId = target.id;
  try {
    localStorage.setItem('settingsActiveTab', activeSettingsTabId);
  } catch (err3) {
    console.warn('Could not save settings tab preference', err3);
  }
}

if (settingsTabButtons.length) {
  activateSettingsTab(activeSettingsTabId);
  for (var stl = 0; stl < settingsTabButtons.length; stl += 1) {
    (function (button) {
      button.addEventListener('click', function () {
        activateSettingsTab(button.id);
      });
      button.addEventListener('keydown', function (event) {
        var key = event.key != null ? event.key : event.keyCode;
        var keyName = key;
        if (typeof key === 'number') {
          if (key === 37) keyName = 'ArrowLeft';
          else if (key === 38) keyName = 'ArrowUp';
          else if (key === 39) keyName = 'ArrowRight';
          else if (key === 40) keyName = 'ArrowDown';
          else if (key === 36) keyName = 'Home';
          else if (key === 35) keyName = 'End';
          else keyName = '';
        }
        if (['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown', 'Home', 'End'].indexOf(keyName) === -1) {
          return;
        }
        event.preventDefault();
        var currentIndex = settingsTabButtons.indexOf(button);
        if (currentIndex === -1) {
          return;
        }
        var nextIndex = currentIndex;
        if (keyName === 'ArrowLeft' || keyName === 'ArrowUp') {
          nextIndex = (currentIndex - 1 + settingsTabButtons.length) % settingsTabButtons.length;
        } else if (keyName === 'ArrowRight' || keyName === 'ArrowDown') {
          nextIndex = (currentIndex + 1) % settingsTabButtons.length;
        } else if (keyName === 'Home') {
          nextIndex = 0;
        } else if (keyName === 'End') {
          nextIndex = settingsTabButtons.length - 1;
        }
        var nextTab = settingsTabButtons[nextIndex];
        if (nextTab) {
          activateSettingsTab(nextTab.id, { focusTab: true });
        }
      });
    })(settingsTabButtons[stl]);
  }
}

    if (activeSettingsTabId) {
      activateSettingsTab(activeSettingsTabId);
    }
    var activePanel = settingsDialog.querySelector('.settings-panel:not([hidden])');
    var first = activePanel && activePanel.querySelector('input:not([type="hidden"]), select:not(#settingsLanguage), textarea');
    var settingsPanel = element.closest('.settings-panel');
    if (settingsPanel) {
      var tabId = settingsPanel.getAttribute('aria-labelledby');
      if (tabId) {
        activateSettingsTab(tabId);
      }
    }
