/**
 * Cine Power Planner V2 - Help Data
 * =================================
 * Content for the V2 Help Center.
 */

(function (global) {
    'use strict';

    const v2HelpData = [
        {
            id: 'v2-welcome',
            title: 'Welcome to V2',
            keywords: 'v2 new interface update overview navigation sidebar',
            icon: '✨',
            content: `
                <p>Welcome to the new Cine Power Planner V2 interface! We've redesigned the experience to be faster, more intuitive, and fully responsive.</p>
                
                <h4>Key Improvements</h4>
                <ul>
                    <li><strong>New Sidebar Navigation:</strong> Quickly access Projects, Tools, and Settings from the dedicated sidebar. Mobile users can access this via the menu button in the header.</li>
                    <li><strong>Enhanced Visuals:</strong> A modern, clean look with improved Dark Mode and Pink Mode support.</li>
                    <li><strong>Better Performance:</strong> Faster loading times and smoother transitions between views.</li>
                </ul>

                <h4>Getting Around</h4>
                <p>The sidebar is your main control center:</p>
                <ul>
                    <li><strong>Projects:</strong> View and manage all your power plans. Filter by Active or Archive.</li>
                    <li><strong>Tools:</strong> Access the Device Library, Contacts, and Auto Gear Rules.</li>
                    <li><strong>Settings:</strong> Configure app preferences, backup data, and manage storage.</li>
                </ul>
            `
        },
        {
            id: 'v2-projects',
            title: 'Managing Projects',
            keywords: 'projects create new delete archive filter active dashboard',
            icon: '📁',
            content: `
                <p>The Projects Dashboard is where your work begins.</p>
                
                <h4>Creating a Project</h4>
                <p>Click the <strong>+ New Project</strong> button in the top right to start a fresh plan. You'll be prompted to enter a name and optional details.</p>

                <h4>Project Status & Filtering</h4>
                <p>Use the sidebar to filter your projects:</p>
                <ul>
                    <li><strong>All Projects:</strong> Everything you've created.</li>
                    <li><strong>Active Projects:</strong> Projects you are currently working on.</li>
                    <li><strong>Archive:</strong> Completed or on-hold projects. You can archive a project from its context menu.</li>
                </ul>

                <h4>Project Actions</h4>
                <p>Right-click (or long-press on touch devices) on any project tile to access the context menu:</p>
                <ul>
                    <li><strong>Rename:</strong> Change the project details.</li>
                    <li><strong>Duplicate:</strong> Create an exact copy of a project.</li>
                    <li><strong>Archive/Unarchive:</strong> Move the project to or from the archive.</li>
                    <li><strong>Delete:</strong> Permanently remove the project.</li>
                </ul>
            `
        },
        {
            id: 'v2-sidebar-search',
            title: 'Sidebar Search',
            keywords: 'search sidebar features devices actions help keyboard offline',
            icon: '🔎',
            content: `
                <p>The sidebar search now runs fully offline and blends features, devices, actions, and help topics into one fast list.</p>

                <h4>What It Covers</h4>
                <ul>
                    <li><strong>Features:</strong> Jump straight to inputs, sections, and dialogs.</li>
                    <li><strong>Devices:</strong> Search the local device catalog and open the matching entry.</li>
                    <li><strong>Actions:</strong> Trigger quick commands like Save, Export, or Settings.</li>
                    <li><strong>Help:</strong> Open the most relevant help topic without leaving the planner.</li>
                </ul>

                <h4>Keyboard Navigation</h4>
                <ul>
                    <li><strong>Arrow keys:</strong> Move through suggestions.</li>
                    <li><strong>Enter:</strong> Activate the highlighted result.</li>
                    <li><strong>Esc:</strong> Clear the query and close the list.</li>
                </ul>
            `
        },
        {
            id: 'v2-device-library',
            title: 'Device Library',
            keywords: 'devices library equipment custom gear add edit database',
            icon: '📷',
            content: `
                <p>The Device Library allows you to manage the equipment available for your power plans.</p>

                <h4>Browsing Devices</h4>
                <p>Devices are organized by category (Cameras, Monitors, etc.). Use the tabs or dropdowns to switch between categories. You can also use the search bar to find specific gear instantly.</p>

                <h4>Adding Custom Gear</h4>
                <p>Can't find your equipment? Click <strong>Add Device</strong> to create a custom entry. You'll need to specify:</p>
                <ul>
                    <li><strong>Name:</strong> The model name.</li>
                    <li><strong>Power Draw:</strong> Typical power consumption in Watts (W).</li>
                    <li><strong>Voltage:</strong> Operating voltage range (optional but recommended).</li>
                </ul>
                <p>Once added, custom devices are available for all your projects.</p>
            `
        },
        {
            id: 'v2-contacts',
            title: 'Contacts',
            keywords: 'contacts people crew rental houses list',
            icon: '👥',
            content: `
                <p>Keep track of rental houses, crew members, and clients directly in the app.</p>

                <h4>Managing Contacts</h4>
                <ul>
                    <li><strong>Add Contact:</strong> Click the <strong>New Contact</strong> button to add details like Name, Role, Phone, and Email.</li>
                    <li><strong>Edit/Delete:</strong> Use the action buttons on each contact card to update or remove information.</li>
                </ul>
                <p>Contacts can be assigned to projects for quick reference (coming soon to project details).</p>
            `
        },
        {
            id: 'v2-settings',
            title: 'Settings & Data',
            keywords: 'settings preferences backup restore data storage theme language',
            icon: '⚙️',
            content: `
                <p>Customize your experience and keep your data safe.</p>

                <h4>Data Management</h4>
                <ul>
                    <li><strong>Backup:</strong> Download a full backup of all your projects and custom devices. We recommend doing this regularly.</li>
                    <li><strong>Restore:</strong> Load a previously saved backup file. <em>Note: This replaces current data.</em></li>
                    <li><strong>Auto-Backups:</strong> Enable automatic snapshots to protect against accidental data loss.</li>
                </ul>

                <h4>Preferences</h4>
                <ul>
                    <li><strong>Units:</strong> Toggle between Metric and Imperial measurements (if applicable).</li>
                    <li><strong>Theme:</strong> Force Dark Mode, Light Mode, or the special Pink Mode.</li>
                </ul>
            `
        },
        {
            id: 'v2-auto-gear',
            title: 'Auto Gear Rules',
            keywords: 'auto gear rules automation kit list scenarios production requirements',
            icon: '🤖',
            content: `
                <p>Automate your kit list generation with smart rules based on production scenarios.</p>

                <h4>How it Works</h4>
                <p>Auto Gear Rules monitor your project's <strong>Production Requirements</strong> (e.g., "Handheld", "Studio", "Car Rig") and automatically add or remove specific items from your kit list.</p>

                <h4>Creating Rules</h4>
                <p>Go to the <strong>Auto Gear Rules</strong> tool and click <strong>Add Rule</strong>. You can define:</p>
                <ul>
                    <li><strong>Conditions:</strong> Triggers based on scenarios, camera models, or other gear selections.</li>
                    <li><strong>Actions:</strong> Items to <strong>Add</strong> (e.g., "Shoulder Pad" for "Handheld") or <strong>Remove</strong>.</li>
                </ul>

                <h4>Presets</h4>
                <p>Save your favorite rule sets as <strong>Presets</strong> to quickly switch between different production styles (e.g., "Narrative Feature" vs "Commercial").</p>
            `
        },
        {
            id: 'v2-print-export',
            title: 'Printing & Exporting',
            keywords: 'print pdf export share report kit list diagram',
            icon: '🖨️',
            content: `
                <p>Share your power plans with your team or rental house.</p>

                <h4>Project Overview</h4>
                <p>From the Project Detail view, use the <strong>Print / Export PDF</strong> button to generate a clean summary of your project, including power totals and battery estimates.</p>
                
                <h4>Kit List</h4>
                <p>Generate a dedicated equipment list for quotes and prep. You can filter by department and customize columns before printing.</p>

                <h4>Power Diagram</h4>
                <p>Need a visual aid? Export the <strong>Connection Diagram</strong> as an image (PNG/JPG) or SVG to include in your tech pack.</p>

                <h4>PDF Tips</h4>
                <p>To save as a PDF, click "Print" and select <strong>"Save as PDF"</strong> as your destination in the print dialog.</p>
            `
        }
    ];

    // Migrated Legacy Topics
    const migratedTopics = [
        {
            id: 'v2-quick-start',
            title: 'Quick Start Checklist',
            keywords: 'quickstart onboarding tutorial first steps workflow basics getting started new project guide',
            icon: '🚀',
            content: `
                <p>Welcome to Cine Power Planner! Follow these steps to get your first project ready.</p>
                <ol>
                    <li>
                        <strong>Start Guided Tutorial:</strong>
                        <button type="button" class="button-link help-onboarding-secondary" data-onboarding-tour-trigger="secondary">Start guided tutorial</button>
                        to walk through every workflow with offline progress tracking.
                    </li>
                    <li>
                        <strong>Name Your Project:</strong>
                        Enter a name in the <em>Project Name</em> field and click <strong>Save</strong> (or press <kbd>Enter</kbd>/<kbd>Ctrl</kbd>+<kbd>S</kbd>) to capture the current rig.
                    </li>
                    <li>
                        <strong>Configure Devices:</strong>
                        Walk through <em>Configure Devices</em>, check the <em>Power Summary</em>, and review the <em>Connection Diagram</em>.
                    </li>
                    <li>
                        <strong>Secure Your Data:</strong>
                        Download an <strong>Export Project</strong> JSON and a full-app <strong>Backup</strong> so you have two offline recovery copies.
                    </li>
                    <li>
                        <strong>Check Offline Status:</strong>
                        Confirm the offline indicator (in the header) glows before disconnecting.
                    </li>
                    <li>
                        <strong>Rehearse Restore:</strong>
                        Open <strong>Restore rehearsal</strong> in Settings to verify your backup in a sandbox environment.
                    </li>
                </ol>
                <p class="help-callout-note">
                    Tip: Keep backups on separate drives when travelling—<strong>Restore</strong> always creates a fresh safety copy so nothing is lost when you undo a change.
                </p>
            `
        },
        {
            id: 'v2-data-safety',
            title: 'Data Safety Essentials',
            keywords: 'backup restore protect save export safety offline preserve',
            icon: '🛡️',
            content: `
                <p>Protect your work with these essential habits.</p>
                <ul>
                    <li>
                        <strong>Save Often:</strong> Press <strong>Save</strong> after meaningful tweaks. Manual saves are instant and work offline.
                    </li>
                    <li>
                        <strong>Enable Auto Backups:</strong> Turn on "Show auto backups in project list" in Settings to surface background snapshots.
                    </li>
                    <li>
                        <strong>Download Redundancy:</strong> Export your project and download a full Backup whenever you finish a milestone.
                    </li>
                    <li>
                        <strong>Store Safely:</strong> Keep exports on at least two devices.
                    </li>
                    <li>
                        <strong>Update Safely:</strong> Before approving an update, capture a fresh manual backup.
                    </li>
                </ul>
                <p class="help-callout-note">
                    Manual backups bundle a timestamped copy of every saved project, favorite, rule, and preference. Restores make a safety snapshot first.
                </p>
            `
        },
        {
            id: 'v2-shortcuts',
            title: 'Essential Shortcuts',
            keywords: 'keyboard shortcuts hotkeys fast navigation',
            icon: '⌨️',
            content: `
                <ul>
                    <li><kbd>?</kbd>, <kbd>H</kbd>, <kbd>F1</kbd>: Open Help</li>
                    <li><kbd>Ctrl</kbd>+<kbd>/</kbd> (<kbd>⌘</kbd>+<kbd>/</kbd>): Toggle Help</li>
                    <li><kbd>/</kbd> or <kbd>Ctrl</kbd>+<kbd>F</kbd> (<kbd>⌘</kbd>+<kbd>F</kbd>): Help Search</li>
                    <li><kbd>Ctrl</kbd>+<kbd>K</kbd> (<kbd>⌘</kbd>+<kbd>K</kbd>): Global Feature Search</li>
                    <li><kbd>Ctrl</kbd>+<kbd>,</kbd> (<kbd>⌘</kbd>+<kbd>,</kbd>): Open Settings</li>
                    <li><kbd>Ctrl</kbd>+<kbd>S</kbd> (<kbd>⌘</kbd>+<kbd>S</kbd>): Save Project</li>
                    <li><kbd>D</kbd>: Toggle Dark Mode</li>
                    <li><kbd>P</kbd>: Toggle Pink Mode</li>
                </ul>
            `
        },
        {
            id: 'v2-features',
            title: 'Features at a Glance',
            keywords: 'overview capabilities highlights offline favorites search',
            icon: '🌟',
            content: `
                <ul>
                    <li><strong>Rig Planning:</strong> Configure cameras, monitors, and accessories in <em>Configure Devices</em>.</li>
                    <li><strong>Power Analysis:</strong> Review draw and runtime in <em>Power Summary</em>.</li>
                    <li><strong>Visual Diagram:</strong> Map connections with the interactive <em>Connection Diagram</em>.</li>
                    <li><strong>Battery Comparison:</strong> Compare runtimes and output limits.</li>
                    <li><strong>Device Library:</strong> Customize the database with your own gear.</li>
                    <li><strong>Contacts & Own Gear:</strong> Manage crew info and personal kits.</li>
                    <li><strong>Print & Export:</strong> Generate clean PDF summaries and kit lists.</li>
                    <li><strong>Offline Capable:</strong> Works fully without an internet connection.</li>
                    <li><strong>Customizable:</strong> Adjust themes (Dark, Light, Pink), fonts, and accent colors.</li>
                </ul>
            `
        }
    ];

    // Combine
    v2HelpData.push(...migratedTopics);

    // Expose
    global.cineV2HelpData = v2HelpData;

})(typeof window !== 'undefined' ? window : this);
