import {request} from 'umi';
import type { ProductAttributeValueListParams, ProductAttributeValueListItem } from './data.d';

// 添加商品属性值
export async function addProductAttributeValue(params: ProductAttributeValueListItem) {
  return request('/api/demo/productAttributeValue/addProductAttributeValue', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 删除商品属性值
export async function removeProductAttributeValue(ids: number[]) {
  return request('/api/demo/productAttributeValue/deleteProductAttributeValue?ids=' + ids.join(','), {
    method: 'GET',
  });
}


// 更新商品属性值
export async function updateProductAttributeValue(params: ProductAttributeValueListItem) {
  return request('/api/demo/productAttributeValue/updateProductAttributeValue', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 批量更新商品属性值状态
export async function updateProductAttributeValueStatus(params: { productAttributeValueIds: number[], productAttributeValueStatus: number }) {
  return request('/api/demo/productAttributeValue/updateProductAttributeValueStatus', {
    method: 'POST',
    data: {
      ...params,
    },

  });
}


// 查询商品属性值详情
export async function queryProductAttributeValueDetail(id: number) {
  return request('/api/demo/productAttributeValue/queryProductAttributeValueDetail?id=' + id, {
    method: 'GET',
  });
}

// 分页查询商品属性值列表
export async function queryProductAttributeValueList(params: ProductAttributeValueListParams) {

  return request('/api/demo/productAttributeValue/queryProductAttributeValueList', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}
