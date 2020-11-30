export interface TableListItem {
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

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface TableListData {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
}

export interface TableListParams {
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
