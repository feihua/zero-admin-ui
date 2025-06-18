import {request} from 'umi';
import type { ProductSpecListParams, ProductSpecListItem } from './data.d';

// 添加商品规格
export async function addProductSpec(params: ProductSpecListItem) {
  return request('/api/demo/productSpec/addProductSpec', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 删除商品规格
export async function removeProductSpec(ids: number[]) {
  return request('/api/demo/productSpec/deleteProductSpec?ids=[' + ids + "]", {
    method: 'GET',
  });
}


// 更新商品规格
export async function updateProductSpec(params: ProductSpecListItem) {
  return request('/api/demo/productSpec/updateProductSpec', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 批量更新商品规格状态
export async function updateProductSpecStatus(params: { productSpecIds: number[], productSpecStatus: number }) {
  return request('/api/demo/productSpec/updateProductSpecStatus', {
    method: 'POST',
    data: {
      ...params,
    },

  });
}


// 查询商品规格详情
export async function queryProductSpecDetail(id: number) {
  return request('/api/demo/productSpec/queryProductSpecDetail?id=' + id, {
    method: 'GET',
  });
}

// 分页查询商品规格列表
export async function queryProductSpecList(params: ProductSpecListParams) {

  return request('/api/demo/productSpec/queryProductSpecList', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}
