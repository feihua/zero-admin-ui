import {
  ProductListItem
} from "@/pages/sms/flash_promotion/components/SetProductList/components/SetProductListItem/data";

export interface ProductRelationListListItem {
  id: number;
  name: string;
  flashPromotionSessionId: number;
  flashPromotionId: number;
  userStatus: number;
}

export interface ProductRelationListListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface ProductRelationListListData {
  list: ProductRelationListListItem[];
  pagination: Partial<ProductRelationListListPagination>;
}

export interface ProductRelationListListParams {
  id?: number;
  flashPromotionSessionId?: number;
  flashPromotionId?: number;
  status?: number;
  pageSize?: number;
  current?: number;
  currentPage?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };

}

export interface AddProductRelationListListItem {
  flashPromotionSessionId: number;
  flashPromotionId: number;
  productList: ProductListItem[];
}
