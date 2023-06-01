import {request} from 'umi';
import type {JobListParams, JobListItem} from './data.d';

export async function queryJob(params: JobListParams) {
  if (params.delFlag != null) {
    params.delFlag = Number(params.delFlag)
  }
  return request('/api/sys/job/list', {
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
