import {request} from 'umi';
import type {LoginLogListParams} from './data.d';

// 查询登录日志
export async function queryLoginLogList(params: LoginLogListParams) {
  return request('/api/sys/log/queryLoginLogList', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

// 删除登录日志
export async function removeLoginLog(ids: number[]) {
  return request('/api/sys/log/deleteLoginLog?ids=' + ids.join(','), {
    method: 'GET',
  });
}

// 查询日志统计
export async function queryStatisticsLoginLog() {
  return request('/api/sys/log/queryStatisticsLoginLog', {
    method: 'GET',
  });
}
