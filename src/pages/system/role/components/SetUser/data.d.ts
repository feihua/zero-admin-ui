import {cancelAuthorization} from "@/pages/system/role/components/SetUser/service";

export interface UserListItem {
  id: number;
  roleName: string;
  remark: string;

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
  roleId?: number;
  isExist?: number;
  userName?:string;
  mobile?: string;
  pageSize?: number;
  current?: number;
  currentPage?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };

}

export interface UserList {
  id:         number;
  roleName:   string;
  remark:     string;
  createBy:   string;
  createTime: string;
  updateBy:   string;
  updateTime: string;
  roleStatus: number;
}
export interface CancelAuthorizationParams {
  roleId?: number;
  userIds?: number[];
  isExist?: number;


}
