import {request} from 'umi';
import type {DeptListParams, DeptListItem} from './data.d';

// 添加部门信息
export async function addDept(params: DeptListItem) {
  if (params.parentIds) {
    params.parentId = params.parentIds.at(-1)
  }
  return request('/api/sys/dept/addDept', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

//

// 删除部门信息
export async function removeDept(ids: number[]) {
  return request('/api/sys/dept/deleteDept?ids=' + ids.join(','), {
    method: 'GET',
  });
}


// 更新部门信息
export async function updateDept(params: DeptListItem) {
  if (params.parentIds) {
    params.parentId = params.parentIds.at(-1)
  }
  return request('/api/sys/dept/updateDept', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 批量更新部门信息状态
export async function updateDeptStatus(params: { deptIds: number[], postStatus: number }) {
  return request('/api/sys/dept/updateDeptStatus', {
    method: 'POST',
    data: {
      ...params,
    },

  });
}


// 查询部门信息详情
export async function queryDeptDetail(id: number ) {
  return request('/api/sys/dept/queryDeptDetail', {
    method: 'GET',
  });
}

// 分页查询部门信息列表
export async function queryDeptList(params: DeptListParams) {

  return request('/api/sys/dept/queryDeptList', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}
