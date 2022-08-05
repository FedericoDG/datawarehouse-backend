const dataBase = require('../database/connection');

// OBTENER TODOS LOS CONTACTOS DE LA BASE DE DATOS
const getAllContacts = () => {
  const sqlQuery = `SELECT id_contact, name, lastname, email, address,
  phone,
  preference_phone,
  (SELECT name FROM preferences WHERE id_preference = contacts.preference_phone)AS preference_phone_name,
  linkedin,
  preference_linkedin,
  (SELECT name FROM preferences WHERE id_preference = contacts.preference_linkedin)AS preference_linkedin_name,
  facebook,
  preference_facebook,
  (SELECT name FROM preferences WHERE id_preference = contacts.preference_facebook)AS preference_facebook_name,
  twitter,
  preference_twitter,
  (SELECT name FROM preferences WHERE id_preference = contacts.preference_twitter)AS preference_twitter_name,
  instagram,
  preference_instagram,
  (SELECT name FROM preferences WHERE id_preference = contacts.preference_instagram)AS preference_instagram_name,
  position, interest,
  id_company,
  (SELECT name FROM companies WHERE id_company = contacts.id_company)AS company_name,
  id_city,
  (SELECT name FROM cities WHERE id_city = contacts.id_company)AS city_name,
  (SELECT id_country FROM cities WHERE id_city = contacts.id_city)AS id_country,
  (SELECT name FROM countries WHERE id_country = (SELECT id_country FROM cities WHERE id_city = contacts.id_city)) AS country_name,
  (SELECT id_region FROM countries WHERE id_country = (SELECT id_country FROM cities WHERE id_city = contacts.id_city)) AS id_region,
  (SELECT name FROM regions WHERE id_region = (SELECT id_region FROM countries WHERE id_country = (SELECT id_country FROM cities WHERE id_city = contacts.id_city))) AS region_name
  FROM contacts`;
  return new Promise((resolve, reject) => {
    dataBase.query(sqlQuery, (error, contacts) => {
      if (error) {
        reject(error);
      } else {
        resolve(contacts);
      }
    });
  });
};

// OBTENER UN CONTACTO DE LA BASE DE DATOS
const getOneContact = (id) => {
  const sqlQuery = `SELECT id_contact, name, lastname, email, address,
  phone,
  preference_phone,
  (SELECT name FROM preferences WHERE id_preference = contacts.preference_phone)AS preference_phone_name,
  linkedin,
  preference_linkedin,
  (SELECT name FROM preferences WHERE id_preference = contacts.preference_linkedin)AS preference_linkedin_name,
  facebook,
  preference_facebook,
  (SELECT name FROM preferences WHERE id_preference = contacts.preference_facebook)AS preference_facebook_name,
  twitter,
  preference_twitter,
  (SELECT name FROM preferences WHERE id_preference = contacts.preference_twitter)AS preference_twitter_name,
  instagram,
  preference_instagram,
  (SELECT name FROM preferences WHERE id_preference = contacts.preference_instagram)AS preference_instagram_name,
  position, interest,
  id_company,
  (SELECT name FROM companies WHERE id_company = contacts.id_company)AS company_name,
  id_city,
  (SELECT name FROM cities WHERE id_city = contacts.id_company)AS city_name,
  (SELECT id_country FROM cities WHERE id_city = contacts.id_city)AS id_country,
  (SELECT name FROM countries WHERE id_country = (SELECT id_country FROM cities WHERE id_city = contacts.id_city)) AS country_name,
  (SELECT id_region FROM countries WHERE id_country = (SELECT id_country FROM cities WHERE id_city = contacts.id_city)) AS id_region,
  (SELECT name FROM regions WHERE id_region = (SELECT id_region FROM countries WHERE id_country = (SELECT id_country FROM cities WHERE id_city = contacts.id_city))) AS region_name
  FROM contacts WHERE id_contact = ?`;
  return new Promise((resolve, reject) => {
    dataBase.query(sqlQuery, [id], (error, contacts) => {
      if (error) {
        reject(error);
      } else {
        resolve(contacts);
      }
    });
  });
};

// GUARDAR CONTACTO EN LA BASE DE DATOS
const saveContactOnDB = (contact) => {
  const sqlQuery = 'INSERT INTO contacts SET ?';
  return new Promise((resolve, reject) => {
    dataBase.query(sqlQuery, [contact], (error, contact) => {
      if (error) {
        return reject(error);
      } else {
        return resolve(contact);
      }
    });
  });
};

// ACTUALIZAR CONTACTO EN LA BASE DE DATOS
const updateContactOnDB = (contact, id) => {
  const sqlQuery = 'UPDATE contacts SET ? WHERE id_contact = ?';
  return new Promise((resolve, reject) => {
    dataBase.query(sqlQuery, [contact, id], (error, contact) => {
      if (error) {
        return reject(error);
      } else {
        return resolve(contact);
      }
    });
  });
};

// ELIMINAR CONTACTO DE LA BASE DE DATOS
const deleteContactoOnDB = (id) => {
  const sqlQuery = 'DELETE FROM contacts WHERE id_contact = ?';
  return new Promise((resolve, reject) => {
    dataBase.query(sqlQuery, [id], (error, user) => {
      if (error) {
        reject(error);
      } else {
        return resolve(user);
      }
    });
  });
};

module.exports = {
  getAllContacts,
  getOneContact,
  saveContactOnDB,
  updateContactOnDB,
  deleteContactoOnDB
};
