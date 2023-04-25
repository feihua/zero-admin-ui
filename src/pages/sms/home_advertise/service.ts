import { request } from 'umi';
import {HomeAdvertiseListParams, HomeAdvertiseListItem} from './data.d';
import moment from "moment";

export async function queryHomeAdvertise(params: HomeAdvertiseListParams) {
  if (params.type != null) {
    params.type = Number(params.type)
  }
  return request('/api/sms/homeadvertise/list', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function removeHomeAdvertise(params: { ids: number[] }) {
  return request('/api/sms/homeadvertise/delete', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function addHomeAdvertise(params: HomeAdvertiseListItem) {
  params.startTime = moment(params.startTime).format('YYYY-MM-DD HH:mm:ss');
  params.endTime = moment(params.endTime).format('YYYY-MM-DD HH:mm:ss');
  return request('/api/sms/homeadvertise/add', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateHomeAdvertise(params: HomeAdvertiseListItem) {
  return request('/api/sms/homeadvertise/update', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
