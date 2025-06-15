export interface SeckillActivityListItem {
    id: number; //编号
    name: string; //活动名称
    description: string; //活动描述
    startTime: string; //开始时间
    endTime: string; //结束时间
    status: number; //活动状态：0-未开始，1-进行中，2-已结束，3-已取消
    isEnabled: number; //是否启用
    createBy: number; //创建人ID
    createTime: string; //创建时间
    updateBy: number; //更新人ID
    updateTime: string; //更新时间
    isDeleted: number; //是否删除

}

export interface SeckillActivityListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface SeckillActivityListData {
  list: SeckillActivityListItem[];
  pagination: Partial<SeckillActivityListPagination>;
}

export interface SeckillActivityListParams {
    id?: number; //编号
    name?: string; //活动名称
    description?: string; //活动描述
    startTime?: string; //开始时间
    endTime?: string; //结束时间
    status?: number; //活动状态：0-未开始，1-进行中，2-已结束，3-已取消
    isEnabled?: number; //是否启用
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
