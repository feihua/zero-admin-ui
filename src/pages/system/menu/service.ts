import {request} from 'umi';
import type {MenuListItem, MenuListParams} from './data.d';

// 添加菜单信息
export async function addMenu(params: MenuListItem) {
  params.menuType = params.parentId === 1 ? 1 : 2
  if (params.menuIcon === '') {
    params.menuIcon = " menuIcon: string; //菜单图标"
  }
  return request('/api/sys/menu/addMenu', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 删除菜单信息
export async function removeMenu(id: number) {
  return request('/api/sys/menu/deleteMenu?ids=' + id, {
    method: 'GET',
  });
}


// 更新菜单信息
export async function updateMenu(params: MenuListItem) {
  params.menuType = params.parentId === 1 ? 1 : 2
  if (params.menuIcon === '') {
    params.menuIcon = " menuIcon: string; //菜单图标"
  }
  return request('/api/sys/menu/updateMenu', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 批量更新菜单信息状态
export async function updateMenuStatus(params: { menuId: number, menuStatus: number }) {
  return request('/api/sys/menu/updateMenuStatus', {
    method: 'POST',
    data: {
      ...params,
    },

  });
}


// 查询菜单信息详情
export async function queryMenuDetail(menuId: number) {
  return request('/api/sys/menu/queryMenuDetail?id=' + menuId, {
    method: 'GET',

  });
}

// 分页查询菜单信息列表
export async function queryMenuList(params: MenuListParams) {

  return request('/api/sys/menu/queryMenuList', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}
