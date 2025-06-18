import {request} from 'umi';
import type { ProductSkuListParams, ProductSkuListItem } from './data.d';

// 添加商品SKU
export async function addProductSku(params: ProductSkuListItem) {
  return request('/api/demo/productSku/addProductSku', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 删除商品SKU
export async function removeProductSku(ids: number[]) {
  return request('/api/demo/productSku/deleteProductSku?ids=[' + ids + "]", {
    method: 'GET',
  });
}


// 更新商品SKU
export async function updateProductSku(params: ProductSkuListItem) {
  return request('/api/demo/productSku/updateProductSku', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 批量更新商品SKU状态
export async function updateProductSkuStatus(params: { productSkuIds: number[], productSkuStatus: number }) {
  return request('/api/demo/productSku/updateProductSkuStatus', {
    method: 'POST',
    data: {
      ...params,
    },

  });
}


// 查询商品SKU详情
export async function queryProductSkuDetail(id: number) {
  return request('/api/demo/productSku/queryProductSkuDetail?id=' + id, {
    method: 'GET',
  });
}

// 分页查询商品SKU列表
export async function queryProductSkuList(params: ProductSkuListParams) {

  return request('/api/demo/productSku/queryProductSkuList', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}
