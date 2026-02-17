export const siteConfig = {
  brand: {
    name: 'meilleur-choix',
    siteName: 'Meilleur Classement',
    domain: 'analytics-ds.github.io/meilleur-choix',
    parentUrl: '',
    tagline: {
      fr: 'Comparez, choisissez, avancez',
      en: 'Compare, choose, move forward',
    },
    foundingYear: '2026',
    address: {
      street: '',
      city: '',
      postalCode: '',
      country: 'FR',
    },
    linkedinUrl: '',
    employeeRange: '1-10',
    expertise: [
      'Comparatifs Tech',
      'SaaS',
      'Hébergement Web',
      'Cybersécurité',
      'Logiciels',
    ],
  },
  sellingPoints: {
    certification: '',
    clientsCount: '',
    keyClients: [],
    differentiators: [
      'Comparatifs indépendants et détaillés',
      'Méthodologie transparente',
      'Tests réels des solutions',
    ],
  },
  design: {
    primaryColor: '#059669',
    secondaryColor: '#10B981',
    accentColor: '#F59E0B',
    fontFamily: 'Inter',
    fontWeights: '300;400;500;600;700;800',
  },
  languages: {
    primary: 'fr' as const,
    secondary: 'en' as const,
  },
  categories: [
    'SaaS & Logiciels',
    'Hébergement & Cloud',
    'VPN & Sécurité',
  ],
} as const;

export type Lang = 'fr' | 'en';
