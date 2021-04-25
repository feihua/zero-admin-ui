export interface HomeAdvertiseListItem {
  id: number;

}

export interface HomeAdvertiseListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface HomeAdvertiseListData {
  list: HomeAdvertiseListItem[];
  pagination: Partial<HomeAdvertiseListPagination>;
}

export interface HomeAdvertiseListParams {

  pageSize?: number;
  currentPage?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };

}
