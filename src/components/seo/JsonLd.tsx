const SITE_URL = 'https://www.quickunitswap.com';
const SITE_NAME = 'QuickUnitSwap';

/** WebApplication schema — tells Google this is a web app (eligible for rich results). */
const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: SITE_NAME,
  url: SITE_URL,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  browserRequirements: 'Requires JavaScript. Requires HTML5.',
  description:
    'Free online unit converter and calculator — 15 categories, 150+ units. Convert and calculate length, area, volume, weight, temperature, speed, time, angle, frequency, pressure, energy, power, force, data storage, and fuel economy.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  featureList: [
    'Length converter (pm to light-years)',
    'Area converter (mm² to mi²)',
    'Volume converter (mL to cubic meters)',
    'Weight converter (μg to long tons)',
    'Temperature converter (°C, °F, K, °R)',
    'Speed converter (mm/s to speed of light)',
    'Time converter (ns to centuries)',
    'Angle converter (rad to arc seconds)',
    'Frequency converter (mHz to THz)',
    'Pressure converter (Pa to inHg)',
    'Energy converter (J to BTU)',
    'Power converter (W to horsepower)',
    'Force converter (N to kip)',
    'Data storage converter (bit to PB, KiB to TiB)',
    'Fuel economy converter (mpg to L/100km)',
  ],
  screenshot: `${SITE_URL}/og.png`,
  author: {
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
  },
};

/** FAQ schema — common conversion questions for rich result eligibility. */
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How many meters are in a mile?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'There are exactly 1,609.344 meters in one mile.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do you convert Celsius to Fahrenheit?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Multiply the Celsius value by 9/5, then add 32. For example, 100°C = (100 × 9/5) + 32 = 212°F.',
      },
    },
    {
      '@type': 'Question',
      name: 'How many pounds are in a kilogram?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'One kilogram equals approximately 2.20462 pounds.',
      },
    },
    {
      '@type': 'Question',
      name: 'How many liters are in a US gallon?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'One US gallon equals exactly 3.785411784 liters.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do you convert km/h to mph?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Multiply km/h by 0.621371 to get mph. For example, 100 km/h ≈ 62.14 mph.',
      },
    },
    {
      '@type': 'Question',
      name: 'How many kilojoules are in a kilocalorie (kcal)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'One kilocalorie equals exactly 4.184 kilojoules.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do you convert MPG to liters per 100 km?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Divide 235.215 by the MPG value to get L/100km. For example, 30 mpg ≈ 7.84 L/100km.',
      },
    },
    {
      '@type': 'Question',
      name: 'How many bits are in a gigabyte?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'One gigabyte (GB) equals 8,000,000,000 bits using SI decimal prefixes, or 8,589,934,592 bits in a gibibyte (GiB) using binary prefixes.',
      },
    },
  ],
};

/** BreadcrumbList schema for the homepage. */
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: SITE_URL,
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Unit Converter',
      item: SITE_URL,
    },
  ],
};

export function JsonLd() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
