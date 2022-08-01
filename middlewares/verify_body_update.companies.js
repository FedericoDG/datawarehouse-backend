// MIDDLEWARE PARA COMPROBAR EL BODY AL ACTUALIZAR UNA NUEVA COMPAÑIA (se utilizan algunas expresiones regulares)
const dataBase = require('../database/connection');

const checkEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // Formato de email válido

const verifyBodyUpdateCompany = async (req, res, next) => {
  let { name, email, phone, address, id_city } = req.body;
  if (!name || !email || !phone || !address || !id_city) {
    return res.status(400).json({
      response: false,
      message: 'Todos los campos son obligatorios: name, email, phone ,address, id_city.'
    });
  }
  email = email.toLowerCase();
  if (!checkEmail.test(email)) {
    return res.status(400).json({
      response: false,
      message: 'El campo email deber contener un email válido.'
    });
  }
  req.company = {
    name,
    email,
    phone,
    address,
    id_city
  };
  next();
};

module.exports = verifyBodyUpdateCompany;