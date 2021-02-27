import { request } from 'umi';
import {TableListParams} from './data.d';

export async function queryLoginLog(params?: TableListParams) {
  return request('/api/sys/loginLog/list', {
    params,
  });
}

export async function removeLoginLogOne(params: { id: number }) {
  return request('/api/sys/loginLog/delete', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function removeLoginLog(params: { key: number[] }) {
  return request('/api/sys/loginLog/delete', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}
