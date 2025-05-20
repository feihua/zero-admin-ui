import {request} from 'umi';
import type { MemberLevelListParams, MemberLevelListItem } from './data.d';

// 添加会员等级
export async function addMemberLevel(params: MemberLevelListItem) {
  return request('/api/ums/level/addMemberLevel', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 删除会员等级
export async function removeMemberLevel(ids: number[]) {
  return request('/api/ums/level/deleteMemberLevel?ids=[' + ids + "]", {
    method: 'GET',
  });
}


// 更新会员等级
export async function updateMemberLevel(params: MemberLevelListItem) {
  return request('/api/ums/level/updateMemberLevel', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 批量更新会员等级状态
export async function updateMemberLevelStatus(params: { memberLevelIds: number[], memberLevelStatus: number }) {
  return request('/api/ums/level/updateMemberLevelStatus', {
    method: 'POST',
    data: {
      ...params,
    },

  });
}


// 查询会员等级详情
export async function queryMemberLevelDetail(id: number) {
  return request('/api/ums/level/queryMemberLevelDetail?id=' + id, {
    method: 'GET',
  });
}

// 分页查询会员等级列表
export async function queryMemberLevelList(params: MemberLevelListParams) {

  return request('/api/ums/level/queryMemberLevelList', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}
