export interface MemberRuleSettingListItem {
    consumePerPoint: number; //每消费多少元获取1个点
    continueSignDay: number; //连续签到天数
    continueSignPoint: number; //连续签到赠送数量
    createBy: string; //创建者
    createTime: string; //创建时间
    id: number; //
    lowOrderAmount: number; //最低获取点数的订单金额
    maxPointPerOrder: number; //每笔订单最高获取点数
    ruleType: number; //类型：0->积分规则；1->成长值规则
    status: number; //状态：0->禁用；1->启用
    updateBy: string; //更新者
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
    consumePerPoint?: number; //每消费多少元获取1个点
    continueSignDay?: number; //连续签到天数
    continueSignPoint?: number; //连续签到赠送数量
    createBy?: string; //创建者
    createTime?: string; //创建时间
    id?: number; //
    lowOrderAmount?: number; //最低获取点数的订单金额
    maxPointPerOrder?: number; //每笔订单最高获取点数
    ruleType?: number; //类型：0->积分规则；1->成长值规则
    status?: number; //状态：0->禁用；1->启用
    updateBy?: string; //更新者
    updateTime?: string; //更新时间

    pageSize?: number;
    current?: number;
    filter?: { [key: string]: any[] };
    sorter?: { [key: string]: any };

}
