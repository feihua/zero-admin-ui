export interface CompanyAddressListItem {
    addressName: string; //地址名称
    city: string; //市
    createBy: string; //创建者
    createTime: string; //创建时间
    detailAddress: string; //详细地址
    id: number; //
    name: string; //收发货人姓名
    phone: string; //收货人电话
    province: string; //省/直辖市
    receiveStatus: number; //是否默认收货地址：0->否；1->是
    region: string; //区
    sendStatus: number; //默认发货地址：0->否；1->是
    updateBy: string; //更新者
    updateTime: string; //更新时间

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
    addressName?: string; //地址名称
    city?: string; //市
    createBy?: string; //创建者
    createTime?: string; //创建时间
    detailAddress?: string; //详细地址
    id?: number; //
    name?: string; //收发货人姓名
    phone?: string; //收货人电话
    province?: string; //省/直辖市
    receiveStatus?: number; //是否默认收货地址：0->否；1->是
    region?: string; //区
    sendStatus?: number; //默认发货地址：0->否；1->是
    updateBy?: string; //更新者
    updateTime?: string; //更新时间

    pageSize?: number;
    current?: number;
    filter?: { [key: string]: any[] };
    sorter?: { [key: string]: any };

}
