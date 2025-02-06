import {request} from 'umi';
import type {RoleListParams, RoleListItem} from './data.d';

// 添加角色信息
export async function addRole(params: RoleListItem) {
  return request('/api/sys/role/addRole', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}


// 删除角色信息
export async function removeRole(ids: number[]) {
  return request('/api/sys/role/deleteRole?ids=' + ids.join(','), {
    method: 'GET',
  });
}


// 更新角色信息
export async function updateRole(params: RoleListItem) {
  return request('/api/sys/role/updateRole', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 批量更新角色信息状态
export async function updateRoleStatus(params: { roleIds: number[], postStatus: number }) {
  return request('/api/sys/role/updateRoleStatus', {
    method: 'POST',
    data: {
      ...params,
    },

  });
}


// 查询角色信息详情
export async function queryRoleDetail(roleId: number) {
  return request('/api/sys/role/queryRoleDetail?id='+roleId, {
    method: 'GET',

  });
}

// 分页查询角色信息列表
export async function queryRoleList(params: RoleListParams) {

  return request('/api/sys/role/queryRoleList', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}


// 查询角色与菜单的关联
export async function queryRoleMenuList(roleId :number) {

  return request('/api/sys/role/queryRoleMenuList?roleId='+roleId, {
    method: 'GET',
  });
}

// 更新角色与菜单的关联
export async function updateRoleMenuList(params: { roleId: number, menuIds: number[] }) {
  return request('/api/sys/role/updateRoleMenuList', {
    method: 'POST',
    data: {
      ...params,
    },

  });
}
