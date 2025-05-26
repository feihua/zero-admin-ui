export interface CompanyAddressListItem {
    id: number; //主键ID
    addressName: string; //地址名称
    name: string; //收发货人姓名
    phone: string; //收货人电话
    province: string; //省/直辖市
    city: string; //市
    region: string; //区
    detailAddress: string; //详细地址
    sendStatus: number; //默认发货地址：0->否；1->是
    receiveStatus: number; //默认收货地址：0->否；1->是
    createBy: number; //创建人ID
    createTime: string; //创建时间
    updateBy: number; //更新人ID
    updateTime: string; //更新时间
    isDeleted: number; //是否删除

}

export interface CompanyAddressListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface CompanyAddressListData {
  list: CompanyAddressListItem[];
  pagination: Partial<CompanyAddressListPagination>;
}

export interface CompanyAddressListParams {
    id?: number; //主键ID
    addressName?: string; //地址名称
    name?: string; //收发货人姓名
    phone?: string; //收货人电话
    province?: string; //省/直辖市
    city?: string; //市
    region?: string; //区
    detailAddress?: string; //详细地址
    sendStatus?: number; //默认发货地址：0->否；1->是
    receiveStatus?: number; //默认收货地址：0->否；1->是
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
