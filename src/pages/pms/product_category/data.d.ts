export interface CategoryListItem {
  id: number;

}

export interface CategoryListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface CategoryListData {
  list: CategoryListItem[];
  pagination: Partial<CategoryListPagination>;
}

export interface CategoryListParams {

  parentId?: number;
  pageSize?: number;
  currentPage?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };

}
