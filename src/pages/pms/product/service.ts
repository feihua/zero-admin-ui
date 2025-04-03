import {request} from 'umi';
import type {PrefrenceAreaParams, ProductListParams, ProductParams} from './data.d';
import moment from "moment";
// 添加商品信息
export async function addProduct(params: ProductParams) {
  return request('/api/pms/product/addProduct', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

//

// 删除商品信息
export async function removeProduct(ids: number[]) {
  return request('/api/pms/product/deleteProduct?ids=' + ids.join(','), {
    method: 'GET',
  });
}


// 更新商品信息
export async function updateProduct(params: ProductParams) {
  return request('/api/pms/product/updateProduct', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 批量更新商品信息状态
export async function updateProductStatus(params: { dictTypeIds: number[], postStatus: number }) {
  return request('/api/pms/product/updateProductStatus', {
    method: 'POST',
    data: {
      ...params,
    },

  });
}


// 查询商品信息详情
export async function queryProductDetail(id: number ) {
  return request('/api/pms/product/queryProductDetail', {
    method: 'GET',
  });
}

// 分页查询商品信息列表
export async function queryProductList(params: ProductListParams) {

  return request('/api/pms/product/queryProductList', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

export async function operation(params: ProductParams) {
  params.publishStatus = params.publishStatus ? 1 : 0
  params.newStatus = params.newStatus ? 1 : 0
  params.previewStatus = params.previewStatus ? 1 : 0
  params.recommandStatus = params.recommandStatus ? 1 : 0

  params.serviceIds = params.serviceIdsArray?.join(",")
  params.productCategoryIdArrayStr = params.productCategoryIdArray?.join(",")
  params.productCategoryId = params.productCategoryIdArray?.[params.productCategoryIdArray?.length - 1]

  params.promotionStartTime = moment(params.promotionStartTime).format('YYYY-MM-DD HH:mm:ss');
  params.promotionEndTime = moment(params.promotionEndTime).format('YYYY-MM-DD HH:mm:ss');

  const m = params.id ? 'update' : 'add'
  return request('/api/pms/product/product/' + m, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}


export async function queryPrefrenceArea(params: PrefrenceAreaParams) {
  return request('/api/cms/prefrenceArea/list', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}
