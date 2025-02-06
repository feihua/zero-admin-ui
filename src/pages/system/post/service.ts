import {request} from 'umi';
import type {PostListParams, PostListItem} from './data.d';

// 添加岗位信息
export async function addPost(params: PostListItem) {
  return request('/api/sys/post/addPost', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 删除岗位信息
export async function removePost(ids: number[]) {
  return request('/api/sys/post/deletePost?ids=' + ids.join(','), {
    method: 'GET',
  });
}


// 更新岗位信息
export async function updatePost(params: PostListItem) {
  return request('/api/sys/post/updatePost', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 批量更新岗位信息状态
export async function updatePostStatus(params: { ids: number[], status: number }) {
  return request('/api/sys/post/updatePostStatus', {
    method: 'POST',
    data: {
      ...params,
    },

  });
}


// 查询岗位信息详情
export async function queryPostDetail(id: number) {
  return request('/api/sys/post/queryPostDetail', {
    method: 'GET',
  });
}

// 分页查询岗位信息列表
export async function queryPostList(params: PostListParams) {

  return request('/api/sys/post/queryPostList', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}
