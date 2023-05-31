import {request} from 'umi';
import type {OrderListParams, OrderListItem} from './data.d';

export async function queryOrderList(params: OrderListParams) {
  if (params.payType != null) {
    params.payType = Number(params.payType)
  }
  if (params.sourceType != null) {
    params.sourceType = Number(params.sourceType)
  }
  if (params.status != null) {
    params.status = Number(params.status)
  }
  if (params.orderType != null) {
    params.orderType = Number(params.orderType)
  }
  return request('/api/order/order/list', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function removeOrder(params: { ids: number[] }) {
  return request('/api/order/order/delete', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}


export async function updateOrder(params: OrderListItem) {
  return request('/api/order/order/update', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

