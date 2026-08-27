import {request} from 'umi';
import type { SubjectCategoryListParams, SubjectCategoryListItem } from './data.d';

// 添加专题分类
export async function addSubjectCategory(params: SubjectCategoryListItem) {
  return request('/api/cms/subjectCategory/addSubjectCategory', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 删除专题分类
export async function removeSubjectCategory(ids: number[]) {
  return request('/api/cms/subjectCategory/deleteSubjectCategory?ids=' + ids.join(','), {
    method: 'GET',
  });
}


// 更新专题分类
export async function updateSubjectCategory(params: SubjectCategoryListItem) {
  return request('/api/cms/subjectCategory/updateSubjectCategory', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 批量更新专题分类状态
export async function updateSubjectCategoryStatus(params: { ids: number[], status: number }) {
  return request('/api/cms/subjectCategory/updateSubjectCategoryStatus', {
    method: 'POST',
    data: {
      ...params,
    },

  });
}


// 查询专题分类详情
export async function querySubjectCategoryDetail(id: number) {
  return request('/api/cms/subjectCategory/querySubjectCategoryDetail?id=' + id, {
    method: 'GET',
  });
}

// 分页查询专题分类列表
export async function querySubjectCategoryList(params: SubjectCategoryListParams) {

  return request('/api/cms/subjectCategory/querySubjectCategoryList', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}
