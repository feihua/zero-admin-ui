export interface MenuListItem {
  id: number;
  status: number;
  visible: number;
  menuType?: number;
  menuName: string;
  parentId: number; //父id
  menuIcon: string; //菜单图标
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

}
