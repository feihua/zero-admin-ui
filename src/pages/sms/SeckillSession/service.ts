import {request} from 'umi';
import type { SeckillSessionListParams, SeckillSessionListItem } from './data.d';
import moment from 'moment';

// 添加秒杀场次
export async function addSeckillSession(params: SeckillSessionListItem) {
  params.startTime = moment(params.startTime).format('HH:mm:ss');
  params.endTime = moment(params.endTime).format('HH:mm:ss');
  return request('/api/sms/seckillSession/addSeckillSession', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 删除秒杀场次
export async function removeSeckillSession(ids: number[]) {
  return request('/api/sms/seckillSession/deleteSeckillSession?ids=' + ids.join(','), {
    method: 'GET',
  });
}


// 更新秒杀场次
export async function updateSeckillSession(params: SeckillSessionListItem) {
  params.startTime = moment(params.startTime).format('HH:mm:ss');
  params.endTime = moment(params.endTime).format('HH:mm:ss');
  return request('/api/sms/seckillSession/updateSeckillSession', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 批量更新秒杀场次状态
export async function updateSeckillSessionStatus(params: { seckillSessionIds: number[], seckillSessionStatus: number }) {
  return request('/api/sms/seckillSession/updateSeckillSessionStatus', {
    method: 'POST',
    data: {
      ...params,
    },

  });
}


// 查询秒杀场次详情
export async function querySeckillSessionDetail(id: number) {
  return request('/api/sms/seckillSession/querySeckillSessionDetail?id=' + id, {
    method: 'GET',
  });
}

// 分页查询秒杀场次列表
export async function querySeckillSessionList(params: SeckillSessionListParams) {

  return request('/api/sms/seckillSession/querySeckillSessionList', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}
