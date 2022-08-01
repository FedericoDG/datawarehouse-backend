// MIDDLEWARE PARA COMPROBAR ID_USER EXISTE EN LA BASE DE DATOS
const dataBase = require('../database/connection');

const userIdExist = async (req, res, next) => {
  const { id } = req.params;
  try {
    const resp = await new Promise((resolve, reject) => {
      const sqlQuery = 'SELECT * FROM users WHERE id_user = ?';
      dataBase.query(sqlQuery, [id], (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
    if (resp.length < 1) {
      return res.status(404).json({
        respose: false,
        message: `No existe un usuario con el id_user: ${id}.`
      });
    }
    next();
  } catch (error) {
    res.status(500).json({
      respose: false,
      message: 'Ha ocurrido un error.',
      error
    });
  }
};

module.exports = userIdExist;