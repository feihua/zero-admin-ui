import React, {useEffect} from 'react';
import {Form, Input, InputNumber, Modal} from 'antd';
import type {OrderReturnReasonListItem} from '../data.d';

export interface UpdateFormProps {
  onCancel: () => void;
  onSubmit: (values: OrderReturnReasonListItem) => void;
  updateModalVisible: boolean;
  currentData: Partial<OrderReturnReasonListItem>;
}

const FormItem = Form.Item;

const formLayout = {
  labelCol: {span: 7},
  wrapperCol: {span: 13},
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const [form] = Form.useForm();

  const {
    onSubmit,
    onCancel,
    updateModalVisible,
    currentData,
  } = props;

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
      onSubmit(values as OrderReturnReasonListItem);
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
          name="name"
          label="退货类型"
          rules={[{required: true, message: '请输入退货类型!'}]}
        >
          <Input id="create-name" placeholder={'请输入退货类型!'}/>
        </FormItem>
        <FormItem
          name="sort"
          label="排序"
          rules={[{required: true, message: '请输入排序!'}]}
        >
          <InputNumber style={{width: 255}}/>
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
      open={updateModalVisible}
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

export default UpdateForm;
