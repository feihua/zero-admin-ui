import {request} from 'umi';
import {ProductRelationListListParams, ProductRelationListListItem, AddProductRelationListListItem} from './data.d';

// 添加场次关联及商品信息
export async function addProductRelationList(params: AddProductRelationListListItem) {
  let data = params.productList.map((x) => {
    x.flashPromotionId = params.flashPromotionId;
    x.flashPromotionSessionId = params.flashPromotionSessionId;

    return x
  })
  return request('/api/sms/flashPromotionProductRelation/addFlashPromotionProductRelation', {
    method: 'POST',
    data: {data: data},
  });
}

//flashPromotionSessionId?: number;
//   flashPromotionId?: number;

// 删除场次关联及商品信息
export async function removeProductRelationList(ids: number[], flashPromotionId: number) {
  let url = "/api/sms/flashPromotionProductRelation/deleteFlashPromotionProductRelation?ids=[" + ids + "]&flashPromotionId=" + flashPromotionId
  return request(url, {
    method: 'GET',
  });
}


// 更新场次关联及商品信息
export async function updateProductRelationList(params: ProductRelationListListItem) {
  return request('/api/sys/user/updateProductRelationList', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}


// 查询场次关联及商品信息详情
export async function queryProductRelationListDetail(userId: number) {
  return request('/api/sys/user/queryProductRelationListDetail?id=' + userId, {
    method: 'GET',

  });
}


// 分页查询不同场次关联及商品信息
export async function queryProductRelationListList(params: ProductRelationListListParams) {

  return request('/api/sms/flashPromotionProductRelation/queryFlashPromotionProductRelationList', {
    method: 'GET',
    params: {
      ...params
    }
  });
}
