import { request } from 'umi';
import { TableListParams } from './data.d';

export async function querySysLog(params?: TableListParams) {
  return request('/api/sys/sysLog/list', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function removeSysLogOne(params: { id: number }) {
  return request('/api/sys/sysLog/delete', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function removeSysLog(params: { ids: number[] }) {
  return request('/api/sys/sysLog/delete', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
