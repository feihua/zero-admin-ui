import { request } from 'umi';
import { LevelListParams, LevelListItem } from './data.d';
// 添加会员等级
export async function addLevel(params: LevelListItem) {
  return request('/api/ums/level/addMemberLevel', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

//

// 删除会员等级
export async function removeLevel(ids: number[]) {
  return request('/api/ums/level/deleteMemberLevel?ids=' + ids.join(','), {
    method: 'GET',
  });
}


// 更新会员等级
export async function updateLevel(params: LevelListItem) {
  return request('/api/ums/level/updateMemberLevel', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 批量更新会员等级状态
export async function updateLevelStatus(params: { dictTypeIds: number[], postStatus: number }) {
  return request('/api/ums/level/updateMemberLevelStatus', {
    method: 'POST',
    data: {
      ...params,
    },

  });
}


// 查询会员等级详情
export async function queryLevelDetail(id: number ) {
  return request('/api/ums/level/queryMemberLevelDetail', {
    method: 'GET',
  });
}

// 分页查询会员等级列表
export async function queryLevelList(params: LevelListParams) {

  return request('/api/ums/level/queryMemberLevelList', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}
