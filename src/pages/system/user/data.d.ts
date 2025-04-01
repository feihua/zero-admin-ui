export interface UserListItem {
  id: number;
  name: string;
  deptId: number;
  status: number;
}

export interface UserListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface UserListData {
  list: UserListItem[];
  pagination: Partial<UserListPagination>;
}

export interface UserListParams {
  id?: number;
  deptId?: number;
  status?: number;
  pageSize?: number;
  current?: number;
  currentPage?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };

}

export interface RoleList {
  id: number;
  name: string;
  remark: string;
}


export interface JobList {
  id: number;
  postName: string;
}

export interface SelectData {
  roleList: RoleList[];
  jobList: JobList[];
}
