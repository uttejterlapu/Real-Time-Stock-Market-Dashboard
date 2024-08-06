const express = require('express');
const router = express.Router();
const finnhubController = require('../controllers/finnhubController')


// router.get('/recommendationtrends', finnhubController.recommendationTrends);
router.get('/country', finnhubController.country);
router.get('/symbolsearch', finnhubController.symbolSearch);
router.get('/marketStatus', finnhubController.marketStatus);


module.exports = router;