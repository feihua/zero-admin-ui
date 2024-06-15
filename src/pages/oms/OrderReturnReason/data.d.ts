export interface OrderReturnReasonListItem {
    createTime: string; //创建时间
    id: number; //
    name: string; //退货类型
    sort: number; //排序
    status: number; //状态：0->不启用；1->启用

}

export interface OrderReturnReasonListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface OrderReturnReasonListData {
  list: OrderReturnReasonListItem[];
  pagination: Partial<OrderReturnReasonListPagination>;
}

export interface OrderReturnReasonListParams {
    createTime?: string; //创建时间
    id?: number; //
    name?: string; //退货类型
    sort?: number; //排序
    status?: number; //状态：0->不启用；1->启用

    pageSize?: number;
    current?: number;
    filter?: { [key: string]: any[] };
    sorter?: { [key: string]: any };

}
