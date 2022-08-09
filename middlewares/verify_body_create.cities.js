// MIDDLEWARE PARA COMPROBAR EL BODY AL CREAR UNA NUEVA CIUDAD
const dataBase = require('../database/connection');

const verifyBodyCreateCity = async (req, res, next) => {
  let { name, id_country } = req.body;
  name = name.toLowerCase();
  if (!name || !id_country) {
    return res.status(400).json({
      response: false,
      message: 'Todos los campos son obligatorios: name, id_country.'
    });
  }
  const resp = await new Promise((resolve, reject) => {
    const sqlQuery = 'SELECT * FROM cities WHERE name = ?';
    dataBase.query(sqlQuery, [name], (error, data) => {
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
      message: 'Ya existe una ciudad con ese nombre.'
    });
  }
  req.city = {
    name,
    id_country
  };
  next();
};

module.exports = verifyBodyCreateCity;
