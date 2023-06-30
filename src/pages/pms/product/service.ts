import {request} from 'umi';
import type {ProductListParams, ProductListItem} from './data.d';
import {PrefrenceAreaParams, ProductParams} from "./data.d";
import moment from "moment";

export async function queryProduct(params?: ProductListParams) {
  return request('/api/product/product/list', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function removeProduct(params: { ids: number[] }) {
  return request('/api/product/product/delete', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function addProduct(params: ProductParams) {
  params.publishStatus = params.publishStatus ? 1 : 0
  params.newStatus = params.newStatus ? 1 : 0
  params.previewStatus = params.previewStatus ? 1 : 0
  params.recommandStatus = params.recommandStatus ? 1 : 0

  params.serviceIds = params.serviceIdsArray?.join(",")
  params.productCategoryIdArrayStr = params.productCategoryIdArray?.join(",")
  params.productCategoryId = params.productCategoryIdArray?.[params.productCategoryIdArray?.length - 1]

  params.promotionStartTime = moment(params.promotionStartTime).format('YYYY-MM-DD HH:mm:ss');
  params.promotionEndTime = moment(params.promotionEndTime).format('YYYY-MM-DD HH:mm:ss');

  return request('/api/product/product/add', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateProduct(params: ProductListItem) {
  return request('/api/product/product/update', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function queryPrefrenceArea(params: PrefrenceAreaParams) {
  return request('/api/cms/prefrenceArea/list', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
