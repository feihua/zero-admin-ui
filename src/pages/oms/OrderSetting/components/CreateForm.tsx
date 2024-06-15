import React, {useEffect} from 'react';
import {Form, InputNumber, Modal, Radio} from 'antd';
import type {OrderSettingListItem} from '../data.d';

export interface CreateFormProps {
  onCancel: () => void;
  onSubmit: (values: OrderSettingListItem) => void;
  createModalVisible: boolean;
}

const FormItem = Form.Item;

const formLayout = {
  labelCol: {span: 10},
  wrapperCol: {span: 10},
};

const CreateForm: React.FC<CreateFormProps> = (props) => {
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

  const handleFinish = (values: OrderSettingListItem) => {
    if (onSubmit) {
      onSubmit(values);
    }
  };

  const renderContent = () => {
    return (
      <>

        <FormItem
          name="commentOvertime"
          label="订单完成后自动好评时间（天）"
          initialValue={7}
          rules={[{required: true, message: '请输入订单完成后自动好评时间（天）!'}]}
        >
          <InputNumber id="create-commentOvertime" placeholder={'请输入订单完成后自动好评时间（天）!'} style={{width: 255}}/>
        </FormItem>
        <FormItem
          name="confirmOvertime"
          label="发货后自动确认收货时间（天）"
          initialValue={14}
          rules={[{required: true, message: '请输入发货后自动确认收货时间（天）!'}]}
        >
          <InputNumber id="create-confirmOvertime" placeholder={'请输入发货后自动确认收货时间（天）!'} style={{width: 255}}/>
        </FormItem>
        <FormItem
          name="finishOvertime"
          initialValue={14}
          label="自动完成交易时间，不能申请售后（天）"
          rules={[{required: true, message: '请输入自动完成交易时间，不能申请售后（天）!'}]}
        >
          <InputNumber id="create-finishOvertime" placeholder={'请输入自动完成交易时间，不能申请售后（天）!'} style={{width: 255}}/>
        </FormItem>
        <FormItem
          name="flashOrderOvertime"
          label="秒杀订单超时关闭时间(分)"
          initialValue={30}
          rules={[{required: true, message: '请输入秒杀订单超时关闭时间(分)!'}]}
        >
          <InputNumber id="create-flashOrderOvertime" placeholder={'请输入秒杀订单超时关闭时间(分)!'} style={{width: 255}}/>
        </FormItem>
        <FormItem
          name="normalOrderOvertime"
          label="正常订单超时时间(分)"
          initialValue={30}
          rules={[{required: true, message: '请输入正常订单超时时间(分)!'}]}
        >
          <InputNumber id="create-normalOrderOvertime" placeholder={'请输入正常订单超时时间(分)!'} style={{width: 255}}/>
        </FormItem>
        <FormItem
          name="isDefault"
          label="是否默认"
          initialValue={0}
          rules={[{required: true, message: '请输入是否默认!'}]}
        >
          <Radio.Group>
            <Radio value={0}>否</Radio>
            <Radio value={1}>是</Radio>
          </Radio.Group>
        </FormItem>

        <FormItem
          name="status"
          label="状态"
          initialValue={1}
          rules={[{required: true, message: '请输入状态!'}]}
        >
          <Radio.Group>
            <Radio value={0}>禁用</Radio>
            <Radio value={1}>启用</Radio>
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
      title="新增"
      open={createModalVisible}
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

export default CreateForm;
