// app.js
require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

app.use('/api/alphavantage', require('./routes/alphaVantageRoute'));
app.use('/api/finnhub', require('./routes/finnhubRoute'));
app.use('/api/nse', require('./routes/nseRoute'));
app.use('/api/apininjas', require('./routes/apiNinjasRoute'));

module.exports = app;