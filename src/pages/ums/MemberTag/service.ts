import {request} from 'umi';
import type { MemberTagListParams, MemberTagListItem } from './data.d';

// 添加用户标签
export async function addMemberTag(params: MemberTagListItem) {
  return request('api/ums/tag/addMemberTag', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 删除用户标签
export async function removeMemberTag(ids: number[]) {
  return request('api/ums/tag/deleteMemberTag?ids=[' + ids + "]", {
    method: 'GET',
  });
}


// 更新用户标签
export async function updateMemberTag(params: MemberTagListItem) {
  return request('api/ums/tag/updateMemberTag', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 批量更新用户标签状态
export async function updateMemberTagStatus(params: { memberTagIds: number[], memberTagStatus: number }) {
  return request('api/ums/tag/updateMemberTagStatus', {
    method: 'POST',
    data: {
      ...params,
    },

  });
}


// 查询用户标签详情
export async function queryMemberTagDetail(id: number) {
  return request('api/ums/tag/queryMemberTagDetail?id=' + id, {
    method: 'GET',
  });
}

// 分页查询用户标签列表
export async function queryMemberTagList(params: MemberTagListParams) {

  return request('api/ums/tag/queryMemberTagList', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}
