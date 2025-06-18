export interface ProductAttributeListItem {
    id: number; //主键id
    groupId: number; //属性分组ID
    name: string; //属性名称
    inputType: number; //输入类型：1-手动输入，2-单选，3-多选
    valueType: number; //值类型：1-文本，2-数字，3-日期
    inputList: string; //可选值列表，用逗号分隔
    unit: string; //单位
    isRequired: number; //是否必填
    isSearchable: number; //是否支持搜索
    isShow: number; //是否显示
    sort: number; //排序
    status: number; //状态：0->禁用；1->启用
    createBy: number; //创建人ID
    createTime: string; //创建时间
    updateBy: number; //更新人ID
    updateTime: string; //更新时间
    isDeleted: number; //是否删除

}

export interface ProductAttributeListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface ProductAttributeListData {
  list: ProductAttributeListItem[];
  pagination: Partial<ProductAttributeListPagination>;
}

export interface ProductAttributeListParams {
    id?: number; //主键id
    groupId?: number; //属性分组ID
    name?: string; //属性名称
    inputType?: number; //输入类型：1-手动输入，2-单选，3-多选
    valueType?: number; //值类型：1-文本，2-数字，3-日期
    inputList?: string; //可选值列表，用逗号分隔
    unit?: string; //单位
    isRequired?: number; //是否必填
    isSearchable?: number; //是否支持搜索
    isShow?: number; //是否显示
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
