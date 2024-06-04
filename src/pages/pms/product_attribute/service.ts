import {request} from 'umi';
import type {AttributeListParams, AttributeListItem} from './data.d';

// 添加商品属性
export async function addAttribute(params: AttributeListItem) {
  return request('/api/product/attribute/addAttribute', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 删除商品属性
export async function removeAttribute(ids: number[]) {
  return request('/api/product/attribute/deleteAttribute?ids=[' + ids + "]", {
    method: 'GET',
  });
}

// 更新商品属性
export async function updateAttribute(params: AttributeListItem) {
  return request('/api/product/attribute/updateAttribute', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 批量更新商品属性状态
export async function updateAttributeStatus(params: { dictTypeIds: number[], postStatus: number }) {
  return request('/api/product/attribute/updateAttributeStatus', {
    method: 'POST',
    data: {
      ...params,
    },

  });
}


// 查询商品属性详情
export async function queryAttributeDetail(id: number ) {
  return request('/api/product/attribute/queryAttributeDetail', {
    method: 'GET',
  });
}

// 分页查询商品属性列表
export async function queryAttributeList(params: AttributeListParams) {

  return request('/api/product/attribute/queryAttributeList', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

