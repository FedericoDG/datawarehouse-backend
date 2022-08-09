const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const dataBase = require('../database/connection');

// CREAR TOKEN
const createToken = (object) => {
  return jwt.sign(object, process.env.JWT_SECRET);
};

// LEER DATOS DEL TOKEN
const decodeToken = (token) => {
  return jwt.decode(token, process.env.JWT_SECRET);
};

// ENCRIPTAR PASSWORD
const hashPassword = (password) => {
  return (hashedPassword = bcrypt.hashSync(password, 10));
};

// GUARDAR USUARIO EN LA BASE DE DATOS
const saveUserOnDB = (user) => {
  const sqlQuery = 'INSERT INTO users SET ?';
  return new Promise((resolve, reject) => {
    dataBase.query(sqlQuery, [user], (error, user) => {
      if (error) {
        return reject(error);
      } else {
        return resolve(user);
      }
    });
  });
};

// OBTENER TODOS LOS USUARIOS
const getAllUsers = () => {
  let sqlQuery = 'SELECT * FROM users';
  return new Promise((resolve, reject) => {
    dataBase.query(sqlQuery, (error, users) => {
      if (error) {
        reject(error);
      } else {
        resolve(JSON.parse(JSON.stringify(users)));
      }
    });
  });
};

// OBTENER DATOS DE UN USUARIO EN PARTICULAR
const getUserById = (id) => {
  let sqlQuery = 'SELECT * FROM users WHERE id_user = ?';
  return new Promise((resolve, reject) => {
    dataBase.query(sqlQuery, [id], (error, user) => {
      if (error) {
        reject(error);
      } else {
        resolve(user);
      }
    });
  });
};

// ACTUALIZAR USUARIO EN LA BASE DE DATOS
const updateUserOnDB = (user, id) => {
  const sqlQuery = 'UPDATE users SET name = ?, lastname = ?, email= ?, password = ?, role = ? WHERE id_user = ?';
  return new Promise((resolve, reject) => {
    dataBase.query(sqlQuery, [user.name, user.lastname, user.email, user.password, user.role, id], (error, user) => {
      if (error) {
        return reject(error);
      } else {
        return resolve(user);
      }
    });
  });
};

// ACTUALIZAR USUARIO EN LA BASE DE DATOS
const updateUserWithOutPasswordOnDB = (user, id) => {
  const sqlQuery = 'UPDATE users SET name = ?, lastname = ?, email= ?, role = ? WHERE id_user = ?';
  return new Promise((resolve, reject) => {
    dataBase.query(sqlQuery, [user.name, user.lastname, user.email, user.role, id], (error, user) => {
      if (error) {
        return reject(error);
      } else {
        return resolve(user);
      }
    });
  });
};

// ELIMINAR USUARIO DE LA BASE DE DATOS
const deleteUserOnDB = (id) => {
  const sqlQuery = 'DELETE FROM users WHERE id_user = ?';
  return new Promise((resolve, reject) => {
    dataBase.query(sqlQuery, [id], (error, user) => {
      if (error) {
        reject(error);
      } else {
        return resolve(user);
      }
    });
  });
};

module.exports = {
  createToken,
  decodeToken,
  hashPassword,
  saveUserOnDB,
  getAllUsers,
  getUserById,
  updateUserOnDB,
  updateUserWithOutPasswordOnDB,
  deleteUserOnDB
};
