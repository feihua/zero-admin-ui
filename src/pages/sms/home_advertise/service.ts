import { request } from 'umi';
import {HomeAdvertiseListParams, HomeAdvertiseListItem} from './data.d';
import moment from "moment";


// 添加首页轮播广告
export async function addHomeAdvertise(params: HomeAdvertiseListItem) {
  params.startTime = moment(params.startTime).format('YYYY-MM-DD HH:mm:ss');
  params.endTime = moment(params.endTime).format('YYYY-MM-DD HH:mm:ss');
  return request('/api/sms/homeadvertise/addHomeAdvertise', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

//

// 删除首页轮播广告
export async function removeHomeAdvertise(ids: number[]) {
  return request('/api/sms/homeadvertise/deleteHomeAdvertise?ids=[' + ids + "]", {
    method: 'GET',
  });
}


// 更新首页轮播广告
export async function updateHomeAdvertise(params: HomeAdvertiseListItem) {
  return request('/api/sms/homeadvertise/updateHomeAdvertise', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 批量更新首页轮播广告状态
export async function updateHomeAdvertiseStatus(params: { dictTypeIds: number[], postStatus: number }) {
  return request('/api/sms/homeadvertise/updateHomeAdvertiseStatus', {
    method: 'POST',
    data: {
      ...params,
    },

  });
}


// 查询首页轮播广告详情
export async function queryHomeAdvertiseDetail(params: { ids: number }) {
  return request('/api/sms/homeadvertise/queryHomeAdvertiseDetail', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

// 分页查询首页轮播广告列表
export async function queryHomeAdvertiseList(params: HomeAdvertiseListParams) {

  return request('/api/sms/homeadvertise/queryHomeAdvertiseList', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

