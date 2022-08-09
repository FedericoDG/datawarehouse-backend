// MIDDLEWARE PARA COMPROBAR LOS CAMPOS DEL BODY AL HACER UNA ACTUALIZACION DE USUARIO (se utilizan algunas expresiones regulares)
const dataBase = require('../database/connection');

const checkPassword = /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[#?!@$%^&*-]).{8,50}/; // Al menos una letra mayúscula, una minúscula, un número y un caracter especial. Longitud entre 8 y 50 caracteres
const checkName = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1 ]{3,50}$/; // Letras mayúsculas y minúsculas, y espacios. Longitud entre 4 y 50 caracteres
const checkEmail =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // Formato de email válido

const verifyBodyUpdate = async (req, res, next) => {
  let { name, lastname, email, password, role } = req.body;
  if (!name || !lastname || !email || !role) {
    return res.status(400).json({
      response: false,
      message: 'Todos los campos son obligatorios: name, lastname, email, role.'
    });
  }
  if (!checkName.test(name)) {
    return res.status(400).json({
      response: false,
      message:
        'El campo name debe tener al menos 3 caracteres, no más de 50, y no debe contener números ni caracteres especiales, salvo espacios.'
    });
  }
  if (!checkName.test(lastname)) {
    return res.status(400).json({
      response: false,
      message:
        'El campo lastname debe tener al menos 3 caracteres, no más de 50, y no debe contener números ni caracteres especiales, salvo espacios.'
    });
  }
  if (password) {
    if (!checkPassword.test(password)) {
      return res.status(400).json({
        response: false,
        message: 'El campo contraseña de tener un mínimo 8 caracteres, e incluir al menos una letra en mayúscula y un caracter especial.'
      });
    }
  }
  email = email.toLowerCase();
  if (!checkEmail.test(email)) {
    return res.status(400).json({
      response: false,
      message: 'El campo email deber contener un email válido.'
    });
  }
  role = role.toUpperCase();
  if (role !== 'USER' && role !== 'ADMIN') {
    return res.status(400).json({
      response: false,
      message: 'El campo role debe ser USER o ADMIN.'
    });
  }
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
  const idParams = Number(req.params.id);
  const idDatabase = JSON.parse(JSON.stringify(resp))[0].id_user;
  if (idParams !== idDatabase) {
    return res.status(400).json({
      response: false,
      message: 'Ya existe un usuario con ese email.'
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
};

module.exports = verifyBodyUpdate;
