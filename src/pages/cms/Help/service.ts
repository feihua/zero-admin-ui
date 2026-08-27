import {request} from 'umi';
import type { HelpListParams, HelpListItem } from './data.d';

// 添加帮助
export async function addHelp(params: HelpListItem) {
  return request('/api/cms/help/addHelp', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 删除帮助
export async function removeHelp(ids: number[]) {
  return request('/api/cms/help/deleteHelp?ids=' + ids.join(','), {
    method: 'GET',
  });
}


// 更新帮助
export async function updateHelp(params: HelpListItem) {
  return request('/api/cms/help/updateHelp', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 批量更新帮助状态
export async function updateHelpStatus(params: { ids: number[], status: number }) {
  return request('/api/cms/help/updateHelpStatus', {
    method: 'POST',
    data: {
      ...params,
    },

  });
}


// 查询帮助详情
export async function queryHelpDetail(id: number) {
  return request('/api/cms/help/queryHelpDetail?id=' + id, {
    method: 'GET',
  });
}

// 分页查询帮助列表
export async function queryHelpList(params: HelpListParams) {

  return request('/api/cms/help/queryHelpList', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}
