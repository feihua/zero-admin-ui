import {request} from 'umi';
import type { TopicCommentListParams, TopicCommentListItem } from './data.d';

// 添加话题评论
export async function addTopicComment(params: TopicCommentListItem) {
  return request('/api/cms/topicComment/addTopicComment', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 删除话题评论
export async function removeTopicComment(ids: number[]) {
  return request('/api/cms/topicComment/deleteTopicComment?ids=' + ids.join(','), {
    method: 'GET',
  });
}


// 更新话题评论
export async function updateTopicComment(params: TopicCommentListItem) {
  return request('/api/cms/topicComment/updateTopicComment', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 批量更新话题评论状态
export async function updateTopicCommentStatus(params: { ids: number[], status: number }) {
  return request('/api/cms/topicComment/updateTopicCommentStatus', {
    method: 'POST',
    data: {
      ...params,
    },

  });
}


// 查询话题评论详情
export async function queryTopicCommentDetail(id: number) {
  return request('/api/cms/topicComment/queryTopicCommentDetail?id=' + id, {
    method: 'GET',
  });
}

// 分页查询话题评论列表
export async function queryTopicCommentList(params: TopicCommentListParams) {

  return request('/api/cms/topicComment/queryTopicCommentList', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}
