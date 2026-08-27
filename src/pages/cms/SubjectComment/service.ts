import {request} from 'umi';
import type { SubjectCommentListParams, SubjectCommentListItem } from './data.d';

// 添加专题评论
export async function addSubjectComment(params: SubjectCommentListItem) {
  return request('/api/cms/subjectComment/addSubjectComment', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 删除专题评论
export async function removeSubjectComment(ids: number[]) {
  return request('/api/cms/subjectComment/deleteSubjectComment?ids=' + ids.join(','), {
    method: 'GET',
  });
}


// 更新专题评论
export async function updateSubjectComment(params: SubjectCommentListItem) {
  return request('/api/cms/subjectComment/updateSubjectComment', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 批量更新专题评论状态
export async function updateSubjectCommentStatus(params: { ids: number[], status: number }) {
  return request('/api/cms/subjectComment/updateSubjectCommentStatus', {
    method: 'POST',
    data: {
      ...params,
    },

  });
}


// 查询专题评论详情
export async function querySubjectCommentDetail(id: number) {
  return request('/api/cms/subjectComment/querySubjectCommentDetail?id=' + id, {
    method: 'GET',
  });
}

// 分页查询专题评论列表
export async function querySubjectCommentList(params: SubjectCommentListParams) {

  return request('/api/cms/subjectComment/querySubjectCommentList', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}
