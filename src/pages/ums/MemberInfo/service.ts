import {request} from 'umi';
import {
  MemberInfoListParams,
  MemberInfoListItem,
  AddressListParams,
  LoginLogListParams,
  MemberGrowthLogListParams, MemberPointsLogListParams, MemberSignLogListParams
} from './data.d';

// 添加会员信息
export async function addMemberInfo(params: MemberInfoListItem) {
  return request('/api/ums/member/addMember', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 删除会员信息
export async function removeMemberInfo(ids: number[]) {
  return request('/api/ums/member/deleteMember?ids=' + ids.join(','), {
    method: 'GET',
  });
}


// 更新会员信息
export async function updateMemberInfo(params: MemberInfoListItem) {
  return request('/api/ums/member/updateMember', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 批量更新会员信息状态
export async function updateMemberInfoStatus(params: { ids: number[], isEnabled: number }) {
  return request('/api/ums/member/updateMemberStatus', {
    method: 'POST',
    data: {
      ...params,
    },

  });
}


// 查询会员信息详情
export async function queryMemberInfoDetail(id: number) {
  return request('/api/ums/member/queryMemberDetail?id=' + id, {
    method: 'GET',
  });
}

// 分页查询会员信息列表
export async function queryMemberInfoList(params: MemberInfoListParams) {

  return request('/api/ums/member/queryMemberList', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

// 分页查询询会员地址列表
export async function queryMemberAddressList(params: AddressListParams) {

  return request('/api/ums/address/queryMemberAddressList', {
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

// 分页查询会员成长值记录列表
export async function queryMemberGrowthLogList(params: MemberGrowthLogListParams) {

  return request('/api/ums/growthLog/queryMemberGrowthLogList', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}
// 分页查询会员积分记录列表
export async function queryMemberPointsLogList(params: MemberPointsLogListParams) {

  return request('/api/ums/pointsLog/queryMemberPointsLogList', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

// 分页查询会员签到记录列表
export async function queryMemberSignLogList(params: MemberSignLogListParams) {

  return request('/api/ums/sign/queryMemberSignLogList', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}
