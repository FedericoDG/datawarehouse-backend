const fs = require('fs');

const sqlFileExecuter = require('../helpers/sqlFileExecutor');

const seed = async (_, res) => {
  try {
    const SQL_DUMP_FILE = fs.readFileSync('./database/datawarehouse.sql', 'utf-8');
    sqlFileExecuter(SQL_DUMP_FILE);
    res.json({
      message: 'La base de datos ha sido regenerada con éxito'
    });
  } catch (error) {
    res.status(500).json({
      response: false,
      message: 'Ha ocurrido un error.',
      error
    });
  }
};

module.exports = {
  seed
};
