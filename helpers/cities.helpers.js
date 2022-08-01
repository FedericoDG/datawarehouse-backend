const dataBase = require('../database/connection');

// OBTENER TODAS LAS CIUDADES  DE LA BASE DE DATOS
const getAllCities = () => {
  const sqlQuery = `SELECT id_city, name, id_country, (SELECT name FROM countries WHERE id_country = cities.id_country) AS name_country FROM cities`;
  return new Promise((resolve, reject) => {
    dataBase.query(sqlQuery, (error, cities) => {
      if (error) {
        reject(error);
      } else {
        resolve(cities);
      }
    });
  });
};

// OBTENER UNA CIUDAD DE LA BASE DE DATOS
const getCity = (id) => {
  const sqlQuery = `SELECT id_city, name, id_country, (SELECT name FROM countries WHERE id_country = cities.id_country) AS name_country FROM cities WHERE id_city = ?`;
  return new Promise((resolve, reject) => {
    dataBase.query(sqlQuery, [id], (error, city) => {
      if (error) {
        reject(error);
      } else {
        resolve(city);
      }
    });
  });
};

// GUARDAR CIUDAD EN LA BASE DE DATOS
const saveCityOnDB = (city) => {
  const sqlQuery = "INSERT INTO cities SET ?";
  return new Promise((resolve, reject) => {
    dataBase.query(sqlQuery, [city], (error, city) => {
      if (error) {
        return reject(error);
      } else {
        return resolve(city);
      }
    });
  });
};

// ACTUALIZAR CIUDAD EN LA BASE DE DATOS
const updateCityOnDB = (city, id) => {
  const sqlQuery = "UPDATE cities SET ? WHERE id_city = ?";
  return new Promise((resolve, reject) => {
    dataBase.query(sqlQuery, [city, id], (error, city) => {
      if (error) {
        return reject(error);
      } else {
        return resolve(city);
      }
    });
  });
};

// ELIMINAR CIUDAD DE LA BASE DE DATOS
const deleteCityOnDB = (id) => {
  const sqlQuery = "DELETE FROM cities WHERE id_city = ?";
  return new Promise((resolve, reject) => {
    dataBase.query(sqlQuery, [id], (error, city) => {
      if (error) {
        reject(error);
      } else {
        return resolve(city);
      }
    });
  });
};

module.exports = {
  getAllCities,
  getCity,
  saveCityOnDB,
  updateCityOnDB,
  deleteCityOnDB
}