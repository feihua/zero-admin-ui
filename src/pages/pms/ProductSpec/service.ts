import {request} from 'umi';
import type { ProductSpecListParams, ProductSpecListItem } from './data.d';

// 添加商品规格
export async function addProductSpec(params: ProductSpecListItem) {
  return request('/api/pms/productSpec/addSpec', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 删除商品规格
export async function removeProductSpec(ids: number[]) {
  return request('/api/pms/productSpec/deleteSpec?ids=' + ids.join(','), {
    method: 'GET',
  });
}


// 更新商品规格
export async function updateProductSpec(params: ProductSpecListItem) {
  return request('/api/pms/productSpec/updateSpec', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 批量更新商品规格状态
export async function updateProductSpecStatus(params: { ids: number[], status: number }) {
  return request('/api/pms/productSpec/updateSpecStatus', {
    method: 'POST',
    data: {
      ...params,
    },

  });
}


// 查询商品规格详情
export async function queryProductSpecDetail(id: number) {
  return request('/api/pms/productSpec/querySpecDetail?id=' + id, {
    method: 'GET',
  });
}

// 分页查询商品规格列表
export async function queryProductSpecList(params: ProductSpecListParams) {

  return request('/api/pms/productSpec/querySpecList', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}
