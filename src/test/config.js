
const [, , symbol = 'bnbusdt'] = process.argv

module.exports = {
  timeInForce: 'GTC',
  quoteOrderQty: 20,
  type: 'MARKET',
  secretKey: '',
  apiKey: '',
  symbol,
}
