export interface HelpListItem {
  id: number; //主键id
  categoryId: number; //分类id
  icon: string; //图标
  title: string; //标题
  showStatus: number; //显示状态：0->不显示；1->显示
  readCount: number; //阅读量
  content: string; //内容
  createBy: string; //创建者
  createTime: string; //创建时间
  updateBy: string; //更新者
  updateTime: string; //更新时间

}

export interface HelpListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface HelpListData {
  list: HelpListItem[];
  pagination: Partial<HelpListPagination>;
}

export interface HelpListParams {
  pageSize?: number;
  current?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };
  categoryId?: number; //分类id
  icon?: string; //图标
  title?: string; //标题
  showStatus?: number; //显示状态：0->不显示；1->显示
  readCount?: number; //阅读量
  content?: string; //内容
}
