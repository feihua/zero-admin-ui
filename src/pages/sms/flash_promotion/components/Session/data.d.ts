export interface SessionListItem {
  id: number;
  status: number;
  startTime: string;
  endTime: string;

}

export interface SessionListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface SessionListData {
  list: SessionListItem[];
  pagination: Partial<SessionListPagination>;
}

export interface SessionListParams {
  dictType?:string;
  pageSize?: number;
  current?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };

}
