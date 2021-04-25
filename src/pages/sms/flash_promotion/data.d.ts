export interface FlashPromotionListItem {
  id: number;

}

export interface FlashPromotionListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface FlashPromotionListData {
  list: FlashPromotionListItem[];
  pagination: Partial<FlashPromotionListPagination>;
}

export interface FlashPromotionListParams {

  pageSize?: number;
  currentPage?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };

}
