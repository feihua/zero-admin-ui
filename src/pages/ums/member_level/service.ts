import { request } from 'umi';
import { LevelListParams, LevelListItem } from './data.d';

export async function queryLevel(params?: LevelListParams) {
  return request('/api/member/level/list', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}


export async function removeLevel(params: { ids: number[] }) {
  return request('/api/member/level/delete', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function addLevel(params: LevelListItem) {
  return request('/api/member/level/add', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateLevel(params: LevelListItem) {
  return request('/api/member/level/update', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

