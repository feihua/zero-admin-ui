export interface MemberTaskListItem {
    id: number; //主键ID
    taskName: string; //任务名称
    taskDesc: string; //任务描述
    taskGrowth: number; //赠送成长值
    taskIntegral: number; //赠送积分
    taskType: number; //任务类型：0-新手任务，1-日常任务，2-周常任务，3-月常任务
    completeCount: number; //需要完成次数
    rewardType: number; //奖励类型：0-积分成长值，1-优惠券，2-抽奖次数
    rewardParams: string; //奖励参数JSON
    startTime: string; //任务开始时间
    endTime: string; //任务结束时间
    status: number; //状态：0-禁用，1-启用
    sort: number; //排序
    createBy: number; //创建人ID
    createTime: string; //创建时间
    updateBy: number; //更新人ID
    updateTime: string; //更新时间
    isDeleted: number; //是否删除

}

export interface MemberTaskListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface MemberTaskListData {
  list: MemberTaskListItem[];
  pagination: Partial<MemberTaskListPagination>;
}

export interface MemberTaskListParams {
    id?: number; //主键ID
    taskName?: string; //任务名称
    taskDesc?: string; //任务描述
    taskGrowth?: number; //赠送成长值
    taskIntegral?: number; //赠送积分
    taskType?: number; //任务类型：0-新手任务，1-日常任务，2-周常任务，3-月常任务
    completeCount?: number; //需要完成次数
    rewardType?: number; //奖励类型：0-积分成长值，1-优惠券，2-抽奖次数
    rewardParams?: string; //奖励参数JSON
    startTime?: string; //任务开始时间
    endTime?: string; //任务结束时间
    status?: number; //状态：0-禁用，1-启用
    sort?: number; //排序
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
