import store from '../store'
import fetch from './httpFetch'

/**
 * @param contractName 合同名称
 * @param customer 客户ID
 * @param status 合同状态
 * @param signType 签约类型
 * @param {Number} isAll
 * @param {Number} pageSize
 * @param {Number} pageNumber
 */
export function getContractList(isAll, contractName, customer, status, signType, pageSize, pageNumber) {
  return fetch({
    method: 'get',
    url: '/contract',
    params: {
      tuid: store.getters.tuid,
      timestamp: new Date().getTime(),
      sign: '',
      isAll,
      contractName,
      customer,
      status,
      signType,
      pageSize,
      pageNumber
    }
  })
}
