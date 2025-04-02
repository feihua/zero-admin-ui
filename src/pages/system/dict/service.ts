import {request} from 'umi';
import type {DictTypeListParams, DictTypeListItem} from './data.d';

// 添加字典类型
export async function addDictType(params: DictTypeListItem) {
  return request('/api/sys/dictType/addDictType', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

//

// 删除字典类型
export async function removeDictType(ids: number[]) {
  return request('/api/sys/dictType/deleteDictType?ids=' + ids.join(','), {
    method: 'GET',
  });
}


// 更新字典类型
export async function updateDictType(params: DictTypeListItem) {
  return request('/api/sys/dictType/updateDictType', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 批量更新字典类型状态
export async function updateDictTypeStatus(params: { ids: number[], status: number }) {
  return request('/api/sys/dictType/updateDictTypeStatus', {
    method: 'POST',
    data: {
      ...params,
    },

  });
}


// 查询字典类型详情
export async function queryDictTypeDetail(id: number ) {
  return request('/api/sys/dictType/queryDictTypeDetail', {
    method: 'GET',
  });
}

// 分页查询字典类型列表
export async function queryDictTypeList(params: DictTypeListParams) {

  return request('/api/sys/dictType/queryDictTypeList', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}
