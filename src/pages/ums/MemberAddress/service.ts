import {request} from 'umi';
import type { MemberAddressListParams, MemberAddressListItem } from './data.d';

// 添加会员收货地址
export async function addMemberAddress(params: MemberAddressListItem) {
  return request('/api/demo/memberAddress/addMemberAddress', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 删除会员收货地址
export async function removeMemberAddress(ids: number[]) {
  return request('/api/demo/memberAddress/deleteMemberAddress?ids=[' + ids + "]", {
    method: 'GET',
  });
}


// 更新会员收货地址
export async function updateMemberAddress(params: MemberAddressListItem) {
  return request('/api/demo/memberAddress/updateMemberAddress', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 批量更新会员收货地址状态
export async function updateMemberAddressStatus(params: { memberAddressIds: number[], memberAddressStatus: number }) {
  return request('/api/demo/memberAddress/updateMemberAddressStatus', {
    method: 'POST',
    data: {
      ...params,
    },

  });
}


// 查询会员收货地址详情
export async function queryMemberAddressDetail(id: number) {
  return request('/api/demo/memberAddress/queryMemberAddressDetail?id=' + id, {
    method: 'GET',
  });
}

// 分页查询会员收货地址列表
export async function queryMemberAddressList(params: MemberAddressListParams) {

  return request('/api/demo/memberAddress/queryMemberAddressList', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}
