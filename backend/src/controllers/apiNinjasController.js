const request = require('request');
const NINJA_API_KEY = process.env.APININJAS;

module.exports.quotes = async (req, res) => {
    var category = 'money';
    request.get({
        url: 'https://api.api-ninjas.com/v1/quotes?category=' + category,
        headers: {
            'X-Api-Key': NINJA_API_KEY
        },
    }, function (error, response, body) {
        if (error) return console.error('Request failed:', error);
        else if (response.statusCode != 200) return res.status(404).send(response)
        else return res.status(200).send(body)
    });
}

module.exports.logo = async (req, res) => {
    
    var {name} = req.query;
    console.log(name);
    request.get({
        url: 'https://api.api-ninjas.com/v1/logo?name=' + name,
        headers: {
            'X-Api-Key': NINJA_API_KEY
        },
    }, function (error, response, body) {
        if (error) return console.error('Request failed:', error);
        else if (response.statusCode != 200) return res.status(404).send(response)
        else return res.status(200).send(body)
    });
}