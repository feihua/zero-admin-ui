import React, { useEffect } from 'react';
import { Form, InputNumber, Modal, Radio } from 'antd';
import type { OrderSettingListItem } from '../data.d';

export interface AddModalProps {
  onCancel: () => void;
  onSubmit: (values: OrderSettingListItem) => void;
  addVisible: boolean;
}

const FormItem = Form.Item;

const formLayout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 12 },
};

const AddModal: React.FC<AddModalProps> = (props) => {
  const [form] = Form.useForm();

  const { onSubmit, onCancel, addVisible } = props;

  useEffect(() => {
    if (form && !addVisible) {
      form.resetFields();
    }
  }, [props.addVisible]);

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
          name="flashOrderOvertime"
          label="秒杀订单超时关闭时间(分)"
          rules={[{ required: true, message: '请输入秒杀订单超时关闭时间(分)!' }]}
        >
          <InputNumber
            id="create-flashOrderOvertime"
            placeholder={'请输入秒杀订单超时关闭时间(分)!'}
            style={{ width: 275 }}
          />
        </FormItem>
        <FormItem
          name="normalOrderOvertime"
          label="正常订单超时时间(分)"
          rules={[{ required: true, message: '请输入正常订单超时时间(分)!' }]}
        >
          <InputNumber
            id="create-normalOrderOvertime"
            placeholder={'请输入正常订单超时时间(分)!'}
            style={{ width: 275 }}
          />
        </FormItem>
        <FormItem
          name="confirmOvertime"
          label="发货后自动确认收货时间（天）"
          rules={[{ required: true, message: '请输入发货后自动确认收货时间（天）!' }]}
        >
          <InputNumber
            id="create-confirmOvertime"
            placeholder={'请输入发货后自动确认收货时间（天）!'}
            style={{ width: 275 }}
          />
        </FormItem>
        <FormItem
          name="finishOvertime"
          label="自动完成交易时间，不能申请售后（天）"
          rules={[{ required: true, message: '请输入自动完成交易时间，不能申请售后（天）!' }]}
        >
          <InputNumber
            id="create-finishOvertime"
            placeholder={'请输入自动完成交易时间，不能申请售后（天）!'}
            style={{ width: 275 }}
          />
        </FormItem>

        <FormItem
          name="commentOvertime"
          label="订单完成后自动好评时间（天）"
          rules={[{ required: true, message: '请输入订单完成后自动好评时间（天）!' }]}
        >
          <InputNumber
            id="create-commentOvertime"
            placeholder={'请输入订单完成后自动好评时间（天）!'}
            style={{ width: 275 }}
          />
        </FormItem>
        <FormItem name="status" label="状态" rules={[{ required: true, message: '请输入状态!' }]}>
          <Radio.Group>
            <Radio value={0}>禁用</Radio>
            <Radio value={1}>正常</Radio>
          </Radio.Group>
        </FormItem>
        <FormItem
          name="isDefault"
          label="是否默认"
          rules={[{ required: true, message: '请输入是否默认!' }]}
        >
          <Radio.Group>
            <Radio value={0}>否</Radio>
            <Radio value={1}>是</Radio>
          </Radio.Group>
        </FormItem>
      </>
    );
  };

  const modalFooter = { okText: '保存', onOk: handleSubmit, onCancel };

  return (
    <Modal forceRender destroyOnClose title="新增" open={addVisible} {...modalFooter} width={700}>
      <Form {...formLayout} form={form} onFinish={handleFinish}>
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default AddModal;
