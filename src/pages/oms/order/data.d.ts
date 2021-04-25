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
  pageSize?: number;
  currentPage?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };

}
