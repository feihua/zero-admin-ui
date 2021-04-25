import { request } from 'umi';
import { RecommendProductListParams, RecommendProductListItem } from './data.d';

export async function queryRecommendProduct(params?: RecommendProductListParams) {
  return request('/api/sms/homerecommendproduct/list', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function removeRecommendProduct(params: { ids: number[] }) {
  return request('/api/sms/homerecommendproduct/delete', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function addRecommendProduct(params: RecommendProductListItem) {
  return request('/api/sms/homerecommendproduct/add', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateRecommendProduct(params: RecommendProductListItem) {
  return request('/api/sms/homerecommendproduct/update', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

