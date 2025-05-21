export interface MemberInfoListItem {
    id: number; //主键ID
    memberId: number; //会员ID
    levelId: number; //等级ID
    nickname: string; //昵称
    mobile: string; //手机号码
    source: number; //注册来源：0-PC，1-APP，2-小程序
    password: string; //密码
    avatar: string; //头像
    signature: string; //个性签名
    gender: number; //性别：0-未知，1-男，2-女
    birthday: string; //生日
    growthPoint: number; //成长值
    points: number; //积分
    totalPoints: number; //累计获得积分
    spendAmount: number; //累计消费金额
    orderCount: number; //订单数
    couponCount: number; //优惠券数量
    commentCount: number; //评价数
    returnCount: number; //退货数
    lotteryTimes: number; //剩余抽奖次数
    lastLogin: string; //最后登录
    isEnabled: number; //是否启用：0-禁用，1-启用
    createTime: string; //创建时间
    updateTime: string; //更新时间
    isDeleted: number; //是否删除

}

export interface MemberInfoListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface MemberInfoListData {
  list: MemberInfoListItem[];
  pagination: Partial<MemberInfoListPagination>;
}

export interface MemberInfoListParams {
    id?: number; //主键ID
    memberId?: number; //会员ID
    levelId?: number; //等级ID
    nickname?: string; //昵称
    mobile?: string; //手机号码
    source?: number; //注册来源：0-PC，1-APP，2-小程序
    password?: string; //密码
    avatar?: string; //头像
    signature?: string; //个性签名
    gender?: number; //性别：0-未知，1-男，2-女
    birthday?: string; //生日
    growthPoint?: number; //成长值
    points?: number; //积分
    totalPoints?: number; //累计获得积分
    spendAmount?: number; //累计消费金额
    orderCount?: number; //订单数
    couponCount?: number; //优惠券数量
    commentCount?: number; //评价数
    returnCount?: number; //退货数
    lotteryTimes?: number; //剩余抽奖次数
    lastLogin?: string; //最后登录
    isEnabled?: number; //是否启用：0-禁用，1-启用
    createTime?: string; //创建时间
    updateTime?: string; //更新时间
    isDeleted?: number; //是否删除

    pageSize?: number;
    current?: number;
    filter?: { [key: string]: any[] };
    sorter?: { [key: string]: any };

}
