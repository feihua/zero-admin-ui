import {request} from 'umi';
import {RoleListParams} from "@/pages/system/user/components/SetRole/data";

// 查询用户与角色的关联
export async function queryUserRoleList(params: RoleListParams) {

  return request('/api/sys/user/queryUserRoleList', {
    method: 'GET',
    params: {
      ...params
    }
  });
}


