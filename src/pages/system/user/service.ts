import { request } from 'umi';
import { UserListParams, UserListItem } from './data.d';

export async function queryUserList(params?: UserListParams) {
  return request('/api/sys/user/list', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function querySelectAllData(params?: UserListParams) {
  return request('/api/sys/user/selectAllData', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}


export async function removeUser(params: { ids: number[] }) {
  return request('/api/sys/user/delete', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function addUser(params: UserListItem) {
  return request('/api/sys/user/add', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateUser(params: UserListItem) {
  return request('/api/sys/user/update', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

