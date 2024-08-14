var request = require('request');

let URL = process.env.BASE_URL

async function dataFetch(functionName, json) {
    return new Promise((resolve, reject) => {
        var requestedUrl = `${URL}?function=${functionName}`
        if (json) {
            const keys = Object.keys(json);
            for (let i = 0; i < keys.length; i++) {
                requestedUrl+=`&${keys[i]}=${json[keys[i]]}`;
            }
        };
        requestedUrl+=`&apikey=${process.env.AlphaVantage}`;
        request.get({
            url: requestedUrl,
            json: true,
            headers: { 'User-Agent': 'request' }
        }, (err, res, data) => {
            if (err) {
                console.log('Error:', err);
                reject(err);
            } else if (res.statusCode !== 200) {
                reject(new Error(`Status code: ${res.statusCode}`));
            } else {
                resolve(data);
            }
        });
    });
}

module.exports.globalStatus = async (req, res) => {
    try {
        const data = await dataFetch('MARKET_STATUS');
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send('An error occurred');
    }
}

module.exports.gainerLosers = async (req, res) => {
    try {
        const data = await dataFetch('TOP_GAINERS_LOSERS');
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send('An error occurred');
    }
}

module.exports.tickerSearch = async (req, res) => {
    try {
        const data = await dataFetch('SYMBOL_SEARCH', req.query);
        console.log(data);
        res.status(200).send(data)
    } catch (err) {
        res.status(500).send('An error occurred');
    }
}