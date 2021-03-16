export interface DeptListItem {
  id: number;
  disabled?: boolean;
  href: string;
  avatar: string;
  name: string;
  owner: string;
  desc: string;
  callNo: number;
  status: number;
  updatedAt: Date;
  createdAt: Date;
  progress: number;
  title: string;
  parent_id: number;
  order_num: number;
}

export interface DeptListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface DeptListData {
  list: DeptListItem[];
  pagination: Partial<DeptListPagination>;
}

export interface DeptListParams {
  status?: string;
  name?: string;
  desc?: string;
  id?: number;
  pageSize?: number;
  currentPage?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };
  parent_id?: number;
  order_num?: number;
}
