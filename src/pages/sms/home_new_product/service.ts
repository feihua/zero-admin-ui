import { request } from 'umi';
import {HomeNewProductListParams, HomeNewProductListItem} from './data.d';
import {ProductListParams} from "@/pages/pms/product/data";

export async function queryHomeNewProduct(params: HomeNewProductListParams) {
  if (params.recommendStatus != null) {
    params.recommendStatus = Number(params.recommendStatus);
  }
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

export async function addHomeNewProduct(params: number[]) {
  return request('/api/sms/homenewproduct/add', {
    method: 'POST',
    data: {
      productIds: params,
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

export async function queryProduct(params?: ProductListParams) {
  return request('/api/product/product/list', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
