export interface ProductListItem {
  id: number;

}

export interface ProductListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface ProductListData {
  list: ProductListItem[];
  pagination: Partial<ProductListPagination>;
}

export interface ProductListParams {

  pageSize?: number;
  currentPage?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };

}
