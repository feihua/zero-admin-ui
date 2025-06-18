import {request} from 'umi';
import type { ProductAttributeGroupListParams, ProductAttributeGroupListItem } from './data.d';

// 添加商品属性分组
export async function addProductAttributeGroup(params: ProductAttributeGroupListItem) {
  return request('/api/pms/attributeGroup/addAttributeGroup', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 删除商品属性分组
export async function removeProductAttributeGroup(ids: number[]) {
  return request('/api/pms/attributeGroup/deleteAttributeGroup?ids=' + ids.join(','), {
    method: 'GET',
  });
}


// 更新商品属性分组
export async function updateProductAttributeGroup(params: ProductAttributeGroupListItem) {
  return request('/api/pms/attributeGroup/updateAttributeGroup', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 批量更新商品属性分组状态
export async function updateProductAttributeGroupStatus(params: { ids: number[], status: number }) {
  return request('/api/pms/attributeGroup/updateAttributeGroupStatus', {
    method: 'POST',
    data: {
      ...params,
    },

  });
}


// 查询商品属性分组详情
export async function queryProductAttributeGroupDetail(id: number) {
  return request('/api/pms/attributeGroup/queryAttributeGroupDetail?id=' + id, {
    method: 'GET',
  });
}

// 分页查询商品属性分组列表
export async function queryProductAttributeGroupList(params: ProductAttributeGroupListParams) {

  return request('/api/pms/attributeGroup/queryAttributeGroupList', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}
