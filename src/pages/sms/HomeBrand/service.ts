import {request} from 'umi';
import type {HomeBrandListParams, HomeBrandListItem} from './data.d';
import {BrandListParams} from '@/pages/pms/Brand/data';

// 添加品牌推荐
export async function addHomeBrand(params: number[]) {
  return request('/api/sms/homeBrand/addHomeBrand', {
    method: 'POST',
    data: {
      brandIds: params,
    },
  });
}

//

// 删除品牌推荐
export async function removeHomeBrand(brandIds: number[]) {
  return request('/api/sms/homeBrand/deleteHomeBrand?brandIds=' + brandIds.join(","), {
    method: 'GET',
  });
}


// 更新品牌推荐排序
export async function updateHomeBrandSort(params: HomeBrandListItem) {
  params.brandId=params.id
  return request('/api/sms/homeBrand/updateHomeBrandSort', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 批量更新品牌推荐状态
export async function updateHomeBrandStatus(params: { ids: number[], recommendStatus: number, brandIds: number[] }) {
  return request('/api/sms/homeBrand/updateHomeBrandStatus', {
    method: 'POST',
    data: {
      ...params,
    },

  });
}


// 查询品牌推荐详情
export async function queryHomeBrandDetail(id: number ) {
  return request('/api/sms/homeBrand/queryHomeBrandDetail', {
    method: 'GET',
  });
}

// 分页查询品牌推荐列表
export async function queryHomeBrandList(params: HomeBrandListParams) {

  return request('/api/sms/homeBrand/queryHomeBrandList', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}


export async function queryProductBrandList(params: BrandListParams) {
  params.recommendStatus=0
  return request('/api/pms/brand/queryProductBrandList', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}
