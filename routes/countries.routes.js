const { Router } = require('express');

const checkToken = require('../middlewares/check_token');
const countriesIdExist = require('../middlewares/id_exist.countries');
const verifyBodyCreateCountry = require('../middlewares/verify_body_create.countries');

const { countriesGetAll, countriesGet, countriesCreate, countriesUpdate, countriesDelete } = require('../controllers/countries.controllers');

const router = Router();

router.get('/', [checkToken], countriesGetAll);
router.get('/:id', [checkToken, countriesIdExist], countriesGet);
router.post('/', [checkToken, verifyBodyCreateCountry], countriesCreate);
router.put('/:id', [checkToken, countriesIdExist, verifyBodyCreateCountry], countriesUpdate);
router.delete('/:id', [checkToken, countriesIdExist], countriesDelete);

module.exports = router;