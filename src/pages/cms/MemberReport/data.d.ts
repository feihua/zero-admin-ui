export interface MemberReportListItem {
  id: number; //编号
  reportType: number; //举报类型：0->商品评价；1->话题内容；2->用户评论
  reportMemberName: string; //举报人
  reportObject: string; //被举报对象
  reportStatus: number; //举报状态：0->未处理；1->已处理
  handleStatus: number; //处理结果：0->无效；1->有效；2->恶意
  note: string; //备注
  createTime: string; //创建时间

}

export interface MemberReportListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface MemberReportListData {
  list: MemberReportListItem[];
  pagination: Partial<MemberReportListPagination>;
}

export interface MemberReportListParams {
  pageSize?: number;
  current?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };
  reportType?: number; //举报类型：0->商品评价；1->话题内容；2->用户评论
  reportMemberName?: string; //举报人
  reportObject?: string; //被举报对象
  reportStatus?: number; //举报状态：0->未处理；1->已处理
  handleStatus?: number; //处理结果：0->无效；1->有效；2->恶意
  note?: string; //备注
}
