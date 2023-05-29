export interface AttributeListItem {
  id: number;

}

export interface AttributeListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface AttributeListData {
  list: AttributeListItem[];
  pagination: Partial<AttributeListPagination>;
}

export interface AttributeListParams {

  pageSize?: number;
  currentPage?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };

}
