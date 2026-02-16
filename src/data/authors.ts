export const authors = {
  'meilleur-choix': {
    id: 'meilleur-choix',
    name: 'Meilleur Choix',
    type: 'organization' as const,
    role: {
      fr: 'Média comparatif tech',
      en: 'Tech comparison media',
    },
    bio: {
      fr: 'Meilleur Choix est un média indépendant spécialisé dans les comparatifs de solutions tech, SaaS et services numériques. Notre mission : vous aider à faire le bon choix.',
      en: 'Meilleur Choix is an independent media outlet specializing in tech, SaaS, and digital service comparisons. Our mission: helping you make the right choice.',
    },
  },
  'thomas-durand': {
    id: 'thomas-durand',
    name: 'Thomas Durand',
    type: 'person' as const,
    jobTitle: {
      fr: 'Rédacteur en chef',
      en: 'Editor-in-Chief',
    },
    role: {
      fr: 'Rédacteur en chef & analyste tech',
      en: 'Editor-in-Chief & tech analyst',
    },
    bio: {
      fr: 'Thomas Durand est rédacteur en chef de Meilleur Choix. Passionné de technologie, il teste et compare les solutions numériques pour aider les professionnels et particuliers à faire les bons choix.',
      en: 'Thomas Durand is Editor-in-Chief at Meilleur Choix. Passionate about technology, he tests and compares digital solutions to help professionals and individuals make the right choices.',
    },
    linkedinUrl: '',
    expertise: ['SaaS', 'Cloud Computing', 'Cybersécurité', 'Outils de productivité'],
  },
} as const;

export type AuthorId = keyof typeof authors;
