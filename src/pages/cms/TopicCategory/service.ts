import {request} from 'umi';
import type { TopicCategoryListParams, TopicCategoryListItem } from './data.d';

// 添加话题分类
export async function addTopicCategory(params: TopicCategoryListItem) {
  return request('/api/cms/topicCategory/addTopicCategory', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 删除话题分类
export async function removeTopicCategory(ids: number[]) {
  return request('/api/cms/topicCategory/deleteTopicCategory?ids=' + ids.join(','), {
    method: 'GET',
  });
}


// 更新话题分类
export async function updateTopicCategory(params: TopicCategoryListItem) {
  return request('/api/cms/topicCategory/updateTopicCategory', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 批量更新话题分类状态
export async function updateTopicCategoryStatus(params: { ids: number[], status: number }) {
  return request('/api/cms/topicCategory/updateTopicCategoryStatus', {
    method: 'POST',
    data: {
      ...params,
    },

  });
}


// 查询话题分类详情
export async function queryTopicCategoryDetail(id: number) {
  return request('/api/cms/topicCategory/queryTopicCategoryDetail?id=' + id, {
    method: 'GET',
  });
}

// 分页查询话题分类列表
export async function queryTopicCategoryList(params: TopicCategoryListParams) {

  return request('/api/cms/topicCategory/queryTopicCategoryList', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}
