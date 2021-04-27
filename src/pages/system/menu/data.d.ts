export interface MenuListItem {
  id: number;
  orderNum: number;
  type: number;

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
  currentPage?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };

}
