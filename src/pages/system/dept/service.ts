import { request } from 'umi';
import { TableListParams, TableListItem } from './data.d';

export async function queryDept(params?: TableListParams) {
  return request('/api/sys/dept/list', {
    params,
  });
}

export async function removeDeptOne(params: { id: number }) {
  return request('/api/sys/dept/delete', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function removeDept(params: { key: number[] }) {
  return request('/api/sys/dept/delete', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addDept(params: TableListItem) {
  return request('/api/sys/dept/add', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params: TableListParams) {
  return request('/api/sys/dept/update', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}
