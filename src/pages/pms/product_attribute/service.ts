import {request} from 'umi';
import type {AttributeListParams, AttributeListItem} from './data.d';

export async function queryAttribute(params: AttributeListParams) {
  if (params.type != null) {
    params.type = Number(params.type)
  }
  if (params.productAttributeCategoryId != null) {
    params.productAttributeCategoryId = Number(params.productAttributeCategoryId)
  }
  return request('/api/product/attribute/list', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function removeAttribute(params: { ids: number[] }) {
  return request('/api/product/attribute/delete', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function addAttribute(params: AttributeListItem) {
  return request('/api/product/attribute/add', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateAttribute(params: AttributeListItem) {
  return request('/api/product/attribute/update', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

