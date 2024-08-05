module.exports.test = async (req, res, next) => {
    res.send('heeeloo')
}

module.exports.realtime = async (req, res, next) => {
    const { symbol } = req.query;
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                function: 'TIME_REALTIME',
                symbol,
                apikey: process.env.AlphaVantage,
            },
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching real-time data', error);
        res.status(500).json({ error: 'Error fetching data' });
    }
}

module.exports.historical = async (req, res, next) => {
    const { symbol, start_date, end_date } = req.query;
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                function: 'TIME_SERIES_INTRADAY',
                symbol,
                interval: '1min',
                apikey: process.env.AlphaVantage,
            },
        });
        const data = response.data['Time Series (1min)'];
        // Filter data between start_date and end_date
        const filteredData = Object.entries(data).filter(([date]) => {
            return new Date(date) >= new Date(start_date) && new Date(date) <= new Date(end_date);
        });
        res.json({ symbol, historical_data: filteredData });
    } catch (error) {
        console.error('Error fetching historical data', error);
        res.status(500).json({ error: 'Error fetching data' });
    }
}