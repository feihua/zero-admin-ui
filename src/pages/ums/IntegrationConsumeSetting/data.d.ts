export interface IntegrationConsumeSettingListItem {
    couponStatus: number; //是否可以和优惠券同用；0->不可以；1->可以
    deductionPerAmount: number; //每一元需要抵扣的积分数量
    id: number; //
    isDefault: number; //是否默认：0->否；1->是
    maxPercentPerOrder: number; //每笔订单最高抵用百分比
    useUnit: number; //每次使用积分最小单位100

}

export interface IntegrationConsumeSettingListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface IntegrationConsumeSettingListData {
  list: IntegrationConsumeSettingListItem[];
  pagination: Partial<IntegrationConsumeSettingListPagination>;
}

export interface IntegrationConsumeSettingListParams {
    couponStatus?: number; //是否可以和优惠券同用；0->不可以；1->可以
    deductionPerAmount?: number; //每一元需要抵扣的积分数量
    id?: number; //
    isDefault?: number; //是否默认：0->否；1->是
    maxPercentPerOrder?: number; //每笔订单最高抵用百分比
    useUnit?: number; //每次使用积分最小单位100

    pageSize?: number;
    current?: number;
    filter?: { [key: string]: any[] };
    sorter?: { [key: string]: any };

}
