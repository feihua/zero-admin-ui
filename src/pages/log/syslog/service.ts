import { request } from 'umi';
import {TableListParams} from './data.d';

export async function querySysLog(params?: TableListParams) {
  return request('/api/sys/sysLog/list', {
    params,
  });
}

export async function removeSysLogOne(params: { id: number }) {
  return request('/api/sys/sysLog/delete', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function removeSysLog(params: { key: number[] }) {
  return request('/api/sys/sysLog/delete', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}
