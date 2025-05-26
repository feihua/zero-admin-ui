import {request} from 'umi';
import type { OrderReturnReasonListParams, OrderReturnReasonListItem } from './data.d';

// 添加退货原因
export async function addOrderReturnReason(params: OrderReturnReasonListItem) {
  return request('/api/oms/returnReason/addReturnReason', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 删除退货原因
export async function removeOrderReturnReason(ids: number[]) {
  return request('/api/oms/returnReason/deleteReturnReason?ids=[' + ids + "]", {
    method: 'GET',
  });
}


// 更新退货原因
export async function updateOrderReturnReason(params: OrderReturnReasonListItem) {
  return request('/api/oms/returnReason/updateReturnReason', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 批量更新退货原因状态
export async function updateOrderReturnReasonStatus(params: { ids: number[], status: number }) {
  return request('/api/oms/returnReason/updateReturnReasonStatus', {
    method: 'POST',
    data: {
      ...params,
    },

  });
}


// 查询退货原因详情
export async function queryOrderReturnReasonDetail(id: number) {
  return request('/api/oms/returnReason/queryReturnReasonDetail?id=' + id, {
    method: 'GET',
  });
}

// 分页查询退货原因列表
export async function queryOrderReturnReasonList(params: OrderReturnReasonListParams) {

  return request('/api/oms/returnReason/queryReturnReasonList', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}
