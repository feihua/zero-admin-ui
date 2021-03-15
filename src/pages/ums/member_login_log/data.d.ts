export interface LoginLogListItem {
  id: number;
  disabled?: boolean;
  href: string;
  name: string;
  owner: string;
  desc: string;
  callNo: number;
  status: number;
  updatedAt: Date;
  createdAt: Date;
  progress: number;
  nick_name: string;
  mobile: string;
  email: string;
  dept_id: string;
  role_id: string;
}

export interface LoginLogListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface LoginLogListData {
  list: LoginLogListItem[];
  pagination: Partial<LoginLogListPagination>;
}

export interface LoginLogListParams {
  status?: number;
  name?: string;
  desc?: string;
  id?: number;
  pageSize?: number;
  currentPage?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };
  nick_name?: string;
  mobile?: string;
  email?: string;
  dept_id?: string;
  role_id?: string;
}
