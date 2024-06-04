import {request} from 'umi';
import type {ReturnReasonListParams, ReturnReasonListItem} from './data.d';
// 添加退货原因
export async function addReturnReason(params: ReturnReasonListItem) {
  return request('/api/order/returnReason/addReturnReason', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

//

// 删除退货原因
export async function removeReturnReason(ids: number[]) {
  return request('/api/order/returnReason/deleteReturnReason?ids=[' + ids + "]", {
    method: 'GET',
  });
}


// 更新退货原因
export async function updateReturnReason(params: ReturnReasonListItem) {
  return request('/api/order/returnReason/updateReturnReason', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 批量更新退货原因状态
export async function updateReturnReasonStatus(params: { dictTypeIds: number[], postStatus: number }) {
  return request('/api/order/returnReason/updateReturnReasonStatus', {
    method: 'POST',
    data: {
      ...params,
    },

  });
}


// 查询退货原因详情
export async function queryReturnReasonDetail(id: number ) {
  return request('/api/order/returnReason/queryReturnReasonDetail', {
    method: 'GET',
  });
}

// 分页查询退货原因列表
export async function queryReturnReasonList(params: ReturnReasonListParams) {

  return request('/api/order/returnReason/queryReturnReasonList', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}
