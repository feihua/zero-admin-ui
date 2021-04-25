import { request } from 'umi';
import { RecommendSubjectListParams, RecommendSubjectListItem } from './data.d';

export async function queryRecommendSubject(params?: RecommendSubjectListParams) {
  return request('/api/sms/homerecommendsubject/list', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function removeRecommendSubject(params: { ids: number[] }) {
  return request('/api/sms/homerecommendsubject/delete', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function addRecommendSubject(params: RecommendSubjectListItem) {
  return request('/api/sms/homerecommendsubject/add', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateRecommendSubject(params: RecommendSubjectListItem) {
  return request('/api/sms/homerecommendsubject/update', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

