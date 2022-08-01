// MIDDLEWARE PARA COMPROBAR EL BODY AL CREAR UN NUEVO PAIS

const verifyBodyCreateCountry = async (req, res, next) => {
  let { name, id_region } = req.body;
  if (!name || !id_region) {
    return res.status(400).json({
      response: false,
      message: 'Todos los campos son obligatorios: name, id_region.'
    });
  }
  req.country = {
    name,
    id_region
  };
  next();
};

module.exports = verifyBodyCreateCountry;