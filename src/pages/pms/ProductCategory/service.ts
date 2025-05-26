import {request} from 'umi';
import type { ProductCategoryListParams, ProductCategoryListItem } from './data.d';

// 添加产品分类
export async function addProductCategory(params: ProductCategoryListItem) {
  return request('/api/pms/category/addProductCategory', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 删除产品分类
export async function removeProductCategory(ids: number[]) {
  return request('/api/pms/category/deleteProductCategory?ids=' + ids.join(','), {
    method: 'GET',
  });
}


// 更新产品分类
export async function updateProductCategory(params: ProductCategoryListItem) {
  return request('/api/pms/category/updateProductCategory', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 更新产品分类状态
export async function updateProductCategoryStatus(params: { ids: number[], status: number }) {
  return request('/api/pms/category/updateProductCategoryStatus', {
    method: 'POST',
    data: {
      ...params,
    },

  });
}

// 更新是否显示在导航栏
export async function updateProductCategoryNavStatus(params: { ids: number[], status: number }) {
  return request('/api/pms/category/updateProductCategoryNavStatus', {
    method: 'POST',
    data: {
      ...params,
    },

  });
}


// 查询产品分类详情
export async function queryProductCategoryDetail(id: number) {
  return request('/api/pms/category/queryProductCategoryDetail?id=' + id, {
    method: 'GET',
  });
}

// 分页查询产品分类列表
export async function queryProductCategoryList(params: ProductCategoryListParams) {

  return request('/api/pms/category/queryProductCategoryList', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}
