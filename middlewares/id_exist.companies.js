// MIDDLEWARE PARA COMPROBAR SI ID_COMPANY EXISTE EN LA BASE DE DATOS
const dataBase = require('../database/connection');

const companyIdExist = async (req, res, next) => {
  const { id } = req.params;
  try {
    const resp = await new Promise((resolve, reject) => {
      const sqlQuery = 'SELECT * FROM companies WHERE id_company = ?';
      dataBase.query(sqlQuery, [id], (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
    if (resp.length < 1) {
      return res.status(404).json({
        respose: false,
        message: `No existe una compañía con el id_company: ${id}.`
      });
    }
    next();
  } catch (error) {
    res.status(500).json({
      respose: false,
      message: 'Ha ocurrido un error.',
      error
    });
  }
};

module.exports = companyIdExist;