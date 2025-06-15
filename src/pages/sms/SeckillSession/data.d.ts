export interface SeckillSessionListItem {
    id: number; //秒杀场次ID
    name: string; //场次名称
    startTime: string; //开始时间
    endTime: string; //结束时间
    status: number; //状态：0-禁用，1-启用
    sort: number; //排序
    createBy: number; //创建人ID
    createTime: string; //创建时间
    updateBy: number; //更新人ID
    updateTime: string; //更新时间
    isDeleted: number; //是否删除

}

export interface SeckillSessionListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface SeckillSessionListData {
  list: SeckillSessionListItem[];
  pagination: Partial<SeckillSessionListPagination>;
}

export interface SeckillSessionListParams {
    id?: number; //秒杀场次ID
    name?: string; //场次名称
    startTime?: string; //开始时间
    endTime?: string; //结束时间
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
