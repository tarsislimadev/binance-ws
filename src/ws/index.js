const { EventEmitter } = require('events')
const { createServer } = require('http')
const { Server } = require('socket.io')
const WebSocket = require('ws')
const { switchRequest } = require('./messages.js')

const server = createServer()
const io = new Server(server, { cors: { origin: '*' } })
const ee = new EventEmitter()

const save = (data) => data

io.on('connection', (socket) => {
  const ws = new WebSocket('wss://ws-api.binance.com/ws-api/v3')

  const send = ({ id = Date.now(), method, params = {} } = {}) => {
    console.log('send', { id, method, params })
    ws.send(JSON.stringify({ id, method, params }))
    save('send', { id, method, params })
  }

  socket.on('message', (data) => send(JSON.parse(data)))

  const retrieve = (message = {}) => {
    console.log('retrieve', message, typeof message)
    socket.emit('message', message)
    save('retrieve', message)
  }

  ws.addListener('message', (data) => retrieve(JSON.parse(data.toString())))
})

server.listen(80, () => console.log('httpServer.listen 80'))
