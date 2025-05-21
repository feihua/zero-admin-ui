import {request} from 'umi';
import type { MemberLoginLogListParams, MemberLoginLogListItem } from './data.d';

// 添加会员登录记录
export async function addMemberLoginLog(params: MemberLoginLogListItem) {
  return request('/api/demo/memberLoginLog/addMemberLoginLog', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 删除会员登录记录
export async function removeMemberLoginLog(ids: number[]) {
  return request('/api/demo/memberLoginLog/deleteMemberLoginLog?ids=[' + ids + "]", {
    method: 'GET',
  });
}


// 更新会员登录记录
export async function updateMemberLoginLog(params: MemberLoginLogListItem) {
  return request('/api/demo/memberLoginLog/updateMemberLoginLog', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 批量更新会员登录记录状态
export async function updateMemberLoginLogStatus(params: { memberLoginLogIds: number[], memberLoginLogStatus: number }) {
  return request('/api/demo/memberLoginLog/updateMemberLoginLogStatus', {
    method: 'POST',
    data: {
      ...params,
    },

  });
}


// 查询会员登录记录详情
export async function queryMemberLoginLogDetail(id: number) {
  return request('/api/demo/memberLoginLog/queryMemberLoginLogDetail?id=' + id, {
    method: 'GET',
  });
}

// 分页查询会员登录记录列表
export async function queryMemberLoginLogList(params: MemberLoginLogListParams) {

  return request('/api/demo/memberLoginLog/queryMemberLoginLogList', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}
