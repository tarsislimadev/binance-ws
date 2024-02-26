const WebSocket = require('ws')

const ws = new WebSocket('wss://ws-api.binance.com/ws-api/v3')

const { InputMessageModel } = require('./models/input.message.model.js')

const { OutputMessageModel } = require('./models/output.message.model.js')

const { uuidv4 } = require('./utils/str.js')

const { quoteOrderQty, apiKey, secretKey } = require('./config.js')

require('./utils/sha256.min.js')

const messages = []

const save = (message) => messages.push(message)

const log = (side, id, method, params = {}) => console.log(side, id, method, new URLSearchParams(params))

const request = (message = new InputMessageModel()) => {
  log('request', message.id, message.method, message.params)
  save(message)
  ws.send(message.toString())
}

const run = (symbol = process.argv[2].toUpperCase()) => {
  setInterval(() => request(new InputMessageModel('ping')), 1000 * 10)
  request(new InputMessageModel('ticker.price', { symbol }))
}

const onOpen = () => run()

const onClose = (data) => console.log('close', data)

const onError = (data) => console.log('error', data)

const getMethodById = (id) => messages.find((message) => message.id == id)?.method

const onPingOutput = (message = new OutputMessageModel()) => request(new InputMessageModel('pong', message.params))

const signParams = (params = {}, timestamp = Date.now()) => {
  params = { ...params, timestamp, apiKey }

  const hash = sha256.hmac.create(secretKey)
  hash.update(Object.keys(params).sort().map((p) => `${p}=${params[p]}`).join('&'))
  const signature = hash.hex()

  return { ...params, signature }
}

const mayBuy = (result) => log('mayBuy', uuidv4(), '', result)

const buy = (result) => request(new InputMessageModel('order.test', signParams({ symbol: result.symbol, side: 'BUY', type: 'MARKET', timeInForce: 'GTC', quoteOrderQty })))

const maySell = (result) => log('maySell', uuidv4(), '', result)

const sell = (result) => request(new InputMessageModel('order.test', signParams({ symbol: result.symbol, side: 'SELL', type: 'MARKET', timeInForce: 'GTC', quoteOrderQty })))

const onTickerPriceOutput = (message = new OutputMessageModel()) => {
  setTimeout(() => request(new InputMessageModel('ticker.price', { symbol: message.result.symbol })), 500)
  if (mayBuy(message.result)) buy(message.result)
  else if (maySell(message.result)) sell(message.result)
}

const response = (message = new OutputMessageModel()) => {
  log('response', message.id, message.method, message.result)
  switch (message.method) {
    case 'ping': return onPingOutput(message)
    case 'ticker.price': return onTickerPriceOutput(message)
  }
}

const onMessage = (data) => {
  const output = JSON.parse(data)
  const message = new OutputMessageModel(getMethodById(output.id), output)
  save(message)
  response(message)
}

ws.addListener('open', (data) => onOpen(data))

ws.addListener('close', (data) => onClose(data))

ws.addListener('error', (data) => onError(data))

ws.addListener('message', (data) => onMessage(data))
