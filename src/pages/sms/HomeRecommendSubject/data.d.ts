export interface RecommendSubjectListItem {
  id: number;
  subjectId: number;
  subjectName: string;
  recommendStatus: number;
}

export interface SubjectListItem {
  subjectName: string;
  title: string;
  description: string;
  id: number;
  subjectId: number;
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
  recommendStatus?: number;
  pageSize?: number;
  currentPage?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };
}

export interface SubjectListParams {
  subjectName?: string;
  pageSize?: number;
  current?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };
}
