export interface ProductCategoryListItem {
    id: number; //
    parentId: number; //上级分类的编号：0表示一级分类
    name: string; //商品分类名称
    level: number; //分类级别：0->1级；1->2级
    productCount: number; //商品数量
    productUnit: string; //商品单位
    navStatus: number; //是否显示在导航栏：0->不显示；1->显示
    sort: number; //排序
    icon: string; //图标
    keywords: string; //关键字
    description: string; //描述
    isEnabled: number; //是否启用
    createBy: number; //创建人ID
    createTime: string; //创建时间
    updateBy: number; //更新人ID
    updateTime: string; //更新时间
    isDeleted: number; //是否删除

}

export interface ProductCategoryListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface ProductCategoryListData {
  list: ProductCategoryListItem[];
  pagination: Partial<ProductCategoryListPagination>;
}

export interface ProductCategoryListParams {
    id?: number; //
    parentId?: number; //上级分类的编号：0表示一级分类
    name?: string; //商品分类名称
    level?: number; //分类级别：0->1级；1->2级
    productCount?: number; //商品数量
    productUnit?: string; //商品单位
    navStatus?: number; //是否显示在导航栏：0->不显示；1->显示
    sort?: number; //排序
    icon?: string; //图标
    keywords?: string; //关键字
    description?: string; //描述
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
