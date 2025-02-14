export interface BrandListItem {
  id: number; //
  brandName: string; //品牌名称
  firstLetter: string; //首字母
  sort: number; //排序
  factoryStatus: number; //是否为品牌制造商：0->不是；1->是
  showStatus: number; //品牌显示状态
  recommendStatus: number; //推荐状态
  productCount: number; //产品数量
  productCommentCount: number; //产品评论数量
  logo: string; //品牌logo
  bigPic: string; //专区大图
  brandStory: string; //品牌故事
  createBy: string; //创建者
  createTime: string; //创建时间
  updateBy: string; //更新者
  updateTime: string; //更新时间
}

export interface BrandListParams {
  factoryStatus?: number;
  showStatus?: number;
  pageSize?: number;
  current?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };

}
