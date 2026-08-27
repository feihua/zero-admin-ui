export interface TopicCommentListItem {
  id: number; //主键id
  memberNickName: string; //评论人员昵称
  topicId: number; //专题id
  memberIcon: string; //评论人员头像
  content: string; //评论内容
  createTime: string; //评论时间
  showStatus: number; //是否显示，0->不显示；1->显示

}

export interface TopicCommentListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface TopicCommentListData {
  list: TopicCommentListItem[];
  pagination: Partial<TopicCommentListPagination>;
}

export interface TopicCommentListParams {
  pageSize?: number;
  current?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };
  memberNickName?: string; //评论人员昵称
  topicId?: number; //专题id
  memberIcon?: string; //评论人员头像
  content?: string; //评论内容
  showStatus?: number; //是否显示，0->不显示；1->显示
}
