import {request} from 'umi';
import type { MemberRuleSettingListParams, MemberRuleSettingListItem } from './data.d';

// 添加会员积分成长规则表
export async function addMemberRuleSetting(params: MemberRuleSettingListItem) {
  return request('/api/demo/memberRuleSetting/addMemberRuleSetting', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 删除会员积分成长规则表
export async function removeMemberRuleSetting(ids: number[]) {
  return request('/api/demo/memberRuleSetting/deleteMemberRuleSetting?ids=[' + ids + "]", {
    method: 'GET',
  });
}


// 更新会员积分成长规则表
export async function updateMemberRuleSetting(params: MemberRuleSettingListItem) {
  return request('/api/demo/memberRuleSetting/updateMemberRuleSetting', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 批量更新会员积分成长规则表状态
export async function updateMemberRuleSettingStatus(params: { memberRuleSettingIds: number[], memberRuleSettingStatus: number }) {
  return request('/api/demo/memberRuleSetting/updateMemberRuleSettingStatus', {
    method: 'POST',
    data: {
      ...params,
    },

  });
}


// 查询会员积分成长规则表详情
export async function queryMemberRuleSettingDetail(id: number) {
  return request('/api/demo/memberRuleSetting/queryMemberRuleSettingDetail?id=' + id, {
    method: 'GET',
  });
}

// 分页查询会员积分成长规则表列表
export async function queryMemberRuleSettingList(params: MemberRuleSettingListParams) {

  return request('/api/demo/memberRuleSetting/queryMemberRuleSettingList', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}
