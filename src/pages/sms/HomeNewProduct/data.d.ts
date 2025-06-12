export interface HomeNewProductListItem {
  id: number;
  productId: number;
  recommendStatus: number;
  name: string;
}

export interface ProductListItem {
  id: number;

}

export interface HomeNewProductListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface HomeNewProductListData {
  list: HomeNewProductListItem[];
  pagination: Partial<HomeNewProductListPagination>;
}

export interface HomeNewProductListParams {
  recommendStatus?: number;
  pageSize?: number;
  currentPage?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };
}
