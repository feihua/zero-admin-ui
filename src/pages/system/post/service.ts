import {request} from 'umi';
import type {PostListParams, PostListItem} from './data.d';

// 添加岗位管理
export async function addPost(params: PostListItem) {
  return request('/api/sys/post/addPost', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

//

// 删除岗位管理
export async function removePost(ids: number[]) {
  return request('/api/sys/post/deletePost?ids=[' + ids + "]", {
    method: 'GET',
  });
}


// 更新岗位管理
export async function updatePost(params: PostListItem) {
  return request('/api/sys/post/updatePost', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 批量更新岗位管理状态
export async function updatePostStatus(params: { postIds: number[], postStatus: number }) {
  return request('/api/sys/post/updatePostStatus', {
    method: 'POST',
    data: {
      ...params,
    },

  });
}


// 查询岗位管理详情
export async function queryPostDetail(params: { ids: number }) {
  return request('/api/sys/post/queryPostDetail', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

// 分页查询岗位管理列
export async function queryPostList(params: PostListParams) {

  return request('/api/sys/post/queryPostList', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}
