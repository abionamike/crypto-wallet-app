import axios from 'axios';

export const GET_HOLDINGS_BEGIN = 'GET_HOLDINGS_BEGIN';
export const GET_HOLDINGS_SUCCESS = 'GET_HOLDINGS_SUCCESS';
export const GET_HOLDINGS_FAILURE = 'GET_HOLDINGS_FAILURE';

export const GET_COIN_MARKET_BEGIN = 'GET_COIN_MARKET_BEGIN';
export const GET_COIN_MARKET_SUCCESS = 'GET_COIN_MARKET_SUCCESS';
export const GET_COIN_MARKET_FAILURE = 'GET_COIN_MARKET_FAILURE';

export const getHoldings = (
    holdings  = [], 
    currency = 'usd', 
    orderBy = "market_cap_desc", 
    sparkline = true,
    priceChangePerc = "7d",
    perPage = 10,
    page = 1
  ) => async (dispatch) => {
    dispatch({ type: GET_HOLDINGS_BEGIN });

    const ids = holdings.map((item) => (item.id)).join(',')

    const res = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${orderBy}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=${priceChangePerc}&ids=${ids}`);
    console.log("holding", res.data)
    if(res.status === 200) {
      // Massage data
      const myHoldings = res.data.map(item => {
        // retrieve our current holdings => current quantity
        const coin = holdings.find(a => a.id === item.id);

        const price7d = item.current_price / (1 + item.price_change_percentage_7d_in_currency * 0.01);

        return {
          id: item.id,
          symbol: item.symbol,
          name: item.name,
          image: item.image,
          current_price: item.current_price,
          qty: coin.qty,
          total: coin.qty * item.current_price,
          price_change_percentage_7d_in_currency: item.price_change_percentage_7d_in_currency,
          holding_value_change_7d: (item.current_price - price7d) * coin.qty,
          sparkline_in_7d: {
            value: item.sparkline_in_7d.price.map(price  => (price * coin.qty))
          }
        }
      });

      dispatch({ type: GET_HOLDINGS_SUCCESS, payload: { myHoldings } })
    } else {
      dispatch({ type: GET_HOLDINGS_FAILURE, payload: { error: res.data } });
    }
}

export const getCoinMarket = (
    currency = 'usd', 
    orderBy = "market_cap_desc",
    sparkline = true,
    priceChangePerc = '7d',
    perPage = 10,
    page = 1,
  ) => async (dispatch) => {
    dispatch({ type: GET_COIN_MARKET_BEGIN });

    const res = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${orderBy}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=${priceChangePerc}`);

    if(res.status === 200) {
      dispatch({ type: GET_COIN_MARKET_SUCCESS, payload: { coins: res.data } })
    } else {
      dispatch({ type: GET_COIN_MARKET_FAILURE, payload: { error: res.data } });
    }
}