import {request} from 'umi';
import {UserListParams} from "@/pages/system/role/components/SetUser/data";

// 查询角色与用户的关联
export async function queryRoleUserList(params: UserListParams) {

  return request('/api/sys/role/queryRoleUserList', {
    method: 'GET',
    params: {
      ...params
    }
  });
}


