export interface MemberRuleSettingListItem {
    id: number; //
    consumePerPoint: number; //每消费多少元获取1个点
    lowOrderAmount: number; //最低获取点数的订单金额
    maxPointPerOrder: number; //每笔订单最高获取点数
    ruleType: number; //类型：0->积分规则；1->成长值规则
    status: number; //状态：0->禁用；1->启用
    createBy: number; //创建人ID
    createTime: string; //创建时间
    updateBy: number; //更新人ID
    updateTime: string; //更新时间

}

export interface MemberRuleSettingListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface MemberRuleSettingListData {
  list: MemberRuleSettingListItem[];
  pagination: Partial<MemberRuleSettingListPagination>;
}

export interface MemberRuleSettingListParams {
    id?: number; //
    consumePerPoint?: number; //每消费多少元获取1个点
    lowOrderAmount?: number; //最低获取点数的订单金额
    maxPointPerOrder?: number; //每笔订单最高获取点数
    ruleType?: number; //类型：0->积分规则；1->成长值规则
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
