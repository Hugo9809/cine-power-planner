/**
 * Cine Power Planner V2 - Sidebar View
 * ===================================
 * Builds and mounts the V2 sidebar shell inside #v2-app.
 */

(function (global) {
    'use strict';

    const SIDEBAR_TEMPLATE = `
        <nav class="v2-sidebar" aria-label="V2 Navigation">
          <div class="v2-sidebar-header">
            <img src="src/icons/Icon Bluenew.svg" alt="" class="v2-sidebar-logo" />
            <h1 class="v2-sidebar-title">Cine Power Planner</h1>
          </div>
          <div class="v2-sidebar-nav">
            <div class="v2-sidebar-section">
              <div class="v2-sidebar-section-title">Projects</div>

              <a href="#/projects" class="v2-sidebar-link active" data-view="projects">
                <svg class="v2-sidebar-link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M3 7v4a1 1 0 001 1h3m10-5v4a1 1 0 01-1 1h-3m-4-5v4M8 12v8m8-8v8M3 12h18" />
                  <rect x="5" y="3" width="14" height="4" rx="1" />
                </svg>
                <span class="v2-sidebar-link-text">All Projects</span>
              </a>

              <a href="#/projects?filter=active" class="v2-sidebar-link" data-view="projects-active">
                <svg class="v2-sidebar-link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <span class="v2-sidebar-link-text">Active Projects</span>
              </a>

              <a href="#/projects?filter=archive" class="v2-sidebar-link" data-view="projects-archive">
                <svg class="v2-sidebar-link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="21 8 21 21 3 21 3 8"></polyline>
                  <rect x="1" y="3" width="22" height="5"></rect>
                  <line x1="10" y1="12" x2="14" y2="12"></line>
                </svg>
                <span class="v2-sidebar-link-text">Archive</span>
              </a>

              <a href="#/backups" class="v2-sidebar-link" id="navAutoBackups" style="display:none;" data-view="backups">
                <svg class="v2-sidebar-link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 9l-5 5-5-5M12 12.8V2.5" />
                </svg>
                <span class="v2-sidebar-link-text">Auto Backups</span>
              </a>
            </div>

            <div class="v2-sidebar-section">
              <div class="v2-sidebar-section-title">Tools</div>

              <a href="#/devices" class="v2-sidebar-link" data-view="devices">
                <svg class="v2-sidebar-link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
                <span class="v2-sidebar-link-text">Device Library</span>
              </a>

              <a href="#/contacts" class="v2-sidebar-link" data-view="contacts">
                <svg class="v2-sidebar-link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <span class="v2-sidebar-link-text">Contacts</span>
              </a>

              <a href="#/rules" class="v2-sidebar-link" data-view="rules">
                <svg class="v2-sidebar-link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path
                    d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z">
                  </path>
                </svg>
                <span class="v2-sidebar-link-text">Auto Gear Rules</span>
              </a>

              <a href="#/own-gear" class="v2-sidebar-link" data-view="ownGear">
                <svg class="v2-sidebar-link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
                <span class="v2-sidebar-link-text">Owned Gear</span>
              </a>
            </div>

            <div class="v2-sidebar-section">
              <div class="v2-sidebar-section-title">Support</div>
              <a href="#/settings" class="v2-sidebar-link" data-view="settings">
                <svg class="v2-sidebar-link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="3" />
                  <path
                    d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
                </svg>
                <span class="v2-sidebar-link-text">Settings</span>
              </a>
              <a href="#/help" class="v2-sidebar-link" data-view="help">
                <span class="v2-sidebar-link-icon icon-glyph icon-text" aria-hidden="true" data-icon-font="uicons">?</span>
                <span class="v2-sidebar-link-text">Help</span>
              </a>
            </div>
          </div>
          <div class="v2-sidebar-footer">
            <div class="v2-sidebar-legal">
              <a href="legal/impressum-en.html">Imprint</a>
              <span class="v2-legal-separator">&middot;</span>
              <a href="legal/datenschutz-en.html">Privacy Policy</a>
              <span class="v2-legal-separator">&middot;</span>
              <button type="button" id="v2ExitBtn" title="Return to Classic UI">Exit V2</button>
            </div>
          </div>
        </nav>
        <div class="v2-sidebar-overlay"></div>
    `;

    function buildSidebar() {
        const app = document.getElementById('v2-app');
        if (!app) {
            return false;
        }

        if (app.querySelector('.v2-sidebar')) {
            return true;
        }

        const main = app.querySelector('.v2-main');
        const template = document.createElement('template');
        template.innerHTML = SIDEBAR_TEMPLATE.trim();

        if (main) {
            app.insertBefore(template.content, main);
        } else {
            app.appendChild(template.content);
        }

        return true;
    }

    function mountSidebar() {
        if (buildSidebar()) {
            return;
        }

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                buildSidebar();
            }, { once: true });
        }
    }

    const sidebarView = {
        mount: mountSidebar
    };

    global.cineV2SidebarView = sidebarView;
    if (typeof window !== 'undefined') {
        window.cineV2SidebarView = sidebarView;
    }
})(typeof globalThis !== 'undefined' ? globalThis : window);
