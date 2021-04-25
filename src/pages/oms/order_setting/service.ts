import { request } from 'umi';
import { SettingListParams, SettingListItem } from './data.d';

export async function querySetting(params?: SettingListParams) {
  return request('/api/order/setting/list', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}


export async function removeSetting(params: { ids: number[] }) {
  return request('/api/order/setting/delete', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function addSetting(params: SettingListItem) {
  return request('/api/order/setting/add', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateSetting(params: SettingListItem) {
  return request('/api/order/setting/update', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

