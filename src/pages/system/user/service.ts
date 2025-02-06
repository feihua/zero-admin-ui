import {request} from 'umi';
import type {UserListParams, UserListItem} from './data.d';

// 添加用户信息
export async function addUser(params: UserListItem) {
  return request('/api/sys/user/addUser', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

//

// 删除用户信息
export async function removeUser(ids: number[]) {
  return request('/api/sys/user/deleteUser?ids=' + ids.join(','), {
    method: 'GET',
  });
}


// 更新用户信息
export async function updateUser(params: UserListItem) {
  return request('/api/sys/user/updateUser', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 批量更新用户信息状态
export async function updateUserStatus(params: { userIds: number[], userStatus: number }) {
  return request('/api/sys/user/updateUserStatus', {
    method: 'POST',
    data: {
      ...params,
    },

  });
}


// 查询用户信息详情
export async function queryUserDetail(userId: number) {
  return request('/api/sys/user/queryUserDetail?id='+userId, {
    method: 'GET',

  });
}

// 分页查询用户信息列表
export async function queryUserList(params: UserListParams) {

  return request('/api/sys/user/queryUserList', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

// 查询所有部门和岗位
export async function queryDeptAndPostList() {

  return request('/api/sys/user/queryDeptAndPostList', {
    method: 'GET',
  });
}

// 更新用户与角色的关联
export async function updateUserRoleList(params: { userId: number, roleIds: number[] }) {
  return request('/api/sys/user/updateUserRoleList', {
    method: 'POST',
    data: {
      ...params,
    },

  });
}
