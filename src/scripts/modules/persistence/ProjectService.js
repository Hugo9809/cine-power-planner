import { storageRepo } from '../storage/StorageRepository.js';

/**
 * Service for managing project data.
 * Decouples the V2 Dashboard from legacy global storage functions.
 */
export class ProjectService {

    /**
     * Load a specific project by ID (name)
     * @param {string} projectId 
     * @returns {Promise<Object|null>}
     */
    async getProject(projectId) {
        if (!projectId) return null;
        try {
            const result = await storageRepo.loadProject(projectId);
            return result ? result.data : null;
        } catch (e) {
            console.error('[ProjectService] Failed to load project:', projectId, e);
            return null;
        }
    }

    /**
     * Get all available projects with their metadata
     * @returns {Promise<Array<string>>} List of project names
     */
    async getProjectNames() {
        try {
            return await storageRepo.getProjectKeys();
        } catch (e) {
            console.error('[ProjectService] Failed to get project names:', e);
            return [];
        }
    }

    /**
     * Get metadata for a specific project
     * @param {string} projectId 
     * @returns {Promise<Object>} Metadata object or empty default
     */
    async getProjectMetadata(projectId) {
        if (!projectId) return {};
        try {
            // First try to get lightweight metadata
            const meta = await storageRepo.getProjectMeta(projectId);
            if (meta) {
                // Return legacy-compatible metadata structure if needed,
                // or just the meta object. For now, let's load the project to be safe
                // as the dashboard checks specific fields like 'color', 'icon', 'dates'.
                // Optimization: StorageRepository.loadProject loads everything.
                // Ideally we'd have a lightweight way to get these fields without full load.
                // For now, we fallback to full load to ensure compatibility.
            }

            const result = await storageRepo.loadProject(projectId);
            if (result && result.data) {
                return result.data;
            }
        } catch (e) {
            console.error('[ProjectService] Failed to get project metadata:', projectId, e);
        }
        return {};
    }

    /**
     * Save a project
     * @param {string} projectId 
     * @param {Object} projectData 
     * @returns {Promise<boolean>}
     */
    async saveProject(projectId, projectData) {
        if (!projectId || !projectData) return false;

        try {
            // Basic structural validation/normalization could go here
            if (typeof projectData !== 'object') {
                console.warn('[ProjectService] Invalid project data');
                return false;
            }

            // Ensure lastModified is set
            if (!projectData.lastModified) {
                projectData.lastModified = new Date().toISOString();
            }

            const result = await storageRepo.saveProject(projectId, projectData);
            return result.success;
        } catch (e) {
            console.error('[ProjectService] Failed to save project:', projectId, e);
            return false;
        }
    }

    /**
     * Create a new project
     * @param {string} projectId 
     * @returns {Promise<boolean>}
     */
    async createProject(projectId) {
        if (!projectId) return false;

        const newProject = {
            created: new Date().toISOString(),
            lastModified: new Date().toISOString(),
            gearList: '',
            projectInfo: null,
            gearListAndProjectRequirementsGenerated: false,
            color: 'blue', // Default color
            icon: '📽️'   // Default icon
        };

        return this.saveProject(projectId, newProject);
    }

    /**
     * Delete a project
     * @param {string} projectId 
     * @returns {Promise<boolean>}
     */
    async deleteProject(projectId) {
        if (!projectId) return false;
        try {
            await storageRepo.removeProject(projectId);
            return true;
        } catch (e) {
            console.error('[ProjectService] Failed to delete project:', projectId, e);
            return false;
        }
    }

    /**
     * Duplicate a project
     * @param {string} sourceId 
     * @returns {Promise<{success: boolean, newId?: string}>}
     */
    async duplicateProject(sourceId) {
        try {
            if (typeof sourceId !== 'string' || sourceId.length === 0) {
                return { success: false };
            }

            const cleanSourceId = sourceId.trim();
            const sourceProject = await this.getProject(cleanSourceId);

            if (!sourceProject) {
                return { success: false };
            }

            // Generate unique name
            const existingNames = await this.getProjectNames();
            let newName = `${cleanSourceId} (Copy)`;
            let counter = 2;
            while (existingNames.includes(newName)) {
                newName = `${cleanSourceId} (Copy ${counter})`;
                counter++;
            }

            // Clone data
            const newData = JSON.parse(JSON.stringify(sourceProject));
            newData.created = new Date().toISOString();
            newData.lastModified = new Date().toISOString();

            // Save
            const saved = await this.saveProject(newName, newData);
            return { success: saved, newId: newName };

        } catch (e) {
            console.error('[ProjectService] Failed to duplicate project:', e);
            return { success: false };
        }
    }
}

export const projectService = new ProjectService();
