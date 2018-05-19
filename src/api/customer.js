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

export function addCustomer(params) {
  return fetch({
    method: 'post',
    url: '/customer',
    data: params
  })
}

export function getCusDetail(tuid) {
  return fetch.get(`/customer/${tuid}`)
}

export function updateCustomer(tuid, data) {
  return fetch({
    method: 'put',
    url: `/customer/${tuid}`,
    data
  })
}

export function getCusContact(tuid) {
  return fetch({
    method: 'get',
    url: '/customer/contact',
    params: {
      customerId: tuid
    }
  })
}

export function getCustOverview(tuid) {
  return fetch.get(`/customer/overview/${tuid}`)
}

export function getCustRemind(tuid) {
  return fetch.get(`/customer/remind/${tuid}`)
}

export function addContact(params) {
  return fetch({
    method: 'post',
    url: '/customer/contact',
    data: params
  })
}

export function updateContact(tuid, params) {
  return fetch({
    method: 'put',
    url: `/customer/contact/${tuid}`,
    data: Object.assign(params, { tuid })
  })
}

export function getContactDetail(tuid) {
  return fetch.get(`/customer/contact/${tuid}`)
}

export function deleteContact(tuid) {
  return fetch({
    method: 'delete',
    url: `/customer/contact/${tuid}`,
    data: { tuid }
  })
}

export function getAreaCascader() {
  return fetch.get('/sys/area/cascader')
}
