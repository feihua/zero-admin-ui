export interface ProductSkuListItem {
    id: number; //商品SpuId
    spuId: number; //商品SpuId
    name: string; //SKU名称
    skuCode: string; //SKU编码
    mainPic: string; //主图
    albumPics: string; //图片集
    price: number; //价格
    promotionPrice: number; //单品促销价格
    promotionStartTime: string; //促销开始时间
    promotionEndTime: string; //促销结束时间
    stock: number; //库存
    lowStock: number; //预警库存
    specData: ; //规格数据
    weight: number; //重量(kg)
    publishStatus: number; //上架状态：0-下架，1-上架
    verifyStatus: number; //审核状态：0-未审核，1-审核通过，2-审核不通过
    sort: number; //排序
    sales: number; //销量
    createBy: number; //创建人ID
    createTime: string; //创建时间
    updateBy: number; //更新人ID
    updateTime: string; //更新时间
    isDeleted: number; //是否删除

}

export interface ProductSkuListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface ProductSkuListData {
  list: ProductSkuListItem[];
  pagination: Partial<ProductSkuListPagination>;
}

export interface ProductSkuListParams {
    id?: number; //商品SpuId
    spuId?: number; //商品SpuId
    name?: string; //SKU名称
    skuCode?: string; //SKU编码
    mainPic?: string; //主图
    albumPics?: string; //图片集
    price?: number; //价格
    promotionPrice?: number; //单品促销价格
    promotionStartTime?: string; //促销开始时间
    promotionEndTime?: string; //促销结束时间
    stock?: number; //库存
    lowStock?: number; //预警库存
    specData?: ; //规格数据
    weight?: number; //重量(kg)
    publishStatus?: number; //上架状态：0-下架，1-上架
    verifyStatus?: number; //审核状态：0-未审核，1-审核通过，2-审核不通过
    sort?: number; //排序
    sales?: number; //销量
    createBy?: number; //创建人ID
    createTime?: string; //创建时间
    updateBy?: number; //更新人ID
    updateTime?: string; //更新时间
    isDeleted?: number; //是否删除

    pageSize?: number;
    current?: number;
    filter?: { [key: string]: any[] };
    sorter?: { [key: string]: any };

}
