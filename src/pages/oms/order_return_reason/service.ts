import {request} from 'umi';
import type {ReturnReasonListParams, ReturnReasonListItem} from './data.d';

export async function queryReturnReasonList(params: ReturnReasonListParams) {
  if (params.status != null) {
    params.status = Number(params.status)
  }
  return request('/api/order/returnreason/list', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function removeReturnReason(params: { ids: number[] }) {
  return request('/api/order/returnreason/delete', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function addReturnReason(params: ReturnReasonListItem) {
  return request('/api/order/returnreason/add', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateReturnReason(params: ReturnReasonListItem) {
  return request('/api/order/returnreason/update', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
