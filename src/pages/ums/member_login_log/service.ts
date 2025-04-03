import { request } from 'umi';
import { LoginLogListParams } from './data.d';

// 查询会员的登录日志
export async function queryLoginLogList(params: LoginLogListParams) {

  return request('/api/ums/queryLoginLogList', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}


