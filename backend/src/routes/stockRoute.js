const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController')

router.get('/', stockController.test);
router.get('/realtime', stockController.realtime);
router.get('/historical', stockController.historical);


module.exports = router;