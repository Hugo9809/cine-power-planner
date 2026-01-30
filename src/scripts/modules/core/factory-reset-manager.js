/**
 * Factory Reset Manager
 * Handles complete application state reset and cleanup
 */

/**
 * Reset planner state after factory reset
 * @param {Object} dependencies - Dependencies object with functions and elements
 */
function resetPlannerStateAfterFactoryReset(dependencies = {}) {
    const {
        suspendProjectPersistence,
        resumeProjectPersistence,
        storeLoadedSetupState,
        currentProjectInfo,
        populateProjectForm,
        projectForm,
        displayGearAndRequirements,
        gearListOutput,
        projectRequirementsOutput,
        cameraSelect,
        monitorSelect,
        videoSelect,
        cageSelect,
        distanceSelect,
        batterySelect,
        hotswapSelect,
        batteryPlateSelect,
        motorSelects,
        controllerSelects,
        resetSelectsToNone,
        getSliderBowlSelect,
        getEasyrigSelect,
        setupNameInput,
        setupSelect,
        populateSetupSelect,
        syncAutoGearRulesFromStorage,
        clearProjectAutoGearRules,
        renderAutoGearRulesList,
        resetSharedImportStateForFactoryReset,
        updateAutoGearCatalogOptions,
        updateBatteryPlateVisibility,
        updateBatteryOptions,
        safeLoadStoredLogoPreview,
        resetCustomFontsForFactoryReset,
        updateStorageSummary,
        ensureGearListActions,
        checkSetupChanged,
        updateCalculations,
    } = dependencies;

    const suspendable =
        typeof suspendProjectPersistence === 'function'
        && typeof resumeProjectPersistence === 'function';
    if (suspendable) {
        try {
            suspendProjectPersistence();
        } catch (error) {
            console.warn('Failed to suspend project persistence during factory reset cleanup', error);
        }
    }

    try {
        try {
            if (typeof storeLoadedSetupState === 'function') {
                storeLoadedSetupState(null);
            }
        } catch (error) {
            console.warn('Failed to reset loaded setup state during factory reset', error);
        }

        try {
            if (dependencies.setCurrentProjectInfo) {
                dependencies.setCurrentProjectInfo(null);
            }
        } catch (error) {
            console.warn('Failed to clear in-memory project info during factory reset', error);
        }

        try {
            if (typeof populateProjectForm === 'function') {
                populateProjectForm({});
            } else if (projectForm && typeof projectForm.reset === 'function') {
                projectForm.reset();
            }
        } catch (error) {
            console.warn('Failed to reset project form during factory reset', error);
        }

        try {
            if (typeof displayGearAndRequirements === 'function') {
                displayGearAndRequirements('');
            }
        } catch (error) {
            console.warn('Failed to reset gear displays during factory reset', error);
            if (gearListOutput) {
                gearListOutput.innerHTML = '';
                gearListOutput.classList.add('hidden');
            }
            if (projectRequirementsOutput) {
                projectRequirementsOutput.innerHTML = '';
                projectRequirementsOutput.classList.add('hidden');
            }
        }

        const primarySelects = [
            cameraSelect,
            monitorSelect,
            videoSelect,
            cageSelect,
            distanceSelect,
            batterySelect,
            hotswapSelect,
            batteryPlateSelect,
        ];
        primarySelects.forEach(select => {
            if (!select) return;
            try {
                const options = Array.from(select.options || []);
                const noneOption = options.find(opt => opt.value === 'None');
                if (noneOption) {
                    select.value = 'None';
                } else if (options.length) {
                    select.selectedIndex = 0;
                } else {
                    select.value = '';
                }
            } catch (selectError) {
                console.warn('Failed to reset selector during factory reset', selectError);
            }
        });

        try {
            if (typeof resetSelectsToNone === 'function') {
                resetSelectsToNone(motorSelects);
            }
        } catch (error) {
            console.warn('Failed to reset motor selections during factory reset', error);
        }

        try {
            if (typeof resetSelectsToNone === 'function') {
                resetSelectsToNone(controllerSelects);
            }
        } catch (error) {
            console.warn('Failed to reset controller selections during factory reset', error);
        }

        try {
            if (typeof getSliderBowlSelect === 'function') {
                const sliderSelect = getSliderBowlSelect();
                if (sliderSelect) sliderSelect.value = '';
            } else {
                console.warn(
                    'Skipping slider bowl selection reset during factory reset because helper is unavailable'
                );
            }
        } catch (error) {
            console.warn('Failed to reset slider bowl selection during factory reset', error);
        }

        try {
            if (typeof getEasyrigSelect === 'function') {
                const easyrigSelect = getEasyrigSelect();
                if (easyrigSelect) easyrigSelect.value = '';
            } else {
                console.warn(
                    'Skipping Easyrig selection reset during factory reset because helper is unavailable'
                );
            }
        } catch (error) {
            console.warn('Failed to reset Easyrig selection during factory reset', error);
        }

        try {
            if (setupNameInput) {
                setupNameInput.value = '';
            }
        } catch (error) {
            console.warn('Failed to clear setup name during factory reset', error);
        }

        try {
            if (setupSelect) {
                if (typeof populateSetupSelect === 'function') {
                    populateSetupSelect();
                }
                setupSelect.value = '';
            }
        } catch (error) {
            console.warn('Failed to reset setup selector options during factory reset', error);
        }

        try {
            if (typeof syncAutoGearRulesFromStorage === 'function') {
                syncAutoGearRulesFromStorage();
            }
        } catch (error) {
            console.warn('Failed to sync automatic gear rules during factory reset', error);
            try {
                if (typeof clearProjectAutoGearRules === 'function') {
                    clearProjectAutoGearRules();
                }
            } catch (fallbackError) {
                console.warn('Failed to clear project automatic gear rules during factory reset', fallbackError);
            }
        }

        try {
            if (typeof renderAutoGearRulesList === 'function') {
                renderAutoGearRulesList();
            }
        } catch (error) {
            console.warn('Failed to render automatic gear rules during factory reset', error);
        }

        try {
            if (typeof resetSharedImportStateForFactoryReset === 'function') {
                resetSharedImportStateForFactoryReset();
            }
        } catch (error) {
            console.warn('Failed to reset shared import state during factory reset', error);
        }

        try {
            if (typeof updateAutoGearCatalogOptions === 'function') {
                updateAutoGearCatalogOptions();
            }
        } catch (error) {
            console.warn('Failed to refresh automatic gear catalog during factory reset', error);
        }

        try {
            if (typeof updateBatteryPlateVisibility === 'function') {
                updateBatteryPlateVisibility();
            }
        } catch (error) {
            console.warn('Failed to reset battery plate visibility during factory reset', error);
        }

        try {
            if (typeof updateBatteryOptions === 'function') {
                updateBatteryOptions();
            }
        } catch (error) {
            console.warn('Failed to reset battery options during factory reset', error);
        }

        try {
            if (typeof safeLoadStoredLogoPreview === 'function') {
                safeLoadStoredLogoPreview();
            }
        } catch (error) {
            console.warn('Failed to reset custom logo preview during factory reset', error);
        }

        try {
            if (typeof resetCustomFontsForFactoryReset === 'function') {
                resetCustomFontsForFactoryReset();
            } else {
                console.warn(
                    'Skipping custom font reset during factory reset because helper is unavailable'
                );
            }
        } catch (error) {
            console.warn('Failed to reset custom fonts during factory reset', error);
        }

        try {
            if (typeof updateStorageSummary === 'function') {
                updateStorageSummary();
            }
        } catch (error) {
            console.warn('Failed to update storage summary during factory reset', error);
        }

        try {
            if (typeof ensureGearListActions === 'function') {
                ensureGearListActions();
            }
        } catch (error) {
            console.warn('Failed to ensure gear list actions during factory reset', error);
        }

        try {
            if (typeof checkSetupChanged === 'function') {
                checkSetupChanged();
            }
        } catch (error) {
            console.warn('Failed to refresh setup state during factory reset', error);
        }

        try {
            if (typeof updateCalculations === 'function') {
                updateCalculations();
            }
        } catch (error) {
            console.warn('Failed to update calculations during factory reset', error);
        }
    } finally {
        if (suspendable) {
            try {
                resumeProjectPersistence();
            } catch (error) {
                console.warn('Failed to resume project persistence after factory reset cleanup', error);
            }
        }
    }
}

export const FactoryResetManager = {
    resetPlannerStateAfterFactoryReset,
};
