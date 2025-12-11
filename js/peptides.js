/**
 * Peptide Preset Data
 * Contains common peptides with typical vial sizes and dosing information
 */

const PEPTIDE_PRESETS = {
  tirzepatide: {
    id: 'tirzepatide',
    name: 'Tirzepatide',
    brandNames: 'Mounjaro, Zepbound',
    category: 'GLP-1/GIP Agonist',
    commonVialSizes: [5, 10, 15, 30],
    defaultVialMg: 10,
    defaultWaterMl: 2,
    typicalDoses: [
      { amount: 2.5, unit: 'mg', label: 'Starting dose (weeks 1-4)' },
      { amount: 5, unit: 'mg', label: 'Week 5-8' },
      { amount: 7.5, unit: 'mg', label: 'Week 9-12' },
      { amount: 10, unit: 'mg', label: 'Week 13-16' },
      { amount: 12.5, unit: 'mg', label: 'Week 17-20' },
      { amount: 15, unit: 'mg', label: 'Maximum dose' }
    ],
    defaultDose: 2.5,
    defaultDoseUnit: 'mg',
    frequency: 'Once weekly',
    notes: 'Titrate up every 4 weeks as tolerated. Inject subcutaneously in abdomen, thigh, or upper arm.',
    color: '#4F46E5'
  },

  semaglutide: {
    id: 'semaglutide',
    name: 'Semaglutide',
    brandNames: 'Ozempic, Wegovy',
    category: 'GLP-1 Agonist',
    commonVialSizes: [3, 5, 10],
    defaultVialMg: 5,
    defaultWaterMl: 2,
    typicalDoses: [
      { amount: 0.25, unit: 'mg', label: 'Week 1-4' },
      { amount: 0.5, unit: 'mg', label: 'Week 5-8' },
      { amount: 1, unit: 'mg', label: 'Week 9-12' },
      { amount: 1.7, unit: 'mg', label: 'Week 13-16 (Wegovy)' },
      { amount: 2.4, unit: 'mg', label: 'Maximum (Wegovy)' }
    ],
    defaultDose: 0.25,
    defaultDoseUnit: 'mg',
    frequency: 'Once weekly',
    notes: 'Start low and increase monthly. Inject subcutaneously.',
    color: '#059669'
  },

  retatrutide: {
    id: 'retatrutide',
    name: 'Retatrutide',
    brandNames: 'Investigational',
    category: 'GLP-1/GIP/Glucagon Triple Agonist',
    commonVialSizes: [5, 10, 15],
    defaultVialMg: 10,
    defaultWaterMl: 2,
    typicalDoses: [
      { amount: 1, unit: 'mg', label: 'Starting dose' },
      { amount: 2, unit: 'mg', label: 'Week 5-8' },
      { amount: 4, unit: 'mg', label: 'Week 9-12' },
      { amount: 8, unit: 'mg', label: 'Week 17-24' },
      { amount: 12, unit: 'mg', label: 'Maximum studied' }
    ],
    defaultDose: 1,
    defaultDoseUnit: 'mg',
    frequency: 'Once weekly',
    notes: 'Triple-agonist peptide. Titrate slowly every 4 weeks.',
    color: '#DC2626'
  },

  bpc157: {
    id: 'bpc157',
    name: 'BPC-157',
    brandNames: 'Body Protection Compound',
    category: 'Healing Peptide',
    commonVialSizes: [5, 10],
    defaultVialMg: 5,
    defaultWaterMl: 2,
    typicalDoses: [
      { amount: 250, unit: 'mcg', label: 'Low dose' },
      { amount: 500, unit: 'mcg', label: 'Standard dose' },
      { amount: 750, unit: 'mcg', label: 'Higher dose' }
    ],
    defaultDose: 250,
    defaultDoseUnit: 'mcg',
    frequency: 'Once or twice daily',
    notes: 'Often dosed 1-2x daily. Can inject near injury site or subcutaneously.',
    color: '#7C3AED'
  },

  tb500: {
    id: 'tb500',
    name: 'TB-500',
    brandNames: 'Thymosin Beta-4',
    category: 'Healing Peptide',
    commonVialSizes: [2, 5, 10],
    defaultVialMg: 5,
    defaultWaterMl: 2,
    typicalDoses: [
      { amount: 2, unit: 'mg', label: 'Maintenance' },
      { amount: 2.5, unit: 'mg', label: 'Loading (2x/week)' },
      { amount: 5, unit: 'mg', label: 'Loading (1x/week)' }
    ],
    defaultDose: 2.5,
    defaultDoseUnit: 'mg',
    frequency: '1-2x weekly',
    notes: 'Loading phase: 2x/week for 4-6 weeks, then maintenance 1x/week.',
    color: '#0891B2'
  },

  ipamorelin: {
    id: 'ipamorelin',
    name: 'Ipamorelin',
    brandNames: '',
    category: 'Growth Hormone Secretagogue',
    commonVialSizes: [2, 5],
    defaultVialMg: 5,
    defaultWaterMl: 2,
    typicalDoses: [
      { amount: 100, unit: 'mcg', label: 'Low dose' },
      { amount: 200, unit: 'mcg', label: 'Standard dose' },
      { amount: 300, unit: 'mcg', label: 'Higher dose' }
    ],
    defaultDose: 200,
    defaultDoseUnit: 'mcg',
    frequency: '2-3x daily',
    notes: 'Often combined with CJC-1295 no DAC. Best taken on empty stomach.',
    color: '#BE185D'
  },

  cjc1295dac: {
    id: 'cjc1295dac',
    name: 'CJC-1295 with DAC',
    brandNames: '',
    category: 'Growth Hormone Releasing Hormone',
    commonVialSizes: [2, 5],
    defaultVialMg: 2,
    defaultWaterMl: 2,
    typicalDoses: [
      { amount: 1, unit: 'mg', label: 'Standard (1-2x/week)' },
      { amount: 2, unit: 'mg', label: 'Higher dose' }
    ],
    defaultDose: 1,
    defaultDoseUnit: 'mg',
    frequency: '1-2x weekly',
    notes: 'Long-acting due to DAC modification. Once or twice weekly dosing.',
    color: '#EA580C'
  },

  ghkcu: {
    id: 'ghkcu',
    name: 'GHK-Cu',
    brandNames: 'Copper Peptide',
    category: 'Healing/Anti-aging Peptide',
    commonVialSizes: [50, 100],
    defaultVialMg: 50,
    defaultWaterMl: 5,
    typicalDoses: [
      { amount: 1, unit: 'mg', label: 'Standard dose' },
      { amount: 2, unit: 'mg', label: 'Higher dose' }
    ],
    defaultDose: 1,
    defaultDoseUnit: 'mg',
    frequency: 'Daily',
    notes: 'Can be used topically or via injection. Often used for skin/hair.',
    color: '#CA8A04'
  },

  custom: {
    id: 'custom',
    name: 'Custom Peptide',
    brandNames: '',
    category: 'User Defined',
    commonVialSizes: [],
    defaultVialMg: 5,
    defaultWaterMl: 2,
    typicalDoses: [],
    defaultDose: 1,
    defaultDoseUnit: 'mg',
    frequency: '',
    notes: 'Enter your own values for custom peptides.',
    color: '#6B7280'
  }
};

/**
 * Syringe specifications
 */
const SYRINGE_SPECS = {
  '0.5': {
    id: '0.5',
    label: '0.5 mL (50 units)',
    totalMl: 0.5,
    totalUnits: 50,
    majorTickEvery: 5,
    minorTickEvery: 1,
    unitToMl: 0.01,
    description: 'Standard insulin syringe, 50 units total'
  },
  '1.0': {
    id: '1.0',
    label: '1.0 mL (100 units)',
    totalMl: 1.0,
    totalUnits: 100,
    majorTickEvery: 10,
    minorTickEvery: 2,
    unitToMl: 0.01,
    description: 'Standard insulin syringe, 100 units total'
  }
};

/**
 * Get peptide preset by ID
 * @param {string} id - Peptide ID
 * @returns {object|null} Peptide preset
 */
function getPeptideById(id) {
  return PEPTIDE_PRESETS[id] || null;
}

/**
 * Get all peptide presets as array (excluding custom)
 * @returns {array} Array of peptide presets
 */
function getAllPeptides() {
  return Object.values(PEPTIDE_PRESETS).filter(p => p.id !== 'custom');
}

/**
 * Get syringe spec by ID
 * @param {string} id - Syringe ID ('0.5' or '1.0')
 * @returns {object} Syringe specification
 */
function getSyringeSpec(id) {
  return SYRINGE_SPECS[id] || SYRINGE_SPECS['1.0'];
}

// Export for ES modules
export {
  PEPTIDE_PRESETS,
  SYRINGE_SPECS,
  getPeptideById,
  getAllPeptides,
  getSyringeSpec
};
