# Peptide Calculator v2 - Guided Experience Plan

## Core Philosophy

**"Right-size the experience"** - First-timers get guidance, experienced users get speed.

## Key Constraints

1. **Optimize for 0.5mL syringes (50 units max)**
   - Target draw volumes: 10-50 units
   - Avoid tiny draws (<5 units) - hard to measure accurately
   - Avoid exceeding 50 units - wrong syringe or need to split dose

2. **Prioritize intuitive concentrations**
   - 5 mg/mL, 10 mg/mL, 20 mg/mL
   - Recommend water amounts that achieve these

3. **Support microdosing / low-and-slow**
   - Reta starting at 0.5mg, increasing by 0.25mg
   - Sema starting at 0.125mg or 0.25mg
   - Tirz at 1.25mg or 2.5mg
   - Need concentrations that make small doses measurable

4. **No prescriptive titration guidance**
   - Show common dose ranges for reference
   - Don't tell them what week they should be on
   - That's between them and their protocol/provider

5. **Two modes: Guided vs Quick**
   - First visit → Guided setup
   - Return visit → Quick calculator with saved defaults

---

## Smart Reconstitution Logic

The key insight: **work backwards from desired dose to recommend water amount.**

```
User has: 10mg vial
User wants: 2.5mg dose (or range of 0.5mg - 5mg during titration)

Goal: Draw volume between 10-50 units on 0.5mL syringe

Calculate:
- At 2mL water → 5mg/mL → 2.5mg = 50 units ✓
- At 2mL water → 5mg/mL → 0.5mg = 10 units ✓ (good for microdosing)
- At 1mL water → 10mg/mL → 2.5mg = 25 units ✓
- At 1mL water → 10mg/mL → 0.5mg = 5 units ⚠️ (getting small)

Recommendation: "For doses between 0.5mg and 5mg, we recommend 2mL of water.
This gives you 5mg/mL concentration and keeps your draws between 10-50 units."
```

### Concentration sweet spots by peptide:

| Peptide | Typical Vial | Dose Range | Recommended Water | Concentration | Units Range |
|---------|--------------|------------|-------------------|---------------|-------------|
| Tirzepatide | 10mg | 1.25-5mg | 2mL | 5 mg/mL | 25-100* |
| Tirzepatide | 10mg | 2.5-10mg | 1mL | 10 mg/mL | 25-100* |
| Tirzepatide | 30mg | 2.5-15mg | 3mL | 10 mg/mL | 25-150* |
| Semaglutide | 5mg | 0.125-1mg | 2mL | 2.5 mg/mL | 5-40 |
| Semaglutide | 5mg | 0.25-2mg | 1mL | 5 mg/mL | 5-40 |
| Retatrutide | 10mg | 0.25-2mg | 2mL | 5 mg/mL | 5-40 |
| Retatrutide | 10mg | 0.5-4mg | 1mL | 10 mg/mL | 5-40 |

*May need 1.0mL syringe for higher doses

---

## Two-Mode Interface

### Mode 1: Guided Setup (First-timers)

**Step 1: What peptide?**
- Card-based selection for common peptides
- Brief one-liner about selected peptide

**Step 2: Vial size**
- Common sizes as buttons
- Custom input option

**Step 3: Dose range**
- Ask about min/max dose range (not single dose)
- Show common ranges for reference (low & slow, standard, maintenance)

**Step 4: Reconstitution recommendation**
- Calculated based on dose range
- Shows concentration and unit ranges
- Option to override

**Step 5: Confirm syringe**
- 0.5mL (50 units) - most common
- 1.0mL (100 units) - for larger doses

**Result: Your Setup + Calculator**
- Saved setup summary
- Dose input with syringe visualization
- Quick dose buttons
- Vial details (doses remaining, concentration)

### Mode 2: Quick Calculator (Experienced Users)

Single compact view - everything on one screen:
- Dropdown for saved setups
- Dose input
- Large result display
- Syringe visualization
- Key stats inline

---

## State Management

```javascript
{
  // Has user completed guided setup?
  hasCompletedSetup: true,

  // Saved setups (can have multiple)
  setups: [
    {
      id: "abc123",
      name: "Tirz 10mg/2mL",
      peptide: "tirzepatide",
      vialMg: 10,
      waterMl: 2,
      syringeSize: "0.5",
      createdAt: "2024-01-15"
    }
  ],

  // Last used values (for quick calc)
  lastUsed: {
    setupId: "abc123",
    vialMg: 10,
    waterMl: 2,
    doseMg: 2.5,
    syringeSize: "0.5"
  }
}
```

---

## Peptide Data

```javascript
const PEPTIDES = {
  tirzepatide: {
    name: "Tirzepatide",
    aliases: ["Mounjaro", "Zepbound"],
    category: "GLP-1/GIP",
    commonVials: [5, 10, 15, 30],
    doseRanges: {
      microDose: { min: 0.5, max: 2.5, label: "Low & slow" },
      standard: { min: 2.5, max: 7.5, label: "Standard titration" },
      maintenance: { min: 5, max: 15, label: "Maintenance" }
    },
    quickDoses: [1.25, 2.5, 5, 7.5, 10],
    unit: "mg"
  },
  semaglutide: {
    name: "Semaglutide",
    aliases: ["Ozempic", "Wegovy"],
    category: "GLP-1",
    commonVials: [3, 5, 10],
    doseRanges: {
      microDose: { min: 0.125, max: 0.5, label: "Low & slow" },
      standard: { min: 0.25, max: 1, label: "Standard titration" },
      maintenance: { min: 0.5, max: 2.4, label: "Maintenance" }
    },
    quickDoses: [0.25, 0.5, 1, 1.7, 2.4],
    unit: "mg"
  },
  retatrutide: {
    name: "Retatrutide",
    aliases: [],
    category: "GLP-1/GIP/Glucagon",
    commonVials: [5, 10, 15],
    doseRanges: {
      microDose: { min: 0.25, max: 1, label: "Low & slow" },
      standard: { min: 1, max: 4, label: "Standard titration" },
      maintenance: { min: 4, max: 12, label: "Maintenance" }
    },
    quickDoses: [0.5, 1, 2, 4, 8],
    unit: "mg"
  }
}
```

---

## Tech Stack

- **Alpine.js** - Lightweight reactivity
- **Tailwind CSS (CDN)** - Fast styling, no build
- **localStorage** - Persistence
- **Vanilla JS** - Calculations

---

## Visual Design Direction

- **Clean and clinical** - Inspires confidence
- **Not sterile** - Warm enough to feel approachable
- **High contrast** - Easy to read, especially the key number
- **Clear visual hierarchy** - The "units to draw" number is the hero
- **Syringe visualization** - Simple, accurate, unmistakable

---

## What's NOT in v1

- Titration schedules/tracking
- Injection site rotation
- Vial expiration tracking
- Multiple active vials
- Sharing/export
