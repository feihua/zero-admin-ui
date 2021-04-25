import { request } from 'umi';
import { ProductListParams, ProductListItem } from './data.d';

export async function queryProduct(params?: ProductListParams) {
  return request('/api/product/product/list', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function removeProduct(params: { ids: number[] }) {
  return request('/api/product/product/delete', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function addProduct(params: ProductListItem) {
  return request('/api/product/product/add', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateProduct(params: ProductListItem) {
  return request('/api/product/product/update', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

