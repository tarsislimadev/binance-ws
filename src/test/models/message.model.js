const { Model } = require('./model.js')

const { uuidv4 } = require('../utils/str.js')

class MessageModel extends Model {
  id = null
  method = null
  params = {}
  side = 'none'

  constructor(side, method, id = uuidv4(), { params = {} } = {}) {
    super()
    this.side = side
    this.id = id
    this.method = method
    this.params = params
  }

  toJSON() {
    const { id, method, params } = this
    return { id, method, params }
  }

  toString() {
    return JSON.stringify(this.toJSON())
  }
}

module.exports = { MessageModel }
