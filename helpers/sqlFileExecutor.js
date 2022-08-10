const dataBase = require('../database/connection');

const sqlFileExecuter = (sqlDumpFile) =>
  sqlDumpFile.split(/\r?\n/).forEach((line) => {
    return new Promise((resolve, reject) => {
      dataBase.query(line, (error, city) => {
        if (error) {
          reject(error);
        } else {
          resolve(city);
        }
      });
    });
  });

module.exports = sqlFileExecuter;
