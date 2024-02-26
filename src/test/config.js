// 

const [, , symbol = 'bnbusdt'] = process.argv

const test = true

module.exports = {
  timeInForce: 'GTC',
  quoteOrderQty: 20,
  type: 'MARKET',
  secretKey: '',
  apiKey: '',
  orderMethod: test ? 'order.test' : 'order.place',
  symbol,
}
