export interface OrderListItem {
  id: number;

}

export interface OrderListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface OrderListData {
  list: OrderListItem[];
  pagination: Partial<OrderListPagination>;
}

export interface OrderListParams {
  payType?: number;
  sourceType?: number;
  status?: number;
  orderType?: number;
  pageSize?: number;
  current?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };

}
