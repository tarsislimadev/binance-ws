const { createHmac } = require('node:crypto')
const WebSocket = require('ws')

const ws = new WebSocket('wss://ws-api.binance.com/ws-api/v3')

const { InputMessageModel } = require('./models/input.message.model.js')
const { OutputMessageModel } = require('./models/output.message.model.js')
const { orderMethod, quoteOrderQty, apiKey, secretKey, symbol, type, timeInForce } = require('./config.js')

const messages = []

const exit = () => ws.close()

const save = (message) => messages.push(message)

const log = (side, id, method, params = {}) => console.log(side, id, method, params)

const request = (message = new InputMessageModel()) => {
  log('request', message.id, message.method, message.params)
  save(message)
  ws.send(message.toString())
}

const getTickerPriceOutputMessages = (messages = []) => Array.from(messages)
  .filter((m) => m.method == 'ticker.price')
  .filter((m) => m.side == 'output')

const fixRound = (num = 0) => +String(num).replace(/000000.*/, '0').replace(/(.)999999.*/, (_, n) => +n + 1)

const timeDiff = (messages = []) => Array.from(messages)
  .map((_, ix) => ix === 0 ? 0 : fixRound(messages[ix].result.price - messages[ix - 1].result.price))

const mayBuy = (message = new OutputMessageModel()) => console.table(timeDiff(getTickerPriceOutputMessages(messages)))

const maySell = (message = new OutputMessageModel()) => false

const getUrlSearchByParams = (params = {}) => Object.keys(params).sort().map((p) => `${p}=${params[p]}`).join('&')

const createSignature = (params = {}) => createHmac('sha256', secretKey).update(getUrlSearchByParams(params)).digest('hex')

const createParams = (params = {}, timestamp = Date.now()) => {
  params = { ...params, timestamp, apiKey }
  return { signature: createSignature(params), ...params }
}

const buy = () => request(new InputMessageModel(orderMethod, createParams({ symbol, side: 'BUY', type, timeInForce, quoteOrderQty })))

const sell = () => request(new InputMessageModel(orderMethod, createParams({ symbol, side: 'SELL', type, timeInForce, quoteOrderQty })))

const tickerPrice = () => request(new InputMessageModel('ticker.price', { symbol: symbol.toUpperCase() }))

const run = () => {
  setInterval(() => request(new InputMessageModel('ping')), 1000 * 10)
  tickerPrice()
}

const onTickerPriceOutput = (message = new OutputMessageModel()) => {
  setTimeout(() => tickerPrice(), 500)
  if (mayBuy(message)) buy(message)
  else if (maySell(message)) sell(message)
}

const response = (message = new OutputMessageModel()) => {
  log('response', message.id, message.method, message.result)
  switch (message.method) {
    case 'ping': return request(new InputMessageModel('pong', message.result))
    case 'ticker.price': return onTickerPriceOutput(message)
  }
}

const getMethodById = (id) => messages.find((message) => message.id == id)?.method

const onMessage = (data) => {
  const output = JSON.parse(data)
  const message = new OutputMessageModel(getMethodById(output.id), output)
  save(message)
  response(message)
}

ws.addListener('open', () => run())

ws.addListener('close', (data) => {
  console.log('close', data)
  process.exit()
})

ws.addListener('error', (data) => console.log('error', data))

ws.addListener('message', (data) => onMessage(data))

process.on('SIGINT', () => exit())

process.on('SIGTERM', () => exit())
