export interface LoginLogListItem {
  id: number;
  loginStatus; string
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

  pageSize?: number;
  current?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };
}


export interface StatisticsLoginLog {
  dayLoginCount: number;
  weekLoginCount: number;
  monthLoginCount: number;
}
