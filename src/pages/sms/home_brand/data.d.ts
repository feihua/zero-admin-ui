export interface HomeBrandListItem {
  id: number;

}

export interface HomeBrandListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface HomeBrandListData {
  list: HomeBrandListItem[];
  pagination: Partial<HomeBrandListPagination>;
}

export interface HomeBrandListParams {

  pageSize?: number;
  currentPage?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };

}
