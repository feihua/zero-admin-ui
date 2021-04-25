import { request } from 'umi';
import { CouponListParams, CouponListItem } from './data.d';

export async function queryCoupon(params?: CouponListParams) {
  return request('/api/sms/coupon/list', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function removeCoupon(params: { ids: number[] }) {
  return request('/api/sms/coupon/delete', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function addCoupon(params: CouponListItem) {
  return request('/api/sms/coupon/add', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateCoupon(params: CouponListItem) {
  return request('/api/sms/coupon/update', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
