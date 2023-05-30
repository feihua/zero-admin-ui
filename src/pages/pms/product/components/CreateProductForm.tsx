import React, {useEffect, useState} from 'react';
import {
  Button, Form, Modal, Input, Steps, Select, InputNumber, TreeSelect, message, Cascader,
  Switch, Radio, Checkbox, RadioChangeEvent, DatePicker, Transfer
} from 'antd';
import type {ProductListItem} from '../data.d';
import {queryBrand} from "@/pages/pms/product_brand/service";
import type {BrandListItem} from "@/pages/pms/product_brand/data";
import {queryCategory} from "@/pages/pms/product_category/service";
import type {CategoryListItem} from "@/pages/pms/product_category/data";
import {tree} from "@/utils/utils";
import {queryCategoryAttribute} from "@/pages/pms/product_attribute_category/service";
import {AttributeCategoryListItem} from "@/pages/pms/product_attribute_category/data";
import type {TransferDirection} from "antd/es/transfer";

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
  const [promotionTypes, setPromotionTypes] = useState(0);

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
  const [attributeCategoryListItem, setAttributeCategoryListItem] = useState<AttributeCategoryListItem[]>([]);

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

  const options = [
    {label: '无忧退货', value: '1'},
    {label: '快速退款', value: '2'},
    {label: '免费包邮', value: '3'},
  ];

  const onChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setPromotionTypes(e.target.value);
    console.log('radio checked', promotionTypes);
  };

  interface RecordType {
    key: string;
    title: string;
    description: string;
  }

  const mockData: RecordType[] = Array.from({length: 20}).map((_, i) => ({
    key: i.toString(),
    title: `content${i + 1}`,
    description: `description of content${i + 1}`,
  }));

  const initialTargetKeys = mockData.filter((item) => Number(item.key) > 10).map((item) => item.key);

  const [targetKeys, setTargetKeys] = useState(initialTargetKeys);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const onChange1 = (nextTargetKeys: string[], direction: TransferDirection, moveKeys: string[]) => {
    console.log('targetKeys:', nextTargetKeys);
    console.log('direction:', direction);
    console.log('moveKeys:', moveKeys);
    setTargetKeys(nextTargetKeys);
  };

  const onSelectChange = (sourceSelectedKeys: string[], targetSelectedKeys: string[]) => {
    console.log('sourceSelectedKeys:', sourceSelectedKeys);
    console.log('targetSelectedKeys:', targetSelectedKeys);
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };

  const onScroll = (direction: TransferDirection, e: React.SyntheticEvent<HTMLUListElement>) => {
    console.log('direction:', direction);
    console.log('target:', e.target);
  };

  const renderContent = () => {
    return (
      <>
        <Steps current={current} items={items}/>
        <div style={contentStyle}>
          {current === 0 && (
            <div>
              <FormItem name="productCategoryId" label="商品分类">
                {/*<TreeSelect*/}
                {/*  style={{width: '100%'}}*/}
                {/*  dropdownStyle={{maxHeight: 400, overflow: 'auto'}}*/}
                {/*  treeData={categoryListItem}*/}
                {/*  placeholder="请选择商品分类"*/}
                {/*  treeDefaultExpandAll*/}
                {/*/>*/}
                <Cascader
                  options={categoryListItem}
                  placeholder="请选择商品分类"
                ></Cascader>
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
                <FormItem name="giftPoint" label="赠送积分" initialValue={0}>
                  <InputNumber style={{width: 407}}/>
                </FormItem>
                <FormItem name="giftGrowth" label="赠送成长值" initialValue={0}>
                  <InputNumber style={{width: 407}}/>
                </FormItem>
                <FormItem name="usePointLimit" label="积分购买限制" initialValue={0}>
                  <InputNumber style={{width: 407}}/>
                </FormItem>
                <FormItem name="previewStatus" label="预告商品" style={{textAlign: "left"}}>
                  <Switch/>
                </FormItem>
                <FormItem name="publishStatus" label="商品上架" style={{textAlign: "left"}}>
                  <Switch/>
                </FormItem>
                <FormItem name="recommandStatus" label="商品推荐" style={{textAlign: "left"}}>
                  <Switch/>
                </FormItem>
                <FormItem name="serviceIds" label="服务保证" style={{textAlign: "left"}}>
                  <Checkbox.Group options={options}/>
                </FormItem>
                <FormItem name="detailTitle" label="详细页标题">
                  <Input id="update-detailTitle" placeholder={'请输入详细页标题'}/>
                </FormItem>
                <FormItem name="detailDesc" label="详细页描述">
                  <Input id="update-detailDesc" placeholder={'请输入详细页描述'}/>
                </FormItem>
                <FormItem name="keywords" label="关键字">
                  <Input id="update-keywords" placeholder={'请输入关键字'}/>
                </FormItem>
                <FormItem name="note" label="备注">
                  <Input.TextArea rows={2} placeholder={'请输入备注'}/>
                </FormItem>
                <FormItem name="promotionType" label="选择优惠方式">
                  <Radio.Group defaultValue={0} size="small" buttonStyle="solid" onChange={onChange}>
                    <Radio.Button value={0}>无优惠</Radio.Button>
                    <Radio.Button value={1}>特惠促销</Radio.Button>
                    <Radio.Button value={2}>会员价格</Radio.Button>
                    <Radio.Button value={3}>阶梯价格</Radio.Button>
                    <Radio.Button value={4}>满减价格</Radio.Button>
                    {/*<Radio.Button value={5}>限时购</Radio.Button>*/}
                  </Radio.Group>
                </FormItem>

                {promotionTypes === 1 && (
                  <div>
                    <FormItem name="startTime" label="开始时间" style={{textAlign: "left"}}>
                      <DatePicker showTime placeholder={'请输入开始时间'}/>
                    </FormItem>
                    <FormItem name="endTIme" label="结束时间" style={{textAlign: "left"}}>
                      <DatePicker showTime placeholder={'请输入结束时间'}/>
                    </FormItem>
                    <FormItem name="keywords" label="促销价格" style={{textAlign: "left"}}>
                      <InputNumber addonAfter={'元'}/>
                    </FormItem>
                  </div>
                )}
                {promotionTypes === 2 && (
                  <div>
                    <FormItem name="keywords" label="黄金会员" initialValue={100} style={{textAlign: "left"}}>
                      <InputNumber addonAfter={'元'}/>
                    </FormItem>
                    <FormItem name="keywords" label="白金会员" initialValue={200} style={{textAlign: "left"}}>
                      <InputNumber addonAfter={'元'}/>
                    </FormItem>
                    <FormItem name="keywords" label="钻石会员" initialValue={300} style={{textAlign: "left"}}>
                      <InputNumber addonAfter={'元'}/>
                    </FormItem>
                  </div>
                )}
                {promotionTypes === 3 && (
                  <>
                    <FormItem name="keywords" label="满减">
                      <Input id="update-keywords" placeholder={'100-10'}/>
                    </FormItem>
                    <FormItem name="keywords" label="满减">
                      <Input id="update-keywords" placeholder={'500-60'}/>
                    </FormItem>
                    <FormItem name="keywords" label="满减">
                      <Input id="update-keywords" placeholder={'1000-150'}/>
                    </FormItem>
                  </>
                )}
                {promotionTypes === 4 && (
                  <div>
                    <FormItem name="keywords" label="满减">
                      <Input id="update-keywords" placeholder={'100-10'}/>
                    </FormItem>
                    <FormItem name="keywords" label="满减">
                      <Input id="update-keywords" placeholder={'500-60'}/>
                    </FormItem>
                    <FormItem name="keywords" label="满减">
                      <Input id="update-keywords" placeholder={'1000-150'}/>
                    </FormItem>
                  </div>
                )}
                {promotionTypes === 5 && (
                  <div>
                    <FormItem name="keywords" label="开始时间">
                      <Input id="update-keywords" placeholder={'请输入关键字'}/>
                    </FormItem>
                    <FormItem name="keywords" label="结束时间">
                      <Input id="update-keywords" placeholder={'请输入关键字'}/>
                    </FormItem>
                    <FormItem name="keywords" label="促销价格">
                      <Input id="update-keywords" placeholder={'请输入关键字'}/>
                    </FormItem>
                  </div>
                )}
              </div>
            )}
          </div>
          <div style={contentStyle}>
            {current === 2 && (
              <div>
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

              </div>
            )}
          </div>
          <div style={contentStyle}>
            {current === 3 && (
              <div>
                <Transfer
                  dataSource={mockData}
                  titles={['Source', 'Target']}
                  targetKeys={targetKeys}
                  selectedKeys={selectedKeys}
                  onChange={onChange1}
                  onSelectChange={onSelectChange}
                  onScroll={onScroll}
                  render={(item) => item.title}
                />
                <Transfer
                  dataSource={mockData}
                  titles={['Source', 'Target']}
                  targetKeys={targetKeys}
                  selectedKeys={selectedKeys}
                  onChange={onChange1}
                  onSelectChange={onSelectChange}
                  onScroll={onScroll}
                  render={(item) => item.title}
                />
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
