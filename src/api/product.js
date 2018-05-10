import store from '../store'
import fetch from './httpFetch'

export function getProductList(pageSize,pageNumber) {
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
