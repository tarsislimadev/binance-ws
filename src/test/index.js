const WebSocket = require('ws')

const ws = new WebSocket('wss://ws-api.binance.com/ws-api/v3')

const { InputMessageModel } = require('./models/input.message.model.js')

const { OutputMessageModel } = require('./models/output.message.model.js')

const messages = []

const save = (message) => messages.push(message)

const send = (message) => {
  console.log('send', message)
  save(message)
  ws.send(message.toString())
}

const run = (symbol = 'bnbbrl'.toUpperCase()) => {
  setInterval(() => send(new InputMessageModel('ping')), 1000 * 10)
  send(new InputMessageModel('ticker.price', { symbol }))
}

const onOpen = () => run()

const onClose = (data) => console.log('close', data)

const onError = (data) => console.log('error', data)

const getMethodById = (id) => messages.find((message) => message.id == id)?.method

const onPingOutput = (message = new OutputMessageModel()) => {
  send(new InputMessageModel('pong', message.params))
}

const onTickerPriceOutput = (message = new OutputMessageModel()) => {
  console.log('ticker.price', message)
}

const response = (message = new OutputMessageModel()) => {
  switch (message.method) {
    // case 'ping': return onPingOutput(message)
    case 'ticker.price': return onTickerPriceOutput(message)
    default: console.log('retrieve', message)
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
