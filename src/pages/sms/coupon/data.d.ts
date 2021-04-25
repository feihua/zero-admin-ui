export interface CouponListItem {
  id: number;

}

export interface CouponListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface CouponListData {
  list: CouponListItem[];
  pagination: Partial<CouponListPagination>;
}

export interface CouponListParams {

  pageSize?: number;
  currentPage?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };

}
