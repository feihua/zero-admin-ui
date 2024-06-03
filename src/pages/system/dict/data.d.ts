export interface DictTypeListItem {
  id: number;
  dictStatus: number;
  dictType: string;
  dictName: string;
}

export interface DictTypeListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface DictTypeListData {
  list: DictTypeListItem[];
  pagination: Partial<DictTypeListPagination>;
}

export interface DictTypeListParams {

  pageSize?: number;
  current?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };

}
