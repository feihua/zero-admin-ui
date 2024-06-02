import {request} from 'umi';
import {CancelAuthorizationParams, UserListParams} from "@/pages/system/role/components/SetUser/data";

// 查询角色与用户的关联
export async function queryRoleUserList(params: UserListParams) {

  return request('/api/sys/role/queryRoleUserList', {
    method: 'GET',
    params: {
      ...params
    }
  });
}

// 更新角色与用户的关联
export async function cancelAuthorization(params: CancelAuthorizationParams) {
  return request('/api/sys/role/cancelAuthorization', {
    method: 'POST',
    data: {
      ...params,
    },

  });
}

