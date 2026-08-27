import {request} from 'umi';
import type { HelpCategoryListParams, HelpCategoryListItem } from './data.d';

// 添加帮助分类
export async function addHelpCategory(params: HelpCategoryListItem) {
  return request('/api/cms/helpCategory/addHelpCategory', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 删除帮助分类
export async function removeHelpCategory(ids: number[]) {
  return request('/api/cms/helpCategory/deleteHelpCategory?ids=' + ids.join(','), {
    method: 'GET',
  });
}


// 更新帮助分类
export async function updateHelpCategory(params: HelpCategoryListItem) {
  return request('/api/cms/helpCategory/updateHelpCategory', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 批量更新帮助分类状态
export async function updateHelpCategoryStatus(params: { ids: number[], status: number }) {
  return request('/api/cms/helpCategory/updateHelpCategoryStatus', {
    method: 'POST',
    data: {
      ...params,
    },

  });
}


// 查询帮助分类详情
export async function queryHelpCategoryDetail(id: number) {
  return request('/api/cms/helpCategory/queryHelpCategoryDetail?id=' + id, {
    method: 'GET',
  });
}

// 分页查询帮助分类列表
export async function queryHelpCategoryList(params: HelpCategoryListParams) {

  return request('/api/cms/helpCategory/queryHelpCategoryList', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}
