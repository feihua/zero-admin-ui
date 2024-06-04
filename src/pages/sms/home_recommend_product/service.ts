import { request } from 'umi';
import {ProductListParams} from "@/pages/pms/product/data";
import type {HomeRecommendProductListParams, HomeRecommendProductListItem} from './data.d';

// 添加人气推荐
export async function addHomeRecommendProduct(params: number[]) {
  return request('/api/sms/homerecommendproduct/addHomeRecommendProduct', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

//

// 删除人气推荐
export async function removeHomeRecommendProduct(ids: number[]) {
  return request('/api/sms/homerecommendproduct/deleteHomeRecommendProduct?ids=[' + ids + "]", {
    method: 'GET',
  });
}


// 更新人气推荐
export async function updateHomeRecommendProduct(params: HomeRecommendProductListItem) {
  return request('/api/sms/homerecommendproduct/updateHomeRecommendProduct', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 批量更新人气推荐状态
export async function updateHomeRecommendProductStatus(params: { dictTypeIds: number[], postStatus: number }) {
  return request('/api/sms/homerecommendproduct/updateHomeRecommendProductStatus', {
    method: 'POST',
    data: {
      ...params,
    },

  });
}


// 查询人气推荐详情
export async function queryHomeRecommendProductDetail(id: number ) {
  return request('/api/sms/homerecommendproduct/queryHomeRecommendProductDetail', {
    method: 'GET',
  });
}

// 分页查询人气推荐列表
export async function queryHomeRecommendProductList(params: HomeRecommendProductListParams) {

  return request('/api/sms/homerecommendproduct/queryHomeRecommendProductList', {
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
