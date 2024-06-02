export interface RoleListItem {
  id: number;
  roleName: string;
  remark: string;

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
  userId?: number;
  roleName?:string;
  status?: number;
  pageSize?: number;
  current?: number;
  currentPage?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };

}

export interface UserRoleList {
  roleList: any[];
  roleIds:  any[];
}

export interface RoleList {
  id:         number;
  roleName:   string;
  remark:     string;
  createBy:   string;
  createTime: Date;
  updateBy:   string;
  updateTime: string;
  roleStatus: number;
}
