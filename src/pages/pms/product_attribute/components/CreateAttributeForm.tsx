import React, {useEffect, useState} from 'react';
import {Form, Input, InputNumber, Modal, Radio, Select} from 'antd';
import type {RadioChangeEvent} from 'antd';
import type {AttributeListItem} from '../data.d';
import type {AttributeCategoryListItem} from "@/pages/pms/product_attribute_category/data";
import {queryAttributeCategoryList} from "@/pages/pms/product_attribute_category/service";

export interface CreateFormProps {
  onCancel: () => void;
  onSubmit: (values: AttributeListItem) => void;
  createModalVisible: boolean;
}

const FormItem = Form.Item;

const formLayout = {
  labelCol: {span: 7},
  wrapperCol: {span: 13},
};

const CreateAttributeForm: React.FC<CreateFormProps> = (props) => {
  const [form] = Form.useForm();

  const [inputType, setInputType] = useState<number>(1);
  const [categoryListItems, setCategoryListItems] = useState<AttributeCategoryListItem[]>([]);

  const {onSubmit, onCancel, createModalVisible} = props;

  useEffect(() => {
    if (form && !createModalVisible) {
      form.resetFields();
    } else {
      queryAttributeCategoryList({pageSize: 100, current: 1}).then((res) => {
        setCategoryListItems(res.data)
      });
    }

  }, [props.createModalVisible]);


  const handleSubmit = () => {
    if (!form) return;
    form.submit();
  };

  const handleFinish = (values: AttributeListItem) => {
    if (onSubmit) {
      onSubmit(values);
    }
  };

  const onChange = (e: RadioChangeEvent) => {
    setInputType(e.target.value);
  };

  const renderContent = () => {
    return (
      <>
        <FormItem name="name" label="规格/参数名称" rules={[{required: true, message: '请输入规格/参数名称!'}]}>
          <Input id="update-name" placeholder={'请输入规格/参数名称'}/>
        </FormItem>
        <FormItem name="productAttributeCategoryId" label="属性分类" rules={[{required: true, message: '请选择属性分类!'}]}>
          <Select id="productAttributeCategoryId" placeholder={'请选择属性分类'}>
            {categoryListItems.map(r => <Select.Option value={r.id}>{r.name}</Select.Option>)}
          </Select>
        </FormItem>
        <FormItem name="filterType" label="分类筛选样式" initialValue={0} rules={[{required: true, message: '请选择分类筛选样式!'}]}>
          <Radio.Group>
            <Radio value={0}>普通</Radio>
            <Radio value={1}>颜色</Radio>
          </Radio.Group>
        </FormItem>
        <FormItem name="searchType" label="能否进行检索" initialValue={0} rules={[{required: true, message: '请选择能否进行检索!'}]}>
          <Radio.Group>
            <Radio value={0}>不需要进行检索</Radio>
            <Radio value={1}>关键字检索</Radio>
            <Radio value={2}>范围检索</Radio>
          </Radio.Group>
        </FormItem>
        <FormItem name="relatedStatus" label="商品属性关联" initialValue={1} rules={[{required: true, message: '请选择商品属性关联!'}]}>
          <Radio.Group>
            <Radio value={0}>不关联</Radio>
            <Radio value={1}>关联</Radio>
          </Radio.Group>
        </FormItem>
        <FormItem name="selectType" label="属性是否可选" initialValue={0} rules={[{required: true, message: '请选择属性是否可选!'}]}>
          <Radio.Group>
            <Radio value={0}>唯一</Radio>
            <Radio value={1}>单选</Radio>
            <Radio value={2}>多选</Radio>
          </Radio.Group>
        </FormItem>
        <FormItem name="inputType" label="属性值的录入方式" initialValue={inputType} rules={[{required: true, message: '请选择属性值的录入方式!'}]}>
          <Radio.Group onChange={onChange} value={inputType}>
            <Radio value={0}>手工录入</Radio>
            <Radio value={1}>从列表中选取</Radio>
          </Radio.Group>
        </FormItem>
        {inputType === 1 && <FormItem name="inputList" label="属性值可选值列表">
          <Input.TextArea rows={3} placeholder={'请输入属性值可选值列表,可选值列表，以逗号隔开'}/>
        </FormItem>}
        <FormItem name="handAddStatus" label="是否支持手动新增" initialValue={1} rules={[{required: true, message: '请选择是否支持手动新增!'}]}>
          <Radio.Group>
            <Radio value={0}>不支持</Radio>
            <Radio value={1}>支持</Radio>
          </Radio.Group>
        </FormItem>
        <FormItem name="type" label="属性的类型" initialValue={1} rules={[{required: true, message: '请选择属性的类型!'}]}>
          <Radio.Group>
            <Radio value={0}>规格</Radio>
            <Radio value={1}>参数</Radio>
          </Radio.Group>
        </FormItem>
        <FormItem name="sort" label="排序" initialValue={0} rules={[{required: true, message: '请输入排序!'}]}>
          <InputNumber/>
        </FormItem>
      </>
    );
  };

  const modalFooter = {okText: '保存', onOk: handleSubmit, onCancel};

  return (
    <Modal
      forceRender
      destroyOnClose
      title="新建属性"
      open={createModalVisible}
      {...modalFooter}
      width={800}
    >
      <Form {...formLayout} form={form} onFinish={handleFinish}>
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default CreateAttributeForm;
