// // import { NseIndia } from  "stock-nse-india";
const { NseIndia } = require('stock-nse-india')
const nseIndia = new NseIndia()
// To get all symbols from NSE
module.exports.getAllStockSymbols = async (req, res) => {
    nseIndia.getAllStockSymbols().then(symbols => {
        if(symbols) return res.status(200).send({symbols})
            return res.status(404).send({message : 'error in fectching'})
    })
}

// To get equity details for specific symbol
// while(true){
//     nseIndia.getEquityTradeInfo('PNB').then(details => {
//         console.log(details.marketDeptOrderBook.bid, 'ahldlsld')
//     })
// }

// To get equity historical data for specific symbol
// const range = {
//     start: new Date("2010-01-01"),
//     end: new Date("2021-03-20")
// }
// nseIndia.getEquityHistoricalData(symbol, range).then(data => {
//     console.log(data)
// })

// nseIndia.getIndexIntradayData('PNB', isPreOpenData = false): Promise<IntradayData> {
//     let endpoint = `/api/chart-databyindex?index=${index.toUpperCase()}&indices=true`
//     if (isPreOpenData)
//         endpoint += '&preopen=true'
//     return this.getDataByEndpoint(endpoint)
// }

// nseIndia.getIndexIntradayData('PNB', isPreOpenData=false).then(details =>{
//     let endpoint = `/api/chart-databyindex?index=${index.toUpperCase()}&indices=true`
//     if (isPreOpenData)
//         endpoint += '&preopen=true'
//     return this.getDataByEndpoint(endpoint)
// })

// nseIndia.