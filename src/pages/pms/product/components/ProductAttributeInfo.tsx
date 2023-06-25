import React, {useEffect, useState} from 'react';
import {Form, Input, message, TreeSelect} from 'antd';
import type {AttributeCategoryListItem} from "@/pages/pms/product_attribute_category/data";
import {queryCategoryAttribute} from "@/pages/pms/product_attribute_category/service";

export interface BaseInfoProps {
  visible: boolean;
}

const FormItem = Form.Item;

const ProductAttributeInfo: React.FC<BaseInfoProps> = (props) => {

  const [attributeCategoryListItem, setAttributeCategoryListItem] = useState<AttributeCategoryListItem[]>([]);

  useEffect(() => {
    if (props.visible) {
      queryCategoryAttribute({}).then((res) => {
        if (res.code === '000000') {
          const map = res.data.map((item: { id: any; name: any; title: any; parentId: any }) => ({
            value: item.id,
            id: item.id,
            label: item.name,
            title: item.name,
            parentId: item.parentId,
          }));

          setAttributeCategoryListItem(map);
        } else {
          message.error(res.msg);
        }
      });
    }
  }, [props.visible]);

  return (
    <>
      <FormItem name="name" label="属性类型">
        <TreeSelect
          style={{width: '100%'}}
          dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
          treeData={attributeCategoryListItem}
          placeholder="请选择属性类型"
          treeDefaultExpandAll
        />
      </FormItem>
      <FormItem name="name" label="商品规格">
        <Input id="update-name" placeholder={'请输入商品名'}/>
      </FormItem>
      <FormItem name="name" label="商品参数">
        <Input id="update-name" placeholder={'请输入商品名'}/>
      </FormItem>
      <FormItem name="name" label="商品相册">
        <Input id="update-name" placeholder={'请输入商品名'}/>
      </FormItem>
      <FormItem name="name" label="商品详情">
        <Input id="update-name" placeholder={'请输入商品名'}/>
      </FormItem>
    </>
  );
};

export default ProductAttributeInfo;
