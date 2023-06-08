import {request} from 'umi';
import type {TableListParams} from './data.d';

/**
 * 查询登录日志
 * @param params
 */
export async function queryLoginLog(params: TableListParams) {
  return request('/api/sys/loginLog/list', {
    method: 'POST',
    data: {
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
    method: 'POST',
    data: {
      ...params,
    },
  });
}
