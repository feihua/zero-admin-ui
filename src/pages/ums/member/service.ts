import {request} from 'umi';
import type {MemberListParams, MemberListItem, AddressListParams, LoginLogListParams} from './data.d';

// 删除会员信息
export async function removeMember(ids: number[]) {
  return request('/api/ums/member/deleteMember?ids=' + ids.join(','), {
    method: 'GET',
  });
}


// 更新会员信息
export async function updateMember(params: MemberListItem) {
  return request('/api/ums/member/updateMember', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 批量更新会员信息状态
export async function updateMemberStatus(params: { dictTypeIds: number[], postStatus: number }) {
  return request('/api/ums/member/updateMemberStatus', {
    method: 'POST',
    data: {
      ...params,
    },

  });
}


// 查询会员信息详情
export async function queryMemberDetail(id: number ) {
  return request('/api/ums/member/queryMemberDetail', {
    method: 'GET',
  });
}

// 分页查询会员信息列表
export async function queryMemberList(params: MemberListParams) {

  return request('/api/ums/member/queryMemberList', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

// 分页查询询会员地址列表
export async function queryMemberAddressList(params: AddressListParams) {

  return request('/api/ums/member/address/queryMemberAddressList', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}



// 查询会员的登录日志
export async function queryLoginLogList(params: LoginLogListParams) {

  return request('/api/ums/member/queryMemberLoginLogList', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}


