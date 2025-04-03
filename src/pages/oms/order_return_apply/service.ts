import {request} from 'umi';
import type {ReturnApplyListParams, ReturnApplyListItem} from './data.d';

// 更新退货申请
export async function updateReturnApply(params: ReturnApplyListItem) {
  return request('/api/oms/returnApply/updateOrderReturnApply', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 批量更新退货申请状态
export async function updateReturnApplyStatus(params: { dictTypeIds: number[], postStatus: number }) {
  return request('/api/oms/returnApply/updateOrderReturnApplyStatus', {
    method: 'POST',
    data: {
      ...params,
    },

  });
}


// 查询退货申请详情
export async function queryReturnApplyDetail(id: number ) {
  return request('/api/oms/returnApply/queryOrderReturnApplyDetail', {
    method: 'GET',
  });
}

// 分页查询退货申请列表
export async function queryReturnApplyList(params: ReturnApplyListParams) {

  return request('/api/oms/returnApply/queryOrderReturnApplyList', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

export async function queryCompanyAddress(params: ReturnApplyListParams) {
  return request('/api/oms/compayaddress/list', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}
