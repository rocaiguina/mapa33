'use strict';

module.exports.LAND_LEVELS = [
  {
    value: 'basic',
    label: 'Basic',
  },
  {
    value: 'pledge',
    label: 'Pledge',
  },
  {
    value: 'conserved',
    label: 'Conserved',
  },
];

module.exports.LAND_TYPES = [
  {
    value: 'Marina',
    label: 'Marina',
  },
  {
    value: 'Terrestre',
    label: 'Terrestre',
  },
];

module.exports.LAND_STATUS = [
  {
    value: 'new',
    label: 'New',
  },
  {
    value: 'denied',
    label: 'Denied',
  },
  {
    value: 'approved',
    label: 'Approved',
  },
];

module.exports.LAND_ISSUES = [
  {
    value: 'no',
    label: 'No',
  },
  {
    value: 'crim_debt',
    label: 'Deuda en el CRIM',
  },
  {
    value: 'legal_issues',
    label: 'Problemas legales',
  },
  {
    value: 'ownership_issues',
    label: 'Problemas de titularidad',
  },
  {
    value: 'others',
    label: 'Otros',
  },
];

module.exports.LAND_MAIN_USES = [
  {
    value: 'agricole',
    label: 'Agrícola',
  },
  {
    value: 'nature_forest',
    label: 'Área natural',
  },
  {
    value: 'commercial',
    label: 'Comercial',
  },
  {
    value: 'industrial',
    label: 'Industrial',
  },
  {
    value: 'recreational',
    label: 'Recreativo',
  },
  {
    value: 'residential',
    label: 'Residencial',
  },
  {
    value: 'tourism',
    label: 'Turismo',
  },
  {
    value: 'unknow',
    label: 'No sé',
  },
  {
    value: 'others',
    label: 'Otros',
  },
];

module.exports.LAND_STRUCTURES = [
  {
    value: 'agricultural',
    label: 'Agrícola',
  },
  {
    value: 'commercial',
    label: 'Comercial / oficina',
  },
  {
    value: 'energy',
    label: 'Energía',
  },
  {
    value: 'industrial',
    label: 'Industrial',
  },
  {
    value: 'residential',
    label: 'Residencial',
  },
  {
    value: 'telecommunications',
    label: 'Telecomunicaciones',
  },
  {
    value: 'tourism',
    label: 'Turístico',
  },
  {
    value: 'none',
    label: 'Ninguna',
  },
  {
    value: 'unknow',
    label: 'No sé',
  },
  {
    value: 'others',
    label: 'Otros',
  },
];

module.exports.LAND_ATTRIBUTES = [
  {
    value: 'forest',
    label: 'Bosque',
  },
  {
    value: 'coast',
    label: 'Costa',
  },
  {
    value: 'endangered_species',
    label: 'Especies endémicas o en peligro de extinción',
  },
  {
    value: 'lake',
    label: 'Lago o laguna',
  },
  {
    value: 'mangle',
    label: 'Mangle',
  },
  {
    value: 'landscape',
    label: 'Paisaje',
  },
  {
    value: 'pastureland',
    label: 'Pastizal',
  },
  {
    value: 'river',
    label: 'Río o quebrada',
  },
  {
    value: 'others',
    label: 'Otros',
  },
];

module.exports.LAND_PROPOSED_USES = [
  {
    value: 'sustainable_uses',
    label: 'Agroecología',
  },
  {
    value: 'spirit_uses',
    label: 'Bienestar, usos espirituales',
  },
  {
    value: 'conservation',
    label: 'Conservación estricta',
  },
  {
    value: 'tourism',
    label: 'Ecoturismo',
  },
  {
    value: 'educational',
    label: 'Educación e investigación científica',
  },
  {
    value: 'environment_monitoring',
    label: 'Monitoreo ambiental',
  },
  {
    value: 'recreation',
    label: 'Recreación',
  },
];

module.exports.LAND_PROTECTION_REASONS = [
  {
    value: 'nature',
    label:
      'Es rico en naturaleza y quiero evitar cualquier perturbación e impacto humano adicional.',
  },
  {
    value: 'nature_low_human',
    label: 'Es ideal para promover la educación y el uso recreativo.',
  },
  {
    value: 'nature_special',
    label:
      'Tiene rasgos naturales especiales (ej. arboledas, mogotes, lagunas, cuevas).',
  },
  {
    value: 'species_protection',
    label: 'Habitan especies que deben ser protegidas.',
  },
  {
    value: 'historic',
    label: 'Tiene historia natural y cultural que debe ser protegida.',
  },
  {
    value: 'conservation',
    label:
      'Se puede practicar la conservación y el desarrollo sustentable.(ej. agroecología, ecoturismo)',
  },
  {
    value: 'emotional',
    label:
      'Tiene valor emocional, espiritual y/o cultural para mí y mi comunidad.',
  },
];

module.exports.MEMORY_STATUS = {
  NEW: 'NEW',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
};

module.exports.MULTIMEDIABLES = {
  MEMORY: 'MEMORY',
};

module.exports.MEMORY_STATUS_LIST = [
  {
    value: 'NEW',
    label: 'New',
  },
  {
    value: 'REJECTED',
    label: 'Rejected',
  },
  {
    value: 'APPROVED',
    label: 'Approved',
  },
];

module.exports.SENDGRID_TEMPLATES = {
  LAND_APPROVED: 'd-864a041ce69345a28d3a5c1dd530700a',
  LAND_DENIED: 'd-3ff254035db74cec8eb0ce4e24d993d1',
  LAND_FOLLOW_UP: 'd-48aaa5ef91144316b0212d9bce04eeea',
  USER_PASSWORD_RECOVER: 'd-024b5f22e90e4533961996256953aea6',
  USER_REGISTER: 'd-e6641e63796d4c63b5e03cf5a25b78cf',
};
