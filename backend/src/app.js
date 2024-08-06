// app.js
require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

app.use('/api/alphavantage', require('./routes/stockRoute'));
app.use('/api/finnhub', require('./routes/finnhubRoute'));

module.exports = app;