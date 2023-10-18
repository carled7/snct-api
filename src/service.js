import axios from "axios";

class service {
    async getBalances() {
        const response = await axios.get('https://api.binance.com/api/v3/trades', 
            {
                params: { symbol: 'BTCUSDT',
                            limit: 20}
            })
        
        return response;
    }
}

export default service;