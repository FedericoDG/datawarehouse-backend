const { Router } = require('express');

const checkToken = require('../middlewares/check_token');
const contactIdExist = require('../middlewares/id_exist.contacts');
const verifyBodyCreateContact = require('../middlewares/verify_body_create.contacts');
const verifyBodyUpdateContact = require('../middlewares/verify_body_update.contacts');

const { contactsGetAll, contactsGet, contactsCreate, contactsUpdate, contactsDelete } = require('../controllers/contacts.controllers');

const router = Router();

router.get('/', [checkToken], contactsGetAll);
router.get('/:id', [checkToken, contactIdExist], contactsGet);
router.post('/', [checkToken, verifyBodyCreateContact], contactsCreate);
router.put('/:id', [checkToken, contactIdExist, verifyBodyUpdateContact], contactsUpdate);
router.delete('/:id', [checkToken, contactIdExist], contactsDelete);

module.exports = router;