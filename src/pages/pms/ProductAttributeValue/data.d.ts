export interface ProductAttributeValueListItem {
    id: number; //主键id
    spuId: number; //商品SPU ID
    attributeId: number; //属性ID
    value: string; //属性值
    status: number; //状态：0->禁用；1->启用
    createBy: number; //创建人ID
    createTime: string; //创建时间
    updateBy: number; //更新人ID
    updateTime: string; //更新时间
    isDeleted: number; //是否删除

}

export interface ProductAttributeValueListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface ProductAttributeValueListData {
  list: ProductAttributeValueListItem[];
  pagination: Partial<ProductAttributeValueListPagination>;
}

export interface ProductAttributeValueListParams {
    id?: number; //主键id
    spuId?: number; //商品SPU ID
    attributeId?: number; //属性ID
    value?: string; //属性值
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
