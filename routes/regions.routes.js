const { Router } = require('express');

const checkToken = require('../middlewares/check_token');
const regionsIdExist = require('../middlewares/id_exist.regions');
const verifyBodyCreateRegion = require('../middlewares/verify_body_create.regions');

const { regionsGetAll, regionsGet, regionsCreate, regionsUpdate, regionsDelete } = require('../controllers/regions.controllers');

const router = Router();

router.get('/', [checkToken], regionsGetAll);
router.get('/:id', [checkToken, regionsIdExist], regionsGet);
router.post('/', [checkToken, verifyBodyCreateRegion], regionsCreate);
router.put('/:id', [checkToken, regionsIdExist, verifyBodyCreateRegion], regionsUpdate);
router.delete('/:id', [checkToken, regionsIdExist], regionsDelete);

module.exports = router;