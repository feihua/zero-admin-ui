export interface LevelListItem {
  id: number;

}

export interface LevelListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface LevelListData {
  list: LevelListItem[];
  pagination: Partial<LevelListPagination>;
}

export interface LevelListParams {

  pageSize?: number;
  currentPage?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };

}
