import {request} from 'umi';
import {AttributeListParams, AttributeListItem} from './data.d';

export async function queryAttribute(params: AttributeListParams) {

  return request('/api/product/attributecategory/list', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function removeAttribute(params: { ids: number[] }) {
  return request('/api/product/attributecategory/delete', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function addAttribute(params: AttributeListItem) {
  return request('/api/product/attributecategory/add', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateAttribute(params: AttributeListItem) {
  return request('/api/product/attributecategory/update', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

