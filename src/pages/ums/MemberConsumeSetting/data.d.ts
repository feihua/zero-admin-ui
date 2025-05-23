export interface MemberConsumeSettingListItem {
    id: number; //
    deductionPerAmount: number; //每一元需要抵扣的积分数量
    maxPercentPerOrder: number; //每笔订单最高抵用百分比
    useUnit: number; //每次使用积分最小单位100
    couponStatus: number; //是否可以和优惠券同用；0->不可以；1->可以
    status: number; //状态：0->禁用；1->启用
    createBy: number; //创建人ID
    createTime: string; //创建时间
    updateBy: number; //更新人ID
    updateTime: string; //更新时间

}

export interface MemberConsumeSettingListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface MemberConsumeSettingListData {
  list: MemberConsumeSettingListItem[];
  pagination: Partial<MemberConsumeSettingListPagination>;
}

export interface MemberConsumeSettingListParams {
    id?: number; //
    deductionPerAmount?: number; //每一元需要抵扣的积分数量
    maxPercentPerOrder?: number; //每笔订单最高抵用百分比
    useUnit?: number; //每次使用积分最小单位100
    couponStatus?: number; //是否可以和优惠券同用；0->不可以；1->可以
    status?: number; //状态：0->禁用；1->启用
    createBy?: number; //创建人ID
    createTime?: string; //创建时间
    updateBy?: number; //更新人ID
    updateTime?: string; //更新时间

    pageSize?: number;
    current?: number;
    filter?: { [key: string]: any[] };
    sorter?: { [key: string]: any };

}
