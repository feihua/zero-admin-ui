import {request} from 'umi';
import type { NoticeListParams, NoticeListItem } from './data.d';

// 添加通知公告表
export async function addNotice(params: NoticeListItem) {
  return request('/api/sys/notice/addNotice', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 删除通知公告表
export async function removeNotice(ids: number[]) {
  return request('/api/sys/notice/deleteNotice?ids=' + ids.join(','), {
    method: 'GET',
  });
}


// 更新通知公告表
export async function updateNotice(params: NoticeListItem) {
  return request('/api/sys/notice/updateNotice', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 批量更新通知公告表状态
export async function updateNoticeStatus(params: { ids: number[], status: number }) {
  return request('/api/sys/notice/updateNoticeStatus', {
    method: 'POST',
    data: {
      ...params,
    },

  });
}


// 查询通知公告表详情
export async function queryNoticeDetail(id: number) {
  return request('/api/sys/notice/queryNoticeDetail?id=' + id, {
    method: 'GET',
  });
}

// 分页查询通知公告表列表
export async function queryNoticeList(params: NoticeListParams) {

  return request('/api/sys/notice/queryNoticeList', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}
