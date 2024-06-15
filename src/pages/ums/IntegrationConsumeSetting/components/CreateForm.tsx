import React, {useEffect} from 'react';
import {Form, InputNumber, Modal, Radio} from 'antd';
import type {IntegrationConsumeSettingListItem} from '../data.d';

export interface CreateFormProps {
  onCancel: () => void;
  onSubmit: (values: IntegrationConsumeSettingListItem) => void;
  createModalVisible: boolean;
}

const FormItem = Form.Item;

const formLayout = {
  labelCol: {span: 9},
  wrapperCol: {span: 11},
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

  const handleFinish = (values: IntegrationConsumeSettingListItem) => {
    if (onSubmit) {
      onSubmit(values);
    }
  };

  const renderContent = () => {
    return (
      <>
        <FormItem
          name="isDefault"
          label="是否默认"
          initialValue={0}
          rules={[{required: true, message: '请输入是否默认!'}]}
        >
          <Radio.Group style={{width: 255}}>
            <Radio value={0}>否</Radio>
            <Radio value={1}>是</Radio>
          </Radio.Group>
        </FormItem>
        <FormItem
          name="couponStatus"
          label="是否可以和优惠券同用"
          initialValue={0}
          rules={[{required: true, message: '请输入是否可以和优惠券同用!'}]}
        >
          <Radio.Group>
            <Radio value={0}>不可以</Radio>
            <Radio value={1}>可以</Radio>
          </Radio.Group>
        </FormItem>
        <FormItem
          name="deductionPerAmount"
          label="每一元需要抵扣的积分数量"
          initialValue={10}
          rules={[{required: true, message: '请输入每一元需要抵扣的积分数量!'}]}
        >
          <InputNumber id="create-deductionPerAmount" placeholder={'请输入每一元需要抵扣的积分数量!'}
                       style={{width: 255}}/>
        </FormItem>

        <FormItem
          name="maxPercentPerOrder"
          label="每笔订单最高抵用百分比"
          initialValue={10}
          rules={[{required: true, message: '请输入每笔订单最高抵用百分比!'}]}
        >
          <InputNumber id="create-maxPercentPerOrder" placeholder={'请输入每笔订单最高抵用百分比!'}
                       style={{width: 255}}/>
        </FormItem>
        <FormItem
          name="useUnit"
          label="每次使用积分最小单位100"
          initialValue={10}
          rules={[{required: true, message: '请输入每次使用积分最小单位100!'}]}
        >
          <InputNumber id="create-useUnit" placeholder={'请输入每次使用积分最小单位100!'} style={{width: 255}}/>
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
      width={600}
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
