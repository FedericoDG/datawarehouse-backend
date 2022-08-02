// MIDDLEWARE PARA COMPROBAR LOS CAMPOS DEL BODY AL HACER LOGIN PARA OBTENER UN TOKEN
const dataBase = require('../database/connection');
const bcrypt = require('bcrypt');

const verifyBodyLogin = (req, res, next) => {
  let { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      response: false,
      message: 'Todos los campos son obligatorios: email, password.'
    });
  }
  try {
    const sqlQuery = 'SELECT * FROM users WHERE email = ?';
    dataBase.query(sqlQuery, [email], (error, response) => {
      if (error) {
        throw new Error(error);
      } else {
        if (response.length < 1) {
          return res.status(401).json({
            response: false,
            message: 'Usuario inexistente.'
          });
        }
        if (!bcrypt.compareSync(password, response[0].password)) {
          return res.status(401).json({
            response: false,
            message: 'Contraseña inválida.'
          });
        }
        req.user = {
          id_user: response[0].id_user,
          name: response[0].name,
          lastname: response[0].lastname,
          email: response[0].email,
          role: response[0].role
        };
        next();
      }
    });
  } catch (error) {
    res.status(500).json({
      response: false,
      message: 'Ha ocurrido un error.',
      error
    });
  }
};

module.exports = verifyBodyLogin;
