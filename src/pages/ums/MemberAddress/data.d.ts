export interface MemberAddressListItem {
    id: number; //主键ID
    memberId: number; //会员ID
    receiverName: string; //收货人姓名
    receiverPhone: string; //收货人电话
    province: string; //省份
    city: string; //城市
    district: string; //区县
    detailAddress: string; //详细地址
    postalCode: string; //邮政编码
    tag: string; //地址标签：家、公司等
    isDefault: number; //是否默认地址
    createTime: string; //创建时间
    updateTime: string; //更新时间
    isDeleted: number; //是否删除

}

export interface MemberAddressListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface MemberAddressListData {
  list: MemberAddressListItem[];
  pagination: Partial<MemberAddressListPagination>;
}

export interface MemberAddressListParams {
    id?: number; //主键ID
    memberId?: number; //会员ID
    receiverName?: string; //收货人姓名
    receiverPhone?: string; //收货人电话
    province?: string; //省份
    city?: string; //城市
    district?: string; //区县
    detailAddress?: string; //详细地址
    postalCode?: string; //邮政编码
    tag?: string; //地址标签：家、公司等
    isDefault?: number; //是否默认地址
    createTime?: string; //创建时间
    updateTime?: string; //更新时间
    isDeleted?: number; //是否删除

    pageSize?: number;
    current?: number;
    filter?: { [key: string]: any[] };
    sorter?: { [key: string]: any };

}
