export interface ProductListItem {
  id: number;

}

export interface PrefrenceAreaItem {
  id: number;
  name: string;
  subTitle: string;

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
  current?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };

}

export interface PrefrenceAreaParams {

  pageSize?: number;
  current?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };

}
