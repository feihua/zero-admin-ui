import { request } from 'umi';
import {ProductListParams} from "@/pages/pms/product/data";
import type {HomeNewProductListParams, HomeNewProductListItem} from './data.d';

// 添加新品推荐
export async function addHomeNewProduct(params: number[]) {
  return request('/api/sms/homeNewProduct/addHomeNewProduct', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

//

// 删除新品推荐
export async function removeHomeNewProduct(ids: number[]) {
  return request('/api/sms/homeNewProduct/deleteHomeNewProduct?ids=[' + ids + "]", {
    method: 'GET',
  });
}


// 更新新品推荐
export async function updateHomeNewProduct(params: HomeNewProductListItem) {
  return request('/api/sms/homeNewProduct/updateHomeNewProduct', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 批量更新新品推荐状态
export async function updateHomeNewProductStatus(params: { dictTypeIds: number[], postStatus: number }) {
  return request('/api/sms/homeNewProduct/updateHomeNewProductStatus', {
    method: 'POST',
    data: {
      ...params,
    },

  });
}


// 查询新品推荐详情
export async function queryHomeNewProductDetail(id: number ) {
  return request('/api/sms/homeNewProduct/queryHomeNewProductDetail', {
    method: 'GET',
  });
}

// 分页查询新品推荐列表
export async function queryHomeNewProductList(params: HomeNewProductListParams) {

  return request('/api/sms/homeNewProduct/queryHomeNewProductList', {
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
