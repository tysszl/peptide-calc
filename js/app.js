/**
 * Peptide Dilution Calculator - Main Application
 * Alpine.js application with reactive state management
 */

import { calculateConcentration, calculateDrawVolume, calculateDosesPerVial, validateInputs } from './calculations.js';
import { PEPTIDE_PRESETS, SYRINGE_SPECS, getPeptideById, getAllPeptides, getSyringeSpec } from './peptides.js';
import { Storage } from './storage.js';
import { generateSyringeSVG, generateSyringeLabel } from './syringe.js';

/**
 * Main calculator application factory for Alpine.js
 */
function calculatorApp() {
  return {
    // Peptide selection
    selectedPeptideId: 'tirzepatide',
    customPeptideName: '',

    // Vial configuration
    mgInVial: 10,
    waterMl: 2,

    // Dose configuration
    desiredDose: 2.5,
    doseUnit: 'mg',
    syringeSize: '1.0',

    // UI state
    showSaveModal: false,
    saveConfigName: '',
    savedConfigs: [],
    showTypicalDoses: false,

    // Computed values (will be calculated reactively)
    get selectedPeptide() {
      return getPeptideById(this.selectedPeptideId) || PEPTIDE_PRESETS.custom;
    },

    get peptideList() {
      return getAllPeptides();
    },

    get syringeSpec() {
      return getSyringeSpec(this.syringeSize);
    },

    get concentration() {
      return calculateConcentration(this.mgInVial, this.waterMl);
    },

    get drawVolume() {
      return calculateDrawVolume(this.desiredDose, this.doseUnit, this.concentration, this.syringeSpec);
    },

    get dosesPerVial() {
      return calculateDosesPerVial(this.mgInVial, this.desiredDose, this.doseUnit);
    },

    get validation() {
      return validateInputs(this.mgInVial, this.waterMl, this.desiredDose, this.doseUnit, this.syringeSpec);
    },

    get syringeSVG() {
      const fillPct = this.drawVolume ? this.drawVolume.fillPercentage : 0;
      const units = this.drawVolume ? this.drawVolume.units : 0;
      return generateSyringeSVG(this.syringeSize, fillPct, units);
    },

    get syringeLabel() {
      if (!this.drawVolume) return generateSyringeLabel(0, 0, false);
      return generateSyringeLabel(
        this.drawVolume.units,
        this.drawVolume.ml,
        this.drawVolume.exceedsSyringe
      );
    },

    get displayDoseUnit() {
      return this.doseUnit === 'mg' ? 'mg' : 'mcg';
    },

    /**
     * Initialize the application
     */
    init() {
      // Load saved configurations
      this.savedConfigs = Storage.getAllConfigs();

      // Restore last state if available
      const lastState = Storage.getLastState();
      if (lastState) {
        this.restoreState(lastState);
      }

      // Watch for changes and auto-save state
      this.$watch('selectedPeptideId', () => this.onPeptideChange());
      this.$watch('mgInVial', () => this.saveCurrentState());
      this.$watch('waterMl', () => this.saveCurrentState());
      this.$watch('desiredDose', () => this.saveCurrentState());
      this.$watch('doseUnit', () => this.saveCurrentState());
      this.$watch('syringeSize', () => this.saveCurrentState());
    },

    /**
     * Handle peptide selection change
     */
    onPeptideChange() {
      const peptide = this.selectedPeptide;
      if (peptide && peptide.id !== 'custom') {
        this.mgInVial = peptide.defaultVialMg;
        this.waterMl = peptide.defaultWaterMl;
        this.desiredDose = peptide.defaultDose;
        this.doseUnit = peptide.defaultDoseUnit;
      }
      this.saveCurrentState();
    },

    /**
     * Select a typical dose from the preset
     */
    selectTypicalDose(dose) {
      this.desiredDose = dose.amount;
      this.doseUnit = dose.unit;
      this.showTypicalDoses = false;
    },

    /**
     * Toggle dose unit between mg and mcg
     */
    toggleDoseUnit() {
      if (this.doseUnit === 'mg') {
        this.desiredDose = this.desiredDose * 1000;
        this.doseUnit = 'mcg';
      } else {
        this.desiredDose = this.desiredDose / 1000;
        this.doseUnit = 'mg';
      }
    },

    /**
     * Save current state to localStorage
     */
    saveCurrentState() {
      Storage.saveState({
        selectedPeptideId: this.selectedPeptideId,
        customPeptideName: this.customPeptideName,
        mgInVial: this.mgInVial,
        waterMl: this.waterMl,
        desiredDose: this.desiredDose,
        doseUnit: this.doseUnit,
        syringeSize: this.syringeSize
      });
    },

    /**
     * Restore state from saved data
     */
    restoreState(state) {
      if (state.selectedPeptideId) this.selectedPeptideId = state.selectedPeptideId;
      if (state.customPeptideName) this.customPeptideName = state.customPeptideName;
      if (state.mgInVial) this.mgInVial = state.mgInVial;
      if (state.waterMl) this.waterMl = state.waterMl;
      if (state.desiredDose) this.desiredDose = state.desiredDose;
      if (state.doseUnit) this.doseUnit = state.doseUnit;
      if (state.syringeSize) this.syringeSize = state.syringeSize;
    },

    /**
     * Open save configuration modal
     */
    openSaveModal() {
      const peptideName = this.selectedPeptideId === 'custom'
        ? (this.customPeptideName || 'Custom')
        : this.selectedPeptide.name;
      this.saveConfigName = `${peptideName} - ${this.mgInVial}mg/${this.waterMl}mL`;
      this.showSaveModal = true;
    },

    /**
     * Save current configuration
     */
    saveConfiguration() {
      if (!this.saveConfigName.trim()) return;

      const config = {
        name: this.saveConfigName.trim(),
        peptide: {
          id: this.selectedPeptideId,
          customName: this.customPeptideName
        },
        vial: {
          mgInVial: this.mgInVial,
          waterMl: this.waterMl
        },
        dose: {
          amount: this.desiredDose,
          unit: this.doseUnit,
          syringeSize: this.syringeSize
        }
      };

      Storage.saveConfig(config);
      this.savedConfigs = Storage.getAllConfigs();
      this.showSaveModal = false;
      this.saveConfigName = '';
    },

    /**
     * Load a saved configuration
     */
    loadConfiguration(config) {
      this.selectedPeptideId = config.peptide.id;
      this.customPeptideName = config.peptide.customName || '';
      this.mgInVial = config.vial.mgInVial;
      this.waterMl = config.vial.waterMl;
      this.desiredDose = config.dose.amount;
      this.doseUnit = config.dose.unit;
      this.syringeSize = config.dose.syringeSize;
    },

    /**
     * Delete a saved configuration
     */
    deleteConfiguration(id) {
      if (confirm('Delete this saved configuration?')) {
        Storage.deleteConfig(id);
        this.savedConfigs = Storage.getAllConfigs();
      }
    },

    /**
     * Reset to defaults
     */
    resetToDefaults() {
      this.selectedPeptideId = 'tirzepatide';
      this.onPeptideChange();
      this.syringeSize = '1.0';
    },

    /**
     * Format number for display
     */
    formatNumber(num, decimals = 2) {
      if (num === null || num === undefined) return '-';
      return Number(num).toFixed(decimals);
    }
  };
}

// Make available globally for Alpine.js
window.calculatorApp = calculatorApp;

// Export for potential module use
export { calculatorApp };
