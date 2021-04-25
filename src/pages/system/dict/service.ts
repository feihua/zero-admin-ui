import { request } from 'umi';
import { DictListParams, DictListItem } from './data.d';

export async function queryDict(params?: DictListParams) {
  return request('/api/sys/dict/list', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function removeDictOne(params: { id: number }) {
  return request('/api/sys/dict/delete', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function removeDict(params: { ids: number[] }) {
  return request('/api/sys/dict/delete', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function addDict(params: DictListItem) {
  return request('/api/sys/dict/add', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateDict(params: DictListItem) {
  return request('/api/sys/dict/update', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
