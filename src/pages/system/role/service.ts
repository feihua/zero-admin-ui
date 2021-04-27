import { request } from 'umi';
import { RoleListParams, RoleListItem } from './data.d';

export async function queryRole(params?: RoleListParams) {
  return request('/api/sys/role/list', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function queryMenuByRoleId(params: { id?: number }) {
  return request('/api/sys/role/queryMenuByRoleId', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateRoleMenu(params: { roleId: number ,menuIds:number[]}) {
  return request('/api/sys/role/updateRoleMenu', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function removeRoleOne(params: { id: number }) {
  return request('/api/sys/role/delete', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function removeRole(params: { ids: number[] }) {
  return request('/api/sys/role/delete', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function addRole(params: RoleListItem) {
  return request('/api/sys/role/add', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateRule(params: RoleListItem) {
  return request('/api/sys/role/update', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
