import {request} from 'umi';
import type { MemberRuleSettingListParams, MemberRuleSettingListItem } from './data.d';

// 添加会员积分成长规则表
export async function addMemberRuleSetting(params: MemberRuleSettingListItem) {
  return request('/api/member/ruleSetting/addMemberRuleSetting', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 删除会员积分成长规则表
export async function removeMemberRuleSetting(ids: number[]) {
  return request('/api/member/ruleSetting/deleteMemberRuleSetting?ids=[' + ids + "]", {
    method: 'GET',
  });
}


// 更新会员积分成长规则表
export async function updateMemberRuleSetting(params: MemberRuleSettingListItem) {
  return request('/api/member/ruleSetting/updateMemberRuleSetting', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 批量更新会员积分成长规则表状态
export async function updateMemberRuleSettingStatus(params: { memberRuleSettingIds: number[], memberRuleSettingStatus: number }) {
  return request('/api/member/ruleSetting/updateMemberRuleSettingStatus', {
    method: 'POST',
    data: {
      ids: params.memberRuleSettingIds, status: params.memberRuleSettingStatus
    },

  });
}


// 查询会员积分成长规则表详情
export async function queryMemberRuleSettingDetail(id: number) {
  return request('/api/member/ruleSetting/queryMemberRuleSettingDetail?id=' + id, {
    method: 'GET',
  });
}

// 分页查询会员积分成长规则表列表
export async function queryMemberRuleSettingList(params: MemberRuleSettingListParams) {

  return request('/api/member/ruleSetting/queryMemberRuleSettingList', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}
