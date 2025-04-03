import {request} from 'umi';
import {ProductListParams} from "@/pages/pms/product/data";


// 分页查询商品信息列表
export async function queryProductList(params: ProductListParams) {

  return request('/api/pms/product/queryProductList', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}
