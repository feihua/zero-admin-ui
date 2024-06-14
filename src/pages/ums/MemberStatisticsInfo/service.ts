import {request} from 'umi';
import type { MemberStatisticsInfoListParams, MemberStatisticsInfoListItem } from './data.d';

// 添加会员统计信息
export async function addMemberStatisticsInfo(params: MemberStatisticsInfoListItem) {
  return request('/api/demo/memberStatisticsInfo/addMemberStatisticsInfo', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 删除会员统计信息
export async function removeMemberStatisticsInfo(ids: number[]) {
  return request('/api/demo/memberStatisticsInfo/deleteMemberStatisticsInfo?ids=[' + ids + "]", {
    method: 'GET',
  });
}


// 更新会员统计信息
export async function updateMemberStatisticsInfo(params: MemberStatisticsInfoListItem) {
  return request('/api/demo/memberStatisticsInfo/updateMemberStatisticsInfo', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 批量更新会员统计信息状态
export async function updateMemberStatisticsInfoStatus(params: { memberStatisticsInfoIds: number[], memberStatisticsInfoStatus: number }) {
  return request('/api/demo/memberStatisticsInfo/updateMemberStatisticsInfoStatus', {
    method: 'POST',
    data: {
      ...params,
    },

  });
}


// 查询会员统计信息详情
export async function queryMemberStatisticsInfoDetail(id: number) {
  return request('/api/demo/memberStatisticsInfo/queryMemberStatisticsInfoDetail?id=' + id, {
    method: 'GET',
  });
}

// 分页查询会员统计信息列表
export async function queryMemberStatisticsInfoList(params: MemberStatisticsInfoListParams) {

  return request('/api/demo/memberStatisticsInfo/queryMemberStatisticsInfoList', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}
