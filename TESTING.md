# Testing Guide

This document outlines the testing strategy, available test scripts, and known limitations for the Cine Power Planner application.

## Overview
The testing suite is designed to verify critical user flows and logic. Due to current limitations in the automated browser environment (connection resets, page load hangs), these scripts are primarily intended for **manual execution** or use in a stable local development environment.

## Test Scripts

All test scripts are located in the root directory.

### 1. Device Manager (`verify_device_manager.js`)
Verifies the functionality of the custom device manager.
- **Scope:** Adding categories, adding devices (custom & library), verifying persistence.
- **Run:** Copy the script content and paste it into the browser console while the app is running.

### 2. Battery Comparison (`verify_battery_comparison.js`)
Verifies the battery comparison logic and UI.
- **Scope:** Configuring a rig, adding multiple batteries, checking the comparison table for correct runtime estimates.
- **Run:** Paste into browser console.

### 3. Contacts (`verify_contacts.js`)
Verifies contact management.
- **Scope:** Creating new contacts, verifying they appear in lists, checking persistence.
- **Run:** Paste into browser console.

### 4. Own Gear (`verify_own_gear.js`)
Verifies the "Own Gear" feature.
- **Scope:** Adding personal gear items, verifying list updates, persistence, and deletion.
- **Run:** Paste into browser console.

### 5. Settings Persistence (`verify_settings.js`)
Verifies that user preferences are saved.
- **Scope:** Changing language or theme, reloading, and confirming settings are retained.
- **Run:** Paste into browser console.

### 6. Feature Search (`verify_feature_search.js`)
Unit test for the search normalization and highlighting logic.
- **Scope:** Tests `cineFeaturesFeatureSearch` API methods (`normalizeSearchValue`, `sanitizeHighlightTokens`, `applyHighlight`).
- **Run:** Paste into browser console. **Note:** Requires the app to be fully loaded so the global API is available.

### 7. Project Management (`verify_project_management.js`)
Verifies project CRUD operations.
- **Scope:** Creating, saving, loading, and deleting projects.
- **Run:** Paste into browser console.

### 8. Calculation Accuracy (`verify_calculations.js`)
Verifies power calculation logic.
- **Scope:** Adding specific devices and checking if the "Total Draw" and "Runtime" match expected values.
- **Run:** Paste into browser console.

### 9. Smoke Test (`verify_smoke_test.js`)
End-to-end smoke test for system health.
- **Scope:** Factory reset -> Create Project -> Add Devices -> Auto Gear -> Print.
- **Run:** Paste into browser console.

## Automation Status & Limitations
Current automated attempts via the browser subagent have consistently failed due to:
-   **Browser Connection Resets:** Occur during complex multi-step flows or page reloads.
-   **Page Load Hangs:** The app sometimes gets stuck at "Preparing planner...", preventing scripts from accessing necessary globals.

**Recommendation:** Use these scripts for manual regression testing before major releases.

## Manual Testing Workflow
1.  Open the application in Chrome or Safari.
2.  Open Developer Tools (F12 or Cmd+Opt+I).
3.  Go to the "Console" tab.
4.  Paste the desired test script.
5.  Press Enter.
6.  Watch the logs for "SUCCESS" messages or errors.
