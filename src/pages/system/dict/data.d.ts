export interface DictListItem {
  id: number;


}

export interface DictListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface DictListData {
  list: DictListItem[];
  pagination: Partial<DictListPagination>;
}

export interface DictListParams {

  delFlag?: number;
  pageSize?: number;
  current?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };

}
