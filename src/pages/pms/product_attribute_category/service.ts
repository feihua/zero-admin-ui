import {request} from 'umi';
import {AttributeCategoryListParams, AttributeCategoryListItem} from './data.d';

export async function queryCategoryAttribute(params: AttributeCategoryListParams) {

  return request('/api/product/attributecategory/list', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function removeAttributeCategory(params: { ids: number[] }) {
  return request('/api/product/attributecategory/delete', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function addAttributeCategory(params: AttributeCategoryListItem) {
  return request('/api/product/attributecategory/add', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateAttributeCategory(params: AttributeCategoryListItem) {
  return request('/api/product/attributecategory/update', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

