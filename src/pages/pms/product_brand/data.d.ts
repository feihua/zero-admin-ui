export interface BrandListItem {
  id: number;

}

export interface BrandListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface BrandListData {
  list: BrandListItem[];
  pagination: Partial<BrandListPagination>;
}

export interface BrandListParams {

  pageSize?: number;
  currentPage?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };

}
