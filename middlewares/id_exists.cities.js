// MIDDLEWARE PARA COMPROBAR SI ID_CITY EXISTE EN LA BASE DE DATOS
const dataBase = require('../database/connection');

const citiesIdExist = async (req, res, next) => {
  const { id } = req.params;
  try {
    const resp = await new Promise((resolve, reject) => {
      const sqlQuery = 'SELECT * FROM cities WHERE id_city = ?';
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
        message: `No existe una ciudad con el id_city: ${id}.`
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

module.exports = citiesIdExist;