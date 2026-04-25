import { type Category } from './units';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface CalcInput {
  id: string;
  label: string;
  unit: string;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  /** Pre-filled default value shown in the input */
  defaultValue?: number;
  /**
   * When set, a unit selector dropdown is rendered next to this input.
   * The entered value is automatically converted to `convertBaseKey` before
   * being passed to `compute()`, so the formula logic never changes.
   */
  convertCategory?: Category;
  /** The unit key that `compute()` expects. Must exist in CATEGORIES[convertCategory].units. */
  convertBaseKey?: string;
}

export interface Formula {
  id: string;
  name: string;
  /** LaTeX-like expression shown above inputs, e.g. "P = 2(l + w)" */
  expression: string;
  inputs: CalcInput[];
  outputLabel: string;
  outputUnit: string;
  compute: (v: Record<string, number>) => number | null;
}

// ── Helper: returns an array of values only if ALL keys exist and are finite ──

function vals(v: Record<string, number>, ...keys: string[]): number[] | null {
  const result = keys.map((k) => v[k]);
  if (result.some((x) => x === undefined || !isFinite(x))) return null;
  return result;
}

const PI = Math.PI;
const DEG = PI / 180; // degrees → radians multiplier

// ── Formulas per category ─────────────────────────────────────────────────────

export const CALCULATIONS: Partial<Record<Category, Formula[]>> = {

  // ── LENGTH ──────────────────────────────────────────────────────────────────
  length: [
    {
      id: 'hypotenuse',
      name: 'Hypotenuse',
      expression: 'c = √(a² + b²)',
      inputs: [
        { id: 'a', label: 'Side a', unit: 'm', placeholder: '3', min: 0, convertCategory: 'length', convertBaseKey: 'm' },
        { id: 'b', label: 'Side b', unit: 'm', placeholder: '4', min: 0, convertCategory: 'length', convertBaseKey: 'm' },
      ],
      outputLabel: 'Hypotenuse c', outputUnit: 'm',
      compute: (v) => { const r = vals(v, 'a', 'b'); return r ? Math.sqrt(r[0] ** 2 + r[1] ** 2) : null; },
    },
    {
      id: 'rect-perimeter',
      name: 'Rectangle Perimeter',
      expression: 'P = 2 × (l + w)',
      inputs: [
        { id: 'l', label: 'Length', unit: 'm', placeholder: '5', min: 0, convertCategory: 'length', convertBaseKey: 'm' },
        { id: 'w', label: 'Width',  unit: 'm', placeholder: '3', min: 0, convertCategory: 'length', convertBaseKey: 'm' },
      ],
      outputLabel: 'Perimeter', outputUnit: 'm',
      compute: (v) => { const r = vals(v, 'l', 'w'); return r ? 2 * (r[0] + r[1]) : null; },
    },
    {
      id: 'circle-circumference',
      name: 'Circle Circumference',
      expression: 'C = 2πr',
      inputs: [
        { id: 'r', label: 'Radius', unit: 'm', placeholder: '5', min: 0, convertCategory: 'length', convertBaseKey: 'm' },
      ],
      outputLabel: 'Circumference', outputUnit: 'm',
      compute: (v) => { const r = vals(v, 'r'); return r ? 2 * PI * r[0] : null; },
    },
    {
      id: 'distance-speed-time',
      name: 'Distance = Speed × Time',
      expression: 'd = v × t',
      inputs: [
        { id: 'v', label: 'Speed', unit: 'm/s', placeholder: '10', min: 0, convertCategory: 'speed', convertBaseKey: 'm/s' },
        { id: 't', label: 'Time',  unit: 's',   placeholder: '60', min: 0, convertCategory: 'time',  convertBaseKey: 's' },
      ],
      outputLabel: 'Distance', outputUnit: 'm',
      compute: (v) => { const r = vals(v, 'v', 't'); return r ? r[0] * r[1] : null; },
    },
  ],

  // ── AREA ────────────────────────────────────────────────────────────────────
  area: [
    {
      id: 'rect-area',
      name: 'Rectangle',
      expression: 'A = l × w',
      inputs: [
        { id: 'l', label: 'Length', unit: 'm', placeholder: '5', min: 0, convertCategory: 'length', convertBaseKey: 'm' },
        { id: 'w', label: 'Width',  unit: 'm', placeholder: '3', min: 0, convertCategory: 'length', convertBaseKey: 'm' },
      ],
      outputLabel: 'Area', outputUnit: 'm²',
      compute: (v) => { const r = vals(v, 'l', 'w'); return r ? r[0] * r[1] : null; },
    },
    {
      id: 'circle-area',
      name: 'Circle',
      expression: 'A = πr²',
      inputs: [
        { id: 'r', label: 'Radius', unit: 'm', placeholder: '5', min: 0, convertCategory: 'length', convertBaseKey: 'm' },
      ],
      outputLabel: 'Area', outputUnit: 'm²',
      compute: (v) => { const r = vals(v, 'r'); return r ? PI * r[0] ** 2 : null; },
    },
    {
      id: 'triangle-area',
      name: 'Triangle',
      expression: 'A = ½ × b × h',
      inputs: [
        { id: 'b', label: 'Base',   unit: 'm', placeholder: '6', min: 0, convertCategory: 'length', convertBaseKey: 'm' },
        { id: 'h', label: 'Height', unit: 'm', placeholder: '4', min: 0, convertCategory: 'length', convertBaseKey: 'm' },
      ],
      outputLabel: 'Area', outputUnit: 'm²',
      compute: (v) => { const r = vals(v, 'b', 'h'); return r ? 0.5 * r[0] * r[1] : null; },
    },
    {
      id: 'trapezoid-area',
      name: 'Trapezoid',
      expression: 'A = ½(a + b) × h',
      inputs: [
        { id: 'a', label: 'Parallel side a', unit: 'm', placeholder: '5', min: 0, convertCategory: 'length', convertBaseKey: 'm' },
        { id: 'b', label: 'Parallel side b', unit: 'm', placeholder: '3', min: 0, convertCategory: 'length', convertBaseKey: 'm' },
        { id: 'h', label: 'Height',          unit: 'm', placeholder: '4', min: 0, convertCategory: 'length', convertBaseKey: 'm' },
      ],
      outputLabel: 'Area', outputUnit: 'm²',
      compute: (v) => { const r = vals(v, 'a', 'b', 'h'); return r ? 0.5 * (r[0] + r[1]) * r[2] : null; },
    },
    {
      id: 'ellipse-area',
      name: 'Ellipse',
      expression: 'A = π × a × b',
      inputs: [
        { id: 'a', label: 'Semi-axis a', unit: 'm', placeholder: '5', min: 0, convertCategory: 'length', convertBaseKey: 'm' },
        { id: 'b', label: 'Semi-axis b', unit: 'm', placeholder: '3', min: 0, convertCategory: 'length', convertBaseKey: 'm' },
      ],
      outputLabel: 'Area', outputUnit: 'm²',
      compute: (v) => { const r = vals(v, 'a', 'b'); return r ? PI * r[0] * r[1] : null; },
    },
  ],

  // ── VOLUME ──────────────────────────────────────────────────────────────────
  volume: [
    {
      id: 'box-volume',
      name: 'Rectangular Box',
      expression: 'V = l × w × h',
      inputs: [
        { id: 'l', label: 'Length', unit: 'm', placeholder: '5', min: 0, convertCategory: 'length', convertBaseKey: 'm' },
        { id: 'w', label: 'Width',  unit: 'm', placeholder: '3', min: 0, convertCategory: 'length', convertBaseKey: 'm' },
        { id: 'h', label: 'Height', unit: 'm', placeholder: '2', min: 0, convertCategory: 'length', convertBaseKey: 'm' },
      ],
      outputLabel: 'Volume', outputUnit: 'm³',
      compute: (v) => { const r = vals(v, 'l', 'w', 'h'); return r ? r[0] * r[1] * r[2] : null; },
    },
    {
      id: 'cylinder-volume',
      name: 'Cylinder',
      expression: 'V = πr²h',
      inputs: [
        { id: 'r', label: 'Radius', unit: 'm', placeholder: '2', min: 0, convertCategory: 'length', convertBaseKey: 'm' },
        { id: 'h', label: 'Height', unit: 'm', placeholder: '5', min: 0, convertCategory: 'length', convertBaseKey: 'm' },
      ],
      outputLabel: 'Volume', outputUnit: 'm³',
      compute: (v) => { const r = vals(v, 'r', 'h'); return r ? PI * r[0] ** 2 * r[1] : null; },
    },
    {
      id: 'sphere-volume',
      name: 'Sphere',
      expression: 'V = (4/3)πr³',
      inputs: [
        { id: 'r', label: 'Radius', unit: 'm', placeholder: '3', min: 0, convertCategory: 'length', convertBaseKey: 'm' },
      ],
      outputLabel: 'Volume', outputUnit: 'm³',
      compute: (v) => { const r = vals(v, 'r'); return r ? (4 / 3) * PI * r[0] ** 3 : null; },
    },
    {
      id: 'cone-volume',
      name: 'Cone',
      expression: 'V = ⅓πr²h',
      inputs: [
        { id: 'r', label: 'Radius', unit: 'm', placeholder: '2', min: 0, convertCategory: 'length', convertBaseKey: 'm' },
        { id: 'h', label: 'Height', unit: 'm', placeholder: '5', min: 0, convertCategory: 'length', convertBaseKey: 'm' },
      ],
      outputLabel: 'Volume', outputUnit: 'm³',
      compute: (v) => { const r = vals(v, 'r', 'h'); return r ? (1 / 3) * PI * r[0] ** 2 * r[1] : null; },
    },
    {
      id: 'pyramid-volume',
      name: 'Square Pyramid',
      expression: 'V = ⅓ × b² × h',
      inputs: [
        { id: 'b', label: 'Base side', unit: 'm', placeholder: '4', min: 0, convertCategory: 'length', convertBaseKey: 'm' },
        { id: 'h', label: 'Height',    unit: 'm', placeholder: '6', min: 0, convertCategory: 'length', convertBaseKey: 'm' },
      ],
      outputLabel: 'Volume', outputUnit: 'm³',
      compute: (v) => { const r = vals(v, 'b', 'h'); return r ? (1 / 3) * r[0] ** 2 * r[1] : null; },
    },
  ],

  // ── WEIGHT ──────────────────────────────────────────────────────────────────
  weight: [
    {
      id: 'bmi',
      name: 'Body Mass Index (BMI)',
      expression: 'BMI = mass / height²',
      inputs: [
        { id: 'm', label: 'Mass',   unit: 'kg', placeholder: '70',   min: 0, convertCategory: 'weight', convertBaseKey: 'kg' },
        { id: 'h', label: 'Height', unit: 'm',  placeholder: '1.75', min: 0, step: 0.01, convertCategory: 'length', convertBaseKey: 'm' },
      ],
      outputLabel: 'BMI', outputUnit: 'kg/m²',
      compute: (v) => { const r = vals(v, 'm', 'h'); return r && r[1] > 0 ? r[0] / r[1] ** 2 : null; },
    },
    {
      id: 'weight-force',
      name: 'Weight Force',
      expression: 'W = m × g',
      inputs: [
        { id: 'm', label: 'Mass',    unit: 'kg',   placeholder: '70',   min: 0, convertCategory: 'weight', convertBaseKey: 'kg' },
        { id: 'g', label: 'Gravity', unit: 'm/s²', placeholder: '9.81', min: 0, step: 0.01, defaultValue: 9.81 },
      ],
      outputLabel: 'Weight force', outputUnit: 'N',
      compute: (v) => { const r = vals(v, 'm', 'g'); return r ? r[0] * r[1] : null; },
    },
    {
      id: 'density',
      name: 'Density',
      expression: 'ρ = m / V',
      inputs: [
        { id: 'm', label: 'Mass',   unit: 'kg', placeholder: '500',  min: 0, convertCategory: 'weight', convertBaseKey: 'kg' },
        { id: 'V', label: 'Volume', unit: 'm³', placeholder: '0.5',  min: 0, step: 0.001, convertCategory: 'volume', convertBaseKey: 'm³' },
      ],
      outputLabel: 'Density', outputUnit: 'kg/m³',
      compute: (v) => { const r = vals(v, 'm', 'V'); return r && r[1] > 0 ? r[0] / r[1] : null; },
    },
    {
      id: 'ideal-weight',
      name: 'Ideal Weight (Devine)',
      expression: 'men: 50 + 2.3×(in − 60)   women: 45.5 + 2.3×(in − 60)',
      inputs: [
        { id: 'h', label: 'Height', unit: 'cm', placeholder: '175', min: 0 },
        { id: 's', label: 'Sex (0=male, 1=female)', unit: '', placeholder: '0', min: 0, max: 1, step: 1, defaultValue: 0 },
      ],
      outputLabel: 'Ideal weight', outputUnit: 'kg',
      compute: (v) => {
        const r = vals(v, 'h', 's');
        if (!r) return null;
        const inches = r[0] / 2.54;
        const base = r[1] >= 0.5 ? 45.5 : 50;
        return Math.max(0, base + 2.3 * (inches - 60));
      },
    },
  ],

  // ── TEMPERATURE ─────────────────────────────────────────────────────────────
  temperature: [
    {
      id: 'heat-energy',
      name: 'Heat Energy',
      expression: 'Q = m × c × ΔT',
      inputs: [
        { id: 'm',  label: 'Mass',            unit: 'kg',     placeholder: '1',    min: 0, convertCategory: 'weight', convertBaseKey: 'kg' },
        { id: 'c',  label: 'Specific heat',   unit: 'J/kg·K', placeholder: '4186', min: 0, defaultValue: 4186 },
        { id: 'dT', label: 'Temp. change ΔT', unit: '°C',    placeholder: '10' },
      ],
      outputLabel: 'Heat energy Q', outputUnit: 'J',
      compute: (v) => { const r = vals(v, 'm', 'c', 'dT'); return r ? r[0] * r[1] * r[2] : null; },
    },
    {
      id: 'thermal-expansion',
      name: 'Linear Thermal Expansion',
      expression: 'ΔL = L₀ × α × ΔT',
      inputs: [
        { id: 'L', label: 'Original length L₀', unit: 'm',    placeholder: '10',       min: 0, convertCategory: 'length', convertBaseKey: 'm' },
        { id: 'a', label: 'Coefficient α',       unit: '1/°C', placeholder: '0.000012', step: 0.0000001 },
        { id: 'd', label: 'Temp. change ΔT',     unit: '°C',   placeholder: '100' },
      ],
      outputLabel: 'Length change ΔL', outputUnit: 'm',
      compute: (v) => { const r = vals(v, 'L', 'a', 'd'); return r ? r[0] * r[1] * r[2] : null; },
    },
    {
      id: 'celsius-to-kelvin',
      name: 'Celsius → Kelvin',
      expression: 'K = °C + 273.15',
      inputs: [
        { id: 'c', label: 'Temperature', unit: '°C', placeholder: '100' },
      ],
      outputLabel: 'Temperature', outputUnit: 'K',
      compute: (v) => { const r = vals(v, 'c'); return r ? r[0] + 273.15 : null; },
    },
  ],

  // ── SPEED ───────────────────────────────────────────────────────────────────
  speed: [
    {
      id: 'find-distance',
      name: 'Find Distance',
      expression: 'd = v × t',
      inputs: [
        { id: 'v', label: 'Speed', unit: 'm/s', placeholder: '10', min: 0, convertCategory: 'speed', convertBaseKey: 'm/s' },
        { id: 't', label: 'Time',  unit: 's',   placeholder: '60', min: 0, convertCategory: 'time',  convertBaseKey: 's' },
      ],
      outputLabel: 'Distance', outputUnit: 'm',
      compute: (v) => { const r = vals(v, 'v', 't'); return r ? r[0] * r[1] : null; },
    },
    {
      id: 'find-speed',
      name: 'Find Speed',
      expression: 'v = d / t',
      inputs: [
        { id: 'd', label: 'Distance', unit: 'm', placeholder: '100', min: 0, convertCategory: 'length', convertBaseKey: 'm' },
        { id: 't', label: 'Time',     unit: 's', placeholder: '10',  min: 0, convertCategory: 'time',   convertBaseKey: 's' },
      ],
      outputLabel: 'Speed', outputUnit: 'm/s',
      compute: (v) => { const r = vals(v, 'd', 't'); return r && r[1] > 0 ? r[0] / r[1] : null; },
    },
    {
      id: 'find-time',
      name: 'Find Time',
      expression: 't = d / v',
      inputs: [
        { id: 'd', label: 'Distance', unit: 'm',   placeholder: '100', min: 0, convertCategory: 'length', convertBaseKey: 'm' },
        { id: 'v', label: 'Speed',    unit: 'm/s', placeholder: '10',  min: 0, convertCategory: 'speed',  convertBaseKey: 'm/s' },
      ],
      outputLabel: 'Time', outputUnit: 's',
      compute: (v) => { const r = vals(v, 'd', 'v'); return r && r[1] > 0 ? r[0] / r[1] : null; },
    },
    {
      id: 'acceleration',
      name: 'Acceleration',
      expression: 'a = (v₂ − v₁) / t',
      inputs: [
        { id: 'v1', label: 'Initial speed v₁', unit: 'm/s', placeholder: '0',  convertCategory: 'speed', convertBaseKey: 'm/s' },
        { id: 'v2', label: 'Final speed v₂',   unit: 'm/s', placeholder: '30', convertCategory: 'speed', convertBaseKey: 'm/s' },
        { id: 't',  label: 'Time',             unit: 's',   placeholder: '10', min: 0, convertCategory: 'time', convertBaseKey: 's' },
      ],
      outputLabel: 'Acceleration', outputUnit: 'm/s²',
      compute: (v) => { const r = vals(v, 'v1', 'v2', 't'); return r && r[2] > 0 ? (r[1] - r[0]) / r[2] : null; },
    },
  ],

  // ── TIME ────────────────────────────────────────────────────────────────────
  time: [
    {
      id: 'hms-to-seconds',
      name: 'h:m:s → Total Seconds',
      expression: 't = h×3600 + m×60 + s',
      inputs: [
        { id: 'h', label: 'Hours',   unit: 'h',   placeholder: '1',  min: 0, step: 1, defaultValue: 0 },
        { id: 'm', label: 'Minutes', unit: 'min', placeholder: '30', min: 0, step: 1, defaultValue: 0 },
        { id: 's', label: 'Seconds', unit: 's',   placeholder: '0',  min: 0, step: 1, defaultValue: 0 },
      ],
      outputLabel: 'Total seconds', outputUnit: 's',
      compute: (v) => { const r = vals(v, 'h', 'm', 's'); return r ? r[0] * 3600 + r[1] * 60 + r[2] : null; },
    },
    {
      id: 'seconds-to-hours',
      name: 'Seconds → Decimal Hours',
      expression: 'h = t(s) / 3600',
      inputs: [
        { id: 's', label: 'Seconds', unit: 's', placeholder: '3661', min: 0, step: 1 },
      ],
      outputLabel: 'Decimal hours', outputUnit: 'h',
      compute: (v) => { const r = vals(v, 's'); return r ? r[0] / 3600 : null; },
    },
    {
      id: 'period-to-freq',
      name: 'Period → Frequency',
      expression: 'f = 1 / T',
      inputs: [
        { id: 'T', label: 'Period', unit: 's', placeholder: '0.02', min: 0, step: 0.001 },
      ],
      outputLabel: 'Frequency', outputUnit: 'Hz',
      compute: (v) => { const r = vals(v, 'T'); return r && r[0] > 0 ? 1 / r[0] : null; },
    },
  ],

  // ── ANGLE ───────────────────────────────────────────────────────────────────
  angle: [
    {
      id: 'trig-functions',
      name: 'Sine / Cosine / Tangent',
      expression: 'sin(θ),  cos(θ),  tan(θ)',
      inputs: [
        { id: 'a', label: 'Angle θ', unit: '°', placeholder: '45' },
      ],
      outputLabel: 'sin(θ)', outputUnit: '',
      compute: (v) => { const r = vals(v, 'a'); return r ? Math.sin(r[0] * DEG) : null; },
    },
    {
      id: 'arc-length',
      name: 'Arc Length',
      expression: 's = r × θ (radians)',
      inputs: [
        { id: 'r', label: 'Radius',  unit: 'm', placeholder: '5', min: 0, convertCategory: 'length', convertBaseKey: 'm' },
        { id: 'a', label: 'Angle θ', unit: '°', placeholder: '90', min: 0 },
      ],
      outputLabel: 'Arc length', outputUnit: 'm',
      compute: (v) => { const r = vals(v, 'r', 'a'); return r ? r[0] * (r[1] * DEG) : null; },
    },
    {
      id: 'missing-angle',
      name: 'Triangle Missing Angle',
      expression: 'C = 180° − A − B',
      inputs: [
        { id: 'A', label: 'Angle A', unit: '°', placeholder: '60', min: 0, max: 180 },
        { id: 'B', label: 'Angle B', unit: '°', placeholder: '70', min: 0, max: 180 },
      ],
      outputLabel: 'Angle C', outputUnit: '°',
      compute: (v) => { const r = vals(v, 'A', 'B'); if (!r) return null; const c = 180 - r[0] - r[1]; return c > 0 ? c : null; },
    },
    {
      id: 'law-of-cosines',
      name: "Law of Cosines — Side c",
      expression: 'c = √(a² + b² − 2ab·cos C)',
      inputs: [
        { id: 'a', label: 'Side a', unit: 'm', placeholder: '5', min: 0, convertCategory: 'length', convertBaseKey: 'm' },
        { id: 'b', label: 'Side b', unit: 'm', placeholder: '7', min: 0, convertCategory: 'length', convertBaseKey: 'm' },
        { id: 'C', label: 'Angle C (between a & b)', unit: '°', placeholder: '60', min: 0, max: 180 },
      ],
      outputLabel: 'Side c', outputUnit: 'm',
      compute: (v) => { const r = vals(v, 'a', 'b', 'C'); return r ? Math.sqrt(r[0] ** 2 + r[1] ** 2 - 2 * r[0] * r[1] * Math.cos(r[2] * DEG)) : null; },
    },
  ],

  // ── FREQUENCY ───────────────────────────────────────────────────────────────
  frequency: [
    {
      id: 'wavelength',
      name: 'Wavelength',
      expression: 'λ = c / f',
      inputs: [
        { id: 'f', label: 'Frequency', unit: 'Hz', placeholder: '440', min: 0 },
      ],
      outputLabel: 'Wavelength λ', outputUnit: 'm',
      compute: (v) => { const r = vals(v, 'f'); return r && r[0] > 0 ? 299_792_458 / r[0] : null; },
    },
    {
      id: 'period',
      name: 'Period',
      expression: 'T = 1 / f',
      inputs: [
        { id: 'f', label: 'Frequency', unit: 'Hz', placeholder: '50', min: 0 },
      ],
      outputLabel: 'Period T', outputUnit: 's',
      compute: (v) => { const r = vals(v, 'f'); return r && r[0] > 0 ? 1 / r[0] : null; },
    },
    {
      id: 'angular-freq',
      name: 'Angular Frequency',
      expression: 'ω = 2πf',
      inputs: [
        { id: 'f', label: 'Frequency', unit: 'Hz', placeholder: '50', min: 0 },
      ],
      outputLabel: 'Angular frequency ω', outputUnit: 'rad/s',
      compute: (v) => { const r = vals(v, 'f'); return r ? 2 * PI * r[0] : null; },
    },
    {
      id: 'freq-from-period',
      name: 'Frequency from Period',
      expression: 'f = 1 / T',
      inputs: [
        { id: 'T', label: 'Period', unit: 's', placeholder: '0.02', min: 0, step: 0.001 },
      ],
      outputLabel: 'Frequency', outputUnit: 'Hz',
      compute: (v) => { const r = vals(v, 'T'); return r && r[0] > 0 ? 1 / r[0] : null; },
    },
  ],

  // ── PRESSURE ─────────────────────────────────────────────────────────────────
  pressure: [
    {
      id: 'pressure-from-force',
      name: 'Pressure from Force & Area',
      expression: 'P = F / A',
      inputs: [
        { id: 'F', label: 'Force', unit: 'N',  placeholder: '100', min: 0, convertCategory: 'force', convertBaseKey: 'N' },
        { id: 'A', label: 'Area',  unit: 'm²', placeholder: '0.5', min: 0, step: 0.001, convertCategory: 'area', convertBaseKey: 'm²' },
      ],
      outputLabel: 'Pressure', outputUnit: 'Pa',
      compute: (v) => { const r = vals(v, 'F', 'A'); return r && r[1] > 0 ? r[0] / r[1] : null; },
    },
    {
      id: 'boyles-law',
      name: "Boyle's Law — Find P₂",
      expression: 'P₂ = P₁V₁ / V₂',
      inputs: [
        { id: 'P1', label: 'Initial pressure P₁', unit: 'Pa',  placeholder: '101325', min: 0, convertCategory: 'pressure', convertBaseKey: 'Pa' },
        { id: 'V1', label: 'Initial volume V₁',   unit: 'm³', placeholder: '1',      min: 0, convertCategory: 'volume',   convertBaseKey: 'm³' },
        { id: 'V2', label: 'Final volume V₂',     unit: 'm³', placeholder: '0.5',   min: 0, step: 0.001, convertCategory: 'volume', convertBaseKey: 'm³' },
      ],
      outputLabel: 'Final pressure P₂', outputUnit: 'Pa',
      compute: (v) => { const r = vals(v, 'P1', 'V1', 'V2'); return r && r[2] > 0 ? r[0] * r[1] / r[2] : null; },
    },
    {
      id: 'hydraulic-force',
      name: 'Hydraulic Force',
      expression: 'F₂ = F₁ × A₂ / A₁',
      inputs: [
        { id: 'F1', label: 'Input force F₁', unit: 'N',  placeholder: '100',  min: 0, convertCategory: 'force', convertBaseKey: 'N' },
        { id: 'A1', label: 'Input area A₁',  unit: 'm²', placeholder: '0.01', min: 0, step: 0.001, convertCategory: 'area', convertBaseKey: 'm²' },
        { id: 'A2', label: 'Output area A₂', unit: 'm²', placeholder: '0.1',  min: 0, step: 0.001, convertCategory: 'area', convertBaseKey: 'm²' },
      ],
      outputLabel: 'Output force F₂', outputUnit: 'N',
      compute: (v) => { const r = vals(v, 'F1', 'A1', 'A2'); return r && r[1] > 0 ? r[0] * r[2] / r[1] : null; },
    },
  ],

  // ── ENERGY ──────────────────────────────────────────────────────────────────
  energy: [
    {
      id: 'kinetic-energy',
      name: 'Kinetic Energy',
      expression: 'KE = ½mv²',
      inputs: [
        { id: 'm', label: 'Mass',     unit: 'kg',  placeholder: '70', min: 0, convertCategory: 'weight', convertBaseKey: 'kg' },
        { id: 'v', label: 'Velocity', unit: 'm/s', placeholder: '10', convertCategory: 'speed', convertBaseKey: 'm/s' },
      ],
      outputLabel: 'Kinetic energy', outputUnit: 'J',
      compute: (v) => { const r = vals(v, 'm', 'v'); return r ? 0.5 * r[0] * r[1] ** 2 : null; },
    },
    {
      id: 'potential-energy',
      name: 'Gravitational Potential Energy',
      expression: 'PE = m × g × h',
      inputs: [
        { id: 'm', label: 'Mass',    unit: 'kg',   placeholder: '70',   min: 0, convertCategory: 'weight', convertBaseKey: 'kg' },
        { id: 'g', label: 'Gravity', unit: 'm/s²', placeholder: '9.81', min: 0, step: 0.01, defaultValue: 9.81 },
        { id: 'h', label: 'Height',  unit: 'm',    placeholder: '10', convertCategory: 'length', convertBaseKey: 'm' },
      ],
      outputLabel: 'Potential energy', outputUnit: 'J',
      compute: (v) => { const r = vals(v, 'm', 'g', 'h'); return r ? r[0] * r[1] * r[2] : null; },
    },
    {
      id: 'work-done',
      name: 'Work Done',
      expression: 'W = F × d × cos(θ)',
      inputs: [
        { id: 'F', label: 'Force',    unit: 'N', placeholder: '50', min: 0, convertCategory: 'force', convertBaseKey: 'N' },
        { id: 'd', label: 'Distance', unit: 'm', placeholder: '10', min: 0, convertCategory: 'length', convertBaseKey: 'm' },
        { id: 'a', label: 'Angle θ',  unit: '°', placeholder: '0',  defaultValue: 0 },
      ],
      outputLabel: 'Work', outputUnit: 'J',
      compute: (v) => { const r = vals(v, 'F', 'd', 'a'); return r ? r[0] * r[1] * Math.cos(r[2] * DEG) : null; },
    },
    {
      id: 'electrical-energy',
      name: 'Electrical Energy',
      expression: 'E = P × t',
      inputs: [
        { id: 'P', label: 'Power', unit: 'W', placeholder: '1000', min: 0, convertCategory: 'power', convertBaseKey: 'W' },
        { id: 't', label: 'Time',  unit: 's', placeholder: '3600', min: 0, convertCategory: 'time',  convertBaseKey: 's' },
      ],
      outputLabel: 'Energy', outputUnit: 'J',
      compute: (v) => { const r = vals(v, 'P', 't'); return r ? r[0] * r[1] : null; },
    },
  ],

  // ── POWER ───────────────────────────────────────────────────────────────────
  power: [
    {
      id: 'power-work-time',
      name: 'Power from Work & Time',
      expression: 'P = W / t',
      inputs: [
        { id: 'W', label: 'Work / Energy', unit: 'J', placeholder: '1000', min: 0, convertCategory: 'energy', convertBaseKey: 'J' },
        { id: 't', label: 'Time',          unit: 's', placeholder: '10',   min: 0, convertCategory: 'time',   convertBaseKey: 's' },
      ],
      outputLabel: 'Power', outputUnit: 'W',
      compute: (v) => { const r = vals(v, 'W', 't'); return r && r[1] > 0 ? r[0] / r[1] : null; },
    },
    {
      id: 'power-force-velocity',
      name: 'Power = Force × Velocity',
      expression: 'P = F × v',
      inputs: [
        { id: 'F', label: 'Force',    unit: 'N',   placeholder: '200', min: 0, convertCategory: 'force', convertBaseKey: 'N' },
        { id: 'v', label: 'Velocity', unit: 'm/s', placeholder: '5',   min: 0, convertCategory: 'speed', convertBaseKey: 'm/s' },
      ],
      outputLabel: 'Power', outputUnit: 'W',
      compute: (v) => { const r = vals(v, 'F', 'v'); return r ? r[0] * r[1] : null; },
    },
    {
      id: 'power-electrical',
      name: 'Electrical Power (P = V × I)',
      expression: 'P = V × I',
      inputs: [
        { id: 'V', label: 'Voltage', unit: 'V', placeholder: '120', min: 0 },
        { id: 'I', label: 'Current', unit: 'A', placeholder: '5',   min: 0 },
      ],
      outputLabel: 'Power', outputUnit: 'W',
      compute: (v) => { const r = vals(v, 'V', 'I'); return r ? r[0] * r[1] : null; },
    },
    {
      id: 'efficiency',
      name: 'Efficiency',
      expression: 'η = (P_out / P_in) × 100',
      inputs: [
        { id: 'Po', label: 'Output power', unit: 'W', placeholder: '800',  min: 0, convertCategory: 'power', convertBaseKey: 'W' },
        { id: 'Pi', label: 'Input power',  unit: 'W', placeholder: '1000', min: 0, convertCategory: 'power', convertBaseKey: 'W' },
      ],
      outputLabel: 'Efficiency', outputUnit: '%',
      compute: (v) => { const r = vals(v, 'Po', 'Pi'); return r && r[1] > 0 ? (r[0] / r[1]) * 100 : null; },
    },
  ],

  // ── FORCE ───────────────────────────────────────────────────────────────────
  force: [
    {
      id: 'newtons-second',
      name: "Newton's 2nd Law",
      expression: 'F = m × a',
      inputs: [
        { id: 'm', label: 'Mass',         unit: 'kg',   placeholder: '10', convertCategory: 'weight', convertBaseKey: 'kg' },
        { id: 'a', label: 'Acceleration', unit: 'm/s²', placeholder: '9.81' },
      ],
      outputLabel: 'Force', outputUnit: 'N',
      compute: (v) => { const r = vals(v, 'm', 'a'); return r ? r[0] * r[1] : null; },
    },
    {
      id: 'torque',
      name: 'Torque',
      expression: 'τ = F × r × sin(θ)',
      inputs: [
        { id: 'F', label: 'Force',     unit: 'N', placeholder: '100', min: 0, convertCategory: 'force',  convertBaseKey: 'N' },
        { id: 'r', label: 'Lever arm', unit: 'm', placeholder: '0.5', min: 0, step: 0.01, convertCategory: 'length', convertBaseKey: 'm' },
        { id: 'a', label: 'Angle θ',   unit: '°', placeholder: '90',  defaultValue: 90 },
      ],
      outputLabel: 'Torque', outputUnit: 'N·m',
      compute: (v) => { const r = vals(v, 'F', 'r', 'a'); return r ? r[0] * r[1] * Math.sin(r[2] * DEG) : null; },
    },
    {
      id: 'spring-force',
      name: "Hooke's Law",
      expression: 'F = k × x',
      inputs: [
        { id: 'k', label: 'Spring constant', unit: 'N/m', placeholder: '200',  min: 0 },
        { id: 'x', label: 'Extension x',     unit: 'm',   placeholder: '0.1',  min: 0, step: 0.001, convertCategory: 'length', convertBaseKey: 'm' },
      ],
      outputLabel: 'Spring force', outputUnit: 'N',
      compute: (v) => { const r = vals(v, 'k', 'x'); return r ? r[0] * r[1] : null; },
    },
    {
      id: 'gravitational-weight',
      name: 'Gravitational Weight',
      expression: 'W = m × g',
      inputs: [
        { id: 'm', label: 'Mass',    unit: 'kg',   placeholder: '70',   min: 0, convertCategory: 'weight', convertBaseKey: 'kg' },
        { id: 'g', label: 'Gravity', unit: 'm/s²', placeholder: '9.81', min: 0, step: 0.01, defaultValue: 9.81 },
      ],
      outputLabel: 'Weight force', outputUnit: 'N',
      compute: (v) => { const r = vals(v, 'm', 'g'); return r ? r[0] * r[1] : null; },
    },
  ],

  // ── DATA ────────────────────────────────────────────────────────────────────
  data: [
    {
      id: 'download-time',
      name: 'Download Time',
      expression: 't = size(MB) × 8 / speed(Mbps)',
      inputs: [
        { id: 's', label: 'File size',  unit: 'MB',   placeholder: '500', min: 0 },
        { id: 'b', label: 'Bandwidth', unit: 'Mbps', placeholder: '100', min: 0 },
      ],
      outputLabel: 'Download time', outputUnit: 's',
      compute: (v) => { const r = vals(v, 's', 'b'); return r && r[1] > 0 ? (r[0] * 8) / r[1] : null; },
    },
    {
      id: 'total-storage',
      name: 'Total Storage',
      expression: 'S = count × size',
      inputs: [
        { id: 'n', label: 'Number of files', unit: '',   placeholder: '1000', min: 0, step: 1 },
        { id: 's', label: 'Size per file',   unit: 'MB', placeholder: '5',    min: 0 },
      ],
      outputLabel: 'Total storage', outputUnit: 'GB',
      compute: (v) => { const r = vals(v, 'n', 's'); return r ? (r[0] * r[1]) / 1024 : null; },
    },
    {
      id: 'bandwidth-needed',
      name: 'Bandwidth Required',
      expression: 'B = size(MB) × 8 / time(s)',
      inputs: [
        { id: 's', label: 'File size',      unit: 'MB', placeholder: '500', min: 0 },
        { id: 't', label: 'Transfer time',  unit: 's',  placeholder: '10',  min: 0 },
      ],
      outputLabel: 'Bandwidth', outputUnit: 'Mbps',
      compute: (v) => { const r = vals(v, 's', 't'); return r && r[1] > 0 ? (r[0] * 8) / r[1] : null; },
    },
  ],

  // ── FUEL ────────────────────────────────────────────────────────────────────
  fuel: [
    {
      id: 'trip-cost',
      name: 'Trip Fuel Cost',
      expression: 'Cost = (d/100) × L/100km × price/L',
      inputs: [
        { id: 'd', label: 'Distance',    unit: 'km',       placeholder: '300',  min: 0, convertCategory: 'length', convertBaseKey: 'km' },
        { id: 'c', label: 'Consumption', unit: 'L/100 km', placeholder: '8',    min: 0, step: 0.1, convertCategory: 'fuel', convertBaseKey: 'l_per_100km' },
        { id: 'p', label: 'Fuel price',  unit: '$/L',      placeholder: '1.80', min: 0, step: 0.01 },
      ],
      outputLabel: 'Fuel cost', outputUnit: '$',
      compute: (v) => { const r = vals(v, 'd', 'c', 'p'); return r ? (r[0] / 100) * r[1] * r[2] : null; },
    },
    {
      id: 'driving-range',
      name: 'Driving Range',
      expression: 'R = tank × 100 / consumption',
      inputs: [
        { id: 't', label: 'Tank capacity', unit: 'L',        placeholder: '50', min: 0, convertCategory: 'volume', convertBaseKey: 'l' },
        { id: 'c', label: 'Consumption',   unit: 'L/100 km', placeholder: '8',  min: 0, step: 0.1, convertCategory: 'fuel', convertBaseKey: 'l_per_100km' },
      ],
      outputLabel: 'Range', outputUnit: 'km',
      compute: (v) => { const r = vals(v, 't', 'c'); return r && r[1] > 0 ? (r[0] * 100) / r[1] : null; },
    },
    {
      id: 'co2-emissions',
      name: 'CO₂ Emissions',
      expression: 'CO₂ = d × (L/100km) × 2.31 / 100',
      inputs: [
        { id: 'd', label: 'Distance',    unit: 'km',       placeholder: '300', min: 0, convertCategory: 'length', convertBaseKey: 'km' },
        { id: 'c', label: 'Consumption', unit: 'L/100 km', placeholder: '8',   min: 0, step: 0.1, convertCategory: 'fuel', convertBaseKey: 'l_per_100km' },
      ],
      outputLabel: 'CO₂ emitted', outputUnit: 'kg',
      compute: (v) => { const r = vals(v, 'd', 'c'); return r ? (r[0] * r[1] * 2.31) / 100 : null; },
    },
    {
      id: 'fill-up-cost',
      name: 'Fill-Up Cost',
      expression: 'Cost = tank × price/L',
      inputs: [
        { id: 't', label: 'Tank size',  unit: 'L',   placeholder: '50',   min: 0, convertCategory: 'volume', convertBaseKey: 'l' },
        { id: 'p', label: 'Fuel price', unit: '$/L', placeholder: '1.80', min: 0, step: 0.01 },
      ],
      outputLabel: 'Fill-up cost', outputUnit: '$',
      compute: (v) => { const r = vals(v, 't', 'p'); return r ? r[0] * r[1] : null; },
    },
  ],
};
