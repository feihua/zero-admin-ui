import { request } from 'umi';
import { MenuListParams, MenuListItem } from './data.d';

export async function queryMenu(params?: MenuListParams) {
  return request('/api/sys/menu/list', {
    method: 'POST',
    data: {
      ...params,
    },
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

export async function removeMenu(params: { ids: number[] }) {
  return request('/api/sys/menu/delete', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function addMenu(params: MenuListItem) {
  return request('/api/sys/menu/add', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateRule(params: MenuListItem) {
  return request('/api/sys/menu/update', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
