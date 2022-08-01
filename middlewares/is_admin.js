// MIDDLEWARE PARA COMPROBAR SI EL USUARIO ES ADMINISTRADOR (basado en el token)
const jwt = require('jsonwebtoken');

const isAdmin = (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization.split(' ')[1];
  if (jwt.decode(token, process.env.SECRET).role !== 'ADMIN') {
    return res.status(401).json({
      response: false,
      message: 'No tiene permisos para realizar esta operación.'
    });
  }
  next();
};

module.exports = isAdmin;