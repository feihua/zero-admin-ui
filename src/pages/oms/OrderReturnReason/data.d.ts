export interface OrderReturnReasonListItem {
    id: number; //主键ID
    name: string; //退货类型
    sort: number; //排序
    status: number; //状态：0->不启用；1->启用
    createBy: number; //创建人ID
    createTime: string; //创建时间
    updateBy: number; //更新人ID
    updateTime: string; //更新时间
    isDeleted: number; //是否删除

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
    id?: number; //主键ID
    name?: string; //退货类型
    sort?: number; //排序
    status?: number; //状态：0->不启用；1->启用
    createBy?: number; //创建人ID
    createTime?: string; //创建时间
    updateBy?: number; //更新人ID
    updateTime?: string; //更新时间
    isDeleted?: number; //是否删除

    pageSize?: number;
    current?: number;
    filter?: { [key: string]: any[] };
    sorter?: { [key: string]: any };

}
