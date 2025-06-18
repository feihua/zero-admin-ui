export interface ProductSpuListItem {
    id: number; //商品SpuId
    name: string; //商品名称
    categoryId: number; //商品分类ID
    categoryIds: string; //商品分类ID集合
    categoryName: string; //商品分类名称
    brandId: number; //品牌ID
    brandName: string; //品牌名称
    unit: string; //单位
    weight: number; //重量(kg)
    keywords: string; //关键词
    brief: string; //简介
    description: string; //详细描述
    albumPics: string; //画册图片，最多8张，以逗号分割
    mainPic: string; //主图
    priceRange: string; //价格区间
    publishStatus: number; //上架状态：0-下架，1-上架
    newStatus: number; //新品状态:0->不是新品；1->新品
    recommendStatus: number; //推荐状态；0->不推荐；1->推荐
    verifyStatus: number; //审核状态：0->未审核；1->审核通过
    previewStatus: number; //是否为预告商品：0->不是；1->是
    sort: number; //排序
    newStatusSort: number; //新品排序
    recommendStatusSort: number; //推荐排序
    sales: number; //销量
    stock: number; //库存
    lowStock: number; //预警库存
    promotionType: number; //促销类型：0->没有促销使用原价;1->使用促销价；2->使用会员价；3->使用阶梯价格；4->使用满减价格；5->秒杀
    detailTitle: string; //详情标题
    detailDesc: string; //详情描述
    detailHtml: string; //产品详情网页内容
    detailMobileHtml: string; //移动端网页详情
    createBy: number; //创建人ID
    createTime: string; //创建时间
    updateBy: number; //更新人ID
    updateTime: string; //更新时间
    isDeleted: number; //是否删除

}

export interface ProductSpuListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface ProductSpuListData {
  list: ProductSpuListItem[];
  pagination: Partial<ProductSpuListPagination>;
}

export interface ProductSpuListParams {
    id?: number; //商品SpuId
    name?: string; //商品名称
    categoryId?: number; //商品分类ID
    categoryIds?: string; //商品分类ID集合
    categoryName?: string; //商品分类名称
    brandId?: number; //品牌ID
    brandName?: string; //品牌名称
    unit?: string; //单位
    weight?: number; //重量(kg)
    keywords?: string; //关键词
    brief?: string; //简介
    description?: string; //详细描述
    albumPics?: string; //画册图片，最多8张，以逗号分割
    mainPic?: string; //主图
    priceRange?: string; //价格区间
    publishStatus?: number; //上架状态：0-下架，1-上架
    newStatus?: number; //新品状态:0->不是新品；1->新品
    recommendStatus?: number; //推荐状态；0->不推荐；1->推荐
    verifyStatus?: number; //审核状态：0->未审核；1->审核通过
    previewStatus?: number; //是否为预告商品：0->不是；1->是
    sort?: number; //排序
    newStatusSort?: number; //新品排序
    recommendStatusSort?: number; //推荐排序
    sales?: number; //销量
    stock?: number; //库存
    lowStock?: number; //预警库存
    promotionType?: number; //促销类型：0->没有促销使用原价;1->使用促销价；2->使用会员价；3->使用阶梯价格；4->使用满减价格；5->秒杀
    detailTitle?: string; //详情标题
    detailDesc?: string; //详情描述
    detailHtml?: string; //产品详情网页内容
    detailMobileHtml?: string; //移动端网页详情
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
