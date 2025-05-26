import {request} from 'umi';
import type { CompanyAddressListParams, CompanyAddressListItem } from './data.d';

// 添加公司收发货地址
export async function addCompanyAddress(params: CompanyAddressListItem) {
  return request('/api/oms/companyAddress/addCompanyAddress', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 删除公司收发货地址
export async function removeCompanyAddress(ids: number[]) {
  return request('/api/oms/companyAddress/deleteCompanyAddress?ids=[' + ids + "]", {
    method: 'GET',
  });
}


// 更新公司收发货地址
export async function updateCompanyAddress(params: CompanyAddressListItem) {
  return request('/api/oms/companyAddress/updateCompanyAddress', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 更新公司收发货地址表收货状态
export async function updateCompanyAddressReceiveStatus(params: { id: number, status: number }) {
  return request('/api/oms/companyAddress/updateCompanyAddressReceiveStatus', {
    method: 'POST',
    data: {
      ...params
    },

  });
}
// 更新公司收发货地址表发货状态
export async function updateCompanyAddressSendStatus(params: { id: number, status: number }) {
  return request('/api/oms/companyAddress/updateCompanyAddressSendStatus', {
    method: 'POST',
    data: {
      ...params
    },

  });
}

// 查询公司收发货地址详情
export async function queryCompanyAddressDetail(id: number) {
  return request('/api/oms/companyAddress/queryCompanyAddressDetail?id=' + id, {
    method: 'GET',
  });
}

// 分页查询公司收发货地址列表
export async function queryCompanyAddressList(params: CompanyAddressListParams) {

  return request('/api/oms/companyAddress/queryCompanyAddressList', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}
