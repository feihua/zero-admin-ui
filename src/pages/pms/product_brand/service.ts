import { request } from 'umi';
import { BrandListParams, BrandListItem } from './data.d';

export async function queryBrand(params?: BrandListParams) {
  return request('/api/product/brand/list', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function removeBrand(params: { ids: number[] }) {
  return request('/api/product/brand/delete', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function addBrand(params: BrandListItem) {
  return request('/api/product/brand/add', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateBrand(params: BrandListItem) {
  return request('/api/product/brand/update', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

