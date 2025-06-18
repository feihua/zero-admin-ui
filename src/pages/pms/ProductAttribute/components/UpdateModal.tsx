import React, { useEffect, useState } from 'react';
import { Form, Input, InputNumber, Modal, Radio, Select } from 'antd';
import type { ProductAttributeListItem} from '../data.d';
import { queryProductAttributeGroupList } from '@/pages/pms/ProductAttributeGroup/service';
import { ProductAttributeGroupListItem } from '@/pages/pms/ProductAttributeGroup/data';

export interface UpdateModalProps {
  onCancel: () => void;
  onSubmit: (values: ProductAttributeListItem) => void;
  updateVisible: boolean;
  currentData: Partial<ProductAttributeListItem>;
}

const FormItem = Form.Item;

const formLayout = {
  labelCol: {span: 7},
  wrapperCol: {span: 13},
};

const UpdateModal: React.FC<UpdateModalProps> = (props) => {
  const [form] = Form.useForm();
  const [categoryListItems, setCategoryListItems] = useState<ProductAttributeGroupListItem[]>([]);
  const {
    onSubmit,
    onCancel,
    updateVisible,
    currentData,
  } = props;

  useEffect(() => {
    if (form && !updateVisible) {
      form.resetFields();
    }else {
      queryProductAttributeGroupList({pageSize: 100, current: 1}).then((res) => {
        setCategoryListItems(res.data)
      });
    }
  }, [props.updateVisible]);

  useEffect(() => {
    if (currentData) {
      form.setFieldsValue({
        ...currentData,
      });
    }
  }, [props.currentData]);

  const handleSubmit = () => {
    if (!form) return;
    form.submit();
  };

  const handleFinish = (values: { [key: string]: any }) => {
    if (onSubmit) {
      onSubmit(values as ProductAttributeListItem);
    }
  };

  const renderContent = () => {
    return (
      <>
        <FormItem
          name="id"
          label="主键"
          hidden
        >
          <Input id="update-id"/>
        </FormItem>


        <FormItem
          name="groupId"
          label="属性分组"
          rules={[{required: true, message: '请输入属性分组!'}]}
        >
          <Select id="groupId" placeholder={'请输入属性分组'}>
            {categoryListItems.map(r => <Select.Option value={r.id}>{r.name}</Select.Option>)}
          </Select>
        </FormItem>
        <FormItem
          name="name"
          label="属性名称"
          rules={[{required: true, message: '请输入属性名称!'}]}
        >
          <Input id="update-name" placeholder={'请输入属性名称!'}/>
        </FormItem>
        <FormItem
          name="inputType"
          label="输入类型"
          rules={[{required: true, message: '请选择输入类型!'}]}
        >
          <Radio.Group>
            <Radio value={1}>手动输入</Radio>
            <Radio value={2}>单选</Radio>
            <Radio value={3}>多选</Radio>
          </Radio.Group>
        </FormItem>
        <FormItem
          name="valueType"
          label="值类型"
          rules={[{required: true, message: '请输入值类型!'}]}
        >
          <Radio.Group>
            <Radio value={1}>文本</Radio>
            <Radio value={2}>数字</Radio>
            <Radio value={3}>日期</Radio>
          </Radio.Group>
        </FormItem>
        <FormItem
          name="inputList"
          label="可选值列表"
          rules={[{required: true, message: '请输入可选值列表，用逗号分隔!'}]}
        >
          <Input id="update-inputList" placeholder={'请输入可选值列表，用逗号分隔!'}/>
        </FormItem>
        <FormItem
          name="unit"
          label="单位"
          rules={[{required: true, message: '请输入单位!'}]}
        >
          <Input id="update-unit" placeholder={'请输入单位!'}/>
        </FormItem>
        <FormItem
          name="isRequired"
          label="是否必填"
          rules={[{required: true, message: '请输入是否必填!'}]}
        >
          <Radio.Group>
            <Radio value={0}>否</Radio>
            <Radio value={1}>是</Radio>
          </Radio.Group>
        </FormItem>
        <FormItem
          name="isSearchable"
          label="是否支持搜索"
          rules={[{required: true, message: '请输入是否支持搜索!'}]}
        >
          <Radio.Group>
            <Radio value={0}>否</Radio>
            <Radio value={1}>是</Radio>
          </Radio.Group>
        </FormItem>
        <FormItem
          name="isShow"
          label="是否显示"
          rules={[{required: true, message: '请输入是否显示!'}]}
        >
          <Radio.Group>
            <Radio value={0}>否</Radio>
            <Radio value={1}>是</Radio>
          </Radio.Group>
        </FormItem>
        <FormItem
          name="sort"
          label="排序"
          rules={[{required: true, message: '请输入排序!'}]}
        >
          <InputNumber style={ {width: 255} }/>
        </FormItem>
        <FormItem
          name="status"
          label="状态"
          rules={[{required: true, message: '请输入状态!'}]}
        >
          <Radio.Group>
            <Radio value={0}>禁用</Radio>
            <Radio value={1}>正常</Radio>
          </Radio.Group>
        </FormItem>
      </>
    );
  };


  const modalFooter = {okText: '保存', onOk: handleSubmit, onCancel};

  return (
    <Modal
      forceRender
      destroyOnClose
      title="编辑"
      open={updateVisible}
      {...modalFooter}
    >
      <Form
        {...formLayout}
        form={form}
        onFinish={handleFinish}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateModal;
