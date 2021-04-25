import { request } from 'umi';
import { MemberTableListParams, MemberTableListItem } from './data.d';

export async function queryMemberList(params?: MemberTableListParams) {
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

export async function addMember(params: MemberTableListItem) {
  return request('/api/member/member/add', {
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

