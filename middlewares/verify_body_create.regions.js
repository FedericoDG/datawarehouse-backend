// MIDDLEWARE PARA COMPROBAR EL BODY AL CREAR UNA NUEVA REGION
const dataBase = require('../database/connection');

const verifyBodyCreateRegion = async (req, res, next) => {
  let { name } = req.body;
  if (!name) {
    return res.status(400).json({
      response: false,
      message: 'Todos los campos son obligatorios: name.'
    });
  }
    req.region = {
      name
    };
    next();
};

module.exports = verifyBodyCreateRegion;