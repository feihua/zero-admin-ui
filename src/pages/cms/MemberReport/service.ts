import {request} from 'umi';
import type { MemberReportListParams, MemberReportListItem } from './data.d';

// 添加用户举报
export async function addMemberReport(params: MemberReportListItem) {
  return request('/api/cms/memberReport/addMemberReport', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 删除用户举报
export async function removeMemberReport(ids: number[]) {
  return request('/api/cms/memberReport/deleteMemberReport?ids=' + ids.join(','), {
    method: 'GET',
  });
}


// 更新用户举报
export async function updateMemberReport(params: MemberReportListItem) {
  return request('/api/cms/memberReport/updateMemberReport', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 批量更新用户举报状态
export async function updateMemberReportStatus(params: { ids: number[], status: number }) {
  return request('/api/cms/memberReport/updateMemberReportStatus', {
    method: 'POST',
    data: {
      ...params,
    },

  });
}


// 查询用户举报详情
export async function queryMemberReportDetail(id: number) {
  return request('/api/cms/memberReport/queryMemberReportDetail?id=' + id, {
    method: 'GET',
  });
}

// 分页查询用户举报列表
export async function queryMemberReportList(params: MemberReportListParams) {

  return request('/api/cms/memberReport/queryMemberReportList', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}
