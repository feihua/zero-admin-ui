import { request } from 'umi';
import { BrandListParams, BrandListItem } from './data.d';
// 添加商品品牌
export async function addBrand(params: BrandListItem) {
  return request('/api/product/brand/addProductBrand', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

//

// 删除商品品牌
export async function removeBrand(ids: number[]) {
  return request('/api/product/brand/deleteProductBrand?ids=[' + ids + "]", {
    method: 'GET',
  });
}


// 更新商品品牌
export async function updateBrand(params: BrandListItem) {
  return request('/api/product/brand/updateProductBrand', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 批量更新商品品牌状态
export async function updateBrandStatus(params: { dictTypeIds: number[], postStatus: number }) {
  return request('/api/product/brand/updateProductBrandStatus', {
    method: 'POST',
    data: {
      ...params,
    },

  });
}


// 查询商品品牌详情
export async function queryBrandDetail(id: number ) {
  return request('/api/product/brand/queryProductBrandDetail', {
    method: 'GET',
  });
}

// 分页查询商品品牌列表
export async function queryBrandList(params: BrandListParams) {

  return request('/api/product/brand/queryProductBrandList', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}
