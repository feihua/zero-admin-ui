import { request } from 'umi';
import { AddressListParams } from './data.d';


// 查询询会员地址详情
export async function queryMemberAddressDetail(id: number ) {
  return request('/api/ums/address/queryMemberAddressDetail', {
    method: 'GET',
  });
}

// 分页查询询会员地址列表
export async function queryMemberAddressList(params: AddressListParams) {

  return request('/api/ums/address/queryMemberAddressList', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}


