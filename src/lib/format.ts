export function formatNumber(value: number, precision: number): string {
  if (isNaN(value) || !isFinite(value)) return '';
  const abs = Math.abs(value);
  // Switch to scientific notation for astronomically large or microscopically small values
  if ((abs !== 0 && abs < 1e-9) || abs >= 1e12) {
    return value.toExponential(precision);
  }
  return value.toFixed(precision);
}
