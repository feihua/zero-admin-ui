import {request} from 'umi';
import type { CompanyAddressListParams, CompanyAddressListItem } from './data.d';

// 添加公司收发货地址表
export async function addCompanyAddress(params: CompanyAddressListItem) {
  return request('/api/order/companyAddress/addCompanyAddress', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 删除公司收发货地址表
export async function removeCompanyAddress(ids: number[]) {
  return request('/api/order/companyAddress/deleteCompanyAddress?ids=' + ids.join(','), {
    method: 'GET',
  });
}


// 更新公司收发货地址表
export async function updateCompanyAddress(params: CompanyAddressListItem) {
  return request('/api/order/companyAddress/updateCompanyAddress', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 更新公司收发货地址表收货状态
export async function updateCompanyAddressReceiveStatus(params: { companyAddressId: number, companyAddressStatus: number }) {
  return request('/api/order/companyAddress/updateCompanyAddressReceiveStatus', {
    method: 'POST',
    data: {
      id: params.companyAddressId, receiveStatus: params.companyAddressStatus
    },

  });
}
// 更新公司收发货地址表发货状态
export async function updateCompanyAddressSendStatus(params: { companyAddressId: number, companyAddressStatus: number }) {
  return request('/api/order/companyAddress/updateCompanyAddressSendStatus', {
    method: 'POST',
    data: {
      id: params.companyAddressId, sendStatus: params.companyAddressStatus
    },

  });
}

// 查询公司收发货地址表详情
export async function queryCompanyAddressDetail(id: number) {
  return request('/api/order/companyAddress/queryCompanyAddressDetail?id=' + id, {
    method: 'GET',
  });
}

// 分页查询公司收发货地址表列表
export async function queryCompanyAddressList(params: CompanyAddressListParams) {

  return request('/api/order/companyAddress/queryCompanyAddressList', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}
