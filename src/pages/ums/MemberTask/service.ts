import {request} from 'umi';
import type {MemberTaskListParams, MemberTaskListItem} from './data.d';

// 添加会员任务表
export async function addMemberTask(params: MemberTaskListItem) {
  return request('/api/member/task/addMemberTask', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 删除会员任务表
export async function removeMemberTask(ids: number[]) {
  return request('/api/member/task/deleteMemberTask?ids=' + ids.join(','), {
    method: 'GET',
  });
}


// 更新会员任务表
export async function updateMemberTask(params: MemberTaskListItem) {
  return request('/api/member/task/updateMemberTask', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 批量更新会员任务表状态
export async function updateMemberTaskStatus(params: { memberTaskIds: number[], memberTaskStatus: number }) {
  return request('/api/member/task/updateMemberTaskStatus', {
    method: 'POST',
    data: {
      ids: params.memberTaskIds, status: params.memberTaskStatus
    },

  });
}


// 查询会员任务表详情
export async function queryMemberTaskDetail(id: number) {
  return request('/api/member/task/queryMemberTaskDetail?id=' + id, {
    method: 'GET',
  });
}

// 分页查询会员任务表列表
export async function queryMemberTaskList(params: MemberTaskListParams) {

  return request('/api/member/task/queryMemberTaskList', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}
