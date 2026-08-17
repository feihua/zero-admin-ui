export interface SysLogListItem {
  id: number;
  status: number;
  operateParam: string;
  jsonResult: string;
  operateUrl: string;

}

export interface SysLogListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface SysLogListData {
  list: SysLogListItem[];
  pagination: Partial<SysLogListPagination>;
}

export interface SysLogListParams {
  status?: string;
  name?: string;
  desc?: string;
  key?: number;
  pageSize?: number;
  currentPage?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };
}
