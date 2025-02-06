import {request} from 'umi';
import type {SysLogListParams} from './data.d';


// 删除操作日志
export async function removeOperateLog(ids: number[]) {
  return request('/api/sys/log/deleteOperateLog?ids=' + ids.join(','), {
    method: 'GET',
  });
}

// 查询操作日志详情
export async function queryOperateLogDetail(id: number ) {
  return request('/api/sys/log/queryOperateLogDetail', {
    method: 'GET',

  });
}


// 分页查询操作日志列表
export async function queryOperateLogList(params: SysLogListParams) {

  return request('/api/sys/log/queryOperateLogList', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}
