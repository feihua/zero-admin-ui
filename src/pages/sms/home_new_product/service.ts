import { request } from 'umi';
import { HomeNewProductListParams, HomeNewProductListItem } from './data.d';

export async function queryHomeNewProduct(params?: HomeNewProductListParams) {
  return request('/api/sms/homenewproduct/list', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function removeHomeNewProduct(params: { ids: number[] }) {
  return request('/api/sms/homenewproduct/delete', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function addHomeNewProduct(params: HomeNewProductListItem) {
  return request('/api/sms/homenewproduct/add', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateHomeNewProduct(params: HomeNewProductListItem) {
  return request('/api/sms/homenewproduct/update', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

