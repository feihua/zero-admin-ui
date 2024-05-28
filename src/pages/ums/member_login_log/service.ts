import { request } from 'umi';
import { LoginLogListParams } from './data.d';

export async function queryLoginLog(params?: LoginLogListParams) {
  return request('/api/member/loginlog/list', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

export async function removeLoginLog(params: { ids: number[] }) {
  return request('/api/member/loginlog/delete', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

