export interface LevelListItem {
  id: number;
  name: string;

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
  current?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };

}
