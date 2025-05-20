export interface MemberLevelListItem {
    id: number; //主键ID
    name: string; //等级名称
    level: number; //等级
    growthPoint: number; //升级所需成长值
    discountRate: number; //折扣率(0-100)
    freeFreight: number; //是否免运费
    commentExtra: number; //是否可评论获取奖励
    privileges: string; //会员特权JSON
    remark: string; //备注
    isEnabled: number; //是否启用
    createBy: number; //创建人ID
    createTime: string; //创建时间
    updateBy: number; //更新人ID
    updateTime: string; //更新时间
    isDeleted: number; //是否删除

}

export interface MemberLevelListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface MemberLevelListData {
  list: MemberLevelListItem[];
  pagination: Partial<MemberLevelListPagination>;
}

export interface MemberLevelListParams {
    id?: number; //主键ID
    name?: string; //等级名称
    level?: number; //等级
    growthPoint?: number; //升级所需成长值
    discountRate?: number; //折扣率(0-100)
    freeFreight?: number; //是否免运费
    commentExtra?: number; //是否可评论获取奖励
    privileges?: string; //会员特权JSON
    remark?: string; //备注
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
