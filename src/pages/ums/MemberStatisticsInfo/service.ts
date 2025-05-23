import {request} from 'umi';
import type { MemberStatisticsInfoListParams } from './data.d';


// 查询会员统计信息详情
export async function queryMemberStatisticsInfoDetail(id: number) {
  return request('/api/ums/statistics/queryMemberStatisticsInfoDetail?id=' + id, {
    method: 'GET',
  });
}

// 分页查询会员统计信息列表
export async function queryMemberStatisticsInfoList(params: MemberStatisticsInfoListParams) {

  return request('/api/ums/statistics/queryMemberStatisticsInfoList', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}
