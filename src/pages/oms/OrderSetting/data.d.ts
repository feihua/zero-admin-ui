export interface OrderSettingListItem {
    commentOvertime: number; //订单完成后自动好评时间（天）
    confirmOvertime: number; //发货后自动确认收货时间（天）
    finishOvertime: number; //自动完成交易时间，不能申请售后（天）
    flashOrderOvertime: number; //秒杀订单超时关闭时间(分)
    id: number; //
    isDefault: number; //是否默认：0->否；1->是
    normalOrderOvertime: number; //正常订单超时时间(分)
    status: number; //状态：0->禁用；1->启用

}

export interface OrderSettingListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface OrderSettingListData {
  list: OrderSettingListItem[];
  pagination: Partial<OrderSettingListPagination>;
}

export interface OrderSettingListParams {
    commentOvertime?: number; //订单完成后自动好评时间（天）
    confirmOvertime?: number; //发货后自动确认收货时间（天）
    finishOvertime?: number; //自动完成交易时间，不能申请售后（天）
    flashOrderOvertime?: number; //秒杀订单超时关闭时间(分)
    id?: number; //
    isDefault?: number; //是否默认：0->否；1->是
    normalOrderOvertime?: number; //正常订单超时时间(分)
    status?: number; //状态：0->禁用；1->启用

    pageSize?: number;
    current?: number;
    filter?: { [key: string]: any[] };
    sorter?: { [key: string]: any };

}
