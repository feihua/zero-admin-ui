import {request} from 'umi';
import type { IntegrationConsumeSettingListParams, IntegrationConsumeSettingListItem } from './data.d';

// 添加积分消费设置
export async function addIntegrationConsumeSetting(params: IntegrationConsumeSettingListItem) {
  return request('/api/ums/integrationConsumeSetting/addIntegrationConsumeSetting', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 删除积分消费设置
export async function removeIntegrationConsumeSetting(ids: number[]) {
  return request('/api/ums/integrationConsumeSetting/deleteIntegrationConsumeSetting?ids=' + ids.join(','), {
    method: 'GET',
  });
}


// 更新积分消费设置
export async function updateIntegrationConsumeSetting(params: IntegrationConsumeSettingListItem) {
  return request('/api/ums/integrationConsumeSetting/updateIntegrationConsumeSetting', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 批量更新积分消费设置状态
export async function updateIntegrationConsumeSettingStatus(params: { integrationConsumeSettingId: number, integrationConsumeSettingStatus: number }) {
  return request('/api/ums/integrationConsumeSetting/updateIntegrationConsumeSettingStatus', {
    method: 'POST',
    data: {
      id: params.integrationConsumeSettingId, isDefault: params.integrationConsumeSettingStatus
    },

  });
}


// 查询积分消费设置详情
export async function queryIntegrationConsumeSettingDetail(id: number) {
  return request('/api/ums/integrationConsumeSetting/queryIntegrationConsumeSettingDetail?id=' + id, {
    method: 'GET',
  });
}

// 分页查询积分消费设置列表
export async function queryIntegrationConsumeSettingList(params: IntegrationConsumeSettingListParams) {

  return request('/api/ums/integrationConsumeSetting/queryIntegrationConsumeSettingList', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}
