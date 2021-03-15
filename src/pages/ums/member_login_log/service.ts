import { request } from 'umi';
import { LoginLogListParams, LoginLogListItem } from './data.d';

export async function queryLoginLog(params?: LoginLogListParams) {
  return request('/api/member/loginlog/list', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function removeLoginLog(params: { ids: number[] }) {
  return request('/api/member/loginlog/delete', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function addLoginLog(params: LoginLogListItem) {
  return request('/api/member/loginlog/add', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateLoginLog(params: LoginLogListParams) {
  return request('/api/member/loginlog/update', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

