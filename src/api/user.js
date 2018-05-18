import fetch from './httpFetch'

export function getUserList(realName, userType, orgId, userStatus, isLocked, pageSize, pageNumber) {
  return fetch({
    method: 'get',
    url: '/sys/user',
    params: {
      timestamp: new Date().getTime(),
      sign: '',
      realName,
      userType,
      orgId,
      userStatus,
      isLocked,
      pageSize,
      pageNumber
    }
  })
}

export function addUser(data) {
  return fetch({
    method: 'post',
    url: '/sys/user',
    data
  })
}

export function getUserDetail(tuid) {
  return fetch.get(`/sys/user/${tuid}`)
}

export function updateUser(tuid, data) {
  return fetch({
    method: 'put',
    url: `/sys/user/${tuid}`,
    data
  })
}

export function deleteUser(tuid) {
  return fetch({
    method: 'delete',
    url: `/sys/user/${tuid}`,
    data: { tuid }
  })
}
