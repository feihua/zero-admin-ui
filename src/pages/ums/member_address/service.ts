import { request } from 'umi';
import { AddressTableListParams, AddressTableListItem } from './data.d';

export async function queryAddress(params?: AddressTableListParams) {
  return request('/api/member/address/list', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function removeAddress(params: { ids: number[] }) {
  return request('/api/member/address/delete', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function addAddress(params: AddressTableListItem) {
  return request('/api/member/address/add', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateAddress(params: AddressTableListItem) {
  return request('/api/member/address/update', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}


