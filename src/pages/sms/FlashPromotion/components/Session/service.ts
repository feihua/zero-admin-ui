import {request} from 'umi';
import type {SessionListParams, SessionListItem} from './data.d';
import moment from "moment/moment";

// 添加限时购场次
export async function addSession(params: SessionListItem) {
  params.startTime = moment(params.startTime).format('HH:mm:ss');
  params.endTime = moment(params.endTime).format('HH:mm:ss');
  return request('/api/sms/flashPromotionSession/addFlashPromotionSession', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

//

// 删除限时购场次
export async function removeSession(ids: number[]) {
  return request('/api/sms/flashPromotionSession/deleteFlashPromotionSession?ids=' + ids.join(','), {
    method: 'GET',
  });
}


// 更新限时购场次
export async function updateSession(params: SessionListItem) {
  params.startTime = moment(params.startTime).format('HH:mm:ss');
  params.endTime = moment(params.endTime).format('HH:mm:ss');
  return request('/api/sms/flashPromotionSession/updateFlashPromotionSession', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 批量更新限时购场次状态
export async function updateSessionStatus(params: { ids: number[], status: number }) {
  return request('/api/sms/flashPromotionSession/updateSessionStatus', {
    method: 'POST',
    data: {
      ...params,
    },

  });
}


// 查询限时购场次详情
export async function querySessionDetail(id: number ) {
  return request('/api/sms/flashPromotionSession/querySessionDetail', {
    method: 'GET',
  });
}

// 分页查询限时购场次列表
export async function querySessionList(params: SessionListParams) {

  return request('/api/sms/flashPromotionSession/queryFlashPromotionSessionList', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}
