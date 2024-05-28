export interface MemberListItem {
  id: number;
  status: number
}

export interface AddressListItem {
  id: number;

}

export interface LoginLogListItem {
  id: number;

}

export interface MemberListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface MemberListData {
  list: MemberListItem[];
  pagination: Partial<MemberListPagination>;
}

export interface MemberListParams {
  status?: number
  pageSize?: number;
  currentPage?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };

}

export interface AddressListParams {
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
