import {request} from 'umi';
import type {RecommendSubjectListParams, RecommendSubjectListItem, SubjectListParams} from './data.d';

export async function queryRecommendSubject(params: RecommendSubjectListParams) {
  if (params.recommendStatus != null) {
    params.recommendStatus = Number(params.recommendStatus);
  }
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

export async function addRecommendSubject(params: number[]) {
  return request('/api/sms/homerecommendsubject/add', {
    method: 'POST',
    data: {
      subjectIds: params
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

export async function querySubject(params: SubjectListParams) {
  return request('/api/cms/subject/list', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
