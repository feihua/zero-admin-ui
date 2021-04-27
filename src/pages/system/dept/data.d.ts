export interface DeptListItem {
  id: number;
  orderNum: number;

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

  pageSize?: number;
  current?: number;
  currentPage?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };

}
