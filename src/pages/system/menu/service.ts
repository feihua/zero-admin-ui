import { request } from 'umi';
import { TableListParams, TableListItem } from './data.d';

export async function queryMenu(params?: TableListParams) {
  return request('/api/sys/menu/list', {
    params,
  });
}

export async function removeMenuOne(params: { id: number }) {
  return request('/api/sys/menu/delete', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function removeMenu(params: { key: number[] }) {
  return request('/api/sys/menu/delete', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function addMenu(params: TableListItem) {
  return request('/api/sys/menu/add', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateRule(params: TableListParams) {
  return request('/api/sys/menu/update', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
