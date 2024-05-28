import {request} from 'umi';
import type {PrefrenceAreaParams, ProductListParams, ProductParams} from './data.d';
import moment from "moment";

export async function queryProduct(params?: ProductListParams) {
  return request('/api/product/product/list', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

export async function removeProduct(params: { ids: number[] }) {
  return request('/api/product/product/delete', {
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
  return request('/api/product/product/' + m, {
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
