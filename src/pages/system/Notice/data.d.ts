export interface NoticeListItem {
  id: number; //公告id
  noticeTitle: string; //公告标题
  noticeType: number; //公告类型（1:通知,2:公告）
  noticeContent: string; //公告内容
  status: number; //公告状态（0:关闭,1:正常 ）
  remark: string; //备注
  delFlag: number; //删除标志（0:删除,1:存在）
  createBy: string; //创建者
  createTime: string; //创建时间
  updateBy: string; //更新者
  updateTime: string; //更新时间

}

export interface NoticeListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface NoticeListData {
  list: NoticeListItem[];
  pagination: Partial<NoticeListPagination>;
}

export interface NoticeListParams {
  pageSize?: number;
  current?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };
  noticeTitle?: string; //公告标题
  noticeType?: number; //公告类型（1:通知,2:公告）
  status?: number; //公告状态（0:关闭,1:正常 ）
}
