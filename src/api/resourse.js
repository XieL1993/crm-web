import fetch from './httpFetch'

export function getResourceList(sourceName, sourceType, pageSize, pageNumber) {
  return fetch({
    method: 'get',
    url: '/sys/resource',
    params: {
      timestamp: new Date().getTime(),
      sign: '',
      sourceName,
      sourceType,
      pageSize,
      pageNumber
    }
  })
}

export function addResource(data) {
  if (!data.parentResId) data.parentResId = '0'
  return fetch({
    method: 'post',
    url: `/sys/resource/${data.parentResId}`,
    data
  })
}

export function getResDetail(tuid) {
  return fetch.get(`/sys/resource/${tuid}`)
}

export function updateResource(tuid, data) {
  return fetch({
    method: 'put',
    url: `/sys/resource/${tuid}`,
    data
  })
}

export function deleteResource(tuid) {
  return fetch({
    method: 'delete',
    url: `/sys/resource/${tuid}`,
    data: { tuid }
  })
}

export function getUserResource(tuid) {
  return fetch.get(`/sys/user/grant/${tuid}`)
}

export function setUserResource(userId, roleIds) {
  return fetch({
    method: 'post',
    url: '/sys/user/grant',
    data: {
      userId,
      roleIds
    }
  })
}
