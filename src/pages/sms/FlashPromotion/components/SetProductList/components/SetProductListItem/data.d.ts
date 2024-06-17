export interface ProductListItem {
  id: number;
  roleName: string;
  remark: string;
  flashPromotionSessionId: number;
  flashPromotionId: number;
}

export interface ProductListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface ProductListData {
  list: ProductListItem[];
  pagination: Partial<ProductListPagination>;
}

export interface ProductListParams {
  userId?: number;
  roleName?:string;
  status?: number;
  pageSize?: number;
  current?: number;
  currentPage?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };

}

export interface UserProductList {
  roleList: any[];
  roleIds:  any[];
}

export interface ProductList {
  id:         number;
  roleName:   string;
  remark:     string;
  createBy:   string;
  createTime: Date;
  updateBy:   string;
  updateTime: string;
  roleStatus: number;
}
