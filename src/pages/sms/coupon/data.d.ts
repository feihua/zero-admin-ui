export interface CouponListItem {
  id: number;
  name: string;
  enableTime: string;
  startTime: string;
  endTime: string;
  amount: number;
  minPoint: number;

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
  type?: number;
  platform?: number;
  useType?: number;
  pageSize?: number;
  currentPage?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };

}
