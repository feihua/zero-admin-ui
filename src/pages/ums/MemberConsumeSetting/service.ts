import {request} from 'umi';
import type { MemberConsumeSettingListParams, MemberConsumeSettingListItem } from './data.d';

// 添加积分消费设置
export async function addMemberConsumeSetting(params: MemberConsumeSettingListItem) {
  return request('/api/ums/consumeSetting/addMemberConsumeSetting', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 删除积分消费设置
export async function removeMemberConsumeSetting(id: number) {
  return request('/api/ums/consumeSetting/deleteMemberConsumeSetting?id=' + id, {
    method: 'GET',
  });
}


// 更新积分消费设置
export async function updateMemberConsumeSetting(params: MemberConsumeSettingListItem) {
  return request('/api/ums/consumeSetting/updateMemberConsumeSetting', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 更新积分消费状态
export async function updateStatus(params: { id: number, status: number }) {
  return request('/api/ums/consumeSetting/updateStatus', {
    method: 'POST',
    data: {
      ...params,
    },

  });
}

// 更新更新是否可以和优惠券同用
export async function updateCouponStatus(params: { id: number, couponStatus: number }) {
  return request('/api/ums/consumeSetting/updateCouponStatus', {
    method: 'POST',
    data: {
      ...params,
    },

  });
}


// 查询积分消费设置详情
export async function queryMemberConsumeSettingDetail(id: number) {
  return request('/api/ums/consumeSetting/queryMemberConsumeSettingDetail?id=' + id, {
    method: 'GET',
  });
}

// 分页查询积分消费设置列表
export async function queryMemberConsumeSettingList(params: MemberConsumeSettingListParams) {

  return request('/api/ums/consumeSetting/queryMemberConsumeSettingList', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}
