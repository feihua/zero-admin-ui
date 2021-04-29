import React, {useEffect} from 'react';
import {Form, Input, Modal} from 'antd';
import { CouponListItem } from '../data.d';

export interface CreateFormProps {
  onCancel: () => void;
  onSubmit: (values: CouponListItem) => void;
  createModalVisible: boolean;
}
const FormItem = Form.Item;

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const CreateCouponForm: React.FC<CreateFormProps> = (props) => {
  const [form] = Form.useForm();


  const {
    onSubmit,
    onCancel,
    createModalVisible,
  } = props;

  useEffect(() => {
    if (form && !createModalVisible) {
      form.resetFields();

    }
  }, [props.createModalVisible]);


  const handleSubmit = () => {
    if (!form) return;
    form.submit();
  };

  const handleFinish = (values: CouponListItem) => {
    if (onSubmit) {
      onSubmit(values);
    }
  };

  const renderContent = () => {
    return (
      <>
        <FormItem
          name="name"
          label="优惠券名"
        >
          <Input id="update-name" placeholder={'请输入优惠券名'}/>
        </FormItem>
        <FormItem
          name="count"
          label="数量"
        >
          <Input id="update-count" placeholder={'请输入数量'}/>
        </FormItem>
        <FormItem
          name="amount"
          label="金额"
        >
          <Input id="update-amount" placeholder={'请输入金额'}/>
        </FormItem>
        <FormItem
          name="perLimit"
          label="每人限领张数"
        >
          <Input id="update-perLimit" placeholder={'请输入每人限领张数'}/>
        </FormItem>
        <FormItem
          name="publishCount"
          label="发行数量"
        >
          <Input id="update-publishCount" placeholder={'请输入发行数量'}/>
        </FormItem>

        <FormItem
          name="useCount"
          label="已使用数量"
        >
          <Input id="update-useCount" placeholder={'请输入已使用数量'}/>
        </FormItem>

        <FormItem
          name="receiveCount"
          label="领取数量"
        >
          <Input id="update-receiveCount" placeholder={'请输入领取数量'}/>
        </FormItem>
      </>
    );
  };


  const modalFooter = { okText: '保存', onOk: handleSubmit, onCancel };

  return (
    <Modal
      forceRender
      destroyOnClose
      title="新建优惠券信息"
      visible={createModalVisible}
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

export default CreateCouponForm;
