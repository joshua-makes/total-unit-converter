import { describe, it, expect } from 'vitest';
import { convert } from '@/lib/convert';

describe('convert - length', () => {
  it('1 mi == 1609.344 m', () => {
    expect(convert(1, 'mi', 'm', 'length')).toBeCloseTo(1609.344, 3);
  });

  it('same unit returns input unchanged', () => {
    expect(convert(42, 'm', 'm', 'length')).toBe(42);
  });

  it('1 nmi == 1852 m', () => {
    expect(convert(1, 'nmi', 'm', 'length')).toBeCloseTo(1852, 5);
  });
});

describe('convert - area', () => {
  it('1 m² == 10.7639 ft²', () => {
    expect(convert(1, 'm²', 'ft²', 'area')).toBeCloseTo(10.7639, 3);
  });

  it('1 ha == 2.47105 acres', () => {
    expect(convert(1, 'ha', 'acre', 'area')).toBeCloseTo(2.47105, 4);
  });

  it('1 mi² == 2.58999 km²', () => {
    expect(convert(1, 'mi²', 'km²', 'area')).toBeCloseTo(2.58999, 4);
  });
});

describe('convert - weight', () => {
  it('1 kg == 2.2046226218... lb', () => {
    expect(convert(1, 'kg', 'lb', 'weight')).toBeCloseTo(2.20462, 4);
  });

  it('same unit returns input unchanged', () => {
    expect(convert(5, 'kg', 'kg', 'weight')).toBe(5);
  });

  it('1 oz == 28.3495 g', () => {
    expect(convert(1, 'oz', 'g', 'weight')).toBeCloseTo(28.3495, 3);
  });
});

describe('convert - volume', () => {
  it('1 gal == 3.785411784 l', () => {
    expect(convert(1, 'gal', 'l', 'volume')).toBeCloseTo(3.785411784, 6);
  });

  it('1 ft³ == 28.316847 L', () => {
    expect(convert(1, 'ft³', 'l', 'volume')).toBeCloseTo(28.316847, 4);
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

describe('convert - time', () => {
  it('1 h == 60 min', () => {
    expect(convert(1, 'h', 'min', 'time')).toBeCloseTo(60, 5);
  });

  it('1 day == 86400 s', () => {
    expect(convert(1, 'day', 's', 'time')).toBeCloseTo(86400, 5);
  });

  it('1 week == 7 days', () => {
    expect(convert(1, 'week', 'day', 'time')).toBeCloseTo(7, 5);
  });
});

describe('convert - angle', () => {
  it('180 deg == π rad', () => {
    expect(convert(180, 'deg', 'rad', 'angle')).toBeCloseTo(Math.PI, 10);
  });

  it('1 turn == 360 deg', () => {
    expect(convert(1, 'turn', 'deg', 'angle')).toBeCloseTo(360, 5);
  });

  it('1 deg == 60 arcmin', () => {
    expect(convert(1, 'deg', 'arcmin', 'angle')).toBeCloseTo(60, 5);
  });
});

describe('convert - frequency', () => {
  it('1 GHz == 1000 MHz', () => {
    expect(convert(1, 'GHz', 'MHz', 'frequency')).toBeCloseTo(1000, 5);
  });

  it('60 rpm == 1 Hz', () => {
    expect(convert(60, 'rpm', 'Hz', 'frequency')).toBeCloseTo(1, 5);
  });
});

describe('convert - pressure', () => {
  it('1 atm == 101325 Pa', () => {
    expect(convert(1, 'atm', 'Pa', 'pressure')).toBeCloseTo(101325, 2);
  });

  it('1 psi == 6894.757 Pa', () => {
    expect(convert(1, 'psi', 'Pa', 'pressure')).toBeCloseTo(6894.757, 2);
  });

  it('1 bar == 100000 Pa', () => {
    expect(convert(1, 'bar', 'Pa', 'pressure')).toBeCloseTo(100000, 2);
  });
});

describe('convert - energy', () => {
  it('1 kWh == 3600000 J', () => {
    expect(convert(1, 'kWh', 'J', 'energy')).toBeCloseTo(3600000, 1);
  });

  it('1 kcal == 4184 J', () => {
    expect(convert(1, 'kcal', 'J', 'energy')).toBeCloseTo(4184, 3);
  });

  it('1 BTU == 1055.056 J', () => {
    expect(convert(1, 'BTU', 'J', 'energy')).toBeCloseTo(1055.056, 2);
  });

  it('1 eV == 1.602e-19 J', () => {
    expect(convert(1, 'eV', 'J', 'energy')).toBeCloseTo(1.602176634e-19, 30);
  });
});

describe('convert - power', () => {
  it('1 hp == 745.699 W', () => {
    expect(convert(1, 'hp', 'W', 'power')).toBeCloseTo(745.699, 2);
  });

  it('1 kW == 1000 W', () => {
    expect(convert(1, 'kW', 'W', 'power')).toBeCloseTo(1000, 5);
  });
});

describe('convert - force', () => {
  it('1 lbf == 4.44822 N', () => {
    expect(convert(1, 'lbf', 'N', 'force')).toBeCloseTo(4.44822, 4);
  });

  it('1 kgf == 9.80665 N', () => {
    expect(convert(1, 'kgf', 'N', 'force')).toBeCloseTo(9.80665, 5);
  });
});

describe('convert - data', () => {
  it('1 GB == 1000 MB', () => {
    expect(convert(1, 'GB', 'MB', 'data')).toBeCloseTo(1000, 5);
  });

  it('1 GiB == 1024 MiB', () => {
    expect(convert(1, 'GiB', 'MiB', 'data')).toBeCloseTo(1024, 5);
  });

  it('8 bit == 1 B', () => {
    expect(convert(8, 'bit', 'B', 'data')).toBeCloseTo(1, 5);
  });

  it('1 GiB != 1 GB (binary vs decimal)', () => {
    expect(convert(1, 'GiB', 'GB', 'data')).toBeCloseTo(1.073741824, 5);
  });
});

describe('convert - fuel', () => {
  it('30 mpg_us ~ 7.84 L/100km', () => {
    expect(convert(30, 'mpg_us', 'l_per_100km', 'fuel')).toBeCloseTo(7.84, 1);
  });

  it('10 L/100km ~ 23.52 mpg_us', () => {
    expect(convert(10, 'l_per_100km', 'mpg_us', 'fuel')).toBeCloseTo(23.52, 1);
  });

  it('1 mpg_us == 0.425143706 km/L', () => {
    expect(convert(1, 'mpg_us', 'km_per_l', 'fuel')).toBeCloseTo(0.425143706, 5);
  });

  it('fuel same unit returns input unchanged', () => {
    expect(convert(10, 'km_per_l', 'km_per_l', 'fuel')).toBe(10);
  });

  it('l_per_100km round-trip', () => {
    const val = 8;
    const mpg = convert(val, 'l_per_100km', 'mpg_us', 'fuel');
    expect(convert(mpg, 'mpg_us', 'l_per_100km', 'fuel')).toBeCloseTo(val, 5);
  });
});
