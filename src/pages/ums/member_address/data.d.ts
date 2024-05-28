export interface AddressListItem {
  id: number;

}

export interface AddressListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface AddressListData {
  list: AddressListItem[];
  pagination: Partial<AddressListPagination>;
}

export interface AddressListParams {

  pageSize?: number;
  currentPage?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };

}
