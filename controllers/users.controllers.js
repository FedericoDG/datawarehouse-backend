const {
  createToken,
  hashPassword,
  saveUserOnDB,
  getAllUsers,
  getUserById,
  updateUserOnDB,
  deleteUserOnDB
} = require('../helpers/users.helpers');

const usersLogin = (req, res) => {
  const token = createToken(req.user);
  res.json({
    response: true,
    message: 'Usuario autenticado.',
    user: {
      name: req.user.name,
      lastname: req.user.lastname,
      email: req.user.email,
      role: req.user.role
    },
    token
  });
};

const usersRegister = async (req, res) => {
  try {
    const hashedPassword = hashPassword(req.user.password);
    const user = await saveUserOnDB({ ...req.user, password: hashedPassword });
    res.json({
      response: true,
      message: 'Usuario creado.',
      user: { id_user: user.insertId, ...req.user, password: hashedPassword }
    });
  } catch (error) {
    res.status(500).json({
      response: false,
      message: 'Ha ocurrido un error.',
      error
    });
  }
};

const usersGetAll = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json({
      response: true,
      message: 'Lista de usuarios.',
      users
    });
  } catch (error) {
    res.status(500).json({
      response: false,
      message: 'Ha ocurrido un error.',
      error
    });
  }
};

const usersGet = async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    res.json({
      response: true,
      message: 'Detalle de usuario.',
      user: user[0]
    });
  } catch (error) {
    res.status(500).json({
      response: false,
      message: 'Ha ocurrido un error.',
      error
    });
  }
};

const usersUpdate = async (req, res) => {
  try {
    const hashedPassword = hashPassword(req.user.password);
    await updateUserOnDB({ ...req.user, password: hashedPassword }, req.params.id);
    res.json({
      response: true,
      message: 'Usuario actualizado.',
      user: { id_user: req.params.id, ...req.user }
    });
  } catch (error) {
    res.status(500).json({
      response: false,
      message: 'Ha ocurrido un error.',
      error
    });
  }
};

const usersDelete = async (req, res) => {
  try {
    await deleteUserOnDB(req.params.id);
    res.json({
      response: true,
      message: 'Usuario eliminado.'
    });
  } catch (error) {
    res.status(500).json({
      response: false,
      message: 'Ha ocurrido un error.',
      error
    });
  }
};

module.exports = {
  usersLogin,
  usersRegister,
  usersGetAll,
  usersGet,
  usersUpdate,
  usersDelete
};
