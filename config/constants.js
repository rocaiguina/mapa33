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
    value: 'residential',
    label: 'Residencial',
  },
  {
    value: 'commercial',
    label: 'Comercial',
  },
  {
    value: 'nature_forest',
    label: 'Natural/Bosque',
  },
  {
    value: 'others',
    label: 'Otros',
  },
];

module.exports.LAND_STRUCTURES = [
  {
    value: 'residential',
    label: 'Residencial',
  },
  {
    value: 'commercial',
    label: 'Comercial/Oficina',
  },
  {
    value: 'agricultural',
    label: 'Agrícola',
  },
  {
    value: 'others',
    label: 'Otros',
  },
];

module.exports.LAND_ATTRIBUTES = [
  {
    value: 'nature',
    label: 'Naturaleza',
  },
  {
    value: 'educational',
    label: 'Educativos',
  },
  {
    value: 'landscape',
    label: 'Paisajistas y escénicos',
  },
  {
    value: 'others',
    label: 'Otros',
  },
];

module.exports.LAND_PROPOSED_USES = [
  {
    value: 'scientist_research',
    label: 'Investigación científica',
  },
  {
    value: 'environment_monitoring',
    label: 'Monitoreo ambiental',
  },
  {
    value: 'spirit_uses',
    label: 'Usos espirituales',
  },
  {
    value: 'educational',
    label: 'Educación',
  },
  {
    value: 'recreation',
    label: 'Recreación',
  },
  {
    value: 'turism',
    label: 'Turismo',
  },
  {
    value: 'sustainable_uses',
    label: 'Usos sostenibles',
  },
];

module.exports.LAND_PROTECTION_REASONS = [
  {
    value: 'nature',
    label:
      'Es un espacio 100% natural y quiero evitar cualquier perturbación e impacto humano.',
  },
  {
    value: 'nature_low_human',
    label:
      'Es un lugar natural con bajo impacto humano y quiero evitar mayores perturbaciones.',
  },
  {
    value: 'nature_special',
    label:
      'Es un lugar con rasgos naturales especiales(p.e. arboledas, mogotes, lagunas, cuevas)',
  },
  {
    value: 'species_protection',
    label: 'Es un lugar donde habitan especies que deber ser protegidas',
  },
  {
    value: 'historic',
    label: 'Es un lugar con historia natural y cultural que debe ser protegida',
  },
  {
    value: 'conservation',
    label:
      'Es un lugar óptimo donde la conservación y el desarrollo sustentable pueden ocurrir a la vez.',
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
