const dataBase = require('../database/connection');

// OBTENER TODOS LAS REGIONES DE LA BASE DE DATOS
const getAllRegions = () => {
  const sqlQuery = `SELECT id_region, name FROM regions`;
  return new Promise((resolve, reject) => {
    dataBase.query(sqlQuery, (error, regions) => {
      if (error) {
        reject(error);
      } else {
        resolve(regions);
      }
    });
  });
};

// OBTENER UNA REGION DE LA BASE DE DATOS
const getRegion = (id) => {
  const sqlQuery = `SELECT id_region, name FROM regions WHERE id_region = ?`;
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

// GUARDAR REGION EN LA BASE DE DATOS
const saveRegionOnDB = (region) => {
  const sqlQuery = "INSERT INTO regions SET ?";
  return new Promise((resolve, reject) => {
    dataBase.query(sqlQuery, [region], (error, region) => {
      if (error) {
        return reject(error);
      } else {
        return resolve(region);
      }
    });
  });
};

// ACTUALIZAR REGION EN LA BASE DE DATOS
const updateRegionOnDB = (region, id) => {
  const sqlQuery = "UPDATE regions SET ? WHERE id_region = ?";
  return new Promise((resolve, reject) => {
    dataBase.query(sqlQuery, [region, id], (error, region) => {
      if (error) {
        return reject(error);
      } else {
        return resolve(region);
      }
    });
  });
};

// ELIMINAR REGION DE LA BASE DE DATOS
const deleteRegionOnDB = (id) => {
  const sqlQuery = "DELETE FROM regions WHERE id_region = ?";
  return new Promise((resolve, reject) => {
    dataBase.query(sqlQuery, [id], (error, region) => {
      if (error) {
        reject(error);
      } else {
        return resolve(region);
      }
    });
  });
};

module.exports = {
  getAllRegions,
  getRegion,
  saveRegionOnDB,
  updateRegionOnDB,
  deleteRegionOnDB
};