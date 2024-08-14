const express = require('express');
const router = express.Router();
const nseController = require('../controllers/nseController');

router.get('/stocksymbols', nseController.getAllStockSymbols);

module.exports = router;