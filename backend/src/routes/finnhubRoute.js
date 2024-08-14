const express = require('express');
const router = express.Router();
const finnhubController = require('../controllers/finnhubController')


router.get('/country', finnhubController.country);
router.get('/symbolsearch', finnhubController.symbolSearch);
router.get('/marketnews', finnhubController.marketNews);
router.get('/trades', finnhubController.trades);
router.get('/companyprofile2', finnhubController.companyProfile2);
router.get('/companynews', finnhubController.companyNews);
router.get('/companypeers', finnhubController.companyPeers);
router.get('/companybasicfinancials', finnhubController.companyBasicFinancials);
router.get('/insidertransactions', finnhubController.insiderTransactions);
router.get('/insidersentiment', finnhubController.insiderSentiment);
router.get('/financialsreported', finnhubController.financialsReported);
router.get('/filings', finnhubController.filings);
router.get('/ipocalendar', finnhubController.ipoCalendar);
router.get('/companyearnings', finnhubController.companyEarnings);
router.get('/earningscalendar', finnhubController.earningsCalendar);
router.get('/quote', finnhubController.quote);

router.get('/forexexchanges', finnhubController.forexExchanges);
router.get('/forexsymbols', finnhubController.forexSymbols);

router.get('/cryptoexchanges', finnhubController.cryptoExchanges);
router.get('/cryptosymbols', finnhubController.cryptoSymbols);

// router.get('/recommendationtrends', finnhubController.recommendationTrends);
// router.get('/marketstatus', finnhubController.marketStatus); 
// router.get('/marketholiday', finnhubController.marketHoliday);


module.exports = router;