// MIDDLEWARE PARA COMPROBAR EL BODY AL CREAR UN NUEVO USUARIO (se utilizan algunas expresiones regulares)
const dataBase = require('../database/connection');

const checkPassword = /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[#?!@$%^&*-]).{8,50}/; // Al menos una letra mayúscula, una minúscula, un número y un caracter especial. Longitud entre 8 y 50 caracteres
const checkName = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1 ]{3,50}$/; // Letras mayúsculas y minúsculas, y espacios. Longitud entre 4 y 50 caracteres
const checkEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // Formato de email válido

const verifyBodyRegister = async (req, res, next) => {
  let { name, lastname, email, password, role } = req.body;
  if (!name || !lastname || !email || !password || !role) {
    return res.status(400).json({
      response: false,
      message: 'Todos los campos son obligatorios: name, lastname, email, password, role.'
    });
  }
  if (!checkName.test(name)) {
    return res.status(400).json({
      response: false,
      message: 'El campo name debe tener al menos 3 caracteres, no más de 50, y no debe contener números ni caracteres especiales, salvo espacios.'
    });
  }
  if (!checkName.test(lastname)) {
    return res.status(400).json({
      response: false,
      message: 'El campo lastname debe tener al menos 3 caracteres, no más de 50, y no debe contener números ni caracteres especiales, salvo espacios.'
    });
  }
  if (!checkPassword.test(password)) {
    return res.status(400).json({
      response: false,
      message: 'El campo contraseña de tener un mínimo 8 caracteres, e incluir al menos una letra en mayúscula y un caracter especial.'
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
      const sqlQuery = 'SELECT * FROM users WHERE email = ?';
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
    role = role.toUpperCase();
    if (role !== 'USER' && role !== 'ADMIN') {
      return res.status(400).json({
        response: false,
        message: 'El campo role debe ser USER o ADMIN.'
      });
    }
    req.user = {
      name,
      lastname,
      email,
      password,
      role
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

module.exports = verifyBodyRegister;