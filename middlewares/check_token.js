// MIDDLEWARE PARA COMPROBAR EL TOKEN (si viene en los headers y si es válido)
const jwt = require('jsonwebtoken');

const checkToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({
      response: false,
      message: 'Necesitas enviar un token.'
    });
  }
  if (!authorization.split(' ')[1]) {
    return res.status(401).json({
      response: false,
      message: 'Necesitas enviar un token.'
    });
  }
  jwt.verify(authorization.split(' ')[1], process.env.JWT_SECRET, (error) => {
    if (error) {
      return res.status(401).json({
        response: false,
        message: 'Token inválido.'
      });
    } else {
      next();
    }
  });
};

module.exports = checkToken;