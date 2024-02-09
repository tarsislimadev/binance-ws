const { APIKey, UserId, APISecret } = require('./config.js')
const { createHmac } = require('crypto')

module.exports.sessionStatus = ({ id, method, params }) => ({ id, method, params })

module.exports.sessionLogon = ({ id, method, params }) => ({ id, method, params })

module.exports.sessionLogout = ({ id, method, params }) => ({ id, method, params })

module.exports.orderTest = ({ id, method, params }) => ({ id, method, params })

module.exports.orderPlace = ({ id, method, params }) => ({ id, method, params })

module.exports.orderStatus = ({ id, method, params }) => ({ id, method, params })

module.exports.orderCancel = ({ id, method, params }) => ({ id, method, params })

module.exports.orderCancelReplace = ({ id, method, params }) => ({ id, method, params })

module.exports.openOrdersStatus = ({ id, method, params }) => ({ id, method, params })

module.exports.openOrdersCancelAll = ({ id, method, params }) => ({ id, method, params })

module.exports.orderListStatus = ({ id, method, params }) => ({ id, method, params })

module.exports.orderListPlace = ({ id, method, params }) => ({ id, method, params })

module.exports.orderListCancel = ({ id, method, params }) => ({ id, method, params })

module.exports.openOrderListsStatus = ({ id, method, params }) => ({ id, method, params })

module.exports.sorOrderPlace = ({ id, method, params }) => ({ id, method, params })

module.exports.sorOrderTest = ({ id, method, params }) => ({ id, method, params })

module.exports.accountStatus = ({ id, method, params }) => ({ id, method, params })

module.exports.accountCommission = ({ id, method, params }) => ({ id, method, params })

module.exports.accountRateLimitsOrders = ({ id, method, params }) => ({ id, method, params })

module.exports.allOrders = ({ id, method, params }) => ({ id, method, params })

module.exports.allOrderLists = ({ id, method, params }) => ({ id, method, params })

module.exports.myTrades = ({ id, method, params }) => ({ id, method, params })

module.exports.myPreventedMatches = ({ id, method, params }) => ({ id, method, params })

module.exports.myAllocations = ({ id, method, params }) => ({ id, method, params })

module.exports.switchRequest = ({ id, method, params }) => {
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
