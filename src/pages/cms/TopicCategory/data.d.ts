export interface TopicCategoryListItem {
  id: number; //主键id
  name: string; //分类名称
  icon: string; //分类图标
  subjectCount: number; //专题数量
  showStatus: number; //显示状态：0->不显示；1->显示
  sort: number; //排序
  createBy: string; //创建者
  createTime: string; //创建时间
  updateBy: string; //更新者
  updateTime: string; //更新时间

}

export interface TopicCategoryListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface TopicCategoryListData {
  list: TopicCategoryListItem[];
  pagination: Partial<TopicCategoryListPagination>;
}

export interface TopicCategoryListParams {
  pageSize?: number;
  current?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };
  name?: string; //分类名称
  icon?: string; //分类图标
  subjectCount?: number; //专题数量
  showStatus?: number; //显示状态：0->不显示；1->显示
}
