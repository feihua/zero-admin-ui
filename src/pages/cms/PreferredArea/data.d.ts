export interface PreferredAreaListItem {
  id: number; //主键id
  name: string; //专区名称
  subTitle: string; //子标题
  pic: string; //展示图片
  sort: number; //排序
  showStatus: number; //显示状态：0->不显示；1->显示
  createBy: string; //创建者
  createTime: string; //创建时间
  updateBy: string; //更新者
  updateTime: string; //更新时间

}

export interface PreferredAreaListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface PreferredAreaListData {
  list: PreferredAreaListItem[];
  pagination: Partial<PreferredAreaListPagination>;
}

export interface PreferredAreaListParams {
  pageSize?: number;
  current?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };
  name?: string; //专区名称
  subTitle?: string; //子标题
  pic?: string; //展示图片
  showStatus?: number; //显示状态：0->不显示；1->显示
}
