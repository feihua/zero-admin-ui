export interface MemberTagListItem {
    finishOrderAmount: number; //自动打标签完成订单金额
    finishOrderCount: number; //自动打标签完成订单数量
    id: number; //
    status: number; //状态：0->禁用；1->启用
    tagName: string; //标签名称

}

export interface MemberTagListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface MemberTagListData {
  list: MemberTagListItem[];
  pagination: Partial<MemberTagListPagination>;
}

export interface MemberTagListParams {
    finishOrderAmount?: number; //自动打标签完成订单金额
    finishOrderCount?: number; //自动打标签完成订单数量
    id?: number; //
    status?: number; //状态：0->禁用；1->启用
    tagName?: string; //标签名称

    pageSize?: number;
    current?: number;
    filter?: { [key: string]: any[] };
    sorter?: { [key: string]: any };

}
