'use strict';

export const LAND_STATUS_NEW = 'new';
export const LAND_STATUS_DENIED = 'denied';
export const LAND_STATUS_APPROVED = 'approved';

export const MEMORY_STATUS_NEW = 'NEW';
export const MEMORY_STATUS_APPROVED = 'APPROVED';
export const MEMORY_STATUS_REJECTED = 'REJECTED';

export const LAND_LEVEL_BASIC = 'basic';
export const LAND_LEVEL_PLEDGE = 'pledge';
export const LAND_LEVEL_CONSERVED = 'conserved';

export const LAND_LEVELS = [
  {
    value: LAND_LEVEL_BASIC,
    label: 'Basic',
  },
  {
    value: LAND_LEVEL_PLEDGE,
    label: 'Pledge',
  },
  {
    value: LAND_LEVEL_CONSERVED,
    label: 'Conserved',
  },
];

export const LAND_TYPES = [
  {
    value: 'Marina',
    label: 'Marina',
  },
  {
    value: 'Terrestre',
    label: 'Terrestre',
  },
];

export const LAND_STATUS = [
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

export const LAND_ISSUES = [
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

export const LAND_MAIN_USE = {
  residential: 'Residencial',
  commercial: 'Comercial',
  nature_forest: 'Natural/Bosque',
  others: 'Otros',
};

export const LAND_MAIN_USES = [
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

export const LAND_STRUCTURES = [
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

export const LAND_ATTRIBUTE = {
  nature: 'Naturaleza',
  educational: 'Educativos',
  landscape: 'Paisajistas y escénicos',
  others: 'Otros',
};

export const LAND_ATTRIBUTES = [
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

export const LAND_PROPOSED_USE = {
  scientist_research: 'Investigación científica',
  environment_monitoring: 'Monitoreo ambiental',
  spirit_uses: 'Usos espirituales',
  educational: 'Educación',
  recreation: 'Recreación',
  turism: 'Turismo',
  sustainable_uses: 'Usos sostenibles',
};

export const LAND_PROPOSED_USES = [
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

export const LAND_PROTECTION_REASON = {
  nature:
    'Es un espacio 100% natural y quiero evitar cualquier perturbación e impacto humano.',
  nature_low_human:
    'Es un lugar natural con bajo impacto humano y quiero evitar mayores perturbaciones.',
  nature_special:
    'Es un lugar con rasgos naturales especiales(p.e. arboledas, mogotes, lagunas, cuevas)',
  species_protection:
    'Es un lugar donde habitan especies que deber ser protegidas',
  historic:
    'Es un lugar con historia natural y cultural que debe ser protegida',
  conservation:
    'Es un lugar óptimo donde la conservación y el desarrollo sustentable pueden ocurrir a la vez.',
};

export const LAND_PROTECTION_REASONS = [
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

export default {
  LAND_LEVELS,
  LAND_TYPES,
  LAND_STATUS,
  LAND_ISSUES,
  LAND_MAIN_USES,
  LAND_STRUCTURES,
  LAND_ATTRIBUTES,
  LAND_PROPOSED_USES,
  LAND_PROTECTION_REASONS,
};
