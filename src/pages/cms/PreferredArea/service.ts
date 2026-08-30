import {request} from 'umi';
import type { PreferredAreaListParams, PreferredAreaListItem } from './data.d';

// 添加优选专区
export async function addPreferredArea(params: PreferredAreaListItem) {
  return request('/api/cms/prefrenceArea/addPreferredArea', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 删除优选专区
export async function removePreferredArea(ids: number[]) {
  return request('/api/cms/prefrenceArea/deletePreferredArea?ids=' + ids.join(','), {
    method: 'GET',
  });
}


// 更新优选专区
export async function updatePreferredArea(params: PreferredAreaListItem) {
  return request('/api/cms/prefrenceArea/updatePreferredArea', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 批量更新优选专区状态
export async function updatePreferredAreaStatus(params: { ids: number[], status: number }) {
  return request('/api/cms/prefrenceArea/updatePreferredAreaStatus', {
    method: 'POST',
    data: {
      ...params,
    },

  });
}


// 查询优选专区详情
export async function queryPreferredAreaDetail(id: number) {
  return request('/api/cms/prefrenceArea/queryPreferredAreaDetail?id=' + id, {
    method: 'GET',
  });
}

// 分页查询优选专区列表
export async function queryPreferredAreaList(params: PreferredAreaListParams) {
  return request('/api/cms/prefrenceArea/queryPreferredAreaList', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}
