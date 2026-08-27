export interface SubjectCommentListItem {
  id: number; //编号
  subjectId: number; //关联专题id
  memberNickName: string; //关联会员昵称
  memberIcon: string; //会员头像
  content: string; //评论内容
  createTime: string; //创建时间
  showStatus: number; //是否显示，0->不显示；1->显示

}

export interface SubjectCommentListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface SubjectCommentListData {
  list: SubjectCommentListItem[];
  pagination: Partial<SubjectCommentListPagination>;
}

export interface SubjectCommentListParams {
  pageSize?: number;
  current?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };
  subjectId?: number; //关联专题id
  memberNickName?: string; //关联会员昵称
  memberIcon?: string; //会员头像
  content?: string; //评论内容
  showStatus?: number; //是否显示，0->不显示；1->显示
}
