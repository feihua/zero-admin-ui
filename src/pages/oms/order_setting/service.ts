import {request} from 'umi';
import type {SettingListParams, SettingListItem} from './data.d';
// 添加订单设置
export async function addOrderSetting(params: SettingListItem) {
  return request('/api/order/setting/addOrderSetting', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

//

// 删除订单设置
export async function removeOrderSetting(ids: number[]) {
  return request('/api/order/setting/deleteOrderSetting?ids=[' + ids + "]", {
    method: 'GET',
  });
}


// 更新订单设置
export async function updateOrderSetting(params: SettingListItem) {
  return request('/api/order/setting/updateOrderSetting', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 批量更新订单设置状态
export async function updateOrderSettingStatus(params: { dictTypeIds: number[], postStatus: number }) {
  return request('/api/order/setting/updateOrderSettingStatus', {
    method: 'POST',
    data: {
      ...params,
    },

  });
}


// 查询订单设置详情
export async function queryOrderSettingDetail(id: number ) {
  return request('/api/order/setting/queryOrderSettingDetail', {
    method: 'GET',
  });
}

// 分页查询订单设置列表
export async function queryOrderSettingList(params: SettingListParams) {

  return request('/api/order/setting/queryOrderSettingList', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}


