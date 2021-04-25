import { request } from 'umi';
import { HomeBrandListParams, HomeBrandListItem } from './data.d';

export async function queryHomeBrand(params?: HomeBrandListParams) {
  return request('/api/sms/homebrand/list', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function removeHomeBrand(params: { ids: number[] }) {
  return request('/api/sms/homebrand/delete', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function addHomeBrand(params: HomeBrandListItem) {
  return request('/api/sms/homebrand/add', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateHomeBrand(params: HomeBrandListItem) {
  return request('/api/sms/homebrand/update', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
