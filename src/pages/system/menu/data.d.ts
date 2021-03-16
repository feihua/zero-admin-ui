export interface MenuListItem {
  id: number;
  disabled?: boolean;
  href: string;
  parent_id: number;
  name: string;
  owner: string;
  desc: string;
  callNo: number;
  status: number;
  updatedAt: Date;
  createdAt: Date;
  progress: number;
  type: number;
  order_num: number;
  title: string;
  url: string;
  icon: string;
  perms: string;
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
  id?: number;
  status?: string;
  name?: string;
  desc?: string;
  key?: number;
  pageSize?: number;
  currentPage?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };
  type?: number;
  order_num?: number;
  title?: string;
  url?: string;
  icon?: string;
  perms?: string;
  parent_id?: number;
}
