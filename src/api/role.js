import fetch from './httpFetch'

export function getRoleList(roleName, roleStatus, pageSize, pageNumber) {
  return fetch({
    method: 'get',
    url: '/sys/role',
    params: {
      timestamp: new Date().getTime(),
      sign: '',
      roleName,
      roleStatus,
      pageSize,
      pageNumber
    }
  })
}

export function addRole(data) {
  return fetch({
    method: 'post',
    url: '/sys/role',
    data
  })
}

export function getRoleDetail(tuid) {
  return fetch.get(`/sys/role/${tuid}`)
}

export function updateRole(tuid, data) {
  return fetch({
    method: 'put',
    url: `/sys/role/${tuid}`,
    data
  })
}

export function deleteRole(tuid) {
  return fetch({
    method: 'delete',
    url: `/sys/role/${tuid}`,
    data: { tuid }
  })
}

export function getResourceTree(roleId) {
  return fetch.get(`/sys/resource/tree/${roleId}`)
}

export function roleGrantResource(roleId, resourceIds) {
  return fetch({
    method: 'post',
    url: '/sys/role/grant',
    data: {
      roleId,
      resourceIds
    }
  })
}
