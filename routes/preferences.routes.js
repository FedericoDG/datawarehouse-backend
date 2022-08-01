const { Router } = require('express');

const { preferences } = require('../controllers/preferences.controllers');

const router = Router();

router.get('/', preferences);

module.exports = router;