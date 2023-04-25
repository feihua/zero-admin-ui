import { request } from 'umi';
import {CouponListParams, CouponListItem} from './data.d';
import moment from "moment/moment";

export async function queryCoupon(params: CouponListParams) {
  if (params.type != null) {
    params.type = Number(params.type)
  }
  if (params.platform != null) {
    params.platform = Number(params.platform)
  }
  if (params.useType != null) {
    params.useType = Number(params.useType)
  }
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
  params.amount = Number(params.amount)
  params.minPoint = Number(params.minPoint)
  params.startTime = moment(params.startTime).format('YYYY-MM-DD HH:mm:ss');
  params.endTime = moment(params.endTime).format('YYYY-MM-DD HH:mm:ss');
  params.enableTime = moment(params.enableTime).format('YYYY-MM-DD HH:mm:ss');
  return request('/api/sms/coupon/add', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateCoupon(params: CouponListItem) {
  params.amount = Number(params.amount)
  params.minPoint = Number(params.minPoint)
  return request('/api/sms/coupon/update', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
