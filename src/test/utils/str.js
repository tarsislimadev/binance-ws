// 

const uuidv4 = () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => (Math.random() * 16 & (c == 'x' ? 0x3 : 0x8)).toString(16)[0])

module.exports = { uuidv4 }
