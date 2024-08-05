// app.js
require('dotenv').config();

const express = require('express');

const app = express();

app.use('/api/stocks', require('./routes/stockRoute'));

module.exports = app;