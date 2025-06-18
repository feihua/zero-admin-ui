import {request} from 'umi';
import type { ProductAttributeListParams, ProductAttributeListItem } from './data.d';

// 添加商品属性
export async function addProductAttribute(params: ProductAttributeListItem) {
  return request('/api/demo/productAttribute/addProductAttribute', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 删除商品属性
export async function removeProductAttribute(ids: number[]) {
  return request('/api/demo/productAttribute/deleteProductAttribute?ids=[' + ids + "]", {
    method: 'GET',
  });
}


// 更新商品属性
export async function updateProductAttribute(params: ProductAttributeListItem) {
  return request('/api/demo/productAttribute/updateProductAttribute', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 批量更新商品属性状态
export async function updateProductAttributeStatus(params: { productAttributeIds: number[], productAttributeStatus: number }) {
  return request('/api/demo/productAttribute/updateProductAttributeStatus', {
    method: 'POST',
    data: {
      ...params,
    },

  });
}


// 查询商品属性详情
export async function queryProductAttributeDetail(id: number) {
  return request('/api/demo/productAttribute/queryProductAttributeDetail?id=' + id, {
    method: 'GET',
  });
}

// 分页查询商品属性列表
export async function queryProductAttributeList(params: ProductAttributeListParams) {

  return request('/api/demo/productAttribute/queryProductAttributeList', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}
