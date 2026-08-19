export interface MenuListItem {
  id: number; //主键
  menuName: string; //菜单名称
  ancestors: string; //祖级列表
  menuType: number; //菜单类型(1:目录,2:菜单,3:按钮)
  menuUrl: string; //路由路径
  menuIcon: string; //菜单图标
  menuSort: number; //排序
  parentId: number; //父id
  apiUrl: string; //接口url
  visible: number; //显示状态（0:隐藏,显示:1）
  status: number; //菜单状态(1:正常，0:禁用)
  delFlag: number; //删除标志（0:删除,1:存在）
  remark: string; //备注
  vuePath: string; //vue的path
  vueComponent: string; //vue的页面
  vueIcon: string; //vue的图标
  vueRedirect: string; //vue的路由重定向
  angularIcon: string; //angular的图标
  reactIcon: string; //antd react的图标
  createBy: string; //创建者
  createTime: string; //创建时间
  updateBy: string; //更新者
  updateTime: string; //更新时间

}

export interface MenuListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface MenuListData {
  list: MenuListItem[];
  pagination: Partial<MenuListPagination>;
}

export interface MenuListParams {
  pageSize?: number;
  current?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };
  menuName?: string; //菜单名称
  ancestors?: string; //祖级列表
  menuType?: number; //菜单类型(1:目录,2:菜单,3:按钮)
  menuUrl?: string; //路由路径
  menuIcon?: string; //菜单图标
  parentId?: number; //父id
  apiUrl?: string; //接口url
  visible?: number; //显示状态（0:隐藏,显示:1）
  status?: number; //菜单状态(1:正常，0:禁用)
  delFlag?: number; //删除标志（0:删除,1:存在）
  vuePath?: string; //vue的path
  vueComponent?: string; //vue的页面
  vueIcon?: string; //vue的图标
  vueRedirect?: string; //vue的路由重定向
  angularIcon?: string; //angular的图标
  reactIcon?: string; //antd react的图标
}
