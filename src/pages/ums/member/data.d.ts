export interface MemberTableListItem {
  id: number;
  status: number
}

export interface AddressTableListItem {
  id: number;

}

export interface LoginLogListItem {
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
  status?: number
  pageSize?: number;
  currentPage?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };

}

export interface AddressTableListParams {
  memberId?: number;
  pageSize?: number;
  currentPage?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };

}

export interface LoginLogListParams {
  memberId?: number;
  pageSize?: number;
  currentPage?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };

}
