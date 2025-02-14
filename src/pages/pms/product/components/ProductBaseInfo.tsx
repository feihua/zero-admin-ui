import React, {useEffect, useState} from 'react';
import {Cascader, Form, Input, InputNumber, message, Select} from 'antd';
import type {CategoryListItem} from "@/pages/pms/product_category/data";
import type {BrandListItem} from "@/pages/pms/Brand/data";
import {queryBrandList} from "@/pages/pms/Brand/service";
import {queryProductCategoryList} from "@/pages/pms/product_category/service";
import {tree} from "@/utils/utils";

export interface BaseInfoProps {
  visible: boolean;
}

const FormItem = Form.Item;

const ProductBaseInfo: React.FC<BaseInfoProps> = (props) => {

  const [brandListItem, setBrandListItem] = useState<BrandListItem[]>([]);
  const [categoryListItem, setCategoryListItem] = useState<CategoryListItem[]>([]);

  useEffect(() => {
    if (props.visible) {
      queryBrandList({pageSize: 100, current: 1}).then((res) => {
        if (res.code === '000000') {
          setBrandListItem(res.data)
        } else {
          message.error(res.msg);
        }

      });

      queryProductCategoryList({}).then((res) => {
        if (res.code === '000000') {
          const map = res.data.map((item: { id: any; name: any; title: any; parentId: any }) => ({
            value: item.id,
            id: item.id,
            label: item.name,
            title: item.name,
            parentId: item.parentId,
          }));

          setCategoryListItem(tree(map, 0, 'parentId'));
        } else {
          message.error(res.msg);
        }
      });

    }
  }, [props.visible]);


  return (
    <>
      <FormItem name="productCategoryIdArray" label="商品分类" rules={[{required: true, message: '请选择商品分类!'}]}>
        <Cascader
          options={categoryListItem}
          placeholder="请选择商品分类"
        />
      </FormItem>
      <FormItem name="name" label="商品名称" rules={[{required: true, message: '请输入商品名!'}]}>
        <Input id="update-name" placeholder={'请输入商品名'}/>
      </FormItem>
      <FormItem name="subTitle" label="副标题" rules={[{required: true, message: '请输入副标题!'}]}>
        <Input id="update-subTitle" placeholder={'请输入副标题'}/>
      </FormItem>
      <FormItem name="brandId" label="商品品牌" rules={[{required: true, message: '请选择商品分类!'}]}>
        <Select id="brandId" placeholder={'请选择商品品牌'}>
          {brandListItem.map(r => <Select.Option key={r.id} value={r.id}>{r.brandName}</Select.Option>)}
        </Select>
      </FormItem>
      <FormItem name="description" label="商品介绍" rules={[{required: true, message: '请输入商品介绍!'}]}>
        <Input.TextArea rows={2} placeholder={'请输入商品介绍'}/>
      </FormItem>
      <FormItem name="productSn" label="商品货号" rules={[{required: true, message: '请输入商品货号!'}]}>
        <Input id="update-productSn" placeholder={'请输入商品货号'}/>
      </FormItem>
      <FormItem name="price" label="商品售价" rules={[{required: true, message: '请输入排序!'}]}>
        <InputNumber addonAfter={'元'} style={{width: 407}}/>
      </FormItem>
      <FormItem name="originalPrice" label="市场价" rules={[{required: true, message: '请输入市场价!'}]}>
        <InputNumber addonAfter={'元'} style={{width: 407}}/>
      </FormItem>
      <FormItem name="stock" label="商品库存" rules={[{required: true, message: '请输入商品库存!'}]}>
        <InputNumber style={{width: 407}}/>
      </FormItem>
      <FormItem name="unit" label="计量单位" rules={[{required: true, message: '请输入计量单位!'}]}>
        <Input id="update-unit" placeholder={'请输入计量单位'}/>
      </FormItem>
      <FormItem name="weight" label="商品重量" rules={[{required: true, message: '请输入商品重量!'}]}>
        <InputNumber addonAfter={'克'} style={{width: 407}}/>
      </FormItem>
      <FormItem name="sort" label="排序" rules={[{required: true, message: '请输入排序!'}]}>
        <InputNumber style={{width: 407}}/>
      </FormItem>
    </>
  );
};

export default ProductBaseInfo;
