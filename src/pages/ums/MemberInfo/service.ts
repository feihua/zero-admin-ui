import {request} from 'umi';
import type { MemberInfoListParams, MemberInfoListItem } from './data.d';

// 添加会员信息
export async function addMemberInfo(params: MemberInfoListItem) {
  return request('/api/demo/memberInfo/addMemberInfo', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 删除会员信息
export async function removeMemberInfo(ids: number[]) {
  return request('/api/demo/memberInfo/deleteMemberInfo?ids=[' + ids + "]", {
    method: 'GET',
  });
}


// 更新会员信息
export async function updateMemberInfo(params: MemberInfoListItem) {
  return request('/api/demo/memberInfo/updateMemberInfo', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 批量更新会员信息状态
export async function updateMemberInfoStatus(params: { memberInfoIds: number[], memberInfoStatus: number }) {
  return request('/api/demo/memberInfo/updateMemberInfoStatus', {
    method: 'POST',
    data: {
      ...params,
    },

  });
}


// 查询会员信息详情
export async function queryMemberInfoDetail(id: number) {
  return request('/api/demo/memberInfo/queryMemberInfoDetail?id=' + id, {
    method: 'GET',
  });
}

// 分页查询会员信息列表
export async function queryMemberInfoList(params: MemberInfoListParams) {

  return request('/api/demo/memberInfo/queryMemberInfoList', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}
