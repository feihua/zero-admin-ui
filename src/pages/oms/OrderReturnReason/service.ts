import {request} from 'umi';
import type { OrderReturnReasonListParams, OrderReturnReasonListItem } from './data.d';

// 添加退货原因表
export async function addOrderReturnReason(params: OrderReturnReasonListItem) {
  return request('/api/oms/returnReason/addOrderReturnReason', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 删除退货原因表
export async function removeOrderReturnReason(ids: number[]) {
  return request('/api/oms/returnReason/deleteOrderReturnReason?ids=' + ids.join(','), {
    method: 'GET',
  });
}


// 更新退货原因表
export async function updateOrderReturnReason(params: OrderReturnReasonListItem) {
  return request('/api/oms/returnReason/updateOrderReturnReason', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 批量更新退货原因表状态
export async function updateOrderReturnReasonStatus(params: { orderReturnReasonIds: number[], orderReturnReasonStatus: number }) {
  return request('/api/oms/returnReason/updateOrderReturnReasonStatus', {
    method: 'POST',
    data: {
      ids: params.orderReturnReasonIds, status: params.orderReturnReasonStatus
    },

  });
}


// 查询退货原因表详情
export async function queryOrderReturnReasonDetail(id: number) {
  return request('/api/oms/returnReason/queryOrderReturnReasonDetail?id=' + id, {
    method: 'GET',
  });
}

// 分页查询退货原因表列表
export async function queryOrderReturnReasonList(params: OrderReturnReasonListParams) {

  return request('/api/oms/returnReason/queryOrderReturnReasonList', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}
