import {request} from 'umi';
import type { ProductBrandListParams, ProductBrandListItem } from './data.d';

// 添加商品品牌
export async function addProductBrand(params: ProductBrandListItem) {
  return request('/api/pms/brand/addProductBrand', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 删除商品品牌
export async function removeProductBrand(ids: number[]) {
  return request('/api/pms/brand/deleteProductBrand?ids=[' + ids + "]", {
    method: 'GET',
  });
}


// 更新商品品牌
export async function updateProductBrand(params: ProductBrandListItem) {
  return request('/api/pms/brand/updateProductBrand', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 批量更新商品品牌状态
export async function updateProductBrandStatus(params: { ids: number[], status: number }) {
  return request('/api/pms/brand/updateProductBrandStatus', {
    method: 'POST',
    data: {
      ...params,
    },

  });
}


// 查询商品品牌详情
export async function queryProductBrandDetail(id: number) {
  return request('/api/pms/brand/queryProductBrandDetail?id=' + id, {
    method: 'GET',
  });
}

// 分页查询商品品牌列表
export async function queryProductBrandList(params: ProductBrandListParams) {

  return request('/api/pms/brand/queryProductBrandList', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}
