import {request} from 'umi';
import type {RecommendSubjectListParams, RecommendSubjectListItem, SubjectListParams} from './data.d';


// 添加推荐专题
export async function addRecommendSubject(params: number[]) {
  return request('/api/sms/homerecommendsubject/addHomeRecommendSubject', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

//

// 删除推荐专题
export async function removeRecommendSubject(ids: number[]) {
  return request('/api/sms/homerecommendsubject/deleteHomeRecommendSubject?ids=[' + ids + "]", {
    method: 'GET',
  });
}


// 更新推荐专题
export async function updateRecommendSubject(params: RecommendSubjectListItem) {
  return request('/api/sms/homerecommendsubject/updateHomeRecommendSubject', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 批量更新推荐专题状态
export async function updateRecommendSubjectStatus(params: { dictTypeIds: number[], postStatus: number }) {
  return request('/api/sms/homerecommendsubject/updateHomeRecommendSubjectStatus', {
    method: 'POST',
    data: {
      ...params,
    },

  });
}


// 查询推荐专题详情
export async function queryRecommendSubjectDetail(params: { ids: number }) {
  return request('/api/sms/homerecommendsubject/queryHomeRecommendSubjectDetail', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

// 分页查询推荐专题列表
export async function queryRecommendSubjectList(params: RecommendSubjectListParams) {

  return request('/api/sms/homerecommendsubject/queryHomeRecommendSubjectList', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}


export async function querySubject(params: SubjectListParams) {
  return request('/api/cms/subject/querySubjectList', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}
