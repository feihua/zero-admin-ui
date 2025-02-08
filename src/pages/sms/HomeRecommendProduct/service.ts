import { request } from 'umi';
import {ProductListParams} from "@/pages/pms/product/data";
import type {HomeRecommendProductListParams, HomeRecommendProductListItem} from './data.d';

// 添加人气推荐
export async function addHomeRecommendProduct(params: number[]) {
  return request('/api/sms/homeRecommendProduct/addHomeRecommendProduct', {
    method: 'POST',
    data: {
      productIds: params,
    },
  });
}

//

// 删除人气推荐
export async function removeHomeRecommendProduct(ids: number[], productIds: number[]) {
  return request('/api/sms/homeRecommendProduct/deleteHomeRecommendProduct?ids=' + ids.join(",") + '&productIds=' + productIds.join(","), {
    method: 'GET',
  });
}


// 更新人气推荐排序
export async function updateRecommendProductSort(params: HomeRecommendProductListItem) {
  return request('/api/sms/homeRecommendProduct/updateRecommendProductSort', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 批量更新人气推荐状态
export async function updateHomeRecommendProductStatus(params: { ids: number[], recommendStatus: number, productIds: number[]  }) {
  return request('/api/sms/homeRecommendProduct/updateRecommendProductStatus', {
    method: 'POST',
    data: {
      ...params,
    },

  });
}


// 查询人气推荐详情
export async function queryHomeRecommendProductDetail(id: number ) {
  return request('/api/sms/homeRecommendProduct/queryHomeRecommendProductDetail', {
    method: 'GET',
  });
}

// 分页查询人气推荐列表
export async function queryHomeRecommendProductList(params: HomeRecommendProductListParams) {

  return request('/api/sms/homeRecommendProduct/queryHomeRecommendProductList', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}


export async function queryProduct(params?: ProductListParams) {
  return request('/api/product/queryProductList', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}
