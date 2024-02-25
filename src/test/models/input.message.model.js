const { MessageModel } = require('./message.model.js')

class InputMessageModel extends MessageModel {
  constructor(method, input = {}) {
    super(method)
    this.params = input
  }

  toJSON() {
    const { id, method, params } = this
    return { id, method, params }
  }
}

module.exports = { InputMessageModel }
