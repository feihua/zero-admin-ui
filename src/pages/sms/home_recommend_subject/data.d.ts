export interface RecommendSubjectListItem {
  id: number;

}

export interface RecommendSubjectListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface RecommendSubjectListData {
  list: RecommendSubjectListItem[];
  pagination: Partial<RecommendSubjectListPagination>;
}

export interface RecommendSubjectListParams {

  pageSize?: number;
  currentPage?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };

}
