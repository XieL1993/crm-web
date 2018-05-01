import store from '../store'
import fetch from './httpFetch'

/**
 * @param customer 客户ID
 * @param contract 合同ID
 * @param isFinished 收款类型
 * @param {Number} isAll
 * @param {Number} pageSize
 * @param {Number} pageNumber
 */
export function getInvoiceList(isAll, customer, contract, isFinished, pageSize, pageNumber) {
  return fetch({
    method: 'get',
    url: '/invoice',
    params: {
      tuid: store.getters.tuid,
      timestamp: new Date().getTime(),
      sign: '',
      isAll,
      customer,
      contract,
      isFinished,
      pageSize,
      pageNumber
    }
  })
}
