const { Router } = require('express');

const checkToken = require('../middlewares/check_token');
const companyIdExist = require('../middlewares/id_exist.companies');
const verifyBodyCreateCompany = require('../middlewares/verify_body_create.companies');
const verifyBodyUpdateCompany = require('../middlewares/verify_body_update.companies');

const { companiesGetAll, companiesGet, companiesCreate, companiesUpdate, companiesDelete } = require('../controllers/companies.controllers');

const router = Router();

router.get('/', [checkToken], companiesGetAll);
router.get('/:id', [checkToken, companyIdExist], companiesGet);
router.post('/', [checkToken, verifyBodyCreateCompany], companiesCreate);
router.put('/:id', [checkToken, companyIdExist, verifyBodyUpdateCompany], companiesUpdate);
router.delete('/:id', [checkToken, companyIdExist], companiesDelete);

module.exports = router;