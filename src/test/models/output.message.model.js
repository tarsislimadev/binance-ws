const { MessageModel } = require('./message.model.js')

class OutputMessageModel extends MessageModel {
  status = 200
  result = null
  rateLimits = []

  constructor(method, { id, status, result, rateLimits = [] } = {}) {
    super(method, id)
    this.status = status
    this.result = result
    this.rateLimits = rateLimits
  }

  toJSON() {
    const { id, method, params, output } = this
    return { id, method, input: params, output }
  }
}

module.exports = { OutputMessageModel }
