import { request } from 'umi';
import { CategoryListParams, CategoryListItem } from './data.d';
// 添加商品分类
export async function addProductCategory(params: CategoryListItem) {
  return request('/api/pms/category/addProductCategory', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

//

// 删除商品分类
export async function removeProductCategory(ids: number[]) {
  return request('/api/pms/category/deleteProductCategory?ids=' + ids.join(','), {
    method: 'GET',
  });
}


// 更新商品分类
export async function updateProductCategory(params: CategoryListItem) {
  return request('/api/pms/category/updateProductCategory', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 批量更新商品分类状态
export async function updateProductCategoryStatus(params: { dictTypeIds: number[], postStatus: number }) {
  return request('/api/pms/category/updateProductCategoryStatus', {
    method: 'POST',
    data: {
      ...params,
    },

  });
}


// 查询商品分类详情
export async function queryProductCategoryDetail(id: number ) {
  return request('/api/pms/category/queryProductCategoryDetail', {
    method: 'GET',
  });
}

// 分页查询商品分类列表
export async function queryProductCategoryList(params: CategoryListParams) {

  return request('/api/pms/category/queryProductCategoryList', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}
