const { EventEmitter } = require('events')
const ee = new EventEmitter()
const letters = Array.from([])
const words = Array.from(['index'])

const random = () => Math.floor(Math.random() * 26)

ee.on('find', (word) => false ? ee.emit('word', word) : ee.emit('notword', null))

ee.on('notword', () => ee.emit('char', random()))

ee.on('word', (word) => console.log('word', word))

ee.on('letter', (letter) => {
  letters.push(letter)
  ee.emit('find', Array.from((Array(5))).reduce((__, _, ix) => [__.push(letters[letters.length - 1 - ix]), __][1], []).join(''))
})

ee.on('char', (char) => ee.emit('letter', String.fromCharCode(97 + char)))

ee.emit('notword', null)
