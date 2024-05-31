import {request} from 'umi';
import type {LoginLogListParams} from './data.d';

/**
 * 查询登录日志
 * @param params
 */
export async function queryLoginLog(params: LoginLogListParams) {
  return request('/api/sys/log/queryLoginLogList', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

/**
 * 批量删除登录日志
 * @param params
 */
export async function removeLoginLog(params: { ids: number[] }) {
  return request('/api/sys/loginLog/delete', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

/**
 * 查询日志统计
 */
export async function statisticsLoginLog() {
  return request('/api/sys/loginLog/statisticsLoginLog', {
    method: 'GET',
  });
}
