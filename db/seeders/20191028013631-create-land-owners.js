'use strict';

const encryptor = require('../../server/utils/encryptor');

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('users',[
      {
        id: 2,
        first_name: 'Departamento de Recursos Naturales y Ambientales (DRNA)',
        last_name: '',
        email: 'user1@domain.com',
        password: encryptor.encrypt('admin123'),
        role: 'subscriptor',
      },
      {
        id: 3,
        first_name: 'Co-manejo: DRNA y Taller de Arte y Cultura de Adjuntas',
        last_name: '',
        email: 'user2@domain.com',
        password: encryptor.encrypt('admin123'),
        role: 'subscriptor',
      },
      {
        id: 4,
        first_name: 'Co-manejo: DRNA y Club Cívico Ambiental de Palos Blancos',
        last_name: '',
        email: 'user3@domain.com',
        password: encryptor.encrypt('admin123'),
        role: 'subscriptor',
      },
      {
        id: 5,
        first_name: 'US Fish and Wildlife Service (USFWS)',
        last_name: '',
        email: 'user4@domain.com',
        password: encryptor.encrypt('admin123'),
        role: 'subscriptor',
      },
      {
        id: 6,
        first_name: 'Programa de Parques Nacionales de PR',
        last_name: '',
        email: 'user5@domain.com',
        password: encryptor.encrypt('admin123'),
        role: 'subscriptor',
      },
      {
        id: 7,
        first_name: 'Ciudadanos del Karso',
        last_name: '',
        email: 'user6@domain.com',
        password: encryptor.encrypt('admin123'),
        role: 'subscriptor',
      },
      {
        id: 8,
        first_name: 'USDA Forest Service',
        last_name: '',
        email: 'user7@domain.com',
        password: encryptor.encrypt('admin123'),
        role: 'subscriptor',
      },
      {
        id: 9,
        first_name: 'Dueños, publicos y privados, siguiendo el Plan y Reglamento del APE del Carso',
        last_name: '',
        email: 'user8@domain.com',
        password: encryptor.encrypt('admin123'),
        role: 'subscriptor',
      },
      {
        id: 10,
        first_name: 'Instituto de Cultura Puertorriqueña',
        last_name: '',
        email: 'user9@domain.com',
        password: encryptor.encrypt('admin123'),
        role: 'subscriptor',
      },
      {
        id: 11,
        first_name: 'Co-manejo: DRNA / NOAA',
        last_name: '',
        email: 'user10@domain.com',
        password: encryptor.encrypt('admin123'),
        role: 'subscriptor',
      },
      {
        id: 12,
        first_name: 'Co-manejo: Programa del Estuario de la Bahía de San Juan y DRNA',
        last_name: '',
        email: 'user11@domain.com',
        password: encryptor.encrypt('admin123'),
        role: 'subscriptor',
      },
      {
        id: 13,
        first_name: 'Para la Naturaleza',
        last_name: '',
        email: 'user12@domain.com',
        password: encryptor.encrypt('admin123'),
        role: 'subscriptor',
      },
      {
        id: 14,
        first_name: 'Tropic Ventures Education and Research Foundation',
        last_name: '',
        email: 'user13@domain.com',
        password: encryptor.encrypt('admin123'),
        role: 'subscriptor',
      },
      {
        id: 15,
        first_name: 'Fundacion Luis Muñoz Marin',
        last_name: '',
        email: 'user14@domain.com',
        password: encryptor.encrypt('admin123'),
        role: 'subscriptor',
      },
      {
        id: 16,
        first_name: 'Universidad de Puerto Rico',
        last_name: '',
        email: 'user15@domain.com',
        password: encryptor.encrypt('admin123'),
        role: 'subscriptor',
      },
      {
        id: 17,
        first_name: 'Co-manejo: Proyecto Agro Eco Turístico del Barrio Rio Hondo Inc y Municipio de Mayaguez',
        last_name: '',
        email: 'user16@domain.com',
        password: encryptor.encrypt('admin123'),
        role: 'subscriptor',
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('users', null, {});
  }
};
