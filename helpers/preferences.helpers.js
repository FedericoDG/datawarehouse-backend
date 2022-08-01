const dataBase = require("../database/connection");

const getPreferences = () => {
  const sqlQuery = `SELECT * FROM preferences`;
  return new Promise((resolve, reject) => {
    dataBase.query(sqlQuery, (error, preferences) => {
      if (error) {
        reject(error);
      } else {
        resolve(preferences);
      }
    });
  });
};

module.exports = {
  getPreferences
}