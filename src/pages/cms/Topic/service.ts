import {request} from 'umi';
import type { TopicListParams, TopicListItem } from './data.d';

// 添加话题
export async function addTopic(params: TopicListItem) {
  return request('/api/cms/topic/addTopic', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 删除话题
export async function removeTopic(ids: number[]) {
  return request('/api/cms/topic/deleteTopic?ids=' + ids.join(','), {
    method: 'GET',
  });
}


// 更新话题
export async function updateTopic(params: TopicListItem) {
  return request('/api/cms/topic/updateTopic', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 批量更新话题状态
export async function updateTopicStatus(params: { ids: number[], status: number }) {
  return request('/api/cms/topic/updateTopicStatus', {
    method: 'POST',
    data: {
      ...params,
    },

  });
}


// 查询话题详情
export async function queryTopicDetail(id: number) {
  return request('/api/cms/topic/queryTopicDetail?id=' + id, {
    method: 'GET',
  });
}

// 分页查询话题列表
export async function queryTopicList(params: TopicListParams) {

  return request('/api/cms/topic/queryTopicList', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}
