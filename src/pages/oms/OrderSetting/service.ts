import {request} from 'umi';
import type { OrderSettingListParams, OrderSettingListItem } from './data.d';

// 添加订单设置
export async function addOrderSetting(params: OrderSettingListItem) {
  return request('/api/oms/setting/addOrderSetting', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 删除订单设置
export async function removeOrderSetting(ids: number[]) {
  return request('/api/oms/setting/deleteOrderSetting?ids=' + ids.join(','), {
    method: 'GET',
  });
}


// 更新订单设置
export async function updateOrderSetting(params: OrderSettingListItem) {
  return request('/api/oms/setting/updateOrderSetting', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 更新订单设置状态
export async function updateOrderSettingStatus(params: { id: number, status: number }) {
  return request('/api/oms/setting/updateOrderSettingStatus', {
    method: 'POST',
    data: {
      ...params,
    },

  });
}

// 更新订单设置是否默认状态
export async function updateOrderSettingIsDefault(params: { id: number, status: number }) {
  return request('/api/oms/setting/updateOrderSettingIsDefault', {
    method: 'POST',
    data: {
      ...params,
    },

  });
}


// 查询订单设置详情
export async function queryOrderSettingDetail(id: number) {
  return request('/api/oms/setting/queryOrderSettingDetail?id=' + id, {
    method: 'GET',
  });
}

// 分页查询订单设置列表
export async function queryOrderSettingList(params: OrderSettingListParams) {

  return request('/api/oms/setting/queryOrderSettingList', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}
