export interface MemberStatisticsInfoListItem {
    attendCount: number; //关注数量
    collectCommentCount: number; //
    collectProductCount: number; //
    collectSubjectCount: number; //
    collectTopicCount: number; //
    commentCount: number; //评价数
    consumeAmount: number; //累计消费金额
    couponCount: number; //优惠券数量
    fansCount: number; //粉丝数量
    id: number; //
    inviteFriendCount: number; //
    loginCount: number; //登录次数
    memberId: number; //
    orderCount: number; //订单数量
    recentOrderTime: string; //最后一次下订单时间
    returnOrderCount: number; //退货数量

}

export interface MemberStatisticsInfoListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface MemberStatisticsInfoListData {
  list: MemberStatisticsInfoListItem[];
  pagination: Partial<MemberStatisticsInfoListPagination>;
}

export interface MemberStatisticsInfoListParams {
    attendCount?: number; //关注数量
    collectCommentCount?: number; //
    collectProductCount?: number; //
    collectSubjectCount?: number; //
    collectTopicCount?: number; //
    commentCount?: number; //评价数
    consumeAmount?: number; //累计消费金额
    couponCount?: number; //优惠券数量
    fansCount?: number; //粉丝数量
    id?: number; //
    inviteFriendCount?: number; //
    loginCount?: number; //登录次数
    memberId?: number; //
    orderCount?: number; //订单数量
    recentOrderTime?: string; //最后一次下订单时间
    returnOrderCount?: number; //退货数量

    pageSize?: number;
    current?: number;
    filter?: { [key: string]: any[] };
    sorter?: { [key: string]: any };

}
