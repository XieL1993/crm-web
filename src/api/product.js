import store from '../store'
import fetch from './httpFetch'

export function getProductList(pageSize, pageNumber) {
  return fetch({
    method: 'get',
    url: '/product',
    params: {
      tuid: store.getters.tuid,
      timestamp: new Date().getTime(),
      sign: '',
      pageSize,
      pageNumber
    }
  })
}

export function addProduct(data) {
  return fetch({
    method: 'post',
    url: '/product',
    data
  })
}

export function getProductDetail(tuid) {
  return fetch.get(`/product/${tuid}`)
}

export function undateProduct(tuid, params) {
  return fetch({
    method: 'put',
    url: `/product/${tuid}`,
    data: Object.assign(params, { tuid })
  })
}

export function deleteProduct(tuid) {
  return fetch({
    method: 'delete',
    url: `/product/${tuid}`,
    data: { tuid }
  })
}
