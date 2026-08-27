export interface TopicListItem {
  id: number; //主键id
  categoryId: number; //关联分类id
  name: string; //话题名称
  startTime: string; //话题开始时间
  endTime: string; //话题结束时间
  attendCount: number; //参与人数
  attentionCount: number; //关注人数
  readCount: number; //阅读数
  awardName: string; //奖品名称
  attendType: string; //参与方式
  content: string; //话题内容
  createBy: string; //创建者
  createTime: string; //创建时间
  updateBy: string; //更新者
  updateTime: string; //更新时间

}

export interface TopicListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface TopicListData {
  list: TopicListItem[];
  pagination: Partial<TopicListPagination>;
}

export interface TopicListParams {
  pageSize?: number;
  current?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };
  categoryId?: number; //关联分类id
  name?: string; //话题名称
  startTime?: string; //话题开始时间
  endTime?: string; //话题结束时间
  attendCount?: number; //参与人数
  attentionCount?: number; //关注人数
  readCount?: number; //阅读数
  awardName?: string; //奖品名称
  attendType?: string; //参与方式
  content?: string; //话题内容
}
