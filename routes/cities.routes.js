const { Router } = require('express');

const checkToken = require('../middlewares/check_token');
const citiesIdExist = require('../middlewares/id_exists.cities');
const verifyBodyCreateCity = require('../middlewares/verify_body_create.cities');

const { citiesGetAll, citiesGet, citiesCreate, citiesUpdate, citiesDelete } = require('../controllers/cities.controllers');

const router = Router();

router.get('/', [checkToken], citiesGetAll);
router.get('/:id', [checkToken, citiesIdExist], citiesGet);
router.post('/', [checkToken, verifyBodyCreateCity], citiesCreate);
router.put('/:id', [checkToken, citiesIdExist, verifyBodyCreateCity], citiesUpdate);
router.delete('/:id', [checkToken, citiesIdExist], citiesDelete);

module.exports = router;