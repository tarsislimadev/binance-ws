const { APIKey, UserId, APISecret } = require('./config.js')
const { createHmac } = require('crypto')

const createQuery = (params) => Object.keys(params).map((param) => `${param}=${params[param]}`).join('&').toString()

const createSignatureHash = (params, timestamp, apiKey) => createHmac('sha1', APISecret).update(createQuery({ apiKey, ...params, timestamp })).digest('hex').toString()

const createParams = (params, apiKey = APIKey, timestamp = Date.now()) => ({ ...params, apiKey, signature: createSignatureHash(params, timestamp, apiKey), timestamp })

const sessionStatus = ({ id, method, params }) => ({ id, method, params: createParams(params) })

const sessionLogon = ({ id, method, params }) => ({ id, method, params: createParams(params) })

const sessionLogout = ({ id, method, params }) => ({ id, method, params: createParams(params) })

const orderTest = ({ id, method, params }) => ({ id, method, params: createParams(params) })

const orderPlace = ({ id, method, params }) => ({ id, method, params: createParams(params) })

const orderStatus = ({ id, method, params }) => ({ id, method, params: createParams(params) })

const orderCancel = ({ id, method, params }) => ({ id, method, params: createParams(params) })

const orderCancelReplace = ({ id, method, params }) => ({ id, method, params: createParams(params) })

const openOrdersStatus = ({ id, method, params }) => ({ id, method, params: createParams(params) })

const openOrdersCancelAll = ({ id, method, params }) => ({ id, method, params: createParams(params) })

const orderListStatus = ({ id, method, params }) => ({ id, method, params: createParams(params) })

const orderListPlace = ({ id, method, params }) => ({ id, method, params: createParams(params) })

const orderListCancel = ({ id, method, params }) => ({ id, method, params: createParams(params) })

const openOrderListsStatus = ({ id, method, params }) => ({ id, method, params: createParams(params) })

const sorOrderPlace = ({ id, method, params }) => ({ id, method, params: createParams(params) })

const sorOrderTest = ({ id, method, params }) => ({ id, method, params: createParams(params) })

const accountStatus = ({ id, method, params }) => ({ id, method, params: createParams(params) })

const accountCommission = ({ id, method, params }) => ({ id, method, params: createParams(params) })

const accountRateLimitsOrders = ({ id, method, params }) => ({ id, method, params: createParams(params) })

const allOrders = ({ id, method, params }) => ({ id, method, params: createParams(params) })

const allOrderLists = ({ id, method, params }) => ({ id, method, params: createParams(params) })

const myTrades = ({ id, method, params }) => ({ id, method, params: createParams(params) })

const myPreventedMatches = ({ id, method, params }) => ({ id, method, params: createParams(params) })

const myAllocations = ({ id, method, params }) => ({ id, method, params: createParams(params) })

const switchRequest = ({ id, method, params }) => {
  switch (method) {
    case 'session.status': return sessionStatus({ id, method, params })
    case 'session.logon': return sessionLogon({ id, method, params })
    case 'session.logout': return sessionLogout({ id, method, params })
    case 'order.test': return orderTest({ id, method, params })
    case 'order.place': return orderPlace({ id, method, params })
    case 'order.status': return orderStatus({ id, method, params })
    case 'order.cancel': return orderCancel({ id, method, params })
    case 'order.cancelReplace': return orderCancelReplace({ id, method, params })
    case 'openOrders.status': return openOrdersStatus({ id, method, params })
    case 'openOrders.cancelAll': return openOrdersCancelAll({ id, method, params })
    case 'orderList.status': return orderListStatus({ id, method, params })
    case 'orderList.place': return orderListPlace({ id, method, params })
    case 'orderList.cancel': return orderListCancel({ id, method, params })
    case 'openOrderLists.status': return openOrderListsStatus({ id, method, params })
    case 'sor.order.place': return sorOrderPlace({ id, method, params })
    case 'sor.order.test': return sorOrderTest({ id, method, params })
    case 'account.status': return accountStatus({ id, method, params })
    case 'account.commission': return accountCommission({ id, method, params })
    case 'account.rateLimits.orders': return accountRateLimitsOrders({ id, method, params })
    case 'allOrders': return allOrders({ id, method, params })
    case 'allOrderLists': return allOrderLists({ id, method, params })
    case 'myTrades': return myTrades({ id, method, params })
    case 'myPreventedMatches': return myPreventedMatches({ id, method, params })
    case 'myAllocations': return myAllocations({ id, method, params })
  }

  return ({ id, method, params })
}

const toRequest = (data) => switchRequest(JSON.parse(data.toString()))

const fromResponse = (data) => JSON.parse(data.toString())

module.exports = { toRequest, fromResponse }
