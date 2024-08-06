const finnhub = require('finnhub');

const finnhubApiKey = process.env.FINNHUB;
const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = finnhubApiKey
const finnhubClient = new finnhub.DefaultApi()


module.exports.recommendationTrends = async (req, res) => {
    const { symbol } = req.query;
    finnhubClient.recommendationTrends(symbol, (error, data, response) => {
        if (!error) return res.status(200).json(data);
        return res.status(404).send({ error });
    });

}

//gives country, country code, currency, currency code , region, ... 12 fields
module.exports.country = async (req, res) => {
    finnhubClient.country((error, data, response) => {
        if (!error) return res.status(200).json(data);
    });
}

module.exports.symbolSearch = async (req, res) => {
    const { symbol } = req.query
    finnhubClient.symbolSearch(symbol, (error, data, response) => {
        if (!error) return res.status(200).json(data);
        return res.status(404).send({ response })
    });
}

module.exports.marketStatus = async (req, res) => {
    const { exchange } = req.query
    // finnhubClient.marketStatus({'exchange': exchange}, (error, data, response) => {
    finnhubClient.marketNews("general", {}, (error, data, response) => {
        if (!error) return res.status(200).json(data);
        return res.status(404).send({ response })
    });
}