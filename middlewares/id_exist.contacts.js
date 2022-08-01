// MIDDLEWARE PARA COMPROBAR ID_CONTACT EXISTE EN LA BASE DE DATOS
const dataBase = require('../database/connection');

const contactIdExist = async (req, res, next) => {
  const { id } = req.params;
  try {
    const resp = await new Promise((resolve, reject) => {
      const sqlQuery = 'SELECT * FROM contacts WHERE id_contact = ?';
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
        message: `No existe un contacto con el id_contact: ${id}.`
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

module.exports = contactIdExist;