import {request} from 'umi';
import type {AttributeCategoryListParams, AttributeCategoryListItem} from './data.d';
// 添加商品属性分类
export async function addAttributeCategory(params: AttributeCategoryListItem) {
  return request('/api/product/attributeCategory/addAttributeCategory', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

//

// 删除商品属性分类
export async function removeAttributeCategory(ids: number[]) {
  return request('/api/product/attributeCategory/deleteAttributeCategory?ids=' + ids.join(','), {
    method: 'GET',
  });
}


// 更新商品属性分类
export async function updateAttributeCategory(params: AttributeCategoryListItem) {
  return request('/api/product/attributeCategory/updateAttributeCategory', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 批量更新商品属性分类状态
export async function updateAttributeCategoryStatus(params: { dictTypeIds: number[], postStatus: number }) {
  return request('/api/product/attributeCategory/updateAttributeCategoryStatus', {
    method: 'POST',
    data: {
      ...params,
    },

  });
}


// 查询商品属性分类详情
export async function queryAttributeCategoryDetail(id: number ) {
  return request('/api/product/attributeCategory/queryAttributeCategoryDetail', {
    method: 'GET',
  });
}

// 分页查询商品属性分类列表
export async function queryAttributeCategoryList(params: AttributeCategoryListParams) {

  return request('/api/product/attributeCategory/queryAttributeCategoryList', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}
