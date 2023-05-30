import React, {useEffect, useState} from 'react';
import {Button, Form, Modal, Input, Steps, Select, InputNumber, TreeSelect, message} from 'antd';
import type {ProductListItem} from '../data.d';
import {queryBrand} from "@/pages/pms/product_brand/service";
import type {BrandListItem} from "@/pages/pms/product_brand/data";
import {queryCategory} from "@/pages/pms/product_category/service";
import {CategoryListItem} from "@/pages/pms/product_category/data";
import {tree} from "@/utils/utils";

export interface CreateFormProps {
  onCancel: () => void;
  onSubmit: (values: ProductListItem) => void;
  createModalVisible: boolean;
}

const FormItem = Form.Item;

const formLayout = {
  labelCol: {span: 7},
  wrapperCol: {span: 13},
};

const steps = [
  {
    title: '填写商品信息',
    nextPrompt: '下一步,填写商品促销',
  },
  {
    title: '填写商品促销',
    nextPrompt: '下一步,填写商品属性',
    prePrompt: '上一步,填写商品信息',
  },
  {
    title: '填写商品属性',
    nextPrompt: '下一步,选择商品关联',
    prePrompt: '上一步,填写商品促销',
  },
  {
    title: '选择商品关联',
    prePrompt: '上一步,填写商品属性',
  },
];

const CreateProductForm: React.FC<CreateFormProps> = (props) => {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({key: item.title, title: item.title}));

  const contentStyle: React.CSSProperties = {
    lineHeight: '260px',
    textAlign: 'center',
    marginTop: 16,
  };

  const [form] = Form.useForm();

  const {onSubmit, onCancel, createModalVisible} = props;

  const [brandListItem, setBrandListItem] = useState<BrandListItem[]>([]);
  const [categoryListItem, setCategoryListItem] = useState<CategoryListItem[]>([]);

  useEffect(() => {
    if (form && !createModalVisible) {
      form.resetFields();
    } else {
      queryBrand({pageSize: 100, current: 1}).then((res) => {
        if (res.code === '000000') {
          setBrandListItem(res.data)
        } else {
          message.error(res.msg);
        }

      });

      queryCategory({}).then((res) => {
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
  }, [props.createModalVisible]);

  const handleSubmit = () => {
    if (!form) return;
    form.submit();
  };

  const handleFinish = (values: ProductListItem) => {
    console.log(1212, values)
    if (onSubmit) {
      onSubmit(values);
    }
  };

  const renderContent = () => {
    return (
      <>
        <Steps current={current} items={items}/>
        <div style={contentStyle}>
          {current === 0 && (
            <div>
              <FormItem name="productCategoryId" label="商品分类">
                <TreeSelect
                  style={{width: '100%'}}
                  dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                  treeData={categoryListItem}
                  placeholder="请选择商品分类"
                  treeDefaultExpandAll
                />
              </FormItem>
              <FormItem name="name" label="商品名">
                <Input id="update-name" placeholder={'请输入商品名'}/>
              </FormItem>
              <FormItem name="subTitle" label="副标题">
                <Input id="update-name" placeholder={'请输入副标题'}/>
              </FormItem>
              <FormItem name="brandId" label="商品品牌">
                <Select id="brandId" placeholder={'请选择商品品牌'}>
                  {brandListItem.map(r => <Select.Option value={r.id}>{r.name}</Select.Option>)}
                </Select>
              </FormItem>
              <FormItem name="description" label="商品介绍">
                <Input.TextArea rows={2} placeholder={'请输入商品介绍'}/>
              </FormItem>
              <FormItem name="productSn" label="商品货号">
                <Input id="update-name" placeholder={'请输入商品货号'}/>
              </FormItem>
              <FormItem name="price" label="商品售价" initialValue={0}>
                <InputNumber addonAfter={'元'} style={{width: 407}}/>
              </FormItem>
              <FormItem name="originalPrice" label="市场价" initialValue={0}>
                <InputNumber addonAfter={'元'} style={{width: 407}}/>
              </FormItem>
              <FormItem name="stock" label="商品库存" initialValue={100}>
                <InputNumber style={{width: 407}}/>
              </FormItem>
              <FormItem name="unit" label="计量单位">
                <Input id="update-name" placeholder={'请输入计量单位'}/>
              </FormItem>
              <FormItem name="weight" label="商品重量" initialValue={100}>
                <InputNumber addonAfter={'克'} style={{width: 407}}/>
              </FormItem>
              <FormItem name="sort" label="排序" initialValue={0}>
                <InputNumber style={{width: 407}}/>
              </FormItem>
            </div>
          )}
          <div style={contentStyle}>
            {current === 1 && (
              <div>
                <FormItem name="name" label="赠送积分">
                  <Input id="update-name" placeholder={'请输入商品名'}/>
                </FormItem>
                <FormItem name="name" label="赠送成长值">
                  <Input id="update-name" placeholder={'请输入商品名'}/>
                </FormItem>
                <FormItem name="name" label="积分购买限制">
                  <Input id="update-name" placeholder={'请输入商品名'}/>
                </FormItem>
                <FormItem name="name" label="预告商品">
                  <Input id="update-name" placeholder={'请输入商品名'}/>
                </FormItem>
                <FormItem name="name" label="商品上架">
                  <Input id="update-name" placeholder={'请输入商品名'}/>
                </FormItem>
                <FormItem name="name" label="商品推荐">
                  <Input id="update-name" placeholder={'请输入商品名'}/>
                </FormItem>
                <FormItem name="name" label="服务保证">
                  <Input id="update-name" placeholder={'请输入商品名'}/>
                </FormItem>
                <FormItem name="name" label="详细页标题">
                  <Input id="update-name" placeholder={'请输入商品名'}/>
                </FormItem>
                <FormItem name="name" label="详细页描述">
                  <Input id="update-name" placeholder={'请输入商品名'}/>
                </FormItem>
                <FormItem name="name" label="关键字">
                  <Input id="update-name" placeholder={'请输入商品名'}/>
                </FormItem>
                <FormItem name="name" label="备注">
                  <Input id="update-name" placeholder={'请输入商品名'}/>
                </FormItem>
                <FormItem name="name" label="选择优惠方式">
                  <Input id="update-name" placeholder={'请输入商品名'}/>
                </FormItem>
              </div>
            )}
          </div>
          <div style={contentStyle}>
            {current === 2 && (
              <div>
                <FormItem name="name" label="属性类型">
                  <Input id="update-name" placeholder={'请输入商品名'}/>
                </FormItem>
                <FormItem name="name" label="商品规格">
                  <Input id="update-name" placeholder={'请输入商品名'}/>
                </FormItem>
                <FormItem name="name" label="属性图片">
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

              </div>
            )}
          </div>
          <div style={contentStyle}>
            {current === 3 && (
              <div>
                <FormItem name="name" label="商品分类">
                  <Input id="update-name" placeholder={'请输入商品名'}/>
                </FormItem>
                <FormItem name="name" label="商品名">
                  <Input id="update-name" placeholder={'请输入商品名'}/>
                </FormItem>
                <FormItem name="name" label="副标题">
                  <Input id="update-name" placeholder={'请输入商品名'}/>
                </FormItem>
                <FormItem name="name" label="商品品牌">
                  <Input id="update-name" placeholder={'请输入商品名'}/>
                </FormItem>
                <FormItem name="name" label="商品介绍">
                  <Input id="update-name" placeholder={'请输入商品名'}/>
                </FormItem>
                <FormItem name="name" label="商品货号">
                  <Input id="update-name" placeholder={'请输入商品名'}/>
                </FormItem>
                <FormItem name="name" label="商品售价">
                  <Input id="update-name" placeholder={'请输入商品名'}/>
                </FormItem>
                <FormItem name="name" label="市场价">
                  <Input id="update-name" placeholder={'请输入商品名'}/>
                </FormItem>
                <FormItem name="name" label="商品库存">
                  <Input id="update-name" placeholder={'请输入商品名'}/>
                </FormItem>
                <FormItem name="name" label="计量单位">
                  <Input id="update-name" placeholder={'请输入商品名'}/>
                </FormItem>
                <FormItem name="name" label="商品重量">
                  <Input id="update-name" placeholder={'请输入商品名'}/>
                </FormItem>
                <FormItem name="name" label="商品排序">
                  <Input id="update-name" placeholder={'请输入商品名'}/>
                </FormItem>
              </div>
            )}
          </div>
        </div>
        <div style={{marginTop: 24, textAlign: "center"}}>
          {current > 0 && (
            <Button style={{margin: '0 8px'}} onClick={() => prev()}>
              {steps[current].prePrompt}
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button type="primary" onClick={handleSubmit}>
              完成,提交商品
            </Button>
          )}
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              {steps[current].nextPrompt}
            </Button>
          )}
        </div>
      </>
    );
  };

  // const modalFooter = { okText: '保存', onOk: handleSubmit, onCancel };

  return (
    <Modal
      forceRender
      destroyOnClose
      title="添加商品"
      open={createModalVisible}
      footer={null}
      onCancel={onCancel}
      width={800}
    >
      <Form {...formLayout} form={form} onFinish={handleFinish}>
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default CreateProductForm;
