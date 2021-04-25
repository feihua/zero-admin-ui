export interface SettingListItem {
  id: number;

}

export interface SettingListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface SettingListData {
  list: SettingListItem[];
  pagination: Partial<SettingListPagination>;
}

export interface SettingListParams {

  pageSize?: number;
  currentPage?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };

}
