import { request } from 'umi';
import { TableListParams, TableListItem } from './data.d';

export async function queryRule(params?: TableListParams) {
  return request('/api/sys/rule/list', {
    params,
  });
}

export async function removeRule(params: { key: number[] }) {
  return request('/api/sys/rule/delete', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params: TableListItem) {
  return request('/api/sys/rule/add', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params: TableListParams) {
  return request('/api/sys/rule/update', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}
