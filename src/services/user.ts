import { request } from 'umi';

export async function query() {
  return request<API.CurrentUser[]>('/api/sys/users');
}

export async function queryCurrent() {
  return request<API.CurrentUser>('/api/sys/user/currentUser');
}

export async function queryNotices(): Promise<any> {
  return request<{ data: API.NoticeIconData[] }>('/api/sys/notices');
}
