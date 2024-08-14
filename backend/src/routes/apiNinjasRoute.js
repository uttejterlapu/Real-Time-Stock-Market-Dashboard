const express = require('express');
const router = express.Router();
const apiNinjasController = require('../controllers/apiNinjasController');

router.get('/quote', apiNinjasController.quotes);
router.get('/logo', apiNinjasController.logo);

module.exports = router;