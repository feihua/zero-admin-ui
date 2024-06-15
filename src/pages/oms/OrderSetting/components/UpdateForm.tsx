import React, {useEffect} from 'react';
import {Form, Input, InputNumber, Modal} from 'antd';
import type {OrderSettingListItem} from '../data.d';

export interface UpdateFormProps {
  onCancel: () => void;
  onSubmit: (values: OrderSettingListItem) => void;
  updateModalVisible: boolean;
  currentData: Partial<OrderSettingListItem>;
}

const FormItem = Form.Item;

const formLayout = {
  labelCol: {span: 10},
  wrapperCol: {span: 10},
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
      onSubmit(values as OrderSettingListItem);
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
          name="commentOvertime"
          label="订单完成后自动好评时间（天）"
          rules={[{required: true, message: '请输入订单完成后自动好评时间（天）!'}]}
        >
          <InputNumber id="create-commentOvertime" placeholder={'请输入订单完成后自动好评时间（天）!'}
                       style={{width: 255}}/>
        </FormItem>
        <FormItem
          name="confirmOvertime"
          label="发货后自动确认收货时间（天）"
          rules={[{required: true, message: '请输入发货后自动确认收货时间（天）!'}]}
        >
          <InputNumber id="create-confirmOvertime" placeholder={'请输入发货后自动确认收货时间（天）!'}
                       style={{width: 255}}/>
        </FormItem>
        <FormItem
          name="finishOvertime"
          label="自动完成交易时间，不能申请售后（天）"
          rules={[{required: true, message: '请输入自动完成交易时间，不能申请售后（天）!'}]}
        >
          <InputNumber id="create-finishOvertime" placeholder={'请输入自动完成交易时间，不能申请售后（天）!'}
                       style={{width: 255}}/>
        </FormItem>
        <FormItem
          name="flashOrderOvertime"
          label="秒杀订单超时关闭时间(分)"
          rules={[{required: true, message: '请输入秒杀订单超时关闭时间(分)!'}]}
        >
          <InputNumber id="create-flashOrderOvertime" placeholder={'请输入秒杀订单超时关闭时间(分)!'}
                       style={{width: 255}}/>
        </FormItem>
        <FormItem
          name="normalOrderOvertime"
          label="正常订单超时时间(分)"
          rules={[{required: true, message: '请输入正常订单超时时间(分)!'}]}
        >
          <InputNumber id="create-normalOrderOvertime" placeholder={'请输入正常订单超时时间(分)!'}
                       style={{width: 255}}/>
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
      width={700}
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
