export function formatNumber(value: number, precision: number): string {
  if (isNaN(value) || !isFinite(value)) return '';
  return value.toFixed(precision);
}
