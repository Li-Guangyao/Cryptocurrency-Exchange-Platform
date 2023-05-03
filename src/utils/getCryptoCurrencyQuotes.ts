import axios from 'axios'

type cryptoSymbolList = "ALGOUSDT" | "BTCUSDT" | "ALGOETH" | "ALGOBTC"

class GetCryptoQuote {
    static async getQuote(cryptoSymbol: cryptoSymbolList) {
        const requestURL = "https://api4.binance.com/api/v3/ticker/24hr?symbol=" + cryptoSymbol
        return axios.get(requestURL).then(res => {
            return res.data
        }).catch(err => {
            return err
        });
    }
}

export default GetCryptoQuote