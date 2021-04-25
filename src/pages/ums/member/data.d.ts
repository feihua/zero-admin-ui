export interface MemberTableListItem {
  id: number;

}

export interface MemberTableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface MemberTableListData {
  list: MemberTableListItem[];
  pagination: Partial<MemberTableListPagination>;
}

export interface MemberTableListParams {

  pageSize?: number;
  currentPage?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };

}
