const dataBase = require('../database/connection');

// OBTENER TODOS LAS COMPAÑIAS DE LA BASE DE DATOS
const getAllCompanies = () => {
  const sqlQuery = `SELECT id_company, name, email, phone, address, (SELECT name FROM cities WHERE id_city = companies.id_city) AS city FROM companies`;
  return new Promise((resolve, reject) => {
    dataBase.query(sqlQuery, (error, companies) => {
      if (error) {
        reject(error);
      } else {
        resolve(companies);
      }
    });
  });
};

// OBTENER UNA COMPAÑIA DE LA BASE DE DATOS
const getCompany = (id) => {
  const sqlQuery = `SELECT id_company, name, email, phone, address, (SELECT name FROM cities WHERE id_city = companies.id_city) AS city FROM companies WHERE id_company = ?`;
  return new Promise((resolve, reject) => {
    dataBase.query(sqlQuery, [id], (error, companies) => {
      if (error) {
        reject(error);
      } else {
        resolve(companies);
      }
    });
  });
};

// GUARDAR COMPAÑIA EN LA BASE DE DATOS
const saveCompanyOnDB = (company) => {
  const sqlQuery = "INSERT INTO companies SET ?";
  return new Promise((resolve, reject) => {
    dataBase.query(sqlQuery, [company], (error, company) => {
      if (error) {
        return reject(error);
      } else {
        return resolve(company);
      }
    });
  });
};

// ACTUALIZAR COMPAÑIA EN LA BASE DE DATOS
const updateCompanyOnDB = (company, id) => {
  const sqlQuery = "UPDATE companies SET ? WHERE id_company = ?";
  return new Promise((resolve, reject) => {
    dataBase.query(sqlQuery, [company, id], (error, company) => {
      if (error) {
        return reject(error);
      } else {
        return resolve(company);
      }
    });
  });
};

// ELIMINAR COMPAÑIA DE LA BASE DE DATOS
const deleteCompanyOnDB = (id) => {
  const sqlQuery = "DELETE FROM companies WHERE id_company = ?";
  return new Promise((resolve, reject) => {
    dataBase.query(sqlQuery, [id], (error, company) => {
      if (error) {
        reject(error);
      } else {
        return resolve(company);
      }
    });
  });
};

module.exports = {
  getAllCompanies,
  getCompany,
  saveCompanyOnDB,
  updateCompanyOnDB,
  deleteCompanyOnDB
};