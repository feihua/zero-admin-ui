import {request} from 'umi';
import type { SeckillActivityListParams, SeckillActivityListItem } from './data.d';
import moment from 'moment/moment';

// 添加秒杀活动
export async function addSeckillActivity(params: SeckillActivityListItem) {
  params.startTime = moment(params.startTime).format('YYYY-MM-DD HH:mm:ss');
  params.endTime = moment(params.endTime).format('YYYY-MM-DD HH:mm:ss');
  return request('/api/sms/seckillActivity/addSeckillActivity', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 删除秒杀活动
export async function removeSeckillActivity(ids: number[]) {
  return request('/api/sms/seckillActivity/deleteSeckillActivity?ids=' + ids.join(','), {
    method: 'GET',
  });
}


// 更新秒杀活动
export async function updateSeckillActivity(params: SeckillActivityListItem) {
  params.startTime = moment(params.startTime).format('YYYY-MM-DD HH:mm:ss');
  params.endTime = moment(params.endTime).format('YYYY-MM-DD HH:mm:ss');
  return request('/api/sms/seckillActivity/updateSeckillActivity', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 批量更新秒杀活动状态
export async function updateSeckillActivityStatus(params: { ids: number[], status: number }) {
  return request('/api/sms/seckillActivity/updateSeckillActivityStatus', {
    method: 'POST',
    data: {
      ...params,
    },

  });
}


// 查询秒杀活动详情
export async function querySeckillActivityDetail(id: number) {
  return request('/api/sms/seckillActivity/querySeckillActivityDetail?id=' + id, {
    method: 'GET',
  });
}

// 分页查询秒杀活动列表
export async function querySeckillActivityList(params: SeckillActivityListParams) {

  return request('/api/sms/seckillActivity/querySeckillActivityList', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}
