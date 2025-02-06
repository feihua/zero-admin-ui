import { request } from 'umi';
import {HomeAdvertiseListParams, HomeAdvertiseListItem} from './data.d';
import moment from "moment";


// 添加首页轮播广告
export async function addHomeAdvertise(params: HomeAdvertiseListItem) {
  params.startTime = moment(params.startTime).format('YYYY-MM-DD HH:mm:ss');
  params.endTime = moment(params.endTime).format('YYYY-MM-DD HH:mm:ss');
  return request('/api/sms/homeAdvertise/addHomeAdvertise', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

//

// 删除首页轮播广告
export async function removeHomeAdvertise(ids: number[]) {
  return request('/api/sms/homeAdvertise/deleteHomeAdvertise?ids=' + ids.join(','), {
    method: 'GET',
  });
}


// 更新首页轮播广告
export async function updateHomeAdvertise(params: HomeAdvertiseListItem) {
  params.startTime = moment(params.startTime).format('YYYY-MM-DD HH:mm:ss');
  params.endTime = moment(params.endTime).format('YYYY-MM-DD HH:mm:ss');
  return request('/api/sms/homeAdvertise/updateHomeAdvertise', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 批量更新首页轮播广告状态
export async function updateHomeAdvertiseStatus(params: { ids: number[], status: number }) {
  return request('/api/sms/homeAdvertise/updateHomeAdvertiseStatus', {
    method: 'POST',
    data: {
      ...params,
    },

  });
}


// 查询首页轮播广告详情
export async function queryHomeAdvertiseDetail(id: number ) {
  return request('/api/sms/homeAdvertise/queryHomeAdvertiseDetail', {
    method: 'GET',
  });
}

// 分页查询首页轮播广告列表
export async function queryHomeAdvertiseList(params: HomeAdvertiseListParams) {

  return request('/api/sms/homeAdvertise/queryHomeAdvertiseList', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

