const { Router } = require('express');

const { seed } = require('../controllers/seed.controllers');

const router = Router();

router.get('/', seed);

module.exports = router;
