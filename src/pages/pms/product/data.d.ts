export interface ProductListItem {
  id: number;
}

export interface ProductParams {
  productCategoryIdArray?: number[]
  productCategoryIdArrayStr?: string
  serviceIdsArray?: number[]
  id?: number;
  brandId?: number;
  productCategoryId?: number;
  feightTemplateId?: number;
  productAttributeCategoryId?: number;
  name?: string;
  pic?: string;
  productSn?: string;
  deleteStatus?: number;
  publishStatus?: number;
  newStatus?: number;
  recommandStatus?: number;
  verifyStatus?: number;
  sort?: number;
  sale?: number;
  price?: number;
  promotionPrice?: number;
  giftGrowth?: number;
  giftPoint?: number;
  usePointLimit?: number;
  subTitle?: string;
  description?: string;
  originalPrice?: number;
  stock?: number;
  lowStock?: number;
  unit?: string;
  weight?: number;
  previewStatus?: number;
  serviceIds?: string;
  keywords?: string;
  note?: string;
  albumPics?: string;
  detailTitle?: string;
  detailDesc?: string;
  detailHtml?: string;
  detailMobileHtml?: string;
  promotionStartTime?: string;
  promotionEndTime?: string;
  promotionPerLimit?: number;
  promotionType?: number;
  brandName?: string;
  productCategoryName?: string;
  subjectProductRelationList?: number[];
  prefrenceAreaProductRelationList?: number[];
}

export interface PrefrenceAreaItem {
  id: number;
  name: string;
  subTitle: string;

}

export interface ProductListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface ProductListData {
  list: ProductListItem[];
  pagination: Partial<ProductListPagination>;
}

export interface ProductListParams {

  pageSize?: number;
  current?: number;
  newStatus?: number;
  recommendStatus?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };

}

export interface PrefrenceAreaParams {

  pageSize?: number;
  current?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };

}
