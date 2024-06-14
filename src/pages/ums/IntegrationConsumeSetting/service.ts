import {request} from 'umi';
import type { IntegrationConsumeSettingListParams, IntegrationConsumeSettingListItem } from './data.d';

// 添加积分消费设置
export async function addIntegrationConsumeSetting(params: IntegrationConsumeSettingListItem) {
  return request('/api/demo/integrationConsumeSetting/addIntegrationConsumeSetting', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 删除积分消费设置
export async function removeIntegrationConsumeSetting(ids: number[]) {
  return request('/api/demo/integrationConsumeSetting/deleteIntegrationConsumeSetting?ids=[' + ids + "]", {
    method: 'GET',
  });
}


// 更新积分消费设置
export async function updateIntegrationConsumeSetting(params: IntegrationConsumeSettingListItem) {
  return request('/api/demo/integrationConsumeSetting/updateIntegrationConsumeSetting', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 批量更新积分消费设置状态
export async function updateIntegrationConsumeSettingStatus(params: { integrationConsumeSettingIds: number[], integrationConsumeSettingStatus: number }) {
  return request('/api/demo/integrationConsumeSetting/updateIntegrationConsumeSettingStatus', {
    method: 'POST',
    data: {
      ...params,
    },

  });
}


// 查询积分消费设置详情
export async function queryIntegrationConsumeSettingDetail(id: number) {
  return request('/api/demo/integrationConsumeSetting/queryIntegrationConsumeSettingDetail?id=' + id, {
    method: 'GET',
  });
}

// 分页查询积分消费设置列表
export async function queryIntegrationConsumeSettingList(params: IntegrationConsumeSettingListParams) {

  return request('/api/demo/integrationConsumeSetting/queryIntegrationConsumeSettingList', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}
