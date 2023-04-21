export interface FlashPromotionListItem {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
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
  title?: string;
  status?: number;
  pageSize?: number;
  currentPage?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };

}
