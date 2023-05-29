export interface AttributeCategoryListItem {
  id: number;
  name: string;
}

export interface AttributeCategoryListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface AttributeCategoryListData {
  list: AttributeCategoryListItem[];
  pagination: Partial<AttributeCategoryListPagination>;
}

export interface AttributeCategoryListParams {

  pageSize?: number;
  current?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };

}
