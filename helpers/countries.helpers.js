const dataBase = require('../database/connection');

// OBTENER TODOS LOS PAISES DE LA BASE DE DATOS
const getAllCountries = () => {
  const sqlQuery = `SELECT id_country, name, id_region, (SELECT name FROM regions WHERE id_region = countries.id_region) AS name_region FROM countries`;
  return new Promise((resolve, reject) => {
    dataBase.query(sqlQuery, (error, countries) => {
      if (error) {
        reject(error);
      } else {
        resolve(countries);
      }
    });
  });
};

// OBTENER UN PAIS DE LA BASE DE DATOS
const getCountry = (id) => {
  const sqlQuery = `SELECT id_country, name, id_region, (SELECT name FROM regions WHERE id_region = countries.id_region) AS name_region FROM countries WHERE id_country = ?`;
  return new Promise((resolve, reject) => {
    dataBase.query(sqlQuery, [id], (error, region) => {
      if (error) {
        reject(error);
      } else {
        resolve(region);
      }
    });
  });
};

// GUARDAR PAIS EN LA BASE DE DATOS
const saveCountryOnDB = (country) => {
  const sqlQuery = "INSERT INTO countries SET ?";
  return new Promise((resolve, reject) => {
    dataBase.query(sqlQuery, [country], (error, country) => {
      if (error) {
        return reject(error);
      } else {
        return resolve(country);
      }
    });
  });
};

// ACTUALIZAR PAIS EN LA BASE DE DATOS
const updateCountryOnDB = (country, id) => {
  const sqlQuery = "UPDATE countries SET ? WHERE id_country = ?";
  return new Promise((resolve, reject) => {
    dataBase.query(sqlQuery, [country, id], (error, country) => {
      if (error) {
        return reject(error);
      } else {
        return resolve(country);
      }
    });
  });
};

// ELIMINAR PAIS DE LA BASE DE DATOS
const deleteCountryOnDB = (id) => {
  const sqlQuery = "DELETE FROM countries WHERE id_country = ?";
  return new Promise((resolve, reject) => {
    dataBase.query(sqlQuery, [id], (error, country) => {
      if (error) {
        reject(error);
      } else {
        return resolve(country);
      }
    });
  });
};

module.exports = {
  getAllCountries,
  getCountry,
  saveCountryOnDB,
  updateCountryOnDB,
  deleteCountryOnDB
};