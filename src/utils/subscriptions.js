'use strict';

const sendgridClient = require('@sendgrid/client');
sendgridClient.setApiKey(process.env.SENDGRID_API_KEY);

const MAPA33_LIST_ID = 'c3723e4c-ba16-4a0a-aed3-3d734a15cf43';
const FIELD_USOS_PROPUESTOS = 'e3_T';
const FIELD_OPT_IN = 'e4_T';
const FIELD_PROPONENTE = 'e5_T';
const FIELD_PROPIETARIO = 'e6_T';

module.exports.create = ({
  firstName,
  lastName,
  email,
  postalCode,
  optIn,
  propietario,
  proponente,
  usosPropuestos,
}) => {
  const contact = {
    email,
    custom_fields: {
      [FIELD_PROPIETARIO]: 'no',
      [FIELD_PROPONENTE]: 'no',
      [FIELD_USOS_PROPUESTOS]: '',
    },
  };

  if (firstName) {
    contact.first_name = firstName;
  }

  if (lastName) {
    contact.last_name = lastName;
  }

  if (postalCode) {
    contact.postal_code = postalCode;
  }

  if (optIn != null) {
    contact.custom_fields[FIELD_OPT_IN] = optIn;
  }

  if (propietario != null) {
    contact.custom_fields[FIELD_PROPIETARIO] = propietario;
  }

  if (proponente != null) {
    contact.custom_fields[FIELD_PROPONENTE] = proponente;
  }

  if (usosPropuestos != null) {
    contact.custom_fields[FIELD_USOS_PROPUESTOS] = usosPropuestos;
  }

  const data = {
    contacts: [contact],
    list_ids: [MAPA33_LIST_ID],
  };

  const request = {
    url: `/v3/marketing/contacts`,
    method: 'PUT',
    body: data,
  };

  return new Promise((resolve, reject) => {
    sendgridClient
      .request(request)
      .then(([response, body]) => {
        console.log(response);
        resolve(body.job_id);
      })
      .catch(error => {
        reject(error);
      });
  });
};
