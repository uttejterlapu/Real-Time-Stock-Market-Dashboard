const https = require('https');
const finnhub = require('finnhub');
const WebSocket = require('ws');

const finnhubApiKey = process.env.FINNHUB;

const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = finnhubApiKey
const finnhubClient = new finnhub.DefaultApi()

module.exports.recommendationTrends = async (req, res) => {
    const { symbol } = req.query;
    finnhubClient.recommendationTrends(symbol, async (error, data, response) => {
        if (!error) return res.status(200).json(data);
        return res.status(404).send({ error });
    });

}

//gives country, country code, currency, currency code , region, ... 12 fields
module.exports.country = async (req, res) => {
    finnhubClient.country((error, data, response) => {
        if (!error) return res.status(200).json(data);
        return res.status(404).send({ response });
    });
}

module.exports.symbolSearch = async (req, res) => {
    const { symbol } = req.query
    finnhubClient.symbolSearch(symbol, async (error, data, response) => {
        if (!error) return res.status(200).json(data);
        return res.status(404).send({ response });
    });
}

module.exports.marketNews = async (req, res) => {
    finnhubClient.marketNews("general", {}, (error, data, response) => {
        if (!error) return res.status(200).json(data);
        return res.status(404).send({ response })
    });
}

module.exports.trades = async (req, res) => {
    const symbol = req.query.symbol || 'AAPL';

    const socket = new WebSocket(`wss://ws.finnhub.io?token=${finnhubApiKey}`);

    socket.addEventListener('open', function (event) {
        socket.send(JSON.stringify({ 'type': 'subscribe', 'symbol': `${symbol}` }));
    });

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    socket.addEventListener('message', function (event) {
        res.write(`data: ${event.data}\n\n`);
    });

    socket.addEventListener('close', function (event) {
        res.end();
    });

    socket.addEventListener('error', function (error) {
        console.error('WebSocket error:', error);
        res.status(500).send('WebSocket error');
    });

    req.on('close', () => {
        console.log('Client disconnected');
        socket.close();
    });
}

module.exports.companyProfile2 = async (req, res) => {
    finnhubClient.companyProfile2({ 'symbol': 'AAPL' }, (error, data, response) => {
        if (!error) return res.status(200).json(data);
        return res.status(404).send({ response })
    });
}

module.exports.companyNews = async (req, res) => {
    finnhubClient.companyNews("AAPL", "2024-01-01", "2024-08-07", (error, data, response) => {
        if (!error) return res.status(200).json(data);
        return res.status(404).send({ response })
    });
}

module.exports.companyPeers = async (req, res) => {
    finnhubClient.companyPeers("AAPL", (error, data, response) => {
        if (!error) return res.status(200).json(data);
        return res.status(404).send({ response })
    });
}

module.exports.companyBasicFinancials = async (req, res) => {
    finnhubClient.companyBasicFinancials("AAPL", "all", (error, data, response) => {
        if (!error) return res.status(200).json(data);
        return res.status(404).send({ response })
    });
}

module.exports.insiderTransactions = async (req, res) => {
    finnhubClient.insiderTransactions("AAPL", (error, data, response) => {
        if (!error) return res.status(200).json(data);
        return res.status(404).send({ response })
    });
}

module.exports.insiderSentiment = async (req, res) => {
    finnhubClient.insiderSentiment("AAPL", '2024-01-01', '2024-08-01', (error, data, response) => {
        if (!error) return res.status(200).json(data);
        return res.status(404).send({ response })
    });
}

module.exports.financialsReported = async (req, res) => {
    finnhubClient.financialsReported({ "symbol": "AAPL" }, (error, data, response) => {
        if (!error) return res.status(200).json(data);
        return res.status(404).send({ response })
    });
}

module.exports.filings = async (req, res) => {
    finnhubClient.filings({ "symbol": "AAPL" }, (error, data, response) => {
        if (!error) return res.status(200).json(data);
        return res.status(404).send({ response })
    });
}

module.exports.ipoCalendar = async (req, res) => {
    finnhubClient.ipoCalendar("2024-01-01", "2024-08-01", (error, data, response) => {
        if (!error) return res.status(200).json(data);
        return res.status(404).send({ response })
    });
}

module.exports.companyEarnings = async (req, res) => {
    finnhubClient.companyEarnings("AAPL", { 'limit': 10 }, (error, data, response) => {
        if (!error) return res.status(200).json(data);
        return res.status(404).send({ response })
    });
}

module.exports.earningsCalendar = async (req, res) => {
    finnhubClient.earningsCalendar({ "from": "2024-01-01", "to": "2024-08-01" }, (error, data, response) => {
        if (!error) return res.status(200).json(data);
        return res.status(404).send({ response })
    });
}

module.exports.quote = async (req, res) => {
    finnhubClient.quote("PNB.NS", (error, data, response) => {
        if (!error) return res.status(200).json(data);
        return res.status(404).send({ response })
    });
}

// Forex

module.exports.forexExchanges = async (req, res) => {
    finnhubClient.forexExchanges((error, data, response) => {
        if (!error) return res.status(200).json(data);
        return res.status(404).send({ response })
    });
}

module.exports.forexSymbols = async (req, res) => {
    finnhubClient.forexSymbols("OANDA", (error, data, response) => {
        if (!error) return res.status(200).json(data);
        return res.status(404).send({ response })
    });
}

// Crypto

module.exports.cryptoExchanges = async (req, res) => {
    finnhubClient.cryptoExchanges((error, data, response) => {
        if (!error) return res.status(200).json(data);
        return res.status(404).send({ response })
    });
}

module.exports.cryptoSymbols = async (req, res) => {
    finnhubClient.cryptoSymbols("BINANCE", (error, data, response) => {
        if (!error) return res.status(200).json(data);
        return res.status(404).send({ response })
    });
}

//You don't have access to this resource
// module.exports.marketStatus = async (req, res) => {
//     finnhubClient.marketStatus({ 'exchange': 'US' }, (error, data, response) => {
//         if (!error) return res.status(200).json(data);
//         return res.status(404).send({ response })
//     });
// }

// module.exports.marketHoliday = async (req, res) => {
//     finnhubClient.marketHoliday({'exchange': 'US'}, (error, data, response) => {
//         if (!error) return res.status(200).json(data);
//         return res.status(404).send({ response })
//       });
// }
