import React, { useEffect } from 'react';
import { Form, Input, Modal, Select } from 'antd';
import { CategoryListItem } from '../data.d';

export interface CreateFormProps {
  onCancel: () => void;
  onSubmit: (values: CategoryListItem) => void;
  createModalVisible: boolean;
}
const FormItem = Form.Item;

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const CreateCategoryForm: React.FC<CreateFormProps> = (props) => {
  const [form] = Form.useForm();
  const { Option } = Select;

  const { onSubmit, onCancel, createModalVisible } = props;

  useEffect(() => {
    if (form && !createModalVisible) {
      form.resetFields();
    }
  }, [props.createModalVisible]);

  const handleSubmit = () => {
    if (!form) return;
    form.submit();
  };

  const handleFinish = (values: CategoryListItem) => {
    if (onSubmit) {
      onSubmit(values);
    }
  };

  const renderContent = () => {
    return (
      <>
        <FormItem name="name" label="分类名称">
          <Input id="update-name" placeholder={'请输入分类名称'} />
        </FormItem>
        <FormItem name="icon" label="图标">
          <Input id="update-icon" placeholder={'请输入图标'} />
        </FormItem>
        <FormItem name="productCount" label="产品数量">
          <Input id="update-productCount" placeholder={'请输入产品数量'} />
        </FormItem>
        <FormItem name="productUnit" label="产品单位">
          <Input id="update-productUnit" placeholder={'请输入产品单位'} />
        </FormItem>
        <FormItem name="navStatus" label="是否显示在导航栏">
          <Select id="navStatus" placeholder={'请选择是否显示在导航栏'}>
            <Option value={0}>否</Option>
            <Option value={1}>是</Option>
          </Select>
        </FormItem>
        <FormItem name="showStatus" label="显示状态">
          <Select id="showStatus" placeholder={'请选择显示状态'}>
            <Option value={0}>否</Option>
            <Option value={1}>是</Option>
          </Select>
        </FormItem>
        <FormItem name="description" label="描述">
          <Input id="update-description" placeholder={'请输入描述'} />
        </FormItem>
      </>
    );
  };

  const modalFooter = { okText: '保存', onOk: handleSubmit, onCancel };

  return (
    <Modal
      forceRender
      destroyOnClose
      title="新建用户"
      visible={createModalVisible}
      {...modalFooter}
    >
      <Form {...formLayout} form={form} onFinish={handleFinish}>
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default CreateCategoryForm;
