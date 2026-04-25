export type Category =
  | 'length'
  | 'area'
  | 'volume'
  | 'weight'
  | 'temperature'
  | 'speed'
  | 'time'
  | 'angle'
  | 'frequency'
  | 'pressure'
  | 'energy'
  | 'power'
  | 'force'
  | 'data'
  | 'fuel';

export interface UnitDef {
  label: string;
  symbol: string;
  /** Amount of base unit per 1 of this unit. Use -1 as a sentinel for inverse units (fuel L/100km). */
  factor: number;
}

export interface CategoryDef {
  name: string;
  units: Record<string, UnitDef>;
  baseUnit: string;
}

export const CATEGORIES: Record<Category, CategoryDef> = {
  // ── LENGTH ──────────────────────────────────────────────────
  length: {
    name: 'Length',
    baseUnit: 'm',
    units: {
      pm:  { label: 'Picometer',         symbol: 'pm',  factor: 1e-12 },
      nm:  { label: 'Nanometer',         symbol: 'nm',  factor: 1e-9 },
      μm:  { label: 'Micrometer',        symbol: 'μm',  factor: 1e-6 },
      mm:  { label: 'Millimeter',        symbol: 'mm',  factor: 0.001 },
      cm:  { label: 'Centimeter',        symbol: 'cm',  factor: 0.01 },
      m:   { label: 'Meter',             symbol: 'm',   factor: 1 },
      km:  { label: 'Kilometer',         symbol: 'km',  factor: 1000 },
      in:  { label: 'Inch',              symbol: 'in',  factor: 0.0254 },
      ft:  { label: 'Foot',              symbol: 'ft',  factor: 0.3048 },
      yd:  { label: 'Yard',              symbol: 'yd',  factor: 0.9144 },
      mi:  { label: 'Mile',              symbol: 'mi',  factor: 1609.344 },
      nmi: { label: 'Nautical Mile',     symbol: 'nmi', factor: 1852 },
      au:  { label: 'Astronomical Unit', symbol: 'AU',  factor: 149597870700 },
      ly:  { label: 'Light Year',        symbol: 'ly',  factor: 9.4607304725808e15 },
    },
  },

  // ── AREA ────────────────────────────────────────────────────
  area: {
    name: 'Area',
    baseUnit: 'm²',
    units: {
      'mm²': { label: 'Square Millimeter', symbol: 'mm²', factor: 1e-6 },
      'cm²': { label: 'Square Centimeter', symbol: 'cm²', factor: 1e-4 },
      'm²':  { label: 'Square Meter',      symbol: 'm²',  factor: 1 },
      'km²': { label: 'Square Kilometer',  symbol: 'km²', factor: 1e6 },
      'in²': { label: 'Square Inch',       symbol: 'in²', factor: 6.4516e-4 },
      'ft²': { label: 'Square Foot',       symbol: 'ft²', factor: 0.09290304 },
      'yd²': { label: 'Square Yard',       symbol: 'yd²', factor: 0.83612736 },
      'mi²': { label: 'Square Mile',       symbol: 'mi²', factor: 2589988.110336 },
      acre:  { label: 'Acre',              symbol: 'ac',  factor: 4046.8564224 },
      ha:    { label: 'Hectare',           symbol: 'ha',  factor: 10000 },
    },
  },

  // ── VOLUME ──────────────────────────────────────────────────
  volume: {
    name: 'Volume',
    baseUnit: 'l',
    units: {
      ml:      { label: 'Milliliter',        symbol: 'mL',    factor: 0.001 },
      cl:      { label: 'Centiliter',        symbol: 'cL',    factor: 0.01 },
      dl:      { label: 'Deciliter',         symbol: 'dL',    factor: 0.1 },
      l:       { label: 'Liter',             symbol: 'L',     factor: 1 },
      'm³':    { label: 'Cubic Meter',       symbol: 'm³',    factor: 1000 },
      'cm³':   { label: 'Cubic Centimeter',  symbol: 'cm³',   factor: 0.001 },
      'in³':   { label: 'Cubic Inch',        symbol: 'in³',   factor: 0.0163871 },
      'ft³':   { label: 'Cubic Foot',        symbol: 'ft³',   factor: 28.316847 },
      tsp:     { label: 'Teaspoon (US)',      symbol: 'tsp',   factor: 0.00492892 },
      tbsp:    { label: 'Tablespoon (US)',    symbol: 'tbsp',  factor: 0.0147868 },
      'fl oz': { label: 'Fluid Ounce (US)',  symbol: 'fl oz', factor: 0.0295735 },
      cup:     { label: 'Cup (US)',           symbol: 'cup',   factor: 0.236588 },
      pt:      { label: 'Pint (US)',          symbol: 'pt',    factor: 0.473176 },
      qt:      { label: 'Quart (US)',         symbol: 'qt',    factor: 0.946353 },
      gal:     { label: 'Gallon (US)',        symbol: 'gal',   factor: 3.785411784 },
      pt_uk:   { label: 'Pint (UK)',          symbol: 'pt UK', factor: 0.568261 },
      gal_uk:  { label: 'Gallon (UK)',        symbol: 'gal UK',factor: 4.54609 },
      bbl:     { label: 'Oil Barrel',          symbol: 'bbl',   factor: 158.987294928 },
    },
  },

  // ── WEIGHT / MASS ────────────────────────────────────────────
  weight: {
    name: 'Weight / Mass',
    baseUnit: 'g',
    units: {
      μg:     { label: 'Microgram',       symbol: 'μg',  factor: 1e-6 },
      mg:     { label: 'Milligram',       symbol: 'mg',  factor: 0.001 },
      g:      { label: 'Gram',            symbol: 'g',   factor: 1 },
      kg:     { label: 'Kilogram',        symbol: 'kg',  factor: 1000 },
      t:      { label: 'Metric Ton',      symbol: 't',   factor: 1_000_000 },
      oz:     { label: 'Ounce',           symbol: 'oz',  factor: 28.349523125 },
      lb:     { label: 'Pound',           symbol: 'lb',  factor: 453.59237 },
      st:     { label: 'Stone',           symbol: 'st',  factor: 6350.29318 },
      ton_us: { label: 'Short Ton (US)',  symbol: 'ton', factor: 907184.74 },
      ton_uk: { label: 'Long Ton (UK)',   symbol: 'LT',  factor: 1016046.9 },
      ct:     { label: 'Carat',           symbol: 'ct',  factor: 0.2 },
      gr:     { label: 'Grain',            symbol: 'gr',  factor: 0.06479891 },
    },
  },

  // ── TEMPERATURE ──────────────────────────────────────────────
  temperature: {
    name: 'Temperature',
    baseUnit: 'C',
    units: {
      C: { label: 'Celsius',    symbol: '°C', factor: 1 },
      F: { label: 'Fahrenheit', symbol: '°F', factor: 1 },
      K: { label: 'Kelvin',     symbol: 'K',  factor: 1 },
      R: { label: 'Rankine',    symbol: '°R', factor: 1 },
    },
  },

  // ── SPEED ────────────────────────────────────────────────────
  speed: {
    name: 'Speed',
    baseUnit: 'm/s',
    units: {
      'mm/s': { label: 'Millimeters/Second', symbol: 'mm/s', factor: 0.001 },
      'cm/s': { label: 'Centimeters/Second', symbol: 'cm/s', factor: 0.01 },
      'm/s':  { label: 'Meters/Second',      symbol: 'm/s',  factor: 1 },
      'km/h': { label: 'Kilometers/Hour',    symbol: 'km/h', factor: 1 / 3.6 },
      mph:    { label: 'Miles/Hour',         symbol: 'mph',  factor: 0.44704 },
      'ft/s': { label: 'Feet/Second',        symbol: 'ft/s', factor: 0.3048 },
      knot:   { label: 'Knot',               symbol: 'kn',   factor: 0.514444 },
      mach:   { label: 'Mach (sea level)',   symbol: 'Ma',   factor: 343 },
      c:      { label: 'Speed of Light',     symbol: 'c',    factor: 299792458 },
      'ft/min': { label: 'Feet/Minute',        symbol: 'ft/min', factor: 0.00508 },
    },
  },

  // ── TIME ─────────────────────────────────────────────────────
  time: {
    name: 'Time',
    baseUnit: 's',
    units: {
      ns:      { label: 'Nanosecond',     symbol: 'ns',   factor: 1e-9 },
      μs:      { label: 'Microsecond',    symbol: 'μs',   factor: 1e-6 },
      ms:      { label: 'Millisecond',    symbol: 'ms',   factor: 0.001 },
      s:       { label: 'Second',         symbol: 's',    factor: 1 },
      min:     { label: 'Minute',         symbol: 'min',  factor: 60 },
      h:       { label: 'Hour',           symbol: 'h',    factor: 3600 },
      day:     { label: 'Day',            symbol: 'd',    factor: 86400 },
      week:    { label: 'Week',           symbol: 'wk',   factor: 604800 },
      month:   { label: 'Month (avg)',    symbol: 'mo',   factor: 2629800 },
      year:    { label: 'Year (Julian)',  symbol: 'yr',   factor: 31557600 },
      decade:  { label: 'Decade',         symbol: 'dec',  factor: 315576000 },
      century:   { label: 'Century',        symbol: 'cent',  factor: 3155760000 },
      fortnight: { label: 'Fortnight',       symbol: 'fn',    factor: 1209600 },
    },
  },

  // ── ANGLE ────────────────────────────────────────────────────
  angle: {
    name: 'Angle',
    baseUnit: 'rad',
    units: {
      rad:    { label: 'Radian',      symbol: 'rad',  factor: 1 },
      deg:    { label: 'Degree',      symbol: '°',    factor: Math.PI / 180 },
      grad:   { label: 'Gradian',     symbol: 'grad', factor: Math.PI / 200 },
      arcmin: { label: 'Arc Minute',  symbol: "'",    factor: Math.PI / 10800 },
      arcsec: { label: 'Arc Second',  symbol: '"',    factor: Math.PI / 648000 },
      mrad:   { label: 'Milliradian', symbol: 'mrad', factor: 0.001 },
      turn:   { label: 'Turn',        symbol: 'tr',   factor: 2 * Math.PI },
    },
  },

  // ── FREQUENCY ────────────────────────────────────────────────
  frequency: {
    name: 'Frequency',
    baseUnit: 'Hz',
    units: {
      mHz: { label: 'Millihertz',          symbol: 'mHz', factor: 0.001 },
      Hz:  { label: 'Hertz',               symbol: 'Hz',  factor: 1 },
      kHz: { label: 'Kilohertz',           symbol: 'kHz', factor: 1000 },
      MHz: { label: 'Megahertz',           symbol: 'MHz', factor: 1e6 },
      GHz: { label: 'Gigahertz',           symbol: 'GHz', factor: 1e9 },
      THz: { label: 'Terahertz',           symbol: 'THz', factor: 1e12 },
      rpm: { label: 'RPM',                 symbol: 'rpm', factor: 1 / 60 },
      rps: { label: 'Revolutions/Second',  symbol: 'rps', factor: 1 },
    },
  },

  // ── PRESSURE ─────────────────────────────────────────────────
  pressure: {
    name: 'Pressure',
    baseUnit: 'Pa',
    units: {
      Pa:   { label: 'Pascal',        symbol: 'Pa',   factor: 1 },
      hPa:  { label: 'Hectopascal',   symbol: 'hPa',  factor: 100 },
      kPa:  { label: 'Kilopascal',    symbol: 'kPa',  factor: 1000 },
      MPa:  { label: 'Megapascal',    symbol: 'MPa',  factor: 1e6 },
      GPa:  { label: 'Gigapascal',    symbol: 'GPa',  factor: 1e9 },
      bar:  { label: 'Bar',           symbol: 'bar',  factor: 100000 },
      mbar: { label: 'Millibar',      symbol: 'mbar', factor: 100 },
      psi:  { label: 'PSI',           symbol: 'psi',  factor: 6894.757293168 },
      atm:  { label: 'Atmosphere',    symbol: 'atm',  factor: 101325 },
      mmHg: { label: 'mmHg / Torr',   symbol: 'mmHg', factor: 133.322387415 },
      inHg: { label: 'Inches of Hg',  symbol: 'inHg', factor: 3386.389 },
    },
  },

  // ── ENERGY ───────────────────────────────────────────────────
  energy: {
    name: 'Energy',
    baseUnit: 'J',
    units: {
      J:        { label: 'Joule',            symbol: 'J',       factor: 1 },
      kJ:       { label: 'Kilojoule',        symbol: 'kJ',      factor: 1000 },
      MJ:       { label: 'Megajoule',        symbol: 'MJ',      factor: 1e6 },
      GJ:       { label: 'Gigajoule',        symbol: 'GJ',      factor: 1e9 },
      cal:      { label: 'Calorie (thermo)', symbol: 'cal',     factor: 4.184 },
      kcal:     { label: 'Kilocalorie',      symbol: 'kcal',    factor: 4184 },
      Wh:       { label: 'Watt-Hour',        symbol: 'Wh',      factor: 3600 },
      kWh:      { label: 'Kilowatt-Hour',    symbol: 'kWh',     factor: 3_600_000 },
      MWh:      { label: 'Megawatt-Hour',    symbol: 'MWh',     factor: 3_600_000_000 },
      BTU:      { label: 'BTU',              symbol: 'BTU',     factor: 1055.05585262 },
      therm:    { label: 'Therm (US)',        symbol: 'thm',     factor: 105480400 },
      eV:       { label: 'Electron Volt',    symbol: 'eV',      factor: 1.602176634e-19 },
      erg:      { label: 'Erg',              symbol: 'erg',     factor: 1e-7 },
      'ft·lbf': { label: 'Foot-Pound',       symbol: 'ft·lbf',  factor: 1.3558179483314 },
    },
  },

  // ── POWER ────────────────────────────────────────────────────
  power: {
    name: 'Power',
    baseUnit: 'W',
    units: {
      mW:       { label: 'Milliwatt',           symbol: 'mW',    factor: 0.001 },
      W:        { label: 'Watt',                symbol: 'W',     factor: 1 },
      kW:       { label: 'Kilowatt',            symbol: 'kW',    factor: 1000 },
      MW:       { label: 'Megawatt',            symbol: 'MW',    factor: 1e6 },
      GW:       { label: 'Gigawatt',            symbol: 'GW',    factor: 1e9 },
      hp:       { label: 'Horsepower (mech)',   symbol: 'hp',    factor: 745.69987158227 },
      hp_m:     { label: 'Horsepower (metric)', symbol: 'PS',    factor: 735.49875 },
      'BTU/hr': { label: 'BTU per Hour',        symbol: 'BTU/h', factor: 0.29307107017 },
    },
  },

  // ── FORCE ────────────────────────────────────────────────────
  force: {
    name: 'Force',
    baseUnit: 'N',
    units: {
      mN:  { label: 'Millinewton',    symbol: 'mN',  factor: 0.001 },
      N:   { label: 'Newton',         symbol: 'N',   factor: 1 },
      kN:  { label: 'Kilonewton',     symbol: 'kN',  factor: 1000 },
      MN:  { label: 'Meganewton',     symbol: 'MN',  factor: 1e6 },
      lbf: { label: 'Pound-Force',    symbol: 'lbf', factor: 4.4482216152605 },
      kgf: { label: 'Kilogram-Force', symbol: 'kgf', factor: 9.80665 },
      dyn: { label: 'Dyne',           symbol: 'dyn', factor: 1e-5 },
      ozf: { label: 'Ounce-Force',    symbol: 'ozf', factor: 0.27801385095379 },
      kip: { label: 'Kip',            symbol: 'kip', factor: 4448.2216152605 },
    },
  },

  // ── DIGITAL DATA ─────────────────────────────────────────────
  data: {
    name: 'Data Storage',
    baseUnit: 'bit',
    units: {
      bit: { label: 'Bit',       symbol: 'bit', factor: 1 },
      B:   { label: 'Byte',      symbol: 'B',   factor: 8 },
      KB:  { label: 'Kilobyte',  symbol: 'KB',  factor: 8_000 },
      MB:  { label: 'Megabyte',  symbol: 'MB',  factor: 8_000_000 },
      GB:  { label: 'Gigabyte',  symbol: 'GB',  factor: 8_000_000_000 },
      TB:  { label: 'Terabyte',  symbol: 'TB',  factor: 8_000_000_000_000 },
      PB:  { label: 'Petabyte',  symbol: 'PB',  factor: 8e15 },
      KiB: { label: 'Kibibyte',  symbol: 'KiB', factor: 8192 },
      MiB: { label: 'Mebibyte',  symbol: 'MiB', factor: 8_388_608 },
      GiB: { label: 'Gibibyte',  symbol: 'GiB', factor: 8_589_934_592 },
      TiB: { label: 'Tebibyte',  symbol: 'TiB', factor: 8_796_093_022_208 },
    },
  },

  // ── FUEL ECONOMY ─────────────────────────────────────────────
  // Base unit: km/L. factor = km/L equivalent per 1 of this unit.
  // l_per_100km uses factor -1 as a sentinel; convert.ts handles the inverse.
  fuel: {
    name: 'Fuel Economy',
    baseUnit: 'km_per_l',
    units: {
      mpg_us:      { label: 'MPG (US)',  symbol: 'mpg',     factor: 0.425143706 },
      mpg_uk:      { label: 'MPG (UK)',  symbol: 'mpg UK',  factor: 0.35400619 },
      km_per_l:    { label: 'km/L',      symbol: 'km/L',    factor: 1 },
      l_per_100km: { label: 'L/100 km',  symbol: 'L/100km', factor: -1 },
    },
  },

};

export const QUICK_CONVERSIONS: Record<
  Category,
  Array<{ value: number; from: string; to: string; label: string }>
> = {
  length: [
    { value: 1,   from: 'mi',  to: 'km',  label: '1 mi → km' },
    { value: 1,   from: 'ft',  to: 'm',   label: '1 ft → m' },
    { value: 1,   from: 'in',  to: 'cm',  label: '1 in → cm' },
    { value: 100, from: 'km',  to: 'mi',  label: '100 km → mi' },
    { value: 1,   from: 'm',   to: 'ft',  label: '1 m → ft' },
  ],
  area: [
    { value: 1, from: 'acre', to: 'm²',  label: '1 ac → m²' },
    { value: 1, from: 'ha',   to: 'acre',label: '1 ha → ac' },
    { value: 1, from: 'ft²',  to: 'm²',  label: '1 ft² → m²' },
    { value: 1, from: 'mi²',  to: 'km²', label: '1 mi² → km²' },
    { value: 1, from: 'm²',   to: 'ft²', label: '1 m² → ft²' },
  ],
  volume: [
    { value: 1, from: 'gal',   to: 'l',   label: '1 gal → L' },
    { value: 1, from: 'l',     to: 'gal', label: '1 L → gal' },
    { value: 1, from: 'cup',   to: 'ml',  label: '1 cup → mL' },
    { value: 1, from: 'pt',    to: 'l',   label: '1 pt → L' },
    { value: 1, from: 'fl oz', to: 'ml',  label: '1 fl oz → mL' },
  ],
  weight: [
    { value: 1,   from: 'kg', to: 'lb', label: '1 kg → lb' },
    { value: 1,   from: 'lb', to: 'kg', label: '1 lb → kg' },
    { value: 1,   from: 'st', to: 'kg', label: '1 st → kg' },
    { value: 1,   from: 'oz', to: 'g',  label: '1 oz → g' },
    { value: 100, from: 'g',  to: 'oz', label: '100 g → oz' },
  ],
  temperature: [
    { value: 100, from: 'C', to: 'F', label: '100°C → °F' },
    { value: 32,  from: 'F', to: 'C', label: '32°F → °C' },
    { value: 0,   from: 'C', to: 'K', label: '0°C → K' },
    { value: 37,  from: 'C', to: 'F', label: '37°C → °F' },
    { value: -40, from: 'C', to: 'F', label: '-40°C → °F' },
  ],
  speed: [
    { value: 1,   from: 'm/s',  to: 'km/h', label: '1 m/s → km/h' },
    { value: 100, from: 'km/h', to: 'mph',  label: '100 km/h → mph' },
    { value: 1,   from: 'knot', to: 'km/h', label: '1 kn → km/h' },
    { value: 60,  from: 'mph',  to: 'km/h', label: '60 mph → km/h' },
    { value: 1,   from: 'ft/s', to: 'm/s',  label: '1 ft/s → m/s' },
  ],
  time: [
    { value: 1,    from: 'h',    to: 'min',  label: '1 h → min' },
    { value: 1,    from: 'day',  to: 'h',    label: '1 day → h' },
    { value: 1,    from: 'week', to: 'day',  label: '1 wk → days' },
    { value: 1,    from: 'year', to: 'day',  label: '1 yr → days' },
    { value: 1,    from: 'year', to: 's',    label: '1 yr → s' },
  ],
  angle: [
    { value: 1,   from: 'rad',    to: 'deg',    label: '1 rad → °' },
    { value: 180, from: 'deg',    to: 'rad',    label: '180° → rad' },
    { value: 1,   from: 'turn',   to: 'deg',    label: '1 turn → °' },
    { value: 1,   from: 'deg',    to: 'arcmin', label: "1° → arcmin" },
    { value: 1,   from: 'arcmin', to: 'arcsec', label: "1' → arcsec" },
  ],
  frequency: [
    { value: 1,  from: 'GHz', to: 'MHz', label: '1 GHz → MHz' },
    { value: 1,  from: 'MHz', to: 'kHz', label: '1 MHz → kHz' },
    { value: 60, from: 'rpm', to: 'Hz',  label: '60 rpm → Hz' },
    { value: 1,  from: 'Hz',  to: 'rpm', label: '1 Hz → rpm' },
    { value: 1,  from: 'kHz', to: 'Hz',  label: '1 kHz → Hz' },
  ],
  pressure: [
    { value: 1, from: 'atm',  to: 'kPa', label: '1 atm → kPa' },
    { value: 1, from: 'psi',  to: 'kPa', label: '1 psi → kPa' },
    { value: 1, from: 'bar',  to: 'psi', label: '1 bar → psi' },
    { value: 1, from: 'mmHg', to: 'Pa',  label: '1 mmHg → Pa' },
    { value: 1, from: 'kPa',  to: 'psi', label: '1 kPa → psi' },
  ],
  energy: [
    { value: 1, from: 'kWh',  to: 'MJ',  label: '1 kWh → MJ' },
    { value: 1, from: 'kcal', to: 'kJ',  label: '1 kcal → kJ' },
    { value: 1, from: 'BTU',  to: 'kJ',  label: '1 BTU → kJ' },
    { value: 1, from: 'MJ',   to: 'kWh', label: '1 MJ → kWh' },
    { value: 1, from: 'eV',   to: 'J',   label: '1 eV → J' },
  ],
  power: [
    { value: 1,   from: 'hp',     to: 'kW',     label: '1 hp → kW' },
    { value: 1,   from: 'kW',     to: 'hp',     label: '1 kW → hp' },
    { value: 1,   from: 'kW',     to: 'BTU/hr', label: '1 kW → BTU/h' },
    { value: 100, from: 'W',      to: 'hp',     label: '100 W → hp' },
    { value: 1,   from: 'MW',     to: 'kW',     label: '1 MW → kW' },
  ],
  force: [
    { value: 1, from: 'N',   to: 'lbf', label: '1 N → lbf' },
    { value: 1, from: 'lbf', to: 'N',   label: '1 lbf → N' },
    { value: 1, from: 'kgf', to: 'N',   label: '1 kgf → N' },
    { value: 1, from: 'kN',  to: 'lbf', label: '1 kN → lbf' },
    { value: 1, from: 'kip', to: 'kN',  label: '1 kip → kN' },
  ],
  data: [
    { value: 1, from: 'GB',  to: 'MB',  label: '1 GB → MB' },
    { value: 1, from: 'GiB', to: 'GB',  label: '1 GiB → GB' },
    { value: 1, from: 'TB',  to: 'GB',  label: '1 TB → GB' },
    { value: 1, from: 'MB',  to: 'MiB', label: '1 MB → MiB' },
    { value: 8, from: 'bit', to: 'B',   label: '8 bit → B' },
  ],
  fuel: [
    { value: 30, from: 'mpg_us',      to: 'l_per_100km', label: '30 mpg → L/100km' },
    { value: 10, from: 'l_per_100km', to: 'mpg_us',      label: '10 L/100km → mpg' },
    { value: 1,  from: 'mpg_us',      to: 'km_per_l',    label: '1 mpg → km/L' },
    { value: 1,  from: 'mpg_uk',      to: 'km_per_l',    label: '1 mpg UK → km/L' },
    { value: 10, from: 'km_per_l',    to: 'l_per_100km', label: '10 km/L → L/100km' },
  ],
};
