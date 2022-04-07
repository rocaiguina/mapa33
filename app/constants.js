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
  agricole: 'Agrícola',
  nature_forest: 'Área natural',
  commercial: 'Comercial',
  industrial: 'Industrial',
  recreational: 'Recreativo',
  residential: 'Residencial',
  tourism: 'Turismo',
  unknow: 'No sé',
  others: 'Otros',
};

export const LAND_MAIN_USES = [
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

export const LAND_STRUCTURES = [
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

export const LAND_ATTRIBUTE = {
  nature: 'Naturaleza',
  educational: 'Educativos',
  landscape: 'Paisajistas y escénicos',
  others: 'Otros',
};

export const LAND_ATTRIBUTES = [
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

export const LAND_PROPOSED_USE = {
  scientist_research: 'Investigación científica',
  environment_monitoring: 'Monitoreo ambiental',
  spirit_uses: 'Bienestar, usos espirituales',
  educational: 'Educación',
  recreation: 'Recreación',
  turism: 'Turismo',
  sustainable_uses: 'Agroecología',
};

export const LAND_PROPOSED_USES = [
  {
    value: 'sustainable_uses',
    label: 'Agroecología',
  },
  {
    value: 'spirit_uses',
    label: 'Bienestar, usos espirituales',
  },
  {
    value: 'turism',
    label: 'Ecoturismo',
  },
  {
    value: 'educational',
    label: 'Educación',
  },
  {
    value: 'scientist_research',
    label: 'Investigación científica',
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
