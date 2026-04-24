import { describe, it, expect } from 'vitest';
import { convert } from '@/lib/convert';

describe('convert - length', () => {
  it('1 mi == 1609.344 m', () => {
    expect(convert(1, 'mi', 'm', 'length')).toBeCloseTo(1609.344, 3);
  });

  it('same unit returns input unchanged', () => {
    expect(convert(42, 'm', 'm', 'length')).toBe(42);
  });
});

describe('convert - weight', () => {
  it('1 kg == 2.2046226218... lb', () => {
    expect(convert(1, 'kg', 'lb', 'weight')).toBeCloseTo(2.20462, 4);
  });

  it('same unit returns input unchanged', () => {
    expect(convert(5, 'kg', 'kg', 'weight')).toBe(5);
  });
});

describe('convert - volume', () => {
  it('1 gal == 3.785411784 l', () => {
    expect(convert(1, 'gal', 'l', 'volume')).toBeCloseTo(3.785411784, 6);
  });
});

describe('convert - speed', () => {
  it('1 m/s == 3.6 km/h', () => {
    expect(convert(1, 'm/s', 'km/h', 'speed')).toBeCloseTo(3.6, 5);
  });

  it('1 knot == 1.852 km/h', () => {
    expect(convert(1, 'knot', 'km/h', 'speed')).toBeCloseTo(1.852, 2);
  });
});

describe('convert - temperature', () => {
  it('0°C == 32°F', () => {
    expect(convert(0, 'C', 'F', 'temperature')).toBeCloseTo(32, 5);
  });

  it('0°C == 273.15 K', () => {
    expect(convert(0, 'C', 'K', 'temperature')).toBeCloseTo(273.15, 5);
  });

  it('100°C == 212°F', () => {
    expect(convert(100, 'C', 'F', 'temperature')).toBeCloseTo(212, 5);
  });

  it('-40°C == -40°F', () => {
    expect(convert(-40, 'C', 'F', 'temperature')).toBeCloseTo(-40, 5);
  });

  it('K to R round-trip', () => {
    const k = 300;
    const r = convert(k, 'K', 'R', 'temperature');
    expect(convert(r, 'R', 'K', 'temperature')).toBeCloseTo(k, 5);
  });

  it('same unit returns input unchanged', () => {
    expect(convert(100, 'C', 'C', 'temperature')).toBe(100);
  });
});
