import store from '../store'
import fetch from './httpFetch'

/**
 * @description 获取客户列表
 * @param {String} customerName 客户名称
 * @param {String} customerIndustry 客户行业
 * @param {String} customerType 客户类别
 * @param {Number} isAll
 * @param {Number} pageSize
 * @param {Number} pageNumber
 */
export function getCustomerList(isAll, customerName, customerIndustry, customerType, pageSize, pageNumber) {
  return fetch({
    method: 'get',
    url: '/customer',
    params: {
      tuid: store.getters.tuid,
      timestamp: new Date().getTime(),
      sign: '',
      isAll,
      customerName,
      customerIndustry,
      customerType,
      pageSize,
      pageNumber
    }
  })
}

export function getCusDetail(tuid) {
  return fetch.get(`/customer/${tuid}`)
}
