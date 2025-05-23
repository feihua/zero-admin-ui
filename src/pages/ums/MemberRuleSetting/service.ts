import {request} from 'umi';
import type { MemberRuleSettingListParams, MemberRuleSettingListItem } from './data.d';

// 添加会员积分成长规则
export async function addMemberRuleSetting(params: MemberRuleSettingListItem) {
  return request('/api/ums/ruleSetting/addMemberRuleSetting', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 删除会员积分成长规则
export async function removeMemberRuleSetting(id: number) {
  return request('/api/ums/ruleSetting/deleteMemberRuleSetting?id=' + id, {
    method: 'GET',
  });
}


// 更新会员积分成长规则
export async function updateMemberRuleSetting(params: MemberRuleSettingListItem) {
  return request('/api/ums/ruleSetting/updateMemberRuleSetting', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 批量更新会员积分成长规则状态
export async function updateMemberRuleSettingStatus(params: { id: number, status: number }) {
  return request('/api/ums/ruleSetting/updateMemberRuleSettingStatus', {
    method: 'POST',
    data: {
      ...params,
    },

  });
}


// 查询会员积分成长规则详情
export async function queryMemberRuleSettingDetail(id: number) {
  return request('/api/ums/ruleSetting/queryMemberRuleSettingDetail?id=' + id, {
    method: 'GET',
  });
}

// 分页查询会员积分成长规则列表
export async function queryMemberRuleSettingList(params: MemberRuleSettingListParams) {

  return request('/api/ums/ruleSetting/queryMemberRuleSettingList', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}
