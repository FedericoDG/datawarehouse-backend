const { Router } = require('express');

const verifyBodyLogin = require('../middlewares/verify_body_login.users');
const checkToken = require('../middlewares/check_token');
const isAdmin = require('../middlewares/is_admin');
const verifyBodyRegister = require('../middlewares/verify_body_register.users');
const userIdExist = require('../middlewares/id_exist.users');
const verifyBodyUpdate = require('../middlewares/verify_body_update.users');

const { usersLogin, usersRegister, usersGetAll, usersGet, usersUpdate, usersDelete } = require('../controllers/users.controllers');

const router = Router();

router.post('/login', [verifyBodyLogin], usersLogin);
router.post('/register', [checkToken, isAdmin, verifyBodyRegister], usersRegister);
router.get('/', [checkToken, isAdmin], usersGetAll);
router.get('/:id', [checkToken, isAdmin], usersGet);
router.put('/:id', [checkToken, isAdmin, userIdExist, verifyBodyUpdate], usersUpdate);
router.delete('/:id', [checkToken, isAdmin, userIdExist], usersDelete);

module.exports = router;