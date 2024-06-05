import {request} from 'umi';
import type {OrderListParams, OrderListItem} from './data.d';

// 批量发货
export async function delivery(params: { dictTypeIds: number[], postStatus: number }) {
  return request('/api/order/delivery', {
    method: 'POST',
    data: {
      ...params,
    },

  });
}
// 批量关闭订单
export async function closeOrder(params: { dictTypeIds: number[], postStatus: number }) {
  return request('/api/order/closeOrder', {
    method: 'POST',
    data: {
      ...params,
    },

  });
}
// 获取订单详情：订单信息、商品信息、操作记录
export async function queryOrderDetail(id: number ) {
  return request('/api/order/queryOrderDetail', {
    method: 'GET',
  });
}
// 分页查询订单信息列表
export async function queryOrderList(params: OrderListParams) {

  return request('/api/order/queryOrderList', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}
// 修改收货人信息
export async function updateReceiverInfo(params: OrderListItem) {
  return request('/api/order/updateReceiverInfo', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
// 修改订单费用信息
export async function updateMoneyInfo(params: OrderListItem) {
  return request('/api/order/updateMoneyInfo', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
// 备注订单
export async function updateNote(params: OrderListItem) {
  return request('/api/order/updateNote', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
// 删除订单信息
export async function removeOrder(ids: number[]) {
  return request('/api/order/deleteOrder?ids=[' + ids + "]", {
    method: 'GET',
  });
}


