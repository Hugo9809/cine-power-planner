/*
 * Rendering helpers for the device manager section. These helpers used to
 * live inside app-core.js but are now split out so that other scripts can
 * depend on them without pulling in the massive core file.
 */
/* global devices, texts, currentLang, safeGenerateConnectorSummary, syncDeviceManagerCategories, deviceManagerLists, filterDeviceList */
(function (globalScope) {
  'use strict';

  function resolveFormattingModule(scope) {
    var moduleCandidate = null;
    try {
      moduleCandidate = require('./device-formatting.js');
    } catch (error) {
      void error;
      if (scope && scope.deviceFormatting) {
        moduleCandidate = scope.deviceFormatting;
      }
    }
    return moduleCandidate;
  }

  function fallbackHumanizeKey(key) {
    if (!key || typeof key !== 'string') {
      return '';
    }
    return key
      .replace(/_/g, ' ')
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, function (c) { return c.toUpperCase(); });
  }

  function fallbackFormatValue(value, humanize) {
    if (Array.isArray(value)) {
      return value.map(function (v) { return fallbackFormatValue(v, humanize); }).join('; ');
    }
    if (value && typeof value === 'object') {
      var parts = [];
      for (var key in value) {
        if (!Object.prototype.hasOwnProperty.call(value, key)) {
          continue;
        }
        var nested = value[key];
        if (nested === '' || nested === null || typeof nested === 'undefined') {
          continue;
        }
        parts.push((humanize ? humanize(key) : fallbackHumanizeKey(key)) + ': ' + fallbackFormatValue(nested, humanize));
      }
      return '{ ' + parts.join(', ') + ' }';
    }
    if (typeof value === 'boolean') {
      return value ? 'Yes' : 'No';
    }
    if (value === null || typeof value === 'undefined') {
      return '';
    }
    return String(value);
  }

  var formattingModule = resolveFormattingModule(globalScope);
  var humanizeKey = formattingModule && typeof formattingModule.humanizeKey === 'function'
    ? formattingModule.humanizeKey
    : (globalScope && typeof globalScope.humanizeKey === 'function'
      ? globalScope.humanizeKey
      : fallbackHumanizeKey);
  var formatValue = formattingModule && typeof formattingModule.formatValue === 'function'
    ? formattingModule.formatValue
    : function (value) { return fallbackFormatValue(value, humanizeKey); };

  function createDeviceDetailsList(deviceData) {
    var list = document.createElement('ul');
    list.className = 'device-detail-list';

    function appendItem(key, value, parent) {
      if (value === '' || value === null || typeof value === 'undefined') {
        return;
      }
      var li = document.createElement('li');
      var label = document.createElement('strong');
      label.textContent = humanizeKey(key) + ':';
      li.appendChild(label);

      if (Array.isArray(value)) {
        if (value.length && typeof value[0] === 'object') {
          var subList = document.createElement('ul');
          subList.className = 'device-detail-list';
          value.forEach(function (v) {
            var subLi = document.createElement('li');
            subLi.appendChild(createDeviceDetailsList(v));
            subList.appendChild(subLi);
          });
          li.appendChild(subList);
        } else {
          li.appendChild(document.createTextNode(value.map(function (v) { return formatValue(v); }).join(', ')));
        }
      } else if (value && typeof value === 'object') {
        li.appendChild(createDeviceDetailsList(value));
      } else {
        li.appendChild(document.createTextNode(formatValue(value)));
      }

      parent.appendChild(li);
    }

    if (typeof deviceData !== 'object' || deviceData === null) {
      appendItem('powerDrawWatts', deviceData, list);
    } else {
      Object.keys(deviceData).forEach(function (k) { appendItem(k, deviceData[k], list); });
    }

    return list;
  }

  function renderDeviceList(categoryKey, ulElement) {
    if (!ulElement) {
      return;
    }
    ulElement.innerHTML = '';
    var categoryDevices = devices ? devices[categoryKey] : null;

    if (typeof categoryKey === 'string' && categoryKey.indexOf('.') !== -1) {
      var parts = categoryKey.split('.');
      var mainCat = parts[0];
      var subCat = parts[1];
      if (devices && devices[mainCat]) {
        categoryDevices = devices[mainCat][subCat];
      }
    }

    if (!categoryDevices) {
      return;
    }

    function buildItem(name, deviceData, subcategory) {
      if (name === 'None') {
        return;
      }

      var li = document.createElement('li');
      var header = document.createElement('div');
      header.className = 'device-summary';

      var nameSpan = document.createElement('span');
      nameSpan.textContent = name;
      var summary = '';
      if (typeof safeGenerateConnectorSummary === 'function') {
        try {
          summary = safeGenerateConnectorSummary(deviceData) || '';
        } catch (error) {
          void error;
          summary = '';
        }
      }
      if (summary) {
        summary = summary.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
      }
      if (deviceData && deviceData.notes) {
        summary = summary ? summary + '; Notes: ' + deviceData.notes : deviceData.notes;
      }
      if (summary) {
        nameSpan.setAttribute('title', summary);
        nameSpan.setAttribute('data-help', summary);
      }
      header.appendChild(nameSpan);

      var toggleBtn = document.createElement('button');
      toggleBtn.className = 'detail-toggle';
      toggleBtn.type = 'button';
      toggleBtn.setAttribute('aria-expanded', 'false');
      if (texts && texts[currentLang]) {
        toggleBtn.textContent = texts[currentLang].showDetails;
        toggleBtn.setAttribute('data-help', texts[currentLang].showDetails);
      }
      header.appendChild(toggleBtn);

      var editBtn = document.createElement('button');
      editBtn.className = 'edit-btn';
      editBtn.dataset.name = name;
      editBtn.dataset.category = categoryKey;
      if (subcategory) {
        editBtn.dataset.subcategory = subcategory;
      }
      if (texts && texts[currentLang]) {
        editBtn.textContent = texts[currentLang].editBtn;
        editBtn.setAttribute('data-help', texts[currentLang].editBtnHelp || texts[currentLang].editBtn);
      }
      header.appendChild(editBtn);

      var deleteBtn = document.createElement('button');
      deleteBtn.className = 'delete-btn';
      deleteBtn.dataset.name = name;
      deleteBtn.dataset.category = categoryKey;
      if (subcategory) {
        deleteBtn.dataset.subcategory = subcategory;
      }
      if (texts && texts[currentLang]) {
        deleteBtn.textContent = texts[currentLang].deleteDeviceBtn;
        deleteBtn.setAttribute('data-help', texts[currentLang].deleteDeviceBtnHelp || texts[currentLang].deleteDeviceBtn);
      }
      header.appendChild(deleteBtn);

      li.appendChild(header);

      var detailsDiv = document.createElement('div');
      detailsDiv.className = 'device-details';
      detailsDiv.style.display = 'none';
      detailsDiv.appendChild(createDeviceDetailsList(deviceData));
      li.appendChild(detailsDiv);

      ulElement.appendChild(li);
    }

    if (categoryKey === 'accessories.cables') {
      Object.keys(categoryDevices).forEach(function (subcat) {
        var devs = categoryDevices[subcat];
        if (!devs) {
          return;
        }
        Object.keys(devs).forEach(function (name) {
          buildItem(name, devs[name], subcat);
        });
      });
    } else {
      Object.keys(categoryDevices).forEach(function (name) {
        buildItem(name, categoryDevices[name]);
      });
    }
  }

  function refreshDeviceLists() {
    if (typeof syncDeviceManagerCategories === 'function') {
      syncDeviceManagerCategories();
    }
    if (!deviceManagerLists || typeof deviceManagerLists.forEach !== 'function') {
      return;
    }
    deviceManagerLists.forEach(function (entry, categoryKey) {
      if (!entry || !entry.list) {
        return;
      }
      renderDeviceList(categoryKey, entry.list);
      var filterInput = entry.filterInput;
      var filterValue = filterInput ? filterInput.value : '';
      if (typeof filterDeviceList === 'function') {
        filterDeviceList(entry.list, filterValue);
      }
    });
  }

  var exportsObj = {
    createDeviceDetailsList: createDeviceDetailsList,
    renderDeviceList: renderDeviceList,
    refreshDeviceLists: refreshDeviceLists
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = exportsObj;
  }

  if (globalScope && typeof globalScope === 'object') {
    globalScope.createDeviceDetailsList = createDeviceDetailsList;
    globalScope.renderDeviceList = renderDeviceList;
    globalScope.refreshDeviceLists = refreshDeviceLists;
    if (!globalScope.deviceManagerView || typeof globalScope.deviceManagerView !== 'object') {
      globalScope.deviceManagerView = exportsObj;
    } else {
      globalScope.deviceManagerView.createDeviceDetailsList = createDeviceDetailsList;
      globalScope.deviceManagerView.renderDeviceList = renderDeviceList;
      globalScope.deviceManagerView.refreshDeviceLists = refreshDeviceLists;
    }
  }
})(typeof globalThis !== 'undefined'
  ? globalThis
  : typeof window !== 'undefined'
    ? window
    : typeof global !== 'undefined'
      ? global
      : typeof self !== 'undefined'
        ? self
        : this);

