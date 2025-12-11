/**
 * LocalStorage Wrapper for Peptide Calculator
 * Handles saving/loading configurations and application state
 */

const STORAGE_KEYS = {
  SAVED_CONFIGS: 'peptideCalc_savedConfigs',
  LAST_STATE: 'peptideCalc_lastState'
};

/**
 * Generate a simple unique ID
 * @returns {string} Unique identifier
 */
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/**
 * Storage wrapper object
 */
const Storage = {
  /**
   * Check if localStorage is available
   * @returns {boolean} True if localStorage is available
   */
  isAvailable() {
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  },

  /**
   * Save a new configuration
   * @param {object} config - Configuration to save
   * @returns {object} Saved configuration with ID
   */
  saveConfig(config) {
    if (!this.isAvailable()) return null;

    const configs = this.getAllConfigs();
    config.id = config.id || generateId();
    config.createdAt = config.createdAt || new Date().toISOString();
    config.updatedAt = new Date().toISOString();

    const existingIndex = configs.findIndex(c => c.id === config.id);
    if (existingIndex >= 0) {
      configs[existingIndex] = config;
    } else {
      configs.push(config);
    }

    try {
      localStorage.setItem(STORAGE_KEYS.SAVED_CONFIGS, JSON.stringify(configs));
      return config;
    } catch (e) {
      console.error('Failed to save config:', e);
      return null;
    }
  },

  /**
   * Get all saved configurations
   * @returns {array} Array of saved configurations
   */
  getAllConfigs() {
    if (!this.isAvailable()) return [];

    try {
      const data = localStorage.getItem(STORAGE_KEYS.SAVED_CONFIGS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Failed to load configs:', e);
      return [];
    }
  },

  /**
   * Get a configuration by ID
   * @param {string} id - Configuration ID
   * @returns {object|null} Configuration or null
   */
  getConfigById(id) {
    const configs = this.getAllConfigs();
    return configs.find(c => c.id === id) || null;
  },

  /**
   * Delete a configuration by ID
   * @param {string} id - Configuration ID to delete
   * @returns {boolean} True if deleted
   */
  deleteConfig(id) {
    if (!this.isAvailable()) return false;

    try {
      const configs = this.getAllConfigs().filter(c => c.id !== id);
      localStorage.setItem(STORAGE_KEYS.SAVED_CONFIGS, JSON.stringify(configs));
      return true;
    } catch (e) {
      console.error('Failed to delete config:', e);
      return false;
    }
  },

  /**
   * Save current application state (auto-save on changes)
   * @param {object} state - Current state to save
   */
  saveState(state) {
    if (!this.isAvailable()) return;

    try {
      localStorage.setItem(STORAGE_KEYS.LAST_STATE, JSON.stringify(state));
    } catch (e) {
      console.error('Failed to save state:', e);
    }
  },

  /**
   * Get last saved application state
   * @returns {object|null} Last state or null
   */
  getLastState() {
    if (!this.isAvailable()) return null;

    try {
      const data = localStorage.getItem(STORAGE_KEYS.LAST_STATE);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error('Failed to load state:', e);
      return null;
    }
  },

  /**
   * Clear last saved state
   */
  clearState() {
    if (!this.isAvailable()) return;

    try {
      localStorage.removeItem(STORAGE_KEYS.LAST_STATE);
    } catch (e) {
      console.error('Failed to clear state:', e);
    }
  },

  /**
   * Clear all stored data
   */
  clearAll() {
    if (!this.isAvailable()) return;

    try {
      localStorage.removeItem(STORAGE_KEYS.SAVED_CONFIGS);
      localStorage.removeItem(STORAGE_KEYS.LAST_STATE);
    } catch (e) {
      console.error('Failed to clear storage:', e);
    }
  }
};

// Export for ES modules
export { Storage, STORAGE_KEYS, generateId };
