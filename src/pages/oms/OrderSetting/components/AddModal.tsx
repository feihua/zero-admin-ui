import React, {useEffect} from 'react';
import {Form, Input, InputNumber, Modal, Radio} from 'antd';
import type { OrderSettingListItem} from '../data.d';

export interface AddModalProps {
  onCancel: () => void;
  onSubmit: (values: OrderSettingListItem) => void;
  addVisible: boolean;
}

const FormItem = Form.Item;

const formLayout = {
  labelCol: {span: 7},
  wrapperCol: {span: 13},
};

const AddModal: React.FC<AddModalProps> = (props) => {
  const [form] = Form.useForm();

  const {
    onSubmit,
    onCancel,
    addVisible,
  } = props;

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
          name="id"
          label="主键ID"
          rules={[{required: true, message: '请输入主键ID!'}]}
        >
            <Input id="create-id" placeholder={'请输入主键ID!'}/>
         </FormItem>
        <FormItem
          name="flashOrderOvertime"
          label="秒杀订单超时关闭时间(分)"
          rules={[{required: true, message: '请输入秒杀订单超时关闭时间(分)!'}]}
        >
            <Input id="create-flashOrderOvertime" placeholder={'请输入秒杀订单超时关闭时间(分)!'}/>
         </FormItem>
        <FormItem
          name="normalOrderOvertime"
          label="正常订单超时时间(分)"
          rules={[{required: true, message: '请输入正常订单超时时间(分)!'}]}
        >
            <Input id="create-normalOrderOvertime" placeholder={'请输入正常订单超时时间(分)!'}/>
         </FormItem>
        <FormItem
          name="confirmOvertime"
          label="发货后自动确认收货时间（天）"
          rules={[{required: true, message: '请输入发货后自动确认收货时间（天）!'}]}
        >
            <Input id="create-confirmOvertime" placeholder={'请输入发货后自动确认收货时间（天）!'}/>
         </FormItem>
        <FormItem
          name="finishOvertime"
          label="自动完成交易时间，不能申请售后（天）"
          rules={[{required: true, message: '请输入自动完成交易时间，不能申请售后（天）!'}]}
        >
            <Input id="create-finishOvertime" placeholder={'请输入自动完成交易时间，不能申请售后（天）!'}/>
         </FormItem>
        <FormItem
          name="status"
          label="状态：0->禁用；1->启用"
          rules={[{required: true, message: '请输入状态：0->禁用；1->启用!'}]}
        >
              <Radio.Group>
                <Radio value={0}>禁用</Radio>
                <Radio value={1}>正常</Radio>
              </Radio.Group>
        </FormItem>
        <FormItem
          name="isDefault"
          label="是否默认：0->否；1->是"
          rules={[{required: true, message: '请输入是否默认：0->否；1->是!'}]}
        >
            <Input id="create-isDefault" placeholder={'请输入是否默认：0->否；1->是!'}/>
         </FormItem>
        <FormItem
          name="commentOvertime"
          label="订单完成后自动好评时间（天）"
          rules={[{required: true, message: '请输入订单完成后自动好评时间（天）!'}]}
        >
            <Input id="create-commentOvertime" placeholder={'请输入订单完成后自动好评时间（天）!'}/>
         </FormItem>
        <FormItem
          name="createBy"
          label="创建人ID"
          rules={[{required: true, message: '请输入创建人ID!'}]}
        >
            <Input id="create-createBy" placeholder={'请输入创建人ID!'}/>
         </FormItem>
        <FormItem
          name="createTime"
          label="创建时间"
          rules={[{required: true, message: '请输入创建时间!'}]}
        >
            <Input id="create-createTime" placeholder={'请输入创建时间!'}/>
         </FormItem>
        <FormItem
          name="updateBy"
          label="更新人ID"
          rules={[{required: true, message: '请输入更新人ID!'}]}
        >
            <Input id="create-updateBy" placeholder={'请输入更新人ID!'}/>
         </FormItem>
        <FormItem
          name="updateTime"
          label="更新时间"
          rules={[{required: true, message: '请输入更新时间!'}]}
        >
            <Input id="create-updateTime" placeholder={'请输入更新时间!'}/>
         </FormItem>
        <FormItem
          name="isDeleted"
          label="是否删除"
          rules={[{required: true, message: '请输入是否删除!'}]}
        >
            <Input id="create-isDeleted" placeholder={'请输入是否删除!'}/>
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
      open={addVisible}
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

export default AddModal;
