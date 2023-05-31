import React, {useEffect} from 'react';
import {Form, Input, InputNumber, Modal, Space, Tooltip} from 'antd';
import type {SettingListItem} from '../data.d';

export interface UpdateFormProps {
  onCancel: () => void;
  onSubmit: (values: SettingListItem) => void;
  updateModalVisible: boolean;
  currentData: Partial<SettingListItem>;
}

const FormItem = Form.Item;

const formLayout = {
  labelCol: {span: 7},
  wrapperCol: {span: 17},
};

const UpdateSettingForm: React.FC<UpdateFormProps> = (props) => {
  const [form] = Form.useForm();

  const {
    onSubmit,
    onCancel,
    updateModalVisible,
    currentData,
  } = props;

  useEffect(() => {
    if (currentData) {
      form.setFieldsValue({
        ...props.currentData,
      });
    }
  }, [props.currentData]);

  const handleSubmit = () => {
    if (!form) return;
    form.submit();
  };

  const handleFinish = (values: { [key: string]: any }) => {
    if (onSubmit) {
      onSubmit(values as SettingListItem);
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
          <Input id="update-id" placeholder="请输入主键"/>
        </FormItem>
        <FormItem label="秒杀订单超过">
          <Space>
            <FormItem
              name="flashOrderOvertime"
              noStyle
              rules={[{required: true, message: '请输入秒杀订单超时关闭时间(分)!'}]}
            >
              <InputNumber addonAfter={'分'}/>
            </FormItem>
            <Tooltip>
              未付款，订单自动关闭
            </Tooltip>
          </Space>
        </FormItem>
        <FormItem label="正常订单超过">
          <Space>
            <FormItem
              name="normalOrderOvertime"
              noStyle
              rules={[{required: true, message: '请输入正常订单超时时间(分)!'}]}
            >
              <InputNumber addonAfter={'分'}/>
            </FormItem>
            <Tooltip>
              未付款，订单自动关闭
            </Tooltip>
          </Space>
        </FormItem>
        <FormItem label="发货时间超过">
          <Space>
            <FormItem
              name="confirmOvertime"
              noStyle
              rules={[{required: true, message: '请输入发货后自动确认收货时间（天）!'}]}
            >
              <InputNumber addonAfter={'天'}/>
            </FormItem>
            <Tooltip>
              未收货，订单自动完成
            </Tooltip>
          </Space>
        </FormItem>
        <FormItem label="订单完成超过">
          <Space>
            <FormItem
              name="finishOvertime"
              noStyle
              rules={[{required: true, message: '请输入自动完成交易时间（天）!'}]}
            >
              <InputNumber addonAfter={'天'}/>
            </FormItem>
            <Tooltip>
              自动结束交易，不能申请售后
            </Tooltip>
          </Space>
        </FormItem>
        <FormItem label="订单完成超过">
          <Space>
            <FormItem
              name="commentOvertime"
              noStyle
              rules={[{required: true, message: '请输入订单完成后自动好评时间（天）!'}]}
            >
              <InputNumber addonAfter={'天'}/>
            </FormItem>
            <Tooltip>
              自动五星好评
            </Tooltip>
          </Space>
        </FormItem>
      </>
    );
  };


  const modalFooter = {okText: '保存', onOk: handleSubmit, onCancel};

  return (
    <Modal
      forceRender
      destroyOnClose
      title="修改订单设置"
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

export default UpdateSettingForm;
