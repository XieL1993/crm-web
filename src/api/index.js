import store from '../store'
import fetch from './httpFetch'
import { formatDateTime } from '../common/js/utils'

export function getOverView(dateStart, dateEnd) {
  return fetch({
    method: 'get',
    url: '/index/overview',
    params: {
      tuid: store.getters.tuid,
      timestamp: new Date().getTime(),
      sign: '',
      isAll: 1,
      dateStart,
      dateEnd
    }
  })
}

export function getRemind(dateStart) {
  const date = new Date(dateStart)
  date.setDate(date.getDate() + 6)
  const dateEnd = formatDateTime(date)
  return fetch({
    method: 'get',
    url: '/index/remind',
    params: {
      tuid: store.getters.tuid,
      timestamp: new Date().getTime(),
      sign: '',
      isAll: 1,
      dateStart,
      dateEnd
    }
  })
}
