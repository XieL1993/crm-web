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

export function getOrgListTree() {
  return fetch.get('/sys/org/listtree')
}

export function getOrgDetail(tuid) {
  return fetch.get(`/sys/org/${tuid}`)
}

export function updateOrg(tuid, params) {
  return fetch({
    method: 'put',
    url: `/sys/org/${tuid}`,
    data: Object.assign(params, { tuid })
  })
}

export function deleteOrg(tuid) {
  return fetch({
    method: 'delete',
    url: `/sys/org/${tuid}`,
    data: { tuid }
  })
}
