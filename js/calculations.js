/**
 * Peptide Dilution Calculator - Core Calculation Functions
 * All functions are pure - no side effects
 */

/**
 * Round to specified decimal places
 * @param {number} value - Value to round
 * @param {number} decimals - Number of decimal places
 * @returns {number} Rounded value
 */
function round(value, decimals) {
  return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
}

/**
 * Calculate concentration after reconstitution
 * @param {number} peptideMg - Amount of peptide in vial (mg)
 * @param {number} waterMl - Amount of bacteriostatic water (mL)
 * @returns {object|null} Concentration in various units
 */
function calculateConcentration(peptideMg, waterMl) {
  if (!peptideMg || !waterMl || waterMl <= 0 || peptideMg <= 0) {
    return null;
  }

  const mgPerMl = peptideMg / waterMl;
  const mcgPerMl = mgPerMl * 1000;
  const mcgPerUnit = mcgPerMl / 100;  // 100 units = 1 mL
  const mgPerUnit = mgPerMl / 100;

  return {
    mgPerMl: round(mgPerMl, 4),
    mcgPerMl: round(mcgPerMl, 2),
    mcgPerUnit: round(mcgPerUnit, 4),
    mgPerUnit: round(mgPerUnit, 6)
  };
}

/**
 * Calculate draw volume for a desired dose
 * @param {number} desiredDose - Desired dose amount
 * @param {string} doseUnit - 'mg' or 'mcg'
 * @param {object} concentration - Output from calculateConcentration
 * @param {object} syringeSpec - Syringe specification object
 * @returns {object|null} Draw volume in units and mL
 */
function calculateDrawVolume(desiredDose, doseUnit, concentration, syringeSpec) {
  if (!concentration || !desiredDose || desiredDose <= 0) {
    return null;
  }

  // Convert dose to mcg for consistency
  const doseMcg = doseUnit === 'mg' ? desiredDose * 1000 : desiredDose;

  // Calculate required mL
  const requiredMl = doseMcg / concentration.mcgPerMl;

  // Convert to units (100 units = 1 mL)
  const requiredUnits = requiredMl * 100;

  // Calculate fill percentage for visualization
  const fillPercentage = (requiredUnits / syringeSpec.totalUnits) * 100;

  // Check if dose exceeds syringe capacity
  const exceedsSyringe = requiredUnits > syringeSpec.totalUnits;

  return {
    units: round(requiredUnits, 1),
    ml: round(requiredMl, 3),
    fillPercentage: Math.min(fillPercentage, 100),
    exceedsSyringe,
    doseMcg: round(doseMcg, 2),
    doseMg: round(doseMcg / 1000, 4)
  };
}

/**
 * Calculate how many doses are in a vial
 * @param {number} peptideMg - Total peptide in vial (mg)
 * @param {number} desiredDose - Desired dose per injection
 * @param {string} doseUnit - 'mg' or 'mcg'
 * @returns {object|null} Doses per vial info
 */
function calculateDosesPerVial(peptideMg, desiredDose, doseUnit) {
  if (!peptideMg || !desiredDose || peptideMg <= 0 || desiredDose <= 0) {
    return null;
  }

  // Convert to same unit (mg)
  const doseMg = doseUnit === 'mcg' ? desiredDose / 1000 : desiredDose;

  const totalDoses = peptideMg / doseMg;

  return {
    fullDoses: Math.floor(totalDoses),
    exactDoses: round(totalDoses, 2),
    remainderMg: round(peptideMg % doseMg, 4)
  };
}

/**
 * Validate inputs and return any warnings/errors
 * @param {number} peptideMg - Peptide amount in mg
 * @param {number} waterMl - Water amount in mL
 * @param {number} desiredDose - Desired dose
 * @param {string} doseUnit - 'mg' or 'mcg'
 * @param {object} syringeSpec - Syringe specification
 * @returns {object} Validation result with warnings and errors
 */
function validateInputs(peptideMg, waterMl, desiredDose, doseUnit, syringeSpec) {
  const warnings = [];
  const errors = [];

  if (!peptideMg || peptideMg <= 0) {
    errors.push('Peptide amount must be greater than 0');
  }
  if (!waterMl || waterMl <= 0) {
    errors.push('Water amount must be greater than 0');
  }
  if (!desiredDose || desiredDose <= 0) {
    errors.push('Desired dose must be greater than 0');
  }

  // Only check warnings if basic validation passes
  if (errors.length === 0) {
    const concentration = calculateConcentration(peptideMg, waterMl);

    // Check for very high concentration (hard to measure small doses)
    if (concentration && concentration.mgPerMl > 10) {
      warnings.push('High concentration - consider using more water for easier dosing');
    }

    // Check for very low concentration
    if (concentration && concentration.mgPerMl < 0.5) {
      warnings.push('Low concentration - may require larger injection volumes');
    }

    // Check if dose would require very small volume
    if (concentration) {
      const drawVol = calculateDrawVolume(desiredDose, doseUnit, concentration, syringeSpec);
      if (drawVol && drawVol.units < 3) {
        warnings.push('Very small volume (< 3 units) - difficult to measure accurately');
      }
      if (drawVol && drawVol.exceedsSyringe) {
        errors.push(`Dose requires ${drawVol.units} units but syringe holds ${syringeSpec.totalUnits} units. Use a larger syringe or split the dose.`);
      }
    }
  }

  return {
    warnings,
    errors,
    isValid: errors.length === 0,
    hasWarnings: warnings.length > 0
  };
}

// Export for ES modules (used by app.js)
export {
  calculateConcentration,
  calculateDrawVolume,
  calculateDosesPerVial,
  validateInputs,
  round
};
