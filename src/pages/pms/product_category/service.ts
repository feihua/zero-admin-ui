import { request } from 'umi';
import { CategoryListParams, CategoryListItem } from './data.d';

export async function queryCategory(params?: CategoryListParams) {
  return request('/api/product/category/list', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function removeCategory(params: { ids: number[] }) {
  return request('/api/product/category/delete', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function addCategory(params: CategoryListItem) {
  return request('/api/product/category/add', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateCategory(params: CategoryListItem) {
  return request('/api/product/category/update', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

