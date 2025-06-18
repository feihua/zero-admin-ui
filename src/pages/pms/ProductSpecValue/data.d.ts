export interface ProductSpecValueListItem {
    id: number; //
    specId: number; //规格ID
    value: string; //规格值
    sort: number; //排序
    status: number; //状态：0->禁用；1->启用
    createBy: number; //创建人ID
    createTime: string; //创建时间
    updateBy: number; //更新人ID
    updateTime: string; //更新时间
    isDeleted: number; //是否删除

}

export interface ProductSpecValueListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface ProductSpecValueListData {
  list: ProductSpecValueListItem[];
  pagination: Partial<ProductSpecValueListPagination>;
}

export interface ProductSpecValueListParams {
    id?: number; //
    specId?: number; //规格ID
    value?: string; //规格值
    sort?: number; //排序
    status?: number; //状态：0->禁用；1->启用
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
