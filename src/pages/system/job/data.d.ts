export interface JobListItem {
  id: number;
  orderNum: number;
  jobName: string;

}

export interface JobListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface JobListData {
  list: JobListItem[];
  pagination: Partial<JobListPagination>;
}

export interface JobListParams {

  pageSize?: number;
  current?: number;
  currentPage?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };

}
