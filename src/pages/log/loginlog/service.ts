import { request } from 'umi';
import { TableListParams } from './data.d';

export async function queryLoginLog(params?: TableListParams) {
  return request('/api/sys/loginLog/list', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function removeLoginLogOne(params: { id: number }) {
  return request('/api/sys/loginLog/delete', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function removeLoginLog(params: { ids: number[] }) {
  return request('/api/sys/loginLog/delete', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
