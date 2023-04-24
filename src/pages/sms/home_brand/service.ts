import {request} from 'umi';
import type {HomeBrandListParams, HomeBrandListItem} from './data.d';
import {BrandListParams} from '@/pages/pms/product_brand/data';

export async function queryHomeBrand(params: HomeBrandListParams) {
  if (params.recommendStatus != null) {
    params.recommendStatus = Number(params.recommendStatus);
  }
  return request('/api/sms/homebrand/list', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function removeHomeBrand(params: { ids: number[] }) {
  return request('/api/sms/homebrand/delete', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function addHomeBrand(params: number[]) {
  return request('/api/sms/homebrand/add', {
    method: 'POST',
    data: {
      brandIds: params,
    },
  });
}

export async function updateHomeBrand(params: HomeBrandListItem) {
  return request('/api/sms/homebrand/update', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function queryBrand(params?: BrandListParams) {
  return request('/api/product/brand/list', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
