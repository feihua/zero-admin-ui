export interface ReturnApplyListItem {
  id: number;
  orderId?: number;
  companyAddressId?: number;
  productId?: number;
  orderSn?: string;
  createTime?: string;
  memberUserName?: string;
  returnAmount?: number;
  returnName?: string;
  returnPhone?: string;
  status?: number;
  handleTime?: string;
  productPic?: string;
  productName?: string;
  productBrand?: string;
  productAttr?: string;
  productCount?: number;
  productPrice?: number;
  productRealPrice?: number;
  reason?: string;
  description?: string;
  proofPics?: string;
  handleNote?: string;
  handleMan?: string;
  receiveMan?: string;
  receiveTime?: string;
  receiveNote?: string;
}

export interface CompanyAddressListItem {
  id?: number;
  addressName?: string;
  sendStatus?: number;
  receiveStatus?: number;
  name?: string;
  phone?: string;
  province?: string;
  city?: null | string;
  region?: string;
  detailAddress?: string;

}

export interface ReturnApplyListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface ReturnApplyListData {
  list: ReturnApplyListItem[];
  pagination: Partial<ReturnApplyListPagination>;
}

export interface ReturnApplyListParams {

  status?: number;
  pageSize?: number;
  current?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };

}
