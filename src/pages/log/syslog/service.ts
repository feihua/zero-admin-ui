import {request} from 'umi';
import type {SysLogListParams} from './data.d';

export async function querySysLog(params?: SysLogListParams) {
  return request('/api/sys/sysLog/list', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

export async function removeSysLog(params: { ids: number[] }) {
  return request('/api/sys/sysLog/delete', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}
