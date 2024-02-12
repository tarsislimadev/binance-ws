const { EventEmitter } = require('events')
const { createServer } = require('http')
const { Server } = require('socket.io')
const express = require('express')
const WebSocket = require('ws')

const app = express()
app.use(express.static('public'))
const server = createServer(app)
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

  socket.on('message', (data) => send(JSON.parse(data.toString())))

  const retrieve = (message = {}) => {
    console.log('retrieve', message, typeof message)
    socket.send(JSON.stringify(message))
    save('retrieve', message)
  }

  ws.addListener('open', (data) => retrieve({ id: -1, status: 200, result: { method: 'open', params: { datetime: Date.now() } } }))

  ws.addListener('close', (data) => retrieve({ id: -1, status: 200, result: { method: 'close', params: { datetime: Date.now() } } }))

  ws.addListener('error', (data) => retrieve({ id: -1, status: 200, result: { method: 'error', params: data } }))

  ws.addListener('message', (data) => retrieve(JSON.parse(data.toString())))
})

server.listen(80, () => console.log('server.listen 80'))
