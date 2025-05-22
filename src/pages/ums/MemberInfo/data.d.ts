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

export interface AddressListItem {
  id: number; //主键ID
  memberId: number; //会员ID
  receiverName: string; //收货人姓名
  receiverPhone: string; //收货人电话
  province: string; //省份
  city: string; //城市
  district: string; //区县
  detailAddress: string; //详细地址
  postalCode: string; //邮政编码
  tag: string; //地址标签：家、公司等
  isDefault: number; //是否默认地址
  createTime: string; //创建时间
  updateTime: string; //更新时间
  isDeleted: number; //是否删除

}

export interface AddressListParams {
  memberId: number;
  pageSize?: number;
  currentPage?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };

}

export interface LoginLogListItem {
  id: number; //
  memberId: number; //会员id
  memberIp: string; //登录ip
  city: string; //登录城市
  loginType: number; //登录类型：0->PC；1->android;2->ios;3->小程序
  province: string; //登录省份
  createTime: string; //登录时间

}


export interface LoginLogListParams {
  memberId?: number;
  pageSize?: number;
  currentPage?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };

}
export interface MemberGrowthLogListItem {
  id: number; //
  memberId: number; //会员ID
  changeType: number; //变更类型：1-添加成长值，2-减少成长值
  changeGrowth: number; //变更成长值
  sourceType: number; //来源类型：0-其他，1-订单，2-活动，3-签到，4-管理员修改
  description: string; //描述
  operateMan: string; //操作人员
  operateNote: string; //操作备注
  createTime: string; //创建时间

}

export interface MemberGrowthLogListParams {
  id?: number; //
  memberId?: number; //会员ID
  changeType?: number; //变更类型：1-添加成长值，2-减少成长值
  changeGrowth?: number; //变更成长值
  sourceType?: number; //来源类型：0-其他，1-订单，2-活动，3-签到，4-管理员修改
  description?: string; //描述
  operateMan?: string; //操作人员
  operateNote?: string; //操作备注
  createTime?: string; //创建时间

  pageSize?: number;
  current?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };

}

export interface MemberPointsLogListItem {
  id: number; //
  memberId: number; //会员ID
  changeType: number; //变更类型：1-添加积分，2-减少积分
  changePoints: number; //变更积分
  sourceType: number; //来源类型：0-其他，1-订单，2-活动，3-签到，4-管理员修改
  description: string; //描述
  operateMan: string; //操作人员
  operateNote: string; //操作备注
  createTime: string; //创建时间

}

export interface MemberPointsLogListParams {
  id?: number; //
  memberId?: number; //会员ID
  changeType?: number; //变更类型：1-添加积分，2-减少积分
  changePoints?: number; //变更积分
  sourceType?: number; //来源类型：0-其他，1-订单，2-活动，3-签到，4-管理员修改
  description?: string; //描述
  operateMan?: string; //操作人员
  operateNote?: string; //操作备注
  createTime?: string; //创建时间

  pageSize?: number;
  current?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };

}
export interface MemberSignLogListItem {
  id: number; //
  memberId: number; //会员ID
  signDate: string; //签到日期
  continueDays: number; //连续签到天数
  points: number; //获得积分
  createTime: string; //

}

export interface MemberSignLogListParams {
  id?: number; //
  memberId?: number; //会员ID
  signDate?: string; //签到日期
  continueDays?: number; //连续签到天数
  points?: number; //获得积分
  createTime?: string; //

  pageSize?: number;
  current?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };

}
