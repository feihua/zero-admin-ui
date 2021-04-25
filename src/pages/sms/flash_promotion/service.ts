import { request } from 'umi';
import { FlashPromotionListParams, FlashPromotionListItem } from './data.d';

export async function queryFlashPromotion(params?: FlashPromotionListParams) {
  return request('/api/sms/flashpromotion/list', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function removeFlashPromotion(params: { ids: number[] }) {
  return request('/api/sms/flashpromotion/delete', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function addFlashPromotion(params: FlashPromotionListItem) {
  return request('/api/sms/flashpromotion/add', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateFlashPromotion(params: FlashPromotionListItem) {
  return request('/api/sms/flashpromotion/update', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
