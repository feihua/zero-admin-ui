import {request} from 'umi';
import type {UserListParams, UserListItem} from './data.d';

//查询用户列表
export async function queryUserList(params: UserListParams) {
  if (params.status != null) {
    params.status = Number(params.status)
  }
  return request('/api/sys/user/list', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

//查询用户的关糸
export async function queryAllRelations(params?: UserListParams) {
  return request('/api/sys/user/queryAllRelations', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}


//删除用户
export async function removeUser(params: { ids: number[] }) {
  return request('/api/sys/user/delete', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

//添加用户
export async function addUser(params: UserListItem) {
  return request('/api/sys/user/add', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

//更新用户
export async function updateUser(params: UserListItem) {
  return request('/api/sys/user/update', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

