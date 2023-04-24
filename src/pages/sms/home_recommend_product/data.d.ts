export interface RecommendProductListItem {
  id: number;
  productName: string;
}

export interface ProductListItem {
  id: number;

}

export interface RecommendProductListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface RecommendProductListData {
  list: RecommendProductListItem[];
  pagination: Partial<RecommendProductListPagination>;
}

export interface RecommendProductListParams {
  recommendStatus?: number;
  pageSize?: number;
  currentPage?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };
}
