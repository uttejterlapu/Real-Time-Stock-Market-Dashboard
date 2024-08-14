const express = require('express');
const router = express.Router();
const alphaVantageController = require('../controllers/alphaVantageController')

router.get('/globalstatus', alphaVantageController.globalStatus);
router.get('/ticker', alphaVantageController.tickerSearch);

module.exports = router;