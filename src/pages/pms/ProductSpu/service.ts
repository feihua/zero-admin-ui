import {request} from 'umi';
import type { ProductSpuListParams, ProductSpuListItem } from './data.d';

// 添加商品SPU
export async function addProductSpu(params: ProductSpuListItem) {
  return request('/api/pms/product/addProductSpu', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 删除商品SPU
export async function removeProductSpu(ids: number[]) {
  return request('/api/pms/product/deleteProductSpu?ids=' + ids.join(','), {
    method: 'GET',
  });
}


// 更新商品SPU
export async function updateProductSpu(params: ProductSpuListItem) {
  return request('/api/pms/product/updateProductSpu', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 批量更新商品SPU状态
export async function updateProductSpuStatus(params: { productSpuIds: number[], productSpuStatus: number }) {
  return request('/api/pms/product/updateProductSpuStatus', {
    method: 'POST',
    data: {
      ...params,
    },

  });
}


// 查询商品SPU详情
export async function queryProductSpuDetail(id: number) {
  return request('/api/pms/product/queryProductSpuDetail?id=' + id, {
    method: 'GET',
  });
}

// 分页查询商品SPU列表
export async function queryProductSpuList(params: ProductSpuListParams) {

  return request('/api/pms/product/queryProductSpuList', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}
