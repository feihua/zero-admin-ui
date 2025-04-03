import {request} from 'umi';
import type {BrandListItem, BrandListParams} from './data.d';

// 添加商品品牌
export async function addBrand(params: BrandListItem) {
  return request('/api/pms/brand/addProductBrand', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

//

// 删除商品品牌
export async function removeBrand(ids: number[]) {
  return request('/api/pms/brand/deleteProductBrand?ids=' + ids.join(','), {
    method: 'GET',
  });
}


// 更新商品品牌
export async function updateBrand(params: BrandListItem) {
  return request('/api/pms/brand/updateProductBrand', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 批量更新商品品牌状态
export async function updateBrandStatus(params: { dictTypeIds: number[], postStatus: number }) {
  return request('/api/pms/brand/updateProductBrandStatus', {
    method: 'POST',
    data: {
      ...params,
    },

  });
}


// 查询商品品牌详情
export async function queryBrandDetail(id: number) {
  return request('/api/pms/brand/queryProductBrandDetail', {
    method: 'GET',
  });
}

// 分页查询商品品牌列表
export async function queryBrandList(params: BrandListParams) {

  return request('/api/pms/brand/queryProductBrandList', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}
