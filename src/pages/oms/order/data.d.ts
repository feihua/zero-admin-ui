export interface OrderListItem {
  id: number;
  memberId?: number;
  couponId?: number;
  orderSn?: string;
  createTime?: string;
  memberUserName?: string;
  totalAmount?: number;
  payAmount?: number;
  freightAmount?: number;
  promotionAmount?: number;
  integrationAmount?: number;
  couponAmount?: number;
  discountAmount?: number;
  payType?: number;
  sourceType?: number;
  status?: number;
  orderType?: number;
  deliveryCompany?: string;
  deliverySn?: string;
  autoConfirmDay?: number;
  integration?: number;
  growth?: number;
  promotionInfo?: string;
  receiverName?: string;
  receiverPhone?: string;
  receiverPostCode?: string;
  receiverProvince?: string;
  receiverCity?: string;
  receiverRegion?: string;
  receiverDetailAddress?: string;
  note?: string;
  confirmStatus?: number;
  deleteStatus?: number;
  modifyTime?: string;
  listOperateHistoryData?: OperateHistoryDataListItem[]
  listOrderItemData?: OrderItemDataListItem[]
}

export interface OperateHistoryDataListItem {
  id?: number;
  orderId?: number;
  operateMan?: string;
  createTime?: string;
  orderStatus?: number;
  note?: string;
}

export interface OrderItemDataListItem {
  id?: number;
  orderId?: number;
  orderSn?: string;
  productId?: number;
  productPic?: string;
  productName?: string;
  productBrand?: string;
  productSn?: string;
  productPrice?: number;
  productQuantity?: number;
  productSkuId?: number;
  productSkuCode?: string;
  productCategoryId?: number;
  promotionName?: string;
  promotionAmount?: number;
  couponAmount?: number;
  integrationAmount?: number;
  realAmount?: number;
  giftIntegration?: number;
  giftGrowth?: number;
  productAttr?: string;

}

export interface OrderListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface OrderListData {
  list: OrderListItem[];
  pagination: Partial<OrderListPagination>;
}

export interface OrderListParams {
  payType?: number;
  sourceType?: number;
  status?: number;
  orderType?: number;
  pageSize?: number;
  current?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };

}
