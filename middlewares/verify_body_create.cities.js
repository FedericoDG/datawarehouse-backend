// MIDDLEWARE PARA COMPROBAR EL BODY AL CREAR UNA NUEVA CIUDAD

const verifyBodyCreateCity = async (req, res, next) => {
  let { name, id_country } = req.body;
  if (!name || !id_country) {
    return res.status(400).json({
      response: false,
      message: 'Todos los campos son obligatorios: name, id_country.'
    });
  }
  req.city = {
    name,
    id_country
  };
  next();
};

module.exports = verifyBodyCreateCity;