import {request} from 'umi';
import type {ReturnApplyListParams, ReturnApplyListItem} from './data.d';

export async function queryReturnApply(params: ReturnApplyListParams) {
  if (params.status != null) {
    params.status = Number(params.status)
  }
  return request('/api/order/returnapply/list', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateReturnApply(params: ReturnApplyListItem) {
  return request('/api/order/returnapply/update', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function queryCompanyAddress(params: ReturnApplyListParams) {
  return request('/api/order/compayaddress/list', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
