import {request} from 'umi';
import {CouponListParams, CouponListItem, CategoryListParams} from './data.d';
import {ProductListParams} from "@/pages/pms/product/data";
import moment from "moment";
// import moment from "moment/moment";

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

// 查询优惠券列表详情
export async function queryCouponDetail(id: number) {
  return request('/api/sms/coupon/queryCouponDetail?id='+id, {
    method: 'GET',

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
  params.endTime = moment(params.startTime[0]).format('YYYY-MM-DD HH:mm:ss');
  params.startTime = moment(params.startTime[1]).format('YYYY-MM-DD HH:mm:ss');
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
  params.endTime = moment(params.startTime[0]).format('YYYY-MM-DD HH:mm:ss');
  params.startTime = moment(params.startTime[1]).format('YYYY-MM-DD HH:mm:ss');
  params.enableTime = moment(params.enableTime).format('YYYY-MM-DD HH:mm:ss');
  return request('/api/sms/coupon/updateCoupon', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function queryProductList(params?: ProductListParams) {
  return request('/api/product/queryProductList', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

// 分页查询商品分类列表
export async function queryProductCategoryList(params: CategoryListParams) {

  return request('/api/product/category/queryProductCategoryList', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

// 分页优惠券领取列表
export async function queryCouponHistoryList(params: CategoryListParams) {

  return request('/api/sms/couponHistory/queryCouponHistoryList', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}
