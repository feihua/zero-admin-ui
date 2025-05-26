import React, {useEffect} from 'react';
import {Form, Input, InputNumber, Modal, Radio} from 'antd';
import type { OrderSettingListItem} from '../data.d';

export interface UpdateModalProps {
  onCancel: () => void;
  onSubmit: (values: OrderSettingListItem) => void;
  updateVisible: boolean;
  currentData: Partial<OrderSettingListItem>;
}

const FormItem = Form.Item;

const formLayout = {
  labelCol: {span: 7},
  wrapperCol: {span: 13},
};

const UpdateModal: React.FC<UpdateModalProps> = (props) => {
  const [form] = Form.useForm();

  const {
    onSubmit,
    onCancel,
    updateVisible,
    currentData,
  } = props;

  useEffect(() => {
    if (form && !updateVisible) {
      form.resetFields();
    }
  }, [props.updateVisible]);

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
          name="id"
          label="主键ID"
          rules={[{required: true, message: '请输入主键ID!'}]}
        >
            <Input id="update-id" placeholder={'请输入主键ID!'}/>
         </FormItem>
        <FormItem
          name="flashOrderOvertime"
          label="秒杀订单超时关闭时间(分)"
          rules={[{required: true, message: '请输入秒杀订单超时关闭时间(分)!'}]}
        >
            <Input id="update-flashOrderOvertime" placeholder={'请输入秒杀订单超时关闭时间(分)!'}/>
         </FormItem>
        <FormItem
          name="normalOrderOvertime"
          label="正常订单超时时间(分)"
          rules={[{required: true, message: '请输入正常订单超时时间(分)!'}]}
        >
            <Input id="update-normalOrderOvertime" placeholder={'请输入正常订单超时时间(分)!'}/>
         </FormItem>
        <FormItem
          name="confirmOvertime"
          label="发货后自动确认收货时间（天）"
          rules={[{required: true, message: '请输入发货后自动确认收货时间（天）!'}]}
        >
            <Input id="update-confirmOvertime" placeholder={'请输入发货后自动确认收货时间（天）!'}/>
         </FormItem>
        <FormItem
          name="finishOvertime"
          label="自动完成交易时间，不能申请售后（天）"
          rules={[{required: true, message: '请输入自动完成交易时间，不能申请售后（天）!'}]}
        >
            <Input id="update-finishOvertime" placeholder={'请输入自动完成交易时间，不能申请售后（天）!'}/>
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
            <Input id="update-isDefault" placeholder={'请输入是否默认：0->否；1->是!'}/>
         </FormItem>
        <FormItem
          name="commentOvertime"
          label="订单完成后自动好评时间（天）"
          rules={[{required: true, message: '请输入订单完成后自动好评时间（天）!'}]}
        >
            <Input id="update-commentOvertime" placeholder={'请输入订单完成后自动好评时间（天）!'}/>
         </FormItem>
        <FormItem
          name="createBy"
          label="创建人ID"
          rules={[{required: true, message: '请输入创建人ID!'}]}
        >
            <Input id="update-createBy" placeholder={'请输入创建人ID!'}/>
         </FormItem>
        <FormItem
          name="createTime"
          label="创建时间"
          rules={[{required: true, message: '请输入创建时间!'}]}
        >
            <Input id="update-createTime" placeholder={'请输入创建时间!'}/>
         </FormItem>
        <FormItem
          name="updateBy"
          label="更新人ID"
          rules={[{required: true, message: '请输入更新人ID!'}]}
        >
            <Input id="update-updateBy" placeholder={'请输入更新人ID!'}/>
         </FormItem>
        <FormItem
          name="updateTime"
          label="更新时间"
          rules={[{required: true, message: '请输入更新时间!'}]}
        >
            <Input id="update-updateTime" placeholder={'请输入更新时间!'}/>
         </FormItem>
        <FormItem
          name="isDeleted"
          label="是否删除"
          rules={[{required: true, message: '请输入是否删除!'}]}
        >
            <Input id="update-isDeleted" placeholder={'请输入是否删除!'}/>
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
      open={updateVisible}
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

export default UpdateModal;
