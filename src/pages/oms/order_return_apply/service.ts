import { request } from 'umi';
import { ReturnApplyListParams, ReturnApplyListItem } from './data.d';

export async function queryReturnApply(params?: ReturnApplyListParams) {
  return request('/api/order/returnapply/list', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function removeReturnApply(params: { ids: number[] }) {
  return request('/api/order/returnapply/delete', {
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

