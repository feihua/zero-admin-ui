import React, { useEffect } from 'react';
import { Form, Input, Modal } from 'antd';
import { DictListItem } from '../data.d';

export interface CreateFormProps {
  onCancel: () => void;
  onSubmit: (values: DictListItem) => void;
  createModalVisible: boolean;
}
const FormItem = Form.Item;

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const CreateDictForm: React.FC<CreateFormProps> = (props) => {
  const [form] = Form.useForm();

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

  const handleFinish = (values: DictListItem) => {
    if (onSubmit) {
      onSubmit(values);
    }
  };

  const renderContent = () => {
    return (
      <>
        <FormItem name="value" label="数据值">
          <Input id="update-value" placeholder={'请输入数据值'} />
        </FormItem>
        <FormItem name="label" label="标签名">
          <Input id="update-label" placeholder={'请输入标签名'} />
        </FormItem>
        <FormItem name="type" label="类型">
          <Input id="update-type" placeholder={'请输入类型'} />
        </FormItem>
        <FormItem name="sort" label="排序">
          <Input id="update-sort" placeholder={'请输入排序'} />
        </FormItem>
        <FormItem name="description" label="描述">
          <Input.TextArea id="update-description" placeholder={'请输入描述'} rows={4} />
        </FormItem>

        <FormItem name="remarks" label="备注">
          <Input.TextArea id="update-remarks" placeholder={'请输入备注'} rows={4} />
        </FormItem>
      </>
    );
  };

  const modalFooter = { okText: '保存', onOk: handleSubmit, onCancel };

  return (
    <Modal
      forceRender
      destroyOnClose
      title="新建字典"
      visible={createModalVisible}
      {...modalFooter}
    >
      <Form {...formLayout} form={form} onFinish={handleFinish}>
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default CreateDictForm;
