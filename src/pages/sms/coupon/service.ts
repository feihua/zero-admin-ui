import { request } from 'umi';
import {CouponListParams, CouponListItem} from './data.d';
import moment from "moment/moment";

// 查询优惠券列表
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

  return request('/api/sms/coupon/queryCouponList', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

export async function removeCoupon(params: { ids: number[] }) {
  return request('/api/sms/coupon/deleteCoupon', {
    method: 'GET',
    params: {
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
  return request('/api/sms/coupon/addCoupon', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateCoupon(params: CouponListItem) {
  params.amount = Number(params.amount)
  params.minPoint = Number(params.minPoint)
  return request('/api/sms/coupon/updateCoupon', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
