export interface TableListItem {
  id: number;

}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface TableListData {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
}

export interface TableListParams {

  pageSize?: number;
  current?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };
}


export interface StatisticsLoginLog {
  dayLoginCount: number;
  weekLoginCount: number;
  monthLoginCount: number;
}
