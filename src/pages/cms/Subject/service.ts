import {request} from 'umi';
import type { SubjectListParams, SubjectListItem } from './data.d';

// 添加专题
export async function addSubject(params: SubjectListItem) {
  return request('/api/cms/subject/addSubject', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 删除专题
export async function removeSubject(ids: number[]) {
  return request('/api/cms/subject/deleteSubject?ids=' + ids.join(','), {
    method: 'GET',
  });
}


// 更新专题
export async function updateSubject(params: SubjectListItem) {
  return request('/api/cms/subject/updateSubject', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 批量更新专题状态
export async function updateSubjectStatus(params: { ids: number[], status: number }) {
  return request('/api/cms/subject/updateSubjectStatus', {
    method: 'POST',
    data: {
      ...params,
    },

  });
}


// 查询专题详情
export async function querySubjectDetail(id: number) {
  return request('/api/cms/subject/querySubjectDetail?id=' + id, {
    method: 'GET',
  });
}

// 分页查询专题列表
export async function querySubjectList(params: SubjectListParams) {

  return request('/api/cms/subject/querySubjectList', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}
