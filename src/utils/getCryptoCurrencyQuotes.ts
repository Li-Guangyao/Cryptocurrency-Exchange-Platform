import axios from 'axios'

export default class GetCryptoCurrencyQuotes {
    baseURL: string = process.env.QuoteBaseURL as string
    path: string = process.env.QuotePath as string
    key: string = process.env.RequestKey as string

    constructor() {
    }

    getETHQuote(chain: string) {
        const requestURL = this.baseURL + this.path + "?slug=" + chain

        axios.get(requestURL).then(res => {
                console.log(res)
            }
        )
    }
}