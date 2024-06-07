import CouponDetailForm from "@/pages/sms/coupon/components/CouponDetailForm";

export interface CouponListItem {
  id: number;
  name: string;
  enableTime: string;
  startTime: string;
  endTime: string;
  amount: number;
  minPoint: number;
  productCategoryRelationList: any[]
  productRelationList: any[]
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
  /** 当前的页码 */
  current?: number;
  /** 页面的容量 */
  pageSize?: number;
}

export interface ProductListItem {
  id: number;

}

export interface CategoryListItem {
  id: number;

}

export interface CategoryListParams {

  parentId?: number;
  pageSize?: number;
  currentPage?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };

}
export interface CouponHistoryListItem {
  id: number;
  useStatus: number;
  getType: number;

}

export interface CouponHistoryListParams {
  id: number;
  useStatus: number;

}

export interface CouponDetailData {
  id:                          number;
  type:                        number;
  name:                        string;
  platform:                    number;
  count:                       number;
  amount:                      number;
  perLimit:                    number;
  minPoint:                    number;
  startTime:                   string;
  endTime:                     string;
  useType:                     number;
  note:                        string;
  publishCount:                number;
  useCount:                    number;
  receiveCount:                number;
  enableTime:                  string;
  code:                        string;
  memberLevel:                 number;
}

