import { request } from 'umi';
import { HomeAdvertiseListParams, HomeAdvertiseListItem } from './data.d';

export async function queryHomeAdvertise(params?: HomeAdvertiseListParams) {
  return request('/api/sms/homeadvertise/list', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function removeHomeAdvertise(params: { ids: number[] }) {
  return request('/api/sms/homeadvertise/delete', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function addHomeAdvertise(params: HomeAdvertiseListItem) {
  return request('/api/sms/homeadvertise/add', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateHomeAdvertise(params: HomeAdvertiseListItem) {
  return request('/api/sms/homeadvertise/update', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
