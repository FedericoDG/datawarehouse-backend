// MIDDLEWARE PARA COMPROBAR EL BODY AL CREAR UNA NUEVA COMPAÑIA (se utilizan algunas expresiones regulares)
const dataBase = require('../database/connection');

const checkEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // Formato de email válido

const verifyBodyCreateCompany = async (req, res, next) => {
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
  try {
    const resp = await new Promise((resolve, reject) => {
      const sqlQuery = 'SELECT * FROM companies WHERE email = ?';
      dataBase.query(sqlQuery, [email], (error, data) => {
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
        message: 'Ya existe un usuario con ese email.'
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
  } catch (error) {
    res.status(500).json({
      response: false,
      message: 'Ha ocurrido un error.',
      error
    });
  }
};

module.exports = verifyBodyCreateCompany;