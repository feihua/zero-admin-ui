export interface RoleListItem {
  id: number;
  dictType?: string;
  dictName?: string;

}

export interface RoleListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface RoleListData {
  list: RoleListItem[];
  pagination: Partial<RoleListPagination>;
}

export interface RoleListParams {
  dictType?:string;
  pageSize?: number;
  current?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };

}
