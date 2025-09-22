          const versionWarningMessage =
            langTexts.restoreVersionWarning
            || fallbackTexts.restoreVersionWarning
            || 'Backup created with a different version. Some features might not transfer.';
          alert(`${versionWarningMessage} (${fileVersion || 'unknown'} → ${APP_VERSION})`);
