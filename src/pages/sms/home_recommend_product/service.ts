import { request } from 'umi';
import {RecommendProductListParams, RecommendProductListItem} from './data.d';
import {ProductListParams} from "@/pages/pms/product/data";

export async function queryRecommendProduct(params: RecommendProductListParams) {
  if (params.recommendStatus != null) {
    params.recommendStatus = Number(params.recommendStatus);
  }
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

export async function addRecommendProduct(params: number[]) {
  return request('/api/sms/homerecommendproduct/add', {
    method: 'POST',
    data: {
      productIds: params,
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

export async function queryProduct(params?: ProductListParams) {
  return request('/api/product/product/list', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
