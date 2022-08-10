const fs = require('fs');

const sqlFileExecuter = require('../helpers/sqlFileExecutor');

const seed = async (_, res) => {
  const SQL_DUMP_FILE = fs.readFileSync('./database/datawarehouse.sql', 'utf-8');

  sqlFileExecuter(SQL_DUMP_FILE);

  res.json({
    message: 'La base de datos ha sido regenerada con éxito'
  });
};

module.exports = {
  seed
};
