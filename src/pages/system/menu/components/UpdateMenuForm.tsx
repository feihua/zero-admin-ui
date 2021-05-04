import React, { useEffect } from 'react';
import { Form, Input, Modal } from 'antd';
import { MenuListItem } from '../data.d';

export interface UpdateFormProps {
  onCancel: () => void;
  onSubmit: (values: Partial<MenuListItem>) => void;
  updateModalVisible: boolean;
  currentData: Partial<MenuListItem>;
}
const FormItem = Form.Item;

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const UpdateMenuForm: React.FC<UpdateFormProps> = (props) => {
  const [form] = Form.useForm();

  const { onSubmit, onCancel, updateModalVisible, currentData } = props;

  useEffect(() => {
    if (form && !updateModalVisible) {
      form.resetFields();
    }
  }, [props.updateModalVisible]);

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
      onSubmit(values);
    }
  };

  const renderContent = () => {
    return (
      <>
        <FormItem name="id" label="主键" hidden>
          <Input id="update-id" placeholder="请输入主键" />
        </FormItem>
        <FormItem name="name" label="菜单名称">
          <Input id="update-name" placeholder={'请输入菜单名称'} />
        </FormItem>
        <FormItem name="parentId" label="父id" hidden>
          <Input id="update-parentId" placeholder={'请输入父id'} />
        </FormItem>
        <FormItem name="url" label="路径">
          <Input id="update-url" placeholder={'请输入路径'} />
        </FormItem>
        <FormItem name="type" label="类型">
          <Input id="update-type" placeholder={'请输入类型'} />
        </FormItem>
        <FormItem name="icon" label="图标">
          <Input id="update-icon" placeholder={'请输入图标'} />
        </FormItem>
        <FormItem name="orderNum" label="排序">
          <Input id="update-orderNum" placeholder={'请输入排序'} />
        </FormItem>
      </>
    );
  };

  const modalFooter = { okText: '保存', onOk: handleSubmit, onCancel };

  return (
    <Modal
      forceRender
      destroyOnClose
      title="修改菜单"
      visible={updateModalVisible}
      {...modalFooter}
    >
      <Form {...formLayout} form={form} onFinish={handleFinish}>
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateMenuForm;
