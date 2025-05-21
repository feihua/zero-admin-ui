export interface MemberLoginLogListItem {
    id: number; //
    memberId: number; //会员id
    memberIp: string; //登录ip
    city: string; //登录城市
    loginType: number; //登录类型：0->PC；1->android;2->ios;3->小程序
    province: string; //登录省份
    createTime: string; //登录时间

}

export interface MemberLoginLogListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface MemberLoginLogListData {
  list: MemberLoginLogListItem[];
  pagination: Partial<MemberLoginLogListPagination>;
}

export interface MemberLoginLogListParams {
    id?: number; //
    memberId?: number; //会员id
    memberIp?: string; //登录ip
    city?: string; //登录城市
    loginType?: number; //登录类型：0->PC；1->android;2->ios;3->小程序
    province?: string; //登录省份
    createTime?: string; //登录时间

    pageSize?: number;
    current?: number;
    filter?: { [key: string]: any[] };
    sorter?: { [key: string]: any };

}
