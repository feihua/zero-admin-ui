export interface ReturnApplyListItem {
  id: number;

}

export interface ReturnApplyListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface ReturnApplyListData {
  list: ReturnApplyListItem[];
  pagination: Partial<ReturnApplyListPagination>;
}

export interface ReturnApplyListParams {

  pageSize?: number;
  currentPage?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };

}
