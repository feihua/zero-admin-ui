export interface ProductBrandListItem {
    id: number; //
    name: string; //品牌名称
    logo: string; //品牌logo
    bigPic: string; //专区大图
    description: string; //描述
    firstLetter: string; //首字母
    sort: number; //排序
    recommendStatus: number; //推荐状态
    productCount: number; //产品数量
    productCommentCount: number; //产品评论数量
    isEnabled: number; //是否启用
    createBy: number; //创建人ID
    createTime: string; //创建时间
    updateBy: number; //更新人ID
    updateTime: string; //更新时间
    isDeleted: number; //是否删除

}

export interface ProductBrandListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface ProductBrandListData {
  list: ProductBrandListItem[];
  pagination: Partial<ProductBrandListPagination>;
}

export interface ProductBrandListParams {
    id?: number; //
    name?: string; //品牌名称
    logo?: string; //品牌logo
    bigPic?: string; //专区大图
    description?: string; //描述
    firstLetter?: string; //首字母
    sort?: number; //排序
    recommendStatus?: number; //推荐状态
    productCount?: number; //产品数量
    productCommentCount?: number; //产品评论数量
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
