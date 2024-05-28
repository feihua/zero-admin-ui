import {request} from 'umi';
import type {MemberListParams, MemberListItem, AddressListParams, LoginLogListParams} from './data.d';

export async function queryMemberList(params: MemberListParams) {
  if (params.status != null) {
    params.status = Number(params.status)
  }
  return request('/api/member/member/list', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

export async function removeMember(params: { ids: number[] }) {
  return request('/api/member/member/delete', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

export async function updateMember(params: MemberListItem) {
  return request('/api/member/member/update', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function queryAddress(params: AddressListParams) {
  return request('/api/member/address/list', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

export async function queryLoginLog(params: LoginLogListParams) {
  return request('/api/member/loginlog/list', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}
