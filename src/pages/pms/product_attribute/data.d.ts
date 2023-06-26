export interface AttributeListItem {
  id: number;
  type: number;
  name: string;
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

  type?: number;
  pageSize?: number;
  currentPage?: number;
  productAttributeCategoryId?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };

}
