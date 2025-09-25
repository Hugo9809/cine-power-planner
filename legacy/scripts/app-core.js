  if (!menu) return;
  if (overlay && overlay.classList) overlay.classList.add('hidden');
  if (toggle) {
    toggle.setAttribute('aria-expanded', 'false');
    var defaultLabel = toggle.dataset && toggle.dataset.menuLabel
      || toggle.getAttribute('data-menu-label')
      || toggle.getAttribute('title')
      || 'Menu';
    toggle.setAttribute('aria-label', defaultLabel);
    toggle.setAttribute('title', defaultLabel);
  }
  if (document.body && document.body.classList) {
    document.body.classList.remove('side-menu-open');
  }
  if (!menu) return;
  if (!overlay || !toggle) return;
  var closeLabel = toggle.dataset && toggle.dataset.menuCloseLabel
    || toggle.getAttribute('data-menu-close-label')
    || 'Close menu';
  toggle.setAttribute('aria-label', closeLabel);
  toggle.setAttribute('title', closeLabel);
  if (document.body && document.body.classList) {
    document.body.classList.add('side-menu-open');
  }
  var focusTarget = menu.querySelector('[data-sidebar-close]') || menu.querySelector('a, button');
  if (focusTarget && typeof focusTarget.focus === 'function') {
    focusTarget.focus();
  }
  if (!toggle.dataset || !toggle.dataset.menuLabel) {
    var baseLabel = toggle.getAttribute('aria-label') || toggle.getAttribute('title') || 'Menu';
    if (!toggle.dataset) toggle.dataset = {};
    toggle.dataset.menuLabel = baseLabel;
    toggle.setAttribute('data-menu-label', baseLabel);
  }
  if (!toggle.dataset.menuCloseLabel) {
    var closeLabelAttr = toggle.getAttribute('data-menu-close-label') || 'Close menu';
    toggle.dataset.menuCloseLabel = closeLabelAttr;
    toggle.setAttribute('data-menu-close-label', closeLabelAttr);
  }
  menu.querySelectorAll('[data-sidebar-close]').forEach(function (button) {
    button.addEventListener('click', function () {
      closeSideMenu();
      toggle.focus();
    });
  });
    if (!menuToggle.dataset) menuToggle.dataset = {};
    var _texts$en190;
    var menuCloseLabel = texts[lang].menuToggleCloseLabel || ((_texts$en190 = texts.en) === null || _texts$en190 === void 0 ? void 0 : _texts$en190.menuToggleCloseLabel) || "Close menu";
    menuToggle.dataset.menuLabel = menuLabel;
    menuToggle.dataset.menuCloseLabel = menuCloseLabel;
    menuToggle.setAttribute("data-menu-label", menuLabel);
    menuToggle.setAttribute("data-menu-close-label", menuCloseLabel);
  var sideMenuTitle = document.getElementById("sideMenuTitle");
  if (sideMenuTitle) {
    var _texts$en191;
    var titleText = texts[lang].sideMenuTitle || ((_texts$en191 = texts.en) === null || _texts$en191 === void 0 ? void 0 : _texts$en191.sideMenuTitle) || sideMenuTitle.textContent || "Planner navigation";
    sideMenuTitle.textContent = titleText;
    sideMenuTitle.setAttribute("data-help", titleText);
  }
  var sideMenuCloseButton = document.getElementById("sideMenuCloseButton");
  if (sideMenuCloseButton) {
    var _texts$en192;
    var closeLabel = texts[lang].sideMenuClose || ((_texts$en192 = texts.en) === null || _texts$en192 === void 0 ? void 0 : _texts$en192.sideMenuClose) || "Close menu";
    var closeHelp = texts[lang].sideMenuCloseHelp || closeLabel;
    setButtonLabelWithIcon(sideMenuCloseButton, closeLabel, ICON_GLYPHS.circleX);
    sideMenuCloseButton.setAttribute("data-help", closeHelp);
    sideMenuCloseButton.setAttribute("title", closeHelp);
    sideMenuCloseButton.setAttribute("aria-label", closeHelp);
  }
