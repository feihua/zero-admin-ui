export interface MemberTaskListItem {
    createBy: string; //创建者
    createTime: string; //创建时间
    id: number; //
    status: number; //状态：0->禁用；1->启用
    taskGrowth: number; //赠送成长值
    taskIntegral: number; //赠送积分
    taskName: string; //任务名称
    taskType: number; //任务类型：0->新手任务；1->日常任务
    updateBy: string; //更新者
    updateTime: string; //更新时间

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
    createBy?: string; //创建者
    createTime?: string; //创建时间
    id?: number; //
    status?: number; //状态：0->禁用；1->启用
    taskGrowth?: number; //赠送成长值
    taskIntegral?: number; //赠送积分
    taskName?: string; //任务名称
    taskType?: number; //任务类型：0->新手任务；1->日常任务
    updateBy?: string; //更新者
    updateTime?: string; //更新时间

    pageSize?: number;
    current?: number;
    filter?: { [key: string]: any[] };
    sorter?: { [key: string]: any };

}
