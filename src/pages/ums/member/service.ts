import {request} from 'umi';
import type {MemberTableListParams, MemberTableListItem, AddressTableListParams, LoginLogListParams} from './data.d';

export async function queryMemberList(params: MemberTableListParams) {
  if (params.status != null) {
    params.status = Number(params.status)
  }
  return request('/api/member/member/list', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function removeMember(params: { ids: number[] }) {
  return request('/api/member/member/delete', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateMember(params: MemberTableListItem) {
  return request('/api/member/member/update', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function queryAddress(params: AddressTableListParams) {
  return request('/api/member/address/list', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function queryLoginLog(params: LoginLogListParams) {
  return request('/api/member/loginlog/list', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
