// MIDDLEWARE PARA COMPROBAR EL BODY AL CREAR UN NUEVO PAIS
const dataBase = require('../database/connection');

const verifyBodyCreateCountry = async (req, res, next) => {
  let { name, id_region } = req.body;
  const nameLowerCase = name.toLowerCase();
  if (!name || !id_region) {
    return res.status(400).json({
      response: false,
      message: 'Todos los campos son obligatorios: name, id_region.'
    });
  }
  const resp = await new Promise((resolve, reject) => {
    const sqlQuery = 'SELECT * FROM countries WHERE name = ?';
    dataBase.query(sqlQuery, [nameLowerCase], (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
  if (resp.length > 0) {
    return res.status(400).json({
      response: false,
      message: 'Ya existe un país con ese nombre.'
    });
  }
  req.country = {
    name,
    id_region
  };
  next();
};

module.exports = verifyBodyCreateCountry;
