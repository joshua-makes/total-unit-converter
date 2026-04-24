export type Category = 'length' | 'weight' | 'temperature' | 'volume' | 'speed';

export interface UnitDef {
  label: string;
  symbol: string;
  factor: number;
}

export interface CategoryDef {
  name: string;
  units: Record<string, UnitDef>;
  baseUnit: string;
}

export const CATEGORIES: Record<Category, CategoryDef> = {
  length: {
    name: 'Length',
    baseUnit: 'm',
    units: {
      mm: { label: 'Millimeter', symbol: 'mm', factor: 0.001 },
      cm: { label: 'Centimeter', symbol: 'cm', factor: 0.01 },
      m: { label: 'Meter', symbol: 'm', factor: 1 },
      km: { label: 'Kilometer', symbol: 'km', factor: 1000 },
      in: { label: 'Inch', symbol: 'in', factor: 0.0254 },
      ft: { label: 'Foot', symbol: 'ft', factor: 0.3048 },
      yd: { label: 'Yard', symbol: 'yd', factor: 0.9144 },
      mi: { label: 'Mile', symbol: 'mi', factor: 1609.344 },
    },
  },
  weight: {
    name: 'Weight / Mass',
    baseUnit: 'g',
    units: {
      mg: { label: 'Milligram', symbol: 'mg', factor: 0.001 },
      g: { label: 'Gram', symbol: 'g', factor: 1 },
      kg: { label: 'Kilogram', symbol: 'kg', factor: 1000 },
      t: { label: 'Metric Ton', symbol: 't', factor: 1_000_000 },
      oz: { label: 'Ounce', symbol: 'oz', factor: 28.349523125 },
      lb: { label: 'Pound', symbol: 'lb', factor: 453.59237 },
      st: { label: 'Stone', symbol: 'st', factor: 6350.29318 },
    },
  },
  temperature: {
    name: 'Temperature',
    baseUnit: 'C',
    units: {
      C: { label: 'Celsius', symbol: '°C', factor: 1 },
      F: { label: 'Fahrenheit', symbol: '°F', factor: 1 },
      K: { label: 'Kelvin', symbol: 'K', factor: 1 },
      R: { label: 'Rankine', symbol: '°R', factor: 1 },
    },
  },
  volume: {
    name: 'Volume',
    baseUnit: 'l',
    units: {
      ml: { label: 'Milliliter', symbol: 'ml', factor: 0.001 },
      l: { label: 'Liter', symbol: 'l', factor: 1 },
      'm³': { label: 'Cubic Meter', symbol: 'm³', factor: 1000 },
      tsp: { label: 'Teaspoon', symbol: 'tsp', factor: 0.00492892 },
      tbsp: { label: 'Tablespoon', symbol: 'tbsp', factor: 0.0147868 },
      'fl oz': { label: 'Fluid Ounce', symbol: 'fl oz', factor: 0.0295735 },
      cup: { label: 'Cup', symbol: 'cup', factor: 0.236588 },
      pt: { label: 'Pint', symbol: 'pt', factor: 0.473176 },
      qt: { label: 'Quart', symbol: 'qt', factor: 0.946353 },
      gal: { label: 'Gallon', symbol: 'gal', factor: 3.785411784 },
    },
  },
  speed: {
    name: 'Speed',
    baseUnit: 'm/s',
    units: {
      'm/s': { label: 'Meters/Second', symbol: 'm/s', factor: 1 },
      'km/h': { label: 'Kilometers/Hour', symbol: 'km/h', factor: 1 / 3.6 },
      mph: { label: 'Miles/Hour', symbol: 'mph', factor: 0.44704 },
      'ft/s': { label: 'Feet/Second', symbol: 'ft/s', factor: 0.3048 },
      knot: { label: 'Knot', symbol: 'kn', factor: 0.514444 },
    },
  },
};

export const QUICK_CONVERSIONS: Record<
  Category,
  Array<{ value: number; from: string; to: string; label: string }>
> = {
  length: [
    { value: 1, from: 'mi', to: 'km', label: '1 mi → km' },
    { value: 1, from: 'ft', to: 'm', label: '1 ft → m' },
    { value: 1, from: 'in', to: 'cm', label: '1 in → cm' },
    { value: 100, from: 'km', to: 'mi', label: '100 km → mi' },
    { value: 1, from: 'm', to: 'ft', label: '1 m → ft' },
  ],
  weight: [
    { value: 1, from: 'kg', to: 'lb', label: '1 kg → lb' },
    { value: 1, from: 'lb', to: 'kg', label: '1 lb → kg' },
    { value: 1, from: 'st', to: 'kg', label: '1 st → kg' },
    { value: 1, from: 'oz', to: 'g', label: '1 oz → g' },
    { value: 100, from: 'g', to: 'oz', label: '100 g → oz' },
  ],
  temperature: [
    { value: 100, from: 'C', to: 'F', label: '100°C → °F' },
    { value: 32, from: 'F', to: 'C', label: '32°F → °C' },
    { value: 0, from: 'C', to: 'K', label: '0°C → K' },
    { value: 37, from: 'C', to: 'F', label: '37°C → °F' },
    { value: -40, from: 'C', to: 'F', label: '-40°C → °F' },
  ],
  volume: [
    { value: 1, from: 'gal', to: 'l', label: '1 gal → l' },
    { value: 1, from: 'l', to: 'gal', label: '1 l → gal' },
    { value: 1, from: 'cup', to: 'ml', label: '1 cup → ml' },
    { value: 1, from: 'pt', to: 'l', label: '1 pt → l' },
    { value: 1, from: 'fl oz', to: 'ml', label: '1 fl oz → ml' },
  ],
  speed: [
    { value: 1, from: 'm/s', to: 'km/h', label: '1 m/s → km/h' },
    { value: 100, from: 'km/h', to: 'mph', label: '100 km/h → mph' },
    { value: 1, from: 'knot', to: 'km/h', label: '1 knot → km/h' },
    { value: 60, from: 'mph', to: 'km/h', label: '60 mph → km/h' },
    { value: 1, from: 'ft/s', to: 'm/s', label: '1 ft/s → m/s' },
  ],
};
