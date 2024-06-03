import { request } from 'umi';
import { FlashPromotionListParams, FlashPromotionListItem } from './data.d';

// 添加秒杀活动
export async function addFlashPromotion(params: FlashPromotionListItem) {
  return request('/api/sms/flashpromotion/addFlashPromotion', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

//

// 删除秒杀活动
export async function removeFlashPromotion(ids: number[]) {
  return request('/api/sms/flashpromotion/deleteFlashPromotion?ids=[' + ids + "]", {
    method: 'GET',
  });
}


// 更新秒杀活动
export async function updateFlashPromotion(params: FlashPromotionListItem) {
  return request('/api/sms/flashpromotion/updateFlashPromotion', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 批量更新秒杀活动状态
export async function updateFlashPromotionStatus(params: { dictTypeIds: number[], postStatus: number }) {
  return request('/api/sms/flashpromotion/updateFlashPromotionStatus', {
    method: 'POST',
    data: {
      ...params,
    },

  });
}


// 查询秒杀活动详情
export async function queryFlashPromotionDetail(params: { ids: number }) {
  return request('/api/sms/flashpromotion/queryFlashPromotionDetail', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

// 分页查询秒杀活动列表
export async function queryFlashPromotionList(params: FlashPromotionListParams) {

  return request('/api/sms/flashpromotion/queryFlashPromotionList', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}
