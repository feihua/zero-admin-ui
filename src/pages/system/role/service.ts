import { request } from 'umi';
import { TableListParams, TableListItem } from './data.d';

export async function queryRole(params?: TableListParams) {
  return request('/api/sys/role/list', {
    params,
  });
}

export async function queryUserRole(params?: TableListParams) {
  return request('/api/sys/role/list', {
    params,
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

export async function removeRole(params: { key: number[] }) {
  return request('/api/sys/role/delete', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function addRole(params: TableListItem) {
  return request('/api/sys/role/add', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateRule(params: TableListParams) {
  return request('/api/sys/role/update', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
