import {request} from 'umi';
import type { MemberStatisticsInfoListParams } from './data.d';

// 分页查询会员统计信息列表
export async function queryMemberStatisticsInfoList(params: MemberStatisticsInfoListParams) {

  return request('/api/ums/statistics/queryMemberStatisticsInfoList', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}
