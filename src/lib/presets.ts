import { type Category } from './units';

export interface UnitPreset {
  label: string;
  from: string;
  to: string;
}

/**
 * Common unit-system presets per category.
 * These appear as quick-pick chips above the converter to let users jump
 * between unit systems without hunting through dropdowns.
 */
export const UNIT_PRESETS: Partial<Record<Category, UnitPreset[]>> = {
  fuel: [
    { label: 'US mpg → L/100km', from: 'mpg_us',      to: 'l_per_100km' },
    { label: 'UK mpg → L/100km', from: 'mpg_uk',      to: 'l_per_100km' },
    { label: 'L/100km → mpg',    from: 'l_per_100km', to: 'mpg_us'      },
    { label: 'km/L → L/100km',   from: 'km_per_l',    to: 'l_per_100km' },
    { label: 'mpg US → UK',      from: 'mpg_us',      to: 'mpg_uk'      },
  ],

  length: [
    { label: 'm → ft',   from: 'm',  to: 'ft' },
    { label: 'km → mi',  from: 'km', to: 'mi' },
    { label: 'cm → in',  from: 'cm', to: 'in' },
    { label: 'ft → m',   from: 'ft', to: 'm'  },
    { label: 'mi → km',  from: 'mi', to: 'km' },
    { label: 'in → cm',  from: 'in', to: 'cm' },
  ],

  weight: [
    { label: 'kg → lb',  from: 'kg', to: 'lb' },
    { label: 'lb → kg',  from: 'lb', to: 'kg' },
    { label: 'kg → st',  from: 'kg', to: 'st' },
    { label: 'g → oz',   from: 'g',  to: 'oz' },
    { label: 'oz → g',   from: 'oz', to: 'g'  },
    { label: 'st → kg',  from: 'st', to: 'kg' },
  ],

  temperature: [
    { label: '°C → °F', from: 'C', to: 'F' },
    { label: '°F → °C', from: 'F', to: 'C' },
    { label: '°C → K',  from: 'C', to: 'K' },
    { label: 'K → °C',  from: 'K', to: 'C' },
    { label: '°F → K',  from: 'F', to: 'K' },
  ],

  speed: [
    { label: 'km/h → mph',  from: 'km/h', to: 'mph'  },
    { label: 'mph → km/h',  from: 'mph',  to: 'km/h' },
    { label: 'm/s → km/h',  from: 'm/s',  to: 'km/h' },
    { label: 'knots → km/h', from: 'knot', to: 'km/h' },
    { label: 'knots → mph',  from: 'knot', to: 'mph'  },
  ],

  volume: [
    { label: 'L → gal (US)',  from: 'l',    to: 'gal'   },
    { label: 'gal → L',       from: 'gal',  to: 'l'     },
    { label: 'mL → fl oz',    from: 'ml',   to: 'fl oz' },
    { label: 'fl oz → mL',    from: 'fl oz', to: 'ml'   },
    { label: 'cup → mL',      from: 'cup',  to: 'ml'    },
  ],

  area: [
    { label: 'm² → ft²',    from: 'm²',   to: 'ft²'  },
    { label: 'ft² → m²',    from: 'ft²',  to: 'm²'   },
    { label: 'ha → acre',   from: 'ha',   to: 'acre' },
    { label: 'acre → ha',   from: 'acre', to: 'ha'   },
    { label: 'km² → mi²',   from: 'km²',  to: 'mi²'  },
  ],

  pressure: [
    { label: 'bar → psi',    from: 'bar',  to: 'psi'  },
    { label: 'psi → bar',    from: 'psi',  to: 'bar'  },
    { label: 'atm → kPa',   from: 'atm',  to: 'kPa'  },
    { label: 'kPa → psi',   from: 'kPa',  to: 'psi'  },
    { label: 'mmHg → kPa',  from: 'mmHg', to: 'kPa'  },
  ],

  energy: [
    { label: 'kWh → MJ',   from: 'kWh',  to: 'MJ'  },
    { label: 'MJ → kWh',   from: 'MJ',   to: 'kWh' },
    { label: 'kcal → kJ',  from: 'kcal', to: 'kJ'  },
    { label: 'kJ → kcal',  from: 'kJ',   to: 'kcal'},
    { label: 'BTU → kJ',   from: 'BTU',  to: 'kJ'  },
  ],

  data: [
    { label: 'GB → MB',    from: 'GB',  to: 'MB'  },
    { label: 'TB → GB',    from: 'TB',  to: 'GB'  },
    { label: 'GiB → GB',   from: 'GiB', to: 'GB'  },
    { label: 'MB → MiB',   from: 'MB',  to: 'MiB' },
    { label: 'GB → GiB',   from: 'GB',  to: 'GiB' },
  ],
};
