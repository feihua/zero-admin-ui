import {request} from 'umi';
import type {SettingListParams, SettingListItem} from './data.d';

export async function querySetting(params?: SettingListParams) {
  return request('/api/order/setting/list', {
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

