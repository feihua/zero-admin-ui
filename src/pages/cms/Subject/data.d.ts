export interface SubjectListItem {
  id: number; //专题id
  categoryId: number; //专题分类id
  title: string; //专题标题
  pic: string; //专题主图
  productCount: number; //关联产品数量
  recommendStatus: number; //推荐状态：0->不推荐；1->推荐
  collectCount: number; //收藏数
  readCount: number; //阅读数
  commentCount: number; //评论数
  albumPics: string; //画册图片用逗号分割
  description: string; //专题内容
  showStatus: number; //显示状态：0->不显示；1->显示
  content: string; //专题内容
  forwardCount: number; //转发数
  categoryName: string; //专题分类名称
  sort: number; //排序
  createBy: string; //创建者
  createTime: string; //创建时间
  updateBy: string; //更新者
  updateTime: string; //更新时间

}

export interface SubjectListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface SubjectListData {
  list: SubjectListItem[];
  pagination: Partial<SubjectListPagination>;
}

export interface SubjectListParams {
  pageSize?: number;
  current?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };
  categoryId?: number; //专题分类id
  title?: string; //专题标题
  pic?: string; //专题主图
  productCount?: number; //关联产品数量
  recommendStatus?: number; //推荐状态：0->不推荐；1->推荐
  collectCount?: number; //收藏数
  readCount?: number; //阅读数
  commentCount?: number; //评论数
  albumPics?: string; //画册图片用逗号分割
  description?: string; //专题内容
  showStatus?: number; //显示状态：0->不显示；1->显示
  content?: string; //专题内容
  forwardCount?: number; //转发数
  categoryName?: string; //专题分类名称
}
