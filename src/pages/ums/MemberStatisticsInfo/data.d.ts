export interface MemberStatisticsInfoListItem {
    id: number; //
    memberId: number; //
    consumeAmount: number; //累计消费金额
    orderCount: number; //订单数量
    couponCount: number; //优惠券数量
    commentCount: number; //评价数
    returnOrderCount: number; //退货数量
    loginCount: number; //登录次数
    attendCount: number; //关注数量
    fansCount: number; //粉丝数量
    collectProductCount: number; //收藏的商品数量
    collectSubjectCount: number; //收藏的专题活动数量
    collectTopicCount: number; //收藏的评论数量
    collectCommentCount: number; //收藏的专题活动数量
    inviteFriendCount: number; //邀请好友数
    recentOrderTime: string; //最后一次下订单时间

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
    id?: number; //
    memberId?: number; //
    consumeAmount?: number; //累计消费金额
    orderCount?: number; //订单数量
    couponCount?: number; //优惠券数量
    commentCount?: number; //评价数
    returnOrderCount?: number; //退货数量
    loginCount?: number; //登录次数
    attendCount?: number; //关注数量
    fansCount?: number; //粉丝数量
    collectProductCount?: number; //收藏的商品数量
    collectSubjectCount?: number; //收藏的专题活动数量
    collectTopicCount?: number; //收藏的评论数量
    collectCommentCount?: number; //收藏的专题活动数量
    inviteFriendCount?: number; //邀请好友数
    recentOrderTime?: string; //最后一次下订单时间

    pageSize?: number;
    current?: number;
    filter?: { [key: string]: any[] };
    sorter?: { [key: string]: any };

}
