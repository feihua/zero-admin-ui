export interface MemberTagListItem {
    id: number; //主键ID
    tagName: string; //标签名称
    description: string; //标签描述
    finishOrderCount: number; //自动打标签完成订单数量
    finishOrderAmount: number; //自动打标签完成订单金额
    status: number; //状态：0-禁用，1-启用
    createBy: number; //创建人ID
    createTime: string; //创建时间
    updateBy: number; //更新人ID
    updateTime: string; //更新时间
    isDeleted: number; //是否删除

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
    id?: number; //主键ID
    tagName?: string; //标签名称
    description?: string; //标签描述
    finishOrderCount?: number; //自动打标签完成订单数量
    finishOrderAmount?: number; //自动打标签完成订单金额
    status?: number; //状态：0-禁用，1-启用
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
