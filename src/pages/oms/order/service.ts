import { request } from 'umi';
import { OrderListParams, OrderListItem } from './data.d';

export async function queryOrderList(params?: OrderListParams) {
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

