/**
 * SVG Syringe Visualization Generator
 * Creates an interactive syringe graphic with fill level and dose indicator
 */

/**
 * Generate tick marks for the syringe barrel
 * @param {number} barrelX - X position of barrel start
 * @param {number} barrelY - Y position of barrel
 * @param {number} barrelLength - Length of barrel
 * @param {number} barrelHeight - Height of barrel
 * @param {number} totalUnits - Total units on syringe
 * @param {number} majorInterval - Interval for major tick marks
 * @returns {string} SVG elements for tick marks
 */
function generateTickMarks(barrelX, barrelY, barrelLength, barrelHeight, totalUnits, majorInterval) {
  let marks = '';
  const unitWidth = barrelLength / totalUnits;

  for (let i = 0; i <= totalUnits; i++) {
    const x = barrelX + (i * unitWidth);
    const isMajor = i % majorInterval === 0;
    const tickHeight = isMajor ? 10 : 5;

    // Tick mark (below barrel)
    marks += `<line x1="${x}" y1="${barrelY + barrelHeight}"
                    x2="${x}" y2="${barrelY + barrelHeight + tickHeight}"
                    stroke="#4B5563" stroke-width="${isMajor ? 1.5 : 0.75}"/>`;

    // Label for major ticks
    if (isMajor) {
      marks += `<text x="${x}" y="${barrelY + barrelHeight + 22}"
                      text-anchor="middle" fill="#374151"
                      font-size="11" font-weight="500" font-family="system-ui, sans-serif">
                  ${i}
                </text>`;
    }
  }

  return marks;
}

/**
 * Generate the complete SVG syringe visualization
 * @param {string} syringeType - '0.5' or '1.0' for syringe size
 * @param {number} fillPercentage - 0-100 percentage of syringe filled
 * @param {number} targetUnits - The target units to draw (for indicator)
 * @returns {string} Complete SVG markup
 */
function generateSyringeSVG(syringeType, fillPercentage, targetUnits) {
  const isHalfMl = syringeType === '0.5';
  const totalUnits = isHalfMl ? 50 : 100;
  const majorTickInterval = isHalfMl ? 5 : 10;

  // SVG dimensions
  const width = 340;
  const height = 100;
  const barrelLength = 240;
  const barrelHeight = 32;
  const barrelX = 50;
  const barrelY = 20;

  // Calculate fill width (clamped to barrel length)
  const clampedFill = Math.min(Math.max(fillPercentage, 0), 100);
  const fillWidth = (clampedFill / 100) * barrelLength;

  // Calculate dose indicator position
  const indicatorX = barrelX + fillWidth;

  // Determine if fill exceeds syringe
  const exceedsSyringe = fillPercentage > 100;

  return `
    <svg viewBox="0 0 ${width} ${height}" class="syringe-svg w-full" role="img" aria-label="Syringe showing ${targetUnits || 0} units">
      <defs>
        <!-- Gradient for liquid fill -->
        <linearGradient id="liquidFill" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:#93C5FD;stop-opacity:0.95" />
          <stop offset="50%" style="stop-color:#3B82F6;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#1D4ED8;stop-opacity:0.95" />
        </linearGradient>

        <!-- Warning gradient for overflow -->
        <linearGradient id="warningFill" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:#FCA5A5;stop-opacity:0.95" />
          <stop offset="50%" style="stop-color:#EF4444;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#DC2626;stop-opacity:0.95" />
        </linearGradient>

        <!-- Gradient for syringe barrel -->
        <linearGradient id="barrelGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:#FFFFFF" />
          <stop offset="30%" style="stop-color:#F9FAFB" />
          <stop offset="70%" style="stop-color:#F3F4F6" />
          <stop offset="100%" style="stop-color:#E5E7EB" />
        </linearGradient>

        <!-- Plunger gradient -->
        <linearGradient id="plungerGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:#9CA3AF" />
          <stop offset="50%" style="stop-color:#6B7280" />
          <stop offset="100%" style="stop-color:#4B5563" />
        </linearGradient>
      </defs>

      <!-- Plunger handle -->
      <rect x="2" y="${barrelY + 6}" width="8" height="20" rx="2" fill="#4B5563"/>

      <!-- Plunger rod -->
      <rect x="10" y="${barrelY + 10}" width="40" height="12" rx="2" fill="url(#plungerGradient)"/>

      <!-- Barrel (glass/plastic body) -->
      <rect x="${barrelX}" y="${barrelY}" width="${barrelLength}" height="${barrelHeight}"
            rx="4" fill="url(#barrelGradient)" stroke="#D1D5DB" stroke-width="1.5"/>

      <!-- Inner barrel highlight -->
      <rect x="${barrelX + 2}" y="${barrelY + 2}" width="${barrelLength - 4}" height="8"
            rx="2" fill="rgba(255,255,255,0.6)"/>

      <!-- Liquid fill -->
      ${clampedFill > 0 ? `
        <rect x="${barrelX + 3}" y="${barrelY + 3}"
              width="${Math.max(0, fillWidth - 6)}" height="${barrelHeight - 6}"
              rx="2" fill="url(#${exceedsSyringe ? 'warningFill' : 'liquidFill'})"
              class="liquid-fill">
        </rect>
      ` : ''}

      <!-- Needle hub -->
      <polygon points="${barrelX + barrelLength},${barrelY + 6}
                       ${barrelX + barrelLength + 20},${barrelY + 14}
                       ${barrelX + barrelLength + 20},${barrelY + 18}
                       ${barrelX + barrelLength},${barrelY + 26}"
               fill="#E5E7EB" stroke="#9CA3AF" stroke-width="1"/>

      <!-- Needle -->
      <line x1="${barrelX + barrelLength + 20}" y1="${barrelY + 16}"
            x2="${width - 5}" y2="${barrelY + 16}"
            stroke="#9CA3AF" stroke-width="2" stroke-linecap="round"/>
      <line x1="${width - 8}" y1="${barrelY + 16}"
            x2="${width}" y2="${barrelY + 16}"
            stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"/>

      <!-- Tick marks and labels -->
      ${generateTickMarks(barrelX, barrelY, barrelLength, barrelHeight, totalUnits, majorTickInterval)}

      <!-- Dose indicator line (if fill > 0) -->
      ${clampedFill > 0 && targetUnits > 0 ? `
        <line x1="${indicatorX}" y1="${barrelY - 8}"
              x2="${indicatorX}" y2="${barrelY + barrelHeight + 12}"
              stroke="${exceedsSyringe ? '#DC2626' : '#DC2626'}" stroke-width="2.5"
              stroke-linecap="round"/>
        <polygon points="${indicatorX - 6},${barrelY - 8} ${indicatorX + 6},${barrelY - 8} ${indicatorX},${barrelY - 2}"
                 fill="#DC2626"/>
      ` : ''}
    </svg>
  `;
}

/**
 * Generate a compact syringe label showing the target
 * @param {number} units - Target units
 * @param {number} ml - Target mL
 * @param {boolean} exceedsSyringe - Whether dose exceeds syringe capacity
 * @returns {string} HTML for label
 */
function generateSyringeLabel(units, ml, exceedsSyringe) {
  if (exceedsSyringe) {
    return `<span class="text-red-600 font-bold">Exceeds syringe capacity!</span>`;
  }
  if (!units || units <= 0) {
    return `<span class="text-gray-400">Enter values to calculate</span>`;
  }
  return `Draw to <span class="font-bold text-blue-600">${units} units</span> <span class="text-gray-500">(${ml} mL)</span>`;
}

// Export for ES modules
export { generateSyringeSVG, generateSyringeLabel };
