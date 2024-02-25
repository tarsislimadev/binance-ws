const { Model } = require('./model.js')

class MessageModel extends Model {
  id = null
  method = null
  params = {}

  constructor(method, id = Date.now(), { params = {} } = {}) {
    super()
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
