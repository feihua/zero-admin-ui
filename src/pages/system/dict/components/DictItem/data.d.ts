export interface DictItemListItem {
  id: number;
  dictStatus: number;
  dictType?: string;
  dictName?: string;

}

export interface DictItemListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface DictItemListData {
  list: DictItemListItem[];
  pagination: Partial<DictItemListPagination>;
}

export interface DictItemListParams {
  dictType?:string;
  pageSize?: number;
  current?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };

}
