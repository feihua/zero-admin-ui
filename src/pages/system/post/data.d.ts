export interface PostListItem {
  id: number;
  status: number;


}

export interface PostListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface PostListData {
  list: PostListItem[];
  pagination: Partial<PostListPagination>;
}

export interface PostListParams {

  delFlag?: number;
  pageSize?: number;
  current?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };

}
