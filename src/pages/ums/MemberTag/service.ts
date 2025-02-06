import {request} from 'umi';
import type { MemberTagListParams, MemberTagListItem } from './data.d';

// 添加用户标签表
export async function addMemberTag(params: MemberTagListItem) {
  return request('/api/member/tag/addMemberTag', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 删除用户标签表
export async function removeMemberTag(ids: number[]) {
  return request('/api/member/tag/deleteMemberTag?ids=' + ids.join(','), {
    method: 'GET',
  });
}


// 更新用户标签表
export async function updateMemberTag(params: MemberTagListItem) {
  return request('/api/member/tag/updateMemberTag', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 批量更新用户标签表状态
export async function updateMemberTagStatus(params: { memberTagIds: number[], memberTagStatus: number }) {
  return request('/api/member/tag/updateMemberTagStatus', {
    method: 'POST',
    data: {
      ids: params.memberTagIds, status: params.memberTagStatus
    },

  });
}


// 查询用户标签表详情
export async function queryMemberTagDetail(id: number) {
  return request('/api/member/tag/queryMemberTagDetail?id=' + id, {
    method: 'GET',
  });
}

// 分页查询用户标签表列表
export async function queryMemberTagList(params: MemberTagListParams) {

  return request('/api/member/tag/queryMemberTagList', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}
