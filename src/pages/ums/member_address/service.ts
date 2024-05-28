import { request } from 'umi';
import { AddressListParams, AddressListItem } from './data.d';

export async function queryAddress(params?: AddressListParams) {
  return request('/api/member/address/list', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

export async function removeAddress(params: { ids: number[] }) {
  return request('/api/member/address/delete', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

export async function addAddress(params: AddressListItem) {
  return request('/api/member/address/add', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateAddress(params: AddressListItem) {
  return request('/api/member/address/update', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}


