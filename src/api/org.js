import fetch from './httpFetch'

export function getOrgList(orgName, orgType, pageSize, pageNumber) {
  return fetch({
    method: 'get',
    url: '/sys/org',
    params: {
      timestamp: new Date().getTime(),
      sign: '',
      orgName,
      orgType,
      pageSize,
      pageNumber
    }
  })
}

export function addOrg(data) {
  if (!data.parentOrgId) data.parentOrgId = '0'
  return fetch({
    method: 'post',
    url: `/sys/org/${data.parentOrgId}`,
    data
  })
}

export function getinvDetail(tuid) {
  return fetch.get(`/invoice/${tuid}`)
}

export function undateInvoice(tuid, params) {
  return fetch({
    method: 'put',
    url: `/invoice/${tuid}`,
    data: Object.assign(params, { tuid })
  })
}
