import React, { useEffect } from 'react';
import { Form, Input, Modal } from 'antd';
import { DeptListItem } from '../data.d';

export interface CreateFormProps {
  onCancel: () => void;
  onSubmit: (values: DeptListItem) => void;
  createModalVisible: boolean;
  parentId: number;
}
const FormItem = Form.Item;

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const CreateDeptForm: React.FC<CreateFormProps> = (props) => {
  const [form] = Form.useForm();

  const { onSubmit, onCancel, createModalVisible } = props;

  useEffect(() => {
    if (form && !createModalVisible) {
      form.resetFields();
    }
  }, [props.createModalVisible]);

  useEffect(() => {
    if (props.parentId) {
      form.setFieldsValue({
        parentId: props.parentId,
      });
    }
  }, [props.parentId]);

  const handleSubmit = () => {
    if (!form) return;
    form.submit();
  };

  const handleFinish = (values: DeptListItem) => {
    if (onSubmit) {
      onSubmit(values);
    }
  };

  const renderContent = () => {
    return (
      <>
        <FormItem name="name" label="机构名称">
          <Input id="update-name" placeholder={'请输入机构名称'} />
        </FormItem>
        <FormItem name="parentId" label="父id" hidden>
          <Input id="update-parentId" placeholder={'请输入父id'} />
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
      title="新建机构"
      visible={createModalVisible}
      {...modalFooter}
    >
      <Form {...formLayout} form={form} onFinish={handleFinish}>
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default CreateDeptForm;
