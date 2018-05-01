import store from '../store'
import fetch from './httpFetch'

/**
 * @param isAll 我的还是全部：0我的，1全部
 * @param oppName 商机名称
 * @param customer  客户ID
 * @param status  商机状态
 * @param type  商机类型
 * @param pageSize  当前页码
 * @param pageNumber  每页多少
 */
export function getOpportunityList(isAll, oppName, customer, status, type, pageSize, pageNumber) {
  return fetch({
    method: 'get',
    url: '/opportunity',
    params: {
      tuid: store.getters.tuid,
      timestamp: new Date().getTime(),
      sign: '',
      isAll,
      oppName,
      customer,
      status,
      type,
      pageSize,
      pageNumber
    }
  })
}

/**
 * bd  BD
 * competitor  竞争对手
 * customer  客户名称
 * description 商机描述
 * estimate  预估合同额
 * expectedTime  预计合同签订时间
 * oppName 商机名称
 * products  产品名称
 * sale  销售
 * status  商机状态
 * type  商机类型
 */
export function addOpportunity(params) {
  return fetch.post('/opportunity', params)
}

export function getOppDetail(tuid) {
  return fetch.get(`/opportunity/${tuid}`)
}

/**
 * @param tuid 商机id
 * bd  BD
 * competitor  竞争对手
 * customer  客户名称
 * description 商机描述
 * estimate  预估合同额
 * expectedTime  预计合同签订时间
 * oppName 商机名称
 * products  产品名称
 * sale  销售
 * status  商机状态
 * type  商机类型
 */
export function undateOpportunity(tuid, params) {
  return fetch({
    method: 'put',
    url: `/opportunity/${tuid}`,
    data: Object.assign(params, { tuid })
  })
}
