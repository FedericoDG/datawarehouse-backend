// MIDDLEWARE PARA COMPROBAR EL BODY AL CREAR UNA NUEVA REGION
const dataBase = require('../database/connection');

const verifyBodyCreateRegion = async (req, res, next) => {
  let { name } = req.body;
  name = name.toLowerCase();
  if (!name) {
    return res.status(400).json({
      response: false,
      message: 'Todos los campos son obligatorios: name.'
    });
  }
  const resp = await new Promise((resolve, reject) => {
    const sqlQuery = 'SELECT * FROM regions WHERE name = ?';
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
      message: 'Ya existe una región con ese nombre.'
    });
  }
  req.region = {
    name
  };
  next();
};

module.exports = verifyBodyCreateRegion;
