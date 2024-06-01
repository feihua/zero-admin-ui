import {request} from 'umi';
import type {DictItemListParams, DictItemListItem} from './data.d';

// 添加字典类型
export async function addDictItem(params: DictItemListItem) {
  return request('/api/sys/dictItem/addDictItem', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

//

// 删除字典类型
export async function removeDictItem(ids: number[]) {
  return request('/api/sys/dictItem/deleteDictItem?ids=[' + ids + "]", {
    method: 'GET',
  });
}


// 更新字典类型
export async function updateDictItem(params: DictItemListItem) {
  return request('/api/sys/dictItem/updateDictItem', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 批量更新字典类型状态
export async function updateDictItemStatus(params: { dictItemIds: number[], postStatus: number }) {
  return request('/api/sys/dictItem/updateDictItemStatus', {
    method: 'POST',
    data: {
      ...params,
    },

  });
}


// 查询字典类型详情
export async function queryDictItemDetail(params: { ids: number }) {
  return request('/api/sys/dictItem/queryDictItemDetail', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

// 分页查询字典类型列表
export async function queryDictItemList(params: DictItemListParams) {

  return request('/api/sys/dictItem/queryDictItemList', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}
