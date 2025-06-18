import {request} from 'umi';
import type { ProductAttributeListParams, ProductAttributeListItem } from './data.d';

// 添加商品属性
export async function addProductAttribute(params: ProductAttributeListItem) {
  return request('/api/pms/attribute/addAttribute', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 删除商品属性
export async function removeProductAttribute(ids: number[]) {
  return request('/api/pms/attribute/deleteAttribute?ids=' + ids.join(','), {
    method: 'GET',
  });
}


// 更新商品属性
export async function updateProductAttribute(params: ProductAttributeListItem) {
  return request('/api/pms/attribute/updateAttribute', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 批量更新商品属性状态
export async function updateProductAttributeStatus(params: { ids: number[], status: number }) {
  return request('/api/pms/attribute/updateAttributeStatus', {
    method: 'POST',
    data: {
      ...params,
    },

  });
}


// 查询商品属性详情
export async function queryProductAttributeDetail(id: number) {
  return request('/api/pms/attribute/queryAttributeDetail?id=' + id, {
    method: 'GET',
  });
}

// 分页查询商品属性列表
export async function queryProductAttributeList(params: ProductAttributeListParams) {

  return request('/api/pms/attribute/queryAttributeList', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}
