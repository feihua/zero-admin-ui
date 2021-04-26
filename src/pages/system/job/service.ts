import { request } from 'umi';
import { JobListParams, JobListItem } from './data.d';

export async function queryJob(params?: JobListParams) {
  return request('/api/sys/job/list', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function removeJobOne(params: { id: number }) {
  return request('/api/sys/job/delete', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function removeJob(params: { ids: number[] }) {
  return request('/api/sys/job/delete', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function addJob(params: JobListItem) {
  return request('/api/sys/job/add', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateJob(params: JobListItem) {
  return request('/api/sys/job/update', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
