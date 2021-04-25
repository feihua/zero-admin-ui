export interface LoginLogListItem {
  id: number;

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
  currentPage?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };

}
