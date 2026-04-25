import { CATEGORIES, type Category } from './units';

function convertTemperature(value: number, from: string, to: string): number {
  if (from === to) return value;
  let celsius: number;
  switch (from) {
    case 'C':
      celsius = value;
      break;
    case 'F':
      celsius = ((value - 32) * 5) / 9;
      break;
    case 'K':
      celsius = value - 273.15;
      break;
    case 'R':
      celsius = ((value - 491.67) * 5) / 9;
      break;
    default:
      return NaN;
  }
  switch (to) {
    case 'C':
      return celsius;
    case 'F':
      return (celsius * 9) / 5 + 32;
    case 'K':
      return celsius + 273.15;
    case 'R':
      return ((celsius + 273.15) * 9) / 5;
    default:
      return NaN;
  }
}

export function convert(
  value: number,
  fromUnit: string,
  toUnit: string,
  category: Category
): number {
  if (isNaN(value)) return NaN;
  if (fromUnit === toUnit) return value;
  if (category === 'temperature') {
    return convertTemperature(value, fromUnit, toUnit);
  }
  const cat = CATEGORIES[category];
  const fromFactor = cat.units[fromUnit]?.factor;
  const toFactor = cat.units[toUnit]?.factor;
  if (fromFactor === undefined || toFactor === undefined) return NaN;
  return (value * fromFactor) / toFactor;
}
